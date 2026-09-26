import type { ReactNode } from "react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../../i18n/routing";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import CookieSettingsButton from "../../components/CookieSettingsButton";
import { buildPageMetadata } from "../../lib/seo";

// Company facts from the RCS (SIREN 838 378 008) and the former ibrik.fr legal page.
const SECTIONS = [
  { id: "legal", blocks: ["publisher", "director", "host", "ip"] },
  {
    id: "privacy",
    blocks: ["controller", "analytics", "vercel", "booking", "contact", "embeds", "cookies", "rights"],
  },
] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/legal">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "LegalPage" });
  return buildPageMetadata({
    locale,
    path: "/legal",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

function external(href: string) {
  return function ExternalLink(chunks: ReactNode) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    );
  };
}

const RICH = {
  strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
  code: (chunks: ReactNode) => <code>{chunks}</code>,
  mail: (chunks: ReactNode) => <a href="mailto:bureau@ibrik.fr">{chunks}</a>,
  tel: (chunks: ReactNode) => <a href="tel:+33170694250">{chunks}</a>,
  vercel: external("https://vercel.com/legal/privacy-policy"),
  google: external("https://policies.google.com/privacy"),
  zenchef: external("https://www.zenchef.com/privacy-policy"),
  cnil: external("https://www.cnil.fr/fr/plaintes"),
  cookies: (chunks: ReactNode) => (
    <CookieSettingsButton className="legal-cookies">{chunks}</CookieSettingsButton>
  ),
};

export default async function LegalPage({
  params,
}: PageProps<"/[locale]/legal">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("LegalPage");

  return (
    <>
      <Nav />
      <main className="legal-page">
        <div className="wrap legal-wrap">
          <h1 className="display">{t("title")}</h1>
          <p className="legal-updated">{t("updated")}</p>
          {SECTIONS.map((section) => (
            <section key={section.id} id={section.id} className="legal-section">
              <h2 className="display">{t(`${section.id}.title`)}</h2>
              {section.id === "privacy" && <p>{t("privacy.intro")}</p>}
              {section.blocks.map((block) => (
                <div key={block} className="legal-block">
                  <h3>{t(`blocks.${block}.title`)}</h3>
                  <p>{t.rich(`blocks.${block}.text`, RICH)}</p>
                </div>
              ))}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
