import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../../i18n/routing";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import MenusContent from "../../components/MenusContent";
import {
  ALL_MENUS,
  LUNCH_MENU,
  type MenuData,
  type MenuItemData,
  type MenuSectionData,
} from "../../lib/menus-data";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ibrik.fr";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/menus">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "MenusPage" });

  const isDefault = locale === routing.defaultLocale;
  const canonical = isDefault ? "/menus" : `/${locale}/menus`;
  const languages: Record<string, string> = { "x-default": "/menus" };
  for (const l of routing.locales) {
    languages[l] = l === routing.defaultLocale ? "/menus" : `/${l}/menus`;
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical, languages },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: canonical,
      siteName: "Ibrik Kitchen",
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      type: "website",
    },
  };
}

type ItemTranslator = (key: string) => string;

function itemPrice(
  section: MenuSectionData,
  item: MenuItemData,
): { price: number; perPerson: boolean } | null {
  const base = item.price ?? section.basePrice;
  if (base == null) return null;
  const total = base + (item.supplement ?? 0);
  return { price: total, perPerson: !!item.perPerson };
}

const SECTION_KEY_BY_MENU: Record<string, Record<string, string>> = {
  lunch: {
    mezze: "sectionMezze",
    mains: "sectionMains",
    desserts: "sectionDesserts",
  },
  dinner: {
    bread_wine: "sectionBreadWine",
    wild_sharp: "sectionWildSharp",
    embers: "sectionEmbers",
    patronne: "sectionPatronne",
    stewed: "sectionStewed",
    dulciuri: "sectionDulciuri",
  },
  saturday: {
    mezze: "sectionMezze",
    mains: "sectionMains",
    desserts: "sectionDesserts",
  },
};

const DRINKS_KEY: Record<string, string> = {
  cold: "drinksCold",
  hot: "drinksHot",
  wines: "drinksWines",
  waters: "drinksWaters",
};

function buildMenuJsonLd(menu: MenuData, tMenu: ItemTranslator, name: string) {
  const buildSection = (section: MenuSectionData, label: string) => ({
    "@type": "MenuSection",
    name: label,
    hasMenuItem: section.items.map((item) => {
      const tItem = (k: string) => tMenu(`items.${item.id}.${k}`);
      const priceData = itemPrice(section, item);
      const node: Record<string, unknown> = {
        "@type": "MenuItem",
        name: tItem("name"),
        description: tItem("desc"),
      };
      if (priceData) {
        node.offers = {
          "@type": "Offer",
          price: priceData.price.toFixed(2),
          priceCurrency: "EUR",
        };
      }
      if (item.tags?.includes("V")) {
        node.suitableForDiet = "https://schema.org/VegetarianDiet";
      }
      return node;
    }),
  });

  const sectionKeys = SECTION_KEY_BY_MENU[menu.id] ?? {};
  const sections = menu.sections.map((s) => {
    const labelKey = sectionKeys[s.id];
    const label = labelKey ? tMenu(labelKey) : s.id;
    return buildSection(s, label);
  });

  if (menu.drinks) {
    for (const d of menu.drinks) {
      const labelKey = DRINKS_KEY[d.id];
      const label = labelKey ? tMenu(labelKey) : d.id;
      sections.push(buildSection(d, label));
    }
  }

  return {
    "@type": "Menu",
    name,
    hasMenuSection: sections,
  };
}

export default async function MenusPage({
  params,
}: PageProps<"/[locale]/menus">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const tPage = await getTranslations("MenusPage");
  const tLunch = await getTranslations("MenusPage.lunch");
  const tDinner = await getTranslations("MenusPage.dinner");
  const tSaturday = await getTranslations("MenusPage.saturday");

  const restaurantJsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#restaurant`,
    name: "Ibrik Kitchen",
    description: tPage("metaDescription"),
    url: SITE_URL,
    telephone: "+33170694250",
    image: `${SITE_URL}/brand/logo.svg`,
    priceRange: "€€",
    servesCuisine: [
      "Balkan",
      "Romanian",
      "Greek",
      "Serbian",
      "Mediterranean",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "9 rue de Mulhouse",
      postalCode: "75002",
      addressLocality: "Paris",
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.86867230,
      longitude: 2.3465837,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "12:00",
        closes: "15:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "19:00",
        closes: "00:30",
      },
    ],
    acceptsReservations: true,
    hasMenu: [
      buildMenuJsonLd(LUNCH_MENU, tLunch as ItemTranslator, tLunch("label")),
      buildMenuJsonLd(
        ALL_MENUS[1],
        tDinner as ItemTranslator,
        tDinner("label"),
      ),
      buildMenuJsonLd(
        ALL_MENUS[2],
        tSaturday as ItemTranslator,
        tSaturday("label"),
      ),
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      reviewCount: 990,
    },
    sameAs: [
      "https://www.instagram.com/ibrikparis",
      "https://www.facebook.com/ibrikkitchen",
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ibrik Kitchen",
        item: locale === routing.defaultLocale ? `${SITE_URL}/` : `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tPage("metaTitle"),
        item:
          locale === routing.defaultLocale
            ? `${SITE_URL}/menus`
            : `${SITE_URL}/${locale}/menus`,
      },
    ],
  };

  return (
    <>
      <Reveal />
      <Nav />
      <MenusContent locale={locale} />
      <Footer />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurantJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
    </>
  );
}
