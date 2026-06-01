import { getTranslations } from "next-intl/server";
import {
  LUNCH_MENU,
  DINNER_MENU,
  SATURDAY_MENU,
  type MenuData,
  type MenuItemData,
  type MenuSectionData,
} from "../lib/menus-data";

const MENU_PDF: Record<MenuData["id"], string> = {
  lunch:
    "https://ibrik.fr/wp-content/uploads/2025/03/Menus-midisoir-Printemps-2025.pdf",
  dinner:
    "https://ibrik.fr/wp-content/uploads/2025/03/Menus-midisoir-Printemps-2025.pdf",
  saturday:
    "https://ibrik.fr/wp-content/uploads/2025/03/Menus-midisoir-Printemps-2025.pdf",
};

function priceForItem(section: MenuSectionData, item: MenuItemData): number | null {
  if (item.price != null) return item.price;
  if (section.basePrice != null) return section.basePrice;
  return null;
}

function formatPrice(value: number): string {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1).replace(".", ",");
}

type MenuKey = "lunch" | "dinner" | "saturday";

async function renderItem(
  menuKey: MenuKey,
  section: MenuSectionData,
  item: MenuItemData,
  locale: string,
) {
  const tItem = await getTranslations(`MenusPage.${menuKey}.items.${item.id}`);
  const tPage = await getTranslations("MenusPage");
  const price = priceForItem(section, item);
  const tags = item.tags ?? [];
  const signature = tags.includes("signature");
  const veg = tags.includes("V");

  return (
    <article className="menu-item" key={`${section.id}-${item.id}`}>
      <div className="menu-item-head">
        <h4 className="menu-item-name">
          {tItem("name")}
          {veg && (
            <span className="menu-item-veg" aria-label={tPage("vegLegend")}>
              {" "}
              (V)
            </span>
          )}
        </h4>
        <div className="menu-item-price">
          {item.ask ? (
            <span className="menu-item-ask">{tPage("askLabel")}</span>
          ) : item.supplement != null ? (
            <span>
              {price != null && `${formatPrice(price)} `}
              <span className="menu-item-supplement">
                {tPage("supplement", { n: item.supplement })}
              </span>
            </span>
          ) : price != null ? (
            <span>
              {formatPrice(price)}
              {item.perPerson && (
                <small>
                  {" "}
                  / {tPage("perPerson")}
                  {item.minPeople ? ` · ${tPage("minPeople", { n: item.minPeople })}` : ""}
                </small>
              )}
            </span>
          ) : null}
        </div>
      </div>
      <p className="menu-item-desc">{tItem("desc")}</p>
      {signature && <span className="menu-item-tag">★</span>}
    </article>
  );
}

async function renderSection(
  menuKey: MenuKey,
  section: MenuSectionData,
  sectionLabelKey: string,
  locale: string,
) {
  const t = await getTranslations("MenusPage");
  return (
    <section className="menu-section" key={section.id} id={`${menuKey}-${section.id}`}>
      <header className="menu-section-head">
        <h3>{t(sectionLabelKey)}</h3>
        {section.basePrice != null && (
          <span className="menu-section-price">{section.basePrice}€</span>
        )}
      </header>
      <div className="menu-section-grid">
        {await Promise.all(
          section.items.map((item) => renderItem(menuKey, section, item, locale)),
        )}
      </div>
    </section>
  );
}

