/**
 * Les quatre parcours de la carte des vins (section « On vous fait voyager »).
 * Ici : structure, coordonnées des villes-repères et placement des étiquettes ;
 * les textes (lieux, sols, cépages) sont dans `Events.wine.*` des deux JSON.
 * Le fond de carte (pays, lacs, Danube) est généré dans `wine-map-geo.ts` par
 * `scripts/build-wine-map.mjs`, avec la projection ci-dessous.
 */
export type WineRouteId = "a" | "b" | "c" | "d";

export type WineStop = {
  n: number;
  lat: number;
  lon: number;
  /** position de l'étiquette par rapport au point, en unités de carte */
  label: [dx: number, dy: number, anchor: "start" | "middle" | "end"];
};

export type WineRoute = { id: WineRouteId; stops: WineStop[] };

export const WINE_ROUTES: WineRoute[] = [
  {
    id: "a",
    stops: [
      { n: 1, lat: 47.93, lon: 16.62, label: [-26, -26, "end"] }, // Leithaberg
      { n: 2, lat: 46.7, lon: 15.55, label: [-26, -18, "end"] }, // Sud-Styrie
    ],
  },
  {
    id: "b",
    stops: [
      { n: 3, lat: 44.07, lon: 22.43, label: [26, 40, "start"] }, // Rogljevo
      { n: 4, lat: 44.7, lon: 23.0, label: [24, -24, "start"] }, // Mehedinți (Corcova)
      { n: 5, lat: 45.03, lon: 26.2, label: [0, -30, "middle"] }, // Dealu Mare
      { n: 6, lat: 44.17, lon: 28.4, label: [20, 30, "start"] }, // Murfatlar
      { n: 7, lat: 42.0, lon: 24.87, label: [22, 30, "start"] }, // Asenovgrad
    ],
  },
  {
    id: "c",
    stops: [
      { n: 8, lat: 45.25, lon: 13.9, label: [-22, -24, "end"] }, // Istrie
      { n: 9, lat: 42.95, lon: 17.3, label: [-24, 26, "end"] }, // Pelješac / Korčula
      { n: 10, lat: 43.2, lon: 17.68, label: [22, -26, "start"] }, // Herzégovine (Čitluk)
      { n: 11, lat: 42.35, lon: 19.2, label: [-26, 34, "end"] }, // Podgorica / Skadar
    ],
  },
  {
    id: "d",
    stops: [
      { n: 12, lat: 41.78, lon: 19.65, label: [-24, 30, "end"] }, // Lezhë
      { n: 13, lat: 41.12, lon: 20.8, label: [-24, 26, "end"] }, // Ohrid
      { n: 14, lat: 41.43, lon: 22.0, label: [22, 0, "start"] }, // Tikveš
      { n: 15, lat: 40.63, lon: 22.07, label: [24, 26, "start"] }, // Naoussa
    ],
  },
];

/** le point de départ de la carte des vins, cerclé sur la carte */
export const START_STOP = 3;

/* ---- projection : équirectangulaire, parallèle de référence 44.5° N ---- */

export const MAP_BOUNDS = { west: 12.3, east: 30.3, south: 39.7, north: 49.2 };
const COS_REF = Math.cos((44.5 * Math.PI) / 180);
/** unités de carte par degré de latitude (≈ 111,2 km) */
export const MAP_K = 1000 / ((MAP_BOUNDS.east - MAP_BOUNDS.west) * COS_REF);
export const MAP_W = 1000;
export const MAP_H = Math.round((MAP_BOUNDS.north - MAP_BOUNDS.south) * MAP_K);

export function project(lat: number, lon: number): [number, number] {
  return [
    Math.round((lon - MAP_BOUNDS.west) * COS_REF * MAP_K * 10) / 10,
    Math.round((MAP_BOUNDS.north - lat) * MAP_K * 10) / 10,
  ];
}

/** longueur de la barre d'échelle : 200 km */
export const SCALE_KM = 200;
export const SCALE_LEN = Math.round((SCALE_KM / 111.2) * MAP_K);

/* ---- repères de lecture posés sur la carte (textes dans `Events.wine.map.*`) ---- */

export const MAP_LABELS: {
  key: string;
  lat: number;
  lon: number;
  kind: string;
  rotate?: number;
}[] = [
  { key: "austria", lat: 47.3, lon: 13.9, kind: "land" },
  { key: "slovakia", lat: 48.7, lon: 19.4, kind: "land minor" },
  { key: "hungary", lat: 47.1, lon: 19.6, kind: "land minor" },
  { key: "ukraine", lat: 48.6, lon: 27.4, kind: "land minor" },
  { key: "moldova", lat: 47.3, lon: 28.6, kind: "land minor" },
  { key: "slovenia", lat: 46.1, lon: 14.8, kind: "land" },
  { key: "croatia", lat: 45.55, lon: 16.4, kind: "land" },
  { key: "bosnia", lat: 44.2, lon: 17.8, kind: "land dense" },
  { key: "serbia", lat: 44.1, lon: 20.7, kind: "land" },
  { key: "romania", lat: 46.1, lon: 24.9, kind: "land" },
  { key: "montenegro", lat: 42.95, lon: 19.45, kind: "land dense" },
  { key: "kosovo", lat: 42.55, lon: 20.9, kind: "land dense" },
  { key: "macedonia", lat: 41.9, lon: 21.6, kind: "land dense" },
  { key: "albania", lat: 40.2, lon: 20.0, kind: "land" },
  { key: "bulgaria", lat: 42.75, lon: 25.2, kind: "land" },
  { key: "greece", lat: 40.0, lon: 21.9, kind: "land" },
  { key: "turkey", lat: 41.35, lon: 27.4, kind: "land minor" },
  { key: "italy", lat: 41.4, lon: 14.8, kind: "land minor" },
  { key: "adriatic", lat: 43.75, lon: 14.3, kind: "sea", rotate: -36 },
  { key: "blackSea", lat: 42.7, lon: 29.2, kind: "sea" },
  { key: "aegean", lat: 39.95, lon: 24.9, kind: "sea" },
  { key: "danube", lat: 43.45, lon: 26.1, kind: "river" },
];
