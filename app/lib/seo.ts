import type { Metadata } from "next";
import { routing } from "../../i18n/routing";

/**
 * Canonical origin of the site. Production answers on the apex domain
 * (www.ibrik.fr does not resolve), so canonicals, hreflang, sitemap and
 * JSON-LD must all point here — not to the preview host a build runs on.
 */
export const SITE_URL = "https://ibrik.fr";

const OG_IMAGE_URL = "/brand/og-ibrik-kitchen.jpg";

/** Localised absolute URL: `en` has no prefix, `fr` lives under `/fr`. */
export function localizedUrl(locale: string, path = ""): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path || (prefix ? "" : "/")}`;
}

/** hreflang map for a path, including x-default (the English version). */
export function languageAlternates(path = ""): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = localizedUrl(locale, path);
  }
  languages["x-default"] = localizedUrl(routing.defaultLocale, path);
  return languages;
}

export function buildPageMetadata({
  locale,
  path = "",
  title,
  description,
}: {
  locale: string;
  path?: string;
  title: string;
  description: string;
}): Metadata {
  const url = localizedUrl(locale, path);
  const image = {
    url: OG_IMAGE_URL,
    width: 1200,
    height: 630,
    alt: locale === "fr" ? "IBRIK KITCHEN, Paris 2e" : "IBRIK KITCHEN, Paris 2nd",
  };
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title,
      description,
      url,
      siteName: "IBRIK KITCHEN",
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      alternateLocale: locale === "fr" ? ["en_GB"] : ["fr_FR"],
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
