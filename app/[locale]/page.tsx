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
import Reviews from "../components/Reviews";
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
import { buildRestaurantJsonLd } from "../lib/restaurant-jsonld";
import { describeHours, type Translator } from "../lib/opening-hours";
import { getOpeningHours, getReviews } from "../lib/sorbey";

// Horaires et avis viennent de la fiche Google (via Sorbey) : relus toutes les heures.
export const revalidate = 3600;

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const [hours, reviews] = await Promise.all([getOpeningHours(), getReviews()]);
  const tFaq = await getTranslations("Faq");
  const tHours = (await getTranslations("Hours")) as Translator;
  const tMeta = await getTranslations("Metadata");
  const hoursValues = describeHours(hours, tHours, locale);

  const restaurantJsonLd = buildRestaurantJsonLd({
    description: tMeta("description"),
    hours,
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_IDS.map((id) => ({
      "@type": "Question",
      name: tFaq(`${id}.q`),
      acceptedAnswer: {
        "@type": "Answer",
        text: tFaq(`${id}.a`, hoursValues),
      },
    })),
  };

  return (
    <>
      <Reveal />
      <Nav />
      <main>
        <Hero />
        <About />
        <Menu />
        <Press />
        <Reviews {...reviews} />
        <Events />
        <Reserve />
        <CrystalBall />
        <Video />
        {/* <Gallery /> */}
        <Faq hours={hours} />
        <Location hours={hours} />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
      />
    </>
  );
}
