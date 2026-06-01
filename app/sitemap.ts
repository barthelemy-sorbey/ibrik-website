import type { MetadataRoute } from "next";
import { routing } from "../i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ibrik.fr";

function alternatesFor(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const locale of routing.locales) {
    out[locale] =
      locale === routing.defaultLocale
        ? `${SITE_URL}${path}`
        : `${SITE_URL}/${locale}${path}`;
  }
  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: alternatesFor("") },
    },
    {
      url: `${SITE_URL}/menus`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: alternatesFor("/menus") },
    },
  ];
}
