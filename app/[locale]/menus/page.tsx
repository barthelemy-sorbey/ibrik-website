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
import { buildRestaurantJsonLd } from "../../lib/restaurant-jsonld";
import { buildPageMetadata, localizedUrl } from "../../lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/menus">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "MenusPage" });
  return buildPageMetadata({
    locale,
    path: "/menus",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
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

  const restaurantJsonLd = buildRestaurantJsonLd({
    description: tPage("metaDescription"),
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
  });

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "IBRIK KITCHEN",
        item: localizedUrl(locale),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tPage("metaTitle"),
        item: localizedUrl(locale, "/menus"),
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
