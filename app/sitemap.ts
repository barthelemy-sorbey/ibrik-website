import type { MetadataRoute } from "next";
import { routing } from "../i18n/routing";
import { languageAlternates, localizedUrl } from "./lib/seo";

const PAGES: { path: string; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/menus", changeFrequency: "monthly", priority: 0.9 },
  { path: "/legal", changeFrequency: "yearly", priority: 0.1 },
];

// One entry per localised URL, each listing every language version, as
// Google expects for hreflang in sitemaps.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.flatMap(({ path, changeFrequency, priority }) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
