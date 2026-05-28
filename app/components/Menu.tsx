"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type MenuItem = {
  id: string;
  name: string;
  price: number;
  tags: string[];
};

const MENU: Record<string, MenuItem[]> = {
  starters: [
    { id: "salata_vinete", name: "Salată de vinete", price: 14, tags: ["V"] },
    { id: "zacusca", name: "Zacuscă", price: 12, tags: ["V", "GF"] },
    { id: "mititei", name: "Mititei", price: 16, tags: [] },
    { id: "branza_ardei", name: "Brânză cu ardei", price: 13, tags: ["V"] },
    { id: "ciorba_burta", name: "Ciorbă de burtă", price: 12, tags: [] },
    { id: "ciorba_radauteana", name: "Ciorbă rădăuțeană", price: 11, tags: [] },
  ],
  mains: [
    { id: "sarmale", name: "Sarmale", price: 26, tags: ["signature"] },
    { id: "mamaliga", name: "Mămăligă cu brânză", price: 22, tags: ["V"] },
    { id: "tochitura", name: "Tochitură moldovenească", price: 28, tags: [] },
    { id: "muschi_vita", name: "Mușchi de vită", price: 38, tags: ["GF"] },
    { id: "crap", name: "Crap la cuptor", price: 32, tags: [] },
    { id: "ardei_umpluti", name: "Ardei umpluți", price: 24, tags: ["V"] },
  ],
  sweets: [
    { id: "papanasi", name: "Papanași", price: 12, tags: ["signature"] },
    { id: "cozonac", name: "Cozonac", price: 9, tags: ["V"] },
    { id: "cremsnit", name: "Cremșnit", price: 11, tags: ["V"] },
    { id: "placinta_mere", name: "Plăcintă cu mere", price: 10, tags: ["V"] },
  ],
  drinks: [
    { id: "ibrik_coffee", name: "Ibrik coffee", price: 6, tags: ["signature"] },
    { id: "tuica", name: "Țuică de Pitești", price: 9, tags: [] },
    { id: "visinata", name: "Vișinată", price: 8, tags: [] },
    { id: "socata", name: "Socată", price: 6, tags: ["NA"] },
    { id: "feteasca", name: "Fetească Neagră", price: 14, tags: [] },
    { id: "grasa", name: "Grasă de Cotnari", price: 13, tags: [] },
  ],
};

type Tab = keyof typeof MENU;

export default function Menu() {
  const t = useTranslations("Menu");
  const tabs: Tab[] = ["starters", "mains", "sweets", "drinks"];
  const [active, setActive] = useState<Tab>("mains");
  const items = MENU[active];

  return (
    <section className="section s-menu" id="menu">
      <div className="wrap">
        <div className="section-head">
          <span>{t("kicker")}</span>
          <span>{t("kickerRight")}</span>
        </div>

        <h2 className="display reveal">
          {t("titlePre")}
          <span className="accent" style={{ fontStyle: "italic" }}>
            {t("titleAccent")}
          </span>
          {t("titlePost")}
        </h2>
        <p className="lead reveal d1" style={{ marginBottom: 50 }}>
          {t("lead")}
        </p>

        <div className="menu-tabs reveal d2">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={active === tab ? "is-active" : ""}
              onClick={() => setActive(tab)}
            >
              {t(`cats.${tab}`)}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {items.map((item, i) => (
            <div
              className="menu-item reveal"
              key={item.id}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="title-row">
                <h3>{item.name}</h3>
                <span className="ro">{t(`translations.${item.id}`)}</span>
              </div>
              <div className="price">{item.price}</div>
              <p className="desc">{t(`items.${item.id}`)}</p>
              {item.tags.length > 0 && (
                <div className="tags">
                  {item.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag === "signature" ? t("tagSignature") : tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="menu-foot reveal">
          <span>{t("foot")}</span>
          <a href="#" className="pdf-link">
            {t("pdf")}
          </a>
        </div>
      </div>
    </section>
  );
}
