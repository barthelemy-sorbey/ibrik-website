"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";

type Source = "dinner" | "saturday";

type MenuItem = {
  id: string;
  source: Source;
  price: number;
  tags: string[];
};

const MENU: Record<string, MenuItem[]> = {
  starters: [
    { id: "lavash", source: "dinner", price: 7, tags: [] },
    { id: "thierry_breton", source: "dinner", price: 6, tags: [] },
    { id: "caviar_aubergines", source: "dinner", price: 15, tags: ["V"] },
    { id: "kefta_courgette", source: "dinner", price: 12, tags: ["V"] },
    { id: "feta_rotie", source: "dinner", price: 13, tags: ["V"] },
    { id: "risoni", source: "dinner", price: 11, tags: ["V"] },
  ],
  mains: [
    { id: "mititei", source: "dinner", price: 15, tags: [] },
    { id: "souvlaki", source: "dinner", price: 14, tags: [] },
    { id: "daurade_royale", source: "dinner", price: 33, tags: [] },
    { id: "os_moelle", source: "dinner", price: 17, tags: [] },
    { id: "sarmale", source: "dinner", price: 26, tags: ["signature"] },
    { id: "poivron_farci", source: "dinner", price: 19, tags: ["V"] },
  ],
  sweets: [
    { id: "pistache", source: "dinner", price: 11, tags: ["signature"] },
    { id: "papanasi", source: "dinner", price: 11, tags: [] },
    { id: "pavlova", source: "dinner", price: 14, tags: [] },
    { id: "affogato", source: "dinner", price: 13, tags: [] },
  ],
  drinks: [
    { id: "cafe_ibrik", source: "saturday", price: 6.5, tags: ["signature"] },
    { id: "espresso", source: "saturday", price: 3.5, tags: [] },
    { id: "bissap", source: "saturday", price: 5.5, tags: [] },
    { id: "citronnade", source: "saturday", price: 5.5, tags: [] },
    { id: "biere", source: "saturday", price: 8, tags: [] },
    { id: "vin_mois", source: "saturday", price: 8.5, tags: [] },
  ],
};

type Tab = keyof typeof MENU;

function formatPrice(value: number): string {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1).replace(".", ",");
}

export default function Menu() {
  const t = useTranslations("Menu");
  const tDinner = useTranslations("MenusPage.dinner.items");
  const tSaturday = useTranslations("MenusPage.saturday.items");
  const tabs: Tab[] = ["starters", "mains", "sweets", "drinks"];
  const [active, setActive] = useState<Tab>("mains");
  const items = MENU[active];

  const tItem = (item: MenuItem, key: "name" | "desc") =>
    item.source === "dinner" ? tDinner(`${item.id}.${key}`) : tSaturday(`${item.id}.${key}`);

  return (
    <section className="section s-menu" id="menu">
      <div className="wrap">
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
              key={`${item.source}-${item.id}`}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="title-row">
                <h3>{tItem(item, "name")}</h3>
              </div>
              <div className="price">{formatPrice(item.price)}</div>
              <p className="desc">{tItem(item, "desc")}</p>
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
          <Link href="/menus" className="pdf-link">
            {t("pdf")}
          </Link>
        </div>
      </div>
    </section>
  );
}