async function renderLunchFormulas(locale: string) {
  const t = await getTranslations("MenusPage.lunch");
  if (!LUNCH_MENU.formulas) return null;
  return (
    <aside className="menu-formulas">
      <h4>{t("formulasTitle")}</h4>
      <ul>
        {LUNCH_MENU.formulas.map((f) => {
          const labelKey =
            f.id === "mezze_main"
              ? "formulaMezzeMain"
              : f.id === "main_dessert"
                ? "formulaMainDessert"
                : "formulaFull";
          return (
            <li key={f.id}>
              <span>{t(labelKey)}</span>
              <span>{f.price}€</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

const SECTION_LABEL: Record<string, string> = {
  // lunch
  "lunch.mezze": "lunch.sectionMezze",
  "lunch.mains": "lunch.sectionMains",
  "lunch.desserts": "lunch.sectionDesserts",
  // dinner
  "dinner.bread_wine": "dinner.sectionBreadWine",
  "dinner.wild_sharp": "dinner.sectionWildSharp",
  "dinner.embers": "dinner.sectionEmbers",
  "dinner.patronne": "dinner.sectionPatronne",
  "dinner.stewed": "dinner.sectionStewed",
  "dinner.dulciuri": "dinner.sectionDulciuri",
  // saturday
  "saturday.mezze": "saturday.sectionMezze",
  "saturday.mains": "saturday.sectionMains",
  "saturday.desserts": "saturday.sectionDesserts",
};

const DRINKS_LABEL: Record<string, string> = {
  cold: "saturday.drinksCold",
  hot: "saturday.drinksHot",
  wines: "saturday.drinksWines",
  waters: "saturday.drinksWaters",
};

async function renderMenu(menu: MenuData, locale: string) {
  const t = await getTranslations(`MenusPage.${menu.id}`);
  const tPage = await getTranslations("MenusPage");

  return (
    <section className="menu-block" id={menu.id} key={menu.id}>
      <header className="menu-block-head">
        <div>
          <h2 className="menu-block-title">{t("label")}</h2>
          <p className="menu-block-subtitle">{t("subtitle")}</p>
        </div>
        <a
          href={MENU_PDF[menu.id]}
          target="_blank"
          rel="noopener noreferrer"
          className="menu-block-pdf"
        >
          {tPage("downloadPdf")}
        </a>
      </header>

      <div className="menu-sections">
        {await Promise.all(
          menu.sections.map((section) => {
            const key = SECTION_LABEL[`${menu.id}.${section.id}`];
            return renderSection(menu.id, section, key, locale);
          }),
        )}
      </div>

      {menu.id === "lunch" && (await renderLunchFormulas(locale))}

      {menu.drinks && (
        <section className="menu-drinks" id={`${menu.id}-drinks`}>
          <h3 className="menu-drinks-title">{t("sectionDrinks")}</h3>
          <div className="menu-drinks-grid">
            {await Promise.all(
              menu.drinks.map((section) =>
                renderSection(menu.id, section, DRINKS_LABEL[section.id], locale),
              ),
            )}
          </div>
        </section>
      )}

      {menu.id === "dinner" && (
        <footer className="menu-block-credits">
          <h5>{t("creditsTitle")}</h5>
          <p>{t("creditsLine")}</p>
        </footer>
      )}
    </section>
  );
}

export default async function MenusContent({ locale }: { locale: string }) {
  const t = await getTranslations("MenusPage");

  return (
    <main className="menus-page">
      <header className="menus-hero">
        <div className="wrap">
          <h1 className="display" style={{ whiteSpace: "pre-line" }}>
            {t("title")}
          </h1>
          <p className="lead" style={{ maxWidth: "52ch", marginTop: 18 }}>
            {t("lead")}
          </p>

          <nav className="menus-jump" aria-label={t("jumpTo")}>
            <span className="menus-jump-label">{t("jumpTo")} —</span>
            <a href="#lunch">{t("navLunch")}</a>
            <a href="#dinner">{t("navDinner")}</a>
            <a href="#saturday">{t("navSaturday")}</a>
            <a href="#saturday-drinks">{t("navDrinks")}</a>
          </nav>

          <p className="menus-note">
            <span>{t("vegLegend")}</span>
            <span className="sep" aria-hidden="true">
              ·
            </span>
            <span>{t("priceNote")}</span>
          </p>
        </div>
      </header>

      <div className="wrap menus-wrap">
        {await renderMenu(LUNCH_MENU, locale)}
        {await renderMenu(DINNER_MENU, locale)}
        {await renderMenu(SATURDAY_MENU, locale)}
      </div>
    </main>
  );
}
