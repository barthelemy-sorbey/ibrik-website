import { useTranslations } from "next-intl";
import { ImageSlot } from "./Decor";

export default function Location() {
  const t = useTranslations("Location");
  return (
    <section className="section s-location" id="visit">
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

        <div className="loc-row" style={{ marginTop: 50 }}>
          <div className="loc-block reveal">
            <h4>{t("addressTitle")}</h4>
            <div className="lines" style={{ whiteSpace: "pre-line" }}>
              {t("addressLines")}
            </div>
            <div
              style={{
                marginTop: 24,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              <a
                href="https://maps.google.com/?q=Strada+Smârdan+14,+Bucharest"
                target="_blank"
                rel="noopener noreferrer"
                style={{ borderBottom: "1px solid", paddingBottom: 2 }}
              >
                {t("openInMaps")}
              </a>
            </div>
          </div>

          <div className="loc-block reveal d1">
            <h4>{t("hoursTitle")}</h4>
            <table className="hours-table">
              <tbody>
                <tr className="closed">
                  <td>{t("monday")}</td>
                  <td>{t("closed")}</td>
                </tr>
                <tr>
                  <td>{t("tueThu")}</td>
                  <td>17:00 — 23:00</td>
                </tr>
                <tr>
                  <td>{t("friday")}</td>
                  <td>17:00 — 01:00</td>
                </tr>
                <tr>
                  <td>{t("saturday")}</td>
                  <td>12:00 — 01:00</td>
                </tr>
                <tr>
                  <td>{t("sunday")}</td>
                  <td>12:00 — 22:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            border: "1.5px solid var(--ink)",
            padding: 10,
            marginBottom: 60,
          }}
          className="reveal"
        >
          <ImageSlot placeholder={t("mapAlt")} style={{ height: 380 }} />
        </div>
      </div>
    </section>
  );
}
