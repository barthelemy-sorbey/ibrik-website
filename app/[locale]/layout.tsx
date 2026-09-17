import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import { buildPageMetadata } from "../lib/seo";
import ZenchefFrameTitle from "../components/ZenchefFrameTitle";
import "../globals.css";

// WOFF2 subsets (Latin + Latin Extended, for Romanian diacritics). Only the
// faces the site actually renders are declared: next/font preloads each one.
const antwerp = localFont({
  src: [
    { path: "../../public/fonts/Antwerp-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Antwerp-Italic.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/Antwerp-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Antwerp-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "../../public/fonts/Antwerp-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-antwerp",
  display: "swap",
});

const formulaCondensed = localFont({
  src: [
    { path: "../../public/fonts/FormulaCondensed-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/FormulaCondensed-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-formula-condensed",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono-dm",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "Metadata" });
  return buildPageMetadata({
    locale,
    title: t("title"),
    description: t("description"),
  });
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
        <NextIntlClientProvider>
          {children}
          <ZenchefFrameTitle />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
