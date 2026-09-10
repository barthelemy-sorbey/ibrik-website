import { useTranslations } from "next-intl";

const PRESS_NAMES = [
  "The Guardian",
  "Eater",
  "Time Out",
  "Condé Nast",
  "Financial Times",
  "Saveur",
  "Bon Appétit",
  "Monocle",
];

export default function Press() {
  const t = useTranslations("Press");
  const quotes = [
    { text: t("q1"), by: "The Guardian", loc: t("q1Loc") },
    { text: t("q2"), by: "Eater", loc: t("q2Loc") },
    { text: t("q3"), by: "Time Out", loc: t("q3Loc") },
  ];

  return (
    <section className="section s-press">
      <div className="wrap">
        <h2 className="display reveal" style={{ whiteSpace: "pre-line" }}>
          {t("title")}
        </h2>
      </div>

      <div className="press-band">
        <div className="wrap press-band-inner">
          {PRESS_NAMES.map((p) => (
            <span className="press-logo" key={p}>
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="wrap">
        <div className="press-quotes">
          {quotes.map((q) => (
            <div className="press-quote reveal" key={q.by}>
              <div className="stars">★★★★★</div>
              <p>&ldquo;{q.text}&rdquo;</p>
              <div className="by">
                <span>{q.by}</span>
                <span>{q.loc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
