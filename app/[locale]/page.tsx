import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import CrystalBall from "../components/CrystalBall";
import About from "../components/About";
import Menu from "../components/Menu";
import Press from "../components/Press";
import Events from "../components/Events";
import Reserve from "../components/Reserve";
import Location from "../components/Location";
import Video from "../components/Video";
// Gallery is built but hidden for now — re-enable the import and the
// <Gallery /> below, plus the "gallery" entry in MobileMenu, to bring it back.
// import Gallery from "../components/Gallery";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { FAQ_IDS } from "../lib/faq-data";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const tFaq = await getTranslations("Faq");

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_IDS.map((id) => ({
      "@type": "Question",
      name: tFaq(`${id}.q`),
      acceptedAnswer: {
        "@type": "Answer",
        text: tFaq(`${id}.a`),
      },
    })),
  };

  return (
    <>
      <Reveal />
      <Nav />
      <Hero />
      <About />
      <Menu />
      <Press />
      <Events />
      <Reserve />
      <CrystalBall />
      <Video />
      {/* <Gallery /> */}
      <Faq />
      <Location />
      <Footer />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
