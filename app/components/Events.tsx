import { useTranslations } from "next-intl";

export default function Events() {
  const t = useTranslations("Events");
  const events = [
    {
      num: "01",
      name: t("card1Name"),
      ro: t("card1Ro"),
      meta: t("card1Meta"),
      cap: t("card1Cap"),
    },
    {
      num: "02",
      name: t("card2Name"),
      ro: t("card2Ro"),
      meta: t("card2Meta"),
      cap: t("card2Cap"),
    },
    {
      num: "03",
      name: t("card3Name"),
      ro: t("card3Ro"),
      meta: t("card3Meta"),
      cap: t("card3Cap"),
    },
  ];

  return (
    <section className="section s-events" id="events">
      <div className="pattern-strip top" aria-hidden="true" />
      <div className="wrap">
        <div className="events-row">
          <div>
            <h2 className="display reveal">
              <span style={{ whiteSpace: "pre-line" }}>{t("titlePre")}</span>
              <span className="accent">{t("titleAccent")}</span>
            </h2>
            <div className="body reveal d1" style={{ marginTop: 24 }}>
              <p>{t.rich("p1", { i: (c) => <i>{c}</i> })}</p>
              <p>{t("p2")}</p>
            </div>

            <div className="events-private reveal d2">
              <span className="eyebrow">{t("privateEyebrow")}</span>
              <p>{t("privateBody")}</p>
              <div className="events-actions">
                <a href="mailto:bureau@ibrik.fr" className="events-cta">
                  {t("enquireCta")}
                </a>
                <a href="tel:+33170694250" className="events-phone">
                  {t("phone")}
                </a>
              </div>
            </div>
          </div>

          <div className="events-cards">
            {events.map((e, i) => (
              <div
                className="events-card reveal"
                key={e.num}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="events-card__motif" aria-hidden="true" />
                <div className="events-card__head">
                  <span className="num">{e.num}</span>
                  <span className="rule" aria-hidden="true" />
                </div>
                <h3>
                  {e.name}
                  <span className="ro"> — {e.ro}</span>
                </h3>
                <div className="meta">{e.meta}</div>
                <div className="cap">{e.cap}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pattern-strip bottom" aria-hidden="true" />
    </section>
  );
}
