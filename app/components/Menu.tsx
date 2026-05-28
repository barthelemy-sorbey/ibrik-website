"use client";

import { useState } from "react";

type MenuItem = {
  name: string;
  ro: string;
  price: number;
  desc: string;
  tags: string[];
};

type MenuCategory = {
  label: string;
  ro: string;
  items: MenuItem[];
};

const MENU: Record<string, MenuCategory> = {
  starters: {
    label: "Starters",
    ro: "Aperitive",
    items: [
      {
        name: "Salată de vinete",
        ro: "smoked eggplant",
        price: 14,
        desc: "Charred eggplant whipped with sunflower oil & onion, served with sourdough toast.",
        tags: ["V"],
      },
      {
        name: "Zacuscă",
        ro: "house preserve",
        price: 12,
        desc: "Roasted peppers, eggplant & tomato slow-cooked for hours. A taste of late summer.",
        tags: ["V", "GF"],
      },
      {
        name: "Mititei",
        ro: "the little ones",
        price: 16,
        desc: "Skinless grilled minced beef & lamb sausages with mustard and pickles.",
        tags: [],
      },
      {
        name: "Brânză cu ardei",
        ro: "shepherd cheese",
        price: 13,
        desc: "Aged sheep's milk cheese, hot peppers, cured red onion, walnut bread.",
        tags: ["V"],
      },
      {
        name: "Ciorbă de burtă",
        ro: "tripe sour soup",
        price: 12,
        desc: "Garlic-laced cream broth with vinegar & hot pepper on the side. Cure for everything.",
        tags: [],
      },
      {
        name: "Ciorbă rădăuțeană",
        ro: "northern chicken sour",
        price: 11,
        desc: "Bukovinian chicken sour soup, sour cream, lemon, garlic oil.",
        tags: [],
      },
    ],
  },
  mains: {
    label: "Mains",
    ro: "Feluri principale",
    items: [
      {
        name: "Sarmale",
        ro: "cabbage rolls",
        price: 26,
        desc: "Pickled cabbage parcels of pork, beef & rice, simmered with smoked bacon. Served on a bed of mămăligă with sour cream.",
        tags: ["signature"],
      },
      {
        name: "Mămăligă cu brânză",
        ro: "polenta & cheese",
        price: 22,
        desc: "Stone-ground polenta, sheep's cheese, soft butter, a fried duck egg.",
        tags: ["V"],
      },
      {
        name: "Tochitură moldovenească",
        ro: "Moldavian stew",
        price: 28,
        desc: "Pork shoulder & smoked sausage stew, polenta, fried egg, telemea cheese.",
        tags: [],
      },
      {
        name: "Mușchi de vită",
        ro: "wood-fire beef",
        price: 38,
        desc: "Dry-aged ribeye over beech embers, marrow butter, charred leeks, pickled cherry.",
        tags: ["GF"],
      },
      {
        name: "Crap la cuptor",
        ro: "baked carp",
        price: 32,
        desc: "Whole Danube carp with garlic, fresh thyme & roasted potatoes. Sour cream sauce.",
        tags: [],
      },
      {
        name: "Ardei umpluți",
        ro: "stuffed peppers",
        price: 24,
        desc: "Sweet peppers stuffed with rice & herbs, tomato broth, dill, smetana.",
        tags: ["V"],
      },
    ],
  },
  sweets: {
    label: "Sweets",
    ro: "Dulciuri",
    items: [
      {
        name: "Papanași",
        ro: "soft cheese doughnuts",
        price: 12,
        desc: "Fried sweet cheese dumplings, sour cherry compote, thick sour cream. The reason you came.",
        tags: ["signature"],
      },
      {
        name: "Cozonac",
        ro: "festive bread",
        price: 9,
        desc: "Slow-proofed walnut & cocoa swirl bread, warmed, with mahogany butter.",
        tags: ["V"],
      },
      {
        name: "Cremșnit",
        ro: "Transylvanian millefeuille",
        price: 11,
        desc: "Layered crisp pastry, vanilla custard, snow of icing sugar.",
        tags: ["V"],
      },
      {
        name: "Plăcintă cu mere",
        ro: "apple pastry",
        price: 10,
        desc: "Lard-pastry coil filled with cinnamon apples, cinnamon ice cream.",
        tags: ["V"],
      },
    ],
  },
  drinks: {
    label: "Drinks",
    ro: "Băuturi",
    items: [
      {
        name: "Ibrik coffee",
        ro: "cafea la ibric",
        price: 6,
        desc: "Slow-brewed in copper over hot sand. Sweet, bitter, cardamom. The house namesake.",
        tags: ["signature"],
      },
      {
        name: "Țuică de Pitești",
        ro: "plum brandy",
        price: 9,
        desc: "Twice-distilled plum eau-de-vie, 52°. Served the proper way — cold, a thimble, before the meal.",
        tags: [],
      },
      {
        name: "Vișinată",
        ro: "sour cherry liqueur",
        price: 8,
        desc: "House-infused sour cherries, sugar, time. Dangerously easy to drink.",
        tags: [],
      },
      {
        name: "Socată",
        ro: "elderflower fizz",
        price: 6,
        desc: "Wild elderflower & lemon, fermented two days. Non-alcoholic.",
        tags: ["NA"],
      },
      {
        name: "Fetească Neagră",
        ro: "indigenous red, glass",
        price: 14,
        desc: "Dealu Mare, 2021. Dark fruit, smoked plum, a long quiet finish.",
        tags: [],
      },
      {
        name: "Grasă de Cotnari",
        ro: "indigenous white, glass",
        price: 13,
        desc: "Cotnari, 2022. Honeyed, dry, with a whisper of acacia.",
        tags: [],
      },
    ],
  },
};

export default function Menu() {
  const tabs: (keyof typeof MENU)[] = ["starters", "mains", "sweets", "drinks"];
  const [active, setActive] = useState<keyof typeof MENU>("mains");
  const data = MENU[active];

  return (
    <section className="section s-menu" id="menu">
      <div className="wrap">
        <div className="section-head">
          <span>◆ 02 · Meniu</span>
          <span>Updated weekly · with the market</span>
        </div>

        <h2 className="display reveal">
          The{" "}
          <span className="accent" style={{ fontStyle: "italic" }}>
            full
          </span>{" "}
          table.
        </h2>
        <p className="lead reveal d1" style={{ marginBottom: 50 }}>
          Six starters, six mains, four sweets, and the drinks our grandmothers
          warned us about. Order three plates between two. Stay for coffee.
        </p>

        <div className="menu-tabs reveal d2">
          {tabs.map((t) => (
            <button
              key={t}
              className={active === t ? "is-active" : ""}
              onClick={() => setActive(t)}
            >
              {MENU[t].label} <span className="ro">— {MENU[t].ro}</span>
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {data.items.map((item, i) => (
            <div
              className="menu-item reveal"
              key={item.name}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="title-row">
                <h3>{item.name}</h3>
                <span className="ro">{item.ro}</span>
              </div>
              <div className="price">{item.price}</div>
              <p className="desc">{item.desc}</p>
              {item.tags.length > 0 && (
                <div className="tags">
                  {item.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="menu-foot reveal">
          <span>Prices in € · 12% serviciu inclus pentru grupuri de 6+</span>
          <a href="#" className="pdf-link">
            Download full menu · PDF →
          </a>
        </div>
      </div>
    </section>
  );
}
