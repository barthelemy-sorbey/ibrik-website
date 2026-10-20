import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    // sitemap-legacy.xml est temporaire : voir app/lib/legacy-urls.ts.
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/sitemap-legacy.xml`],
  };
}
