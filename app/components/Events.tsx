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
    {
      num: "04",
      name: t("card4Name"),
      ro: t("card4Ro"),
      meta: t("card4Meta"),
      cap: t("card4Cap"),
    },
  ];

  return (
    <section className="section s-events" id="events">
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
              <p
                style={{
                  marginTop: 28,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontSize: 11,
                }}
              >
                {t("enquire")}
              </p>
            </div>
          </div>

          <div className="events-cards">
            {events.map((e, i) => (
              <div
                className="events-card reveal"
                key={e.num}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="num">{e.num}</div>
                <div>
                  <h4>
                    {e.name}
                    <span className="ro">— {e.ro}</span>
                  </h4>
                  <div className="meta">{e.meta}</div>
                </div>
                <div className="cap">{e.cap}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
