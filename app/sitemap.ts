import type { MetadataRoute } from "next";
import { routing } from "../i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ibrik.ro";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] =
      locale === routing.defaultLocale
        ? `${SITE_URL}/`
        : `${SITE_URL}/${locale}`;
  }

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages },
    },
  ];
}
