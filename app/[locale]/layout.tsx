import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "../../i18n/routing";
import "../globals.css";

const antwerp = localFont({
  src: [
    { path: "../../public/fonts/Antwerp-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Antwerp-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../../public/fonts/Antwerp-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Antwerp-Italic.otf", weight: "400", style: "italic" },
    { path: "../../public/fonts/Antwerp-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Antwerp-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../../public/fonts/Antwerp-SemiBold.otf", weight: "600", style: "normal" },
    { path: "../../public/fonts/Antwerp-SemiBoldItalic.otf", weight: "600", style: "italic" },
    { path: "../../public/fonts/Antwerp-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Antwerp-BoldItalic.otf", weight: "700", style: "italic" },
  ],
  variable: "--font-antwerp",
  display: "swap",
});

const formulaCondensed = localFont({
  src: [
    { path: "../../public/fonts/FormulaCondensed-Ultralight.otf", weight: "200", style: "normal" },
    { path: "../../public/fonts/FormulaCondensed-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/FormulaCondensed-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/FormulaCondensed-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/FormulaCondensed-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-formula-condensed",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-mono-dm",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ibrik.fr";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const isDefault = locale === routing.defaultLocale;
  const canonical = isDefault ? "/" : `/${locale}`;

  const languages: Record<string, string> = { "x-default": "/" };
  for (const l of routing.locales) {
    languages[l] = l === routing.defaultLocale ? "/" : `/${l}`;
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonical,
      siteName: "Ibrik Kitchen",
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${antwerp.variable} ${formulaCondensed.variable} ${dmMono.variable}`}
    >
      <body suppressHydrationWarning>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Script
          id="zenchef-sdk"
          src="https://sdk.zenchef.com/v1/sdk.min.js"
          strategy="afterInteractive"
        />
        <Analytics />
      </body>
    </html>
  );
}
