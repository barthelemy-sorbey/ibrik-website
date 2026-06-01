import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";

type Source = "dinner" | "saturday";

type MenuItem = {
  id: string;
  source: Source;
  price: number;
  tags: string[];
};

const ITEMS: MenuItem[] = [
  { id: "caviar_aubergines", source: "dinner", price: 15, tags: ["V"] },
  { id: "feta_rotie", source: "dinner", price: 13, tags: ["V"] },
  { id: "mititei", source: "dinner", price: 15, tags: [] },
  { id: "sarmale", source: "dinner", price: 26, tags: ["signature"] },
  { id: "pistache", source: "dinner", price: 11, tags: ["signature"] },
  { id: "cafe_ibrik", source: "saturday", price: 6.5, tags: ["signature"] },
];

function formatPrice(value: number): string {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1).replace(".", ",");
}

export default function Menu() {
  const t = useTranslations("Menu");
  const tDinner = useTranslations("MenusPage.dinner.items");
  const tSaturday = useTranslations("MenusPage.saturday.items");

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

        <div className="menu-grid">
          {ITEMS.map((item, i) => (
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
