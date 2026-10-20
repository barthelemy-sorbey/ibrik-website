// Signale à Bing (et aux moteurs IndexNow : Yandex, Seznam, Naver…) toutes les
// URL des deux sitemaps du site en ligne, pour qu'ils les recrawlent sans
// attendre leur prochain passage. ChatGPT cherche via Bing : c'est le levier le
// plus direct pour qu'il oublie les anciennes pages et cartes PDF.
// Usage, après un déploiement en production : node scripts/indexnow.mjs
// La clé est publique par conception : public/<clé>.txt la prouve au moteur.
const SITE = "https://ibrik.fr";
const KEY = "e58f8ea33c94436ea8498943d18fd5fb";
const SITEMAPS = ["/sitemap.xml", "/sitemap-legacy.xml"];

async function locs(path) {
  const res = await fetch(SITE + path);
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  return [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const urlList = [...new Set((await Promise.all(SITEMAPS.map(locs))).flat())];
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  }),
});
// 200 : reçu ; 202 : reçu, clé en cours de vérification.
console.log(`IndexNow : ${urlList.length} URL, HTTP ${res.status}`, await res.text());
if (!res.ok) process.exit(1);
