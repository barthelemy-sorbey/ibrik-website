import { LEGACY_URLS } from "../lib/legacy-urls";
import { SITE_URL } from "../lib/seo";

/**
 * /sitemap-legacy.xml — anciennes adresses, qui redirigent toutes. Temporaire :
 * voir `app/lib/legacy-urls.ts`. Déclaré dans robots.txt et à soumettre dans la
 * Search Console et Bing Webmaster Tools.
 */
export const dynamic = "force-static";

export function GET() {
  const urls = LEGACY_URLS.map((path) => `<url><loc>${SITE_URL}${path}</loc></url>`).join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
