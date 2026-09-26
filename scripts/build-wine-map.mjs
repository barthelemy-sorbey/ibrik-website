// Génère le fond de carte de la carte des vins : app/lib/wine-map-geo.ts
// Source : Natural Earth (domaine public), pays 1:50m, lacs et fleuves.
// Usage : node scripts/build-wine-map.mjs  (télécharge les données au besoin)
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { MAP_W, MAP_H, project } from "../app/lib/wine-routes.ts";

const NE =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson";
const CACHE = path.join(os.tmpdir(), "ne");
const OUT = new URL("../app/lib/wine-map-geo.ts", import.meta.url);

// pays du parcours, en crème ; les autres restent en retrait
const FOCUS = new Set([
  "AUT", "SVN", "HRV", "BIH", "SRB", "MNE", "KOS", "ALB", "MKD", "GRC", "BGR", "ROU",
]);
const SKIP = new Set(["VAT", "SMR"]);
const DANUBE = /^(Danube|Donau|Bratul (Chilia|Chillia|Sulina|Sfintu Gheorghe))$/;
const TOLERANCE = 0.6; // simplification, en unités de carte
const PAD = 12; // marge de découpe autour du cadre

async function load(name) {
  const file = path.join(CACHE, `${name}.geojson`);
  if (!fs.existsSync(file)) {
    fs.mkdirSync(CACHE, { recursive: true });
    const res = await fetch(`${NE}/${name}.geojson`);
    if (!res.ok) throw new Error(`${name}: ${res.status}`);
    fs.writeFileSync(file, await res.text());
  }
  return JSON.parse(fs.readFileSync(file, "utf8")).features;
}

const rings = (g) =>
  g.type === "Polygon" ? g.coordinates : g.type === "MultiPolygon" ? g.coordinates.flat() : [];
const lines = (g) =>
  g.type === "LineString" ? [g.coordinates] : g.type === "MultiLineString" ? g.coordinates : [];
const toXY = (ring) => ring.map(([lon, lat]) => project(lat, lon));

// Sutherland–Hodgman contre le cadre élargi
function clipRing(pts) {
  const edges = [
    (p) => p[0] >= -PAD, (p) => p[0] <= MAP_W + PAD,
    (p) => p[1] >= -PAD, (p) => p[1] <= MAP_H + PAD,
  ];
  const cut = [
    (a, b) => lerp(a, b, (-PAD - a[0]) / (b[0] - a[0])),
    (a, b) => lerp(a, b, (MAP_W + PAD - a[0]) / (b[0] - a[0])),
    (a, b) => lerp(a, b, (-PAD - a[1]) / (b[1] - a[1])),
    (a, b) => lerp(a, b, (MAP_H + PAD - a[1]) / (b[1] - a[1])),
  ];
  let out = pts;
  for (let e = 0; e < 4 && out.length; e++) {
    const input = out;
    out = [];
    for (let i = 0; i < input.length; i++) {
      const cur = input[i];
      const prev = input[(i + input.length - 1) % input.length];
      const inC = edges[e](cur), inP = edges[e](prev);
      if (inC) {
        if (!inP) out.push(cut[e](prev, cur));
        out.push(cur);
      } else if (inP) out.push(cut[e](prev, cur));
    }
  }
  return out;
}
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

// découpe d'une ligne : ne garde que les tronçons dans le cadre
function clipLine(pts) {
  const inside = (p) => p[0] >= -PAD && p[0] <= MAP_W + PAD && p[1] >= -PAD && p[1] <= MAP_H + PAD;
  const parts = [];
  let cur = [];
  for (const p of pts) {
    if (inside(p)) cur.push(p);
    else if (cur.length) { parts.push(cur); cur = []; }
  }
  if (cur.length) parts.push(cur);
  return parts.filter((p) => p.length > 1);
}

function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    let max = 0, idx = -1;
    for (let i = a + 1; i < b; i++) {
      const d = segDist(pts[i], pts[a], pts[b]);
      if (d > max) { max = d; idx = i; }
    }
    if (max > tol) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
function segDist(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const len = dx * dx + dy * dy;
  const t = len ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len)) : 0;
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
}

const r = (v) => Math.round(v * 10) / 10;
const d = (pts, close) =>
  "M" + pts.map((p) => `${r(p[0])} ${r(p[1])}`).join(" ") + (close ? "Z" : "");
const area = (pts) =>
  Math.abs(pts.reduce((s, p, i) => s + p[0] * pts[(i + 1) % pts.length][1] - pts[(i + 1) % pts.length][0] * p[1], 0) / 2);

function polygons(geom, minArea) {
  return rings(geom)
    .map((ring) => simplify(clipRing(toXY(ring)), TOLERANCE))
    .filter((pts) => pts.length > 2 && area(pts) >= minArea)
    .map((pts) => d(pts, true))
    .join("");
}

const countries = (await load("ne_50m_admin_0_countries"))
  .filter((f) => !SKIP.has(f.properties.ADM0_A3))
  .map((f) => ({
    id: f.properties.ADM0_A3,
    focus: FOCUS.has(f.properties.ADM0_A3),
    d: polygons(f.geometry, 4),
  }))
  .filter((c) => c.d)
  .sort((a, b) => Number(a.focus) - Number(b.focus));

const lakes = (await load("ne_10m_lakes"))
  .map((f) => polygons(f.geometry, 6))
  .filter(Boolean);

const danube = (await load("ne_50m_rivers_lake_centerlines"))
  .filter((f) => DANUBE.test(f.properties.name ?? ""))
  .flatMap((f) => lines(f.geometry))
  .flatMap((l) => clipLine(toXY(l)))
  .map((pts) => d(simplify(pts, TOLERANCE), false));

const body = `// Généré par scripts/build-wine-map.mjs — ne pas modifier à la main.
// Fond de carte : Natural Earth (domaine public).

export const COUNTRIES: { id: string; focus: boolean; d: string }[] = ${JSON.stringify(countries, null, 1)};

export const LAKES: string[] = ${JSON.stringify(lakes)};

export const DANUBE: string[] = ${JSON.stringify(danube)};
`;
fs.writeFileSync(OUT, body);
console.log(
  `wine-map-geo.ts : ${countries.length} pays, ${lakes.length} lacs, ${danube.length} tronçons, ${(body.length / 1024).toFixed(1)} Ko`,
);
