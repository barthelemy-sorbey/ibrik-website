import { useTranslations } from "next-intl";
import { ImageSlot } from "./Decor";

export default function Location() {
  const t = useTranslations("Location");
  return (
    <section className="section s-location" id="visit">
      <div className="wrap">
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
                href="https://www.google.com/maps/place/Ibrik+Kitchen/@48.868745,2.3467575,17z"
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
                  <td>{t("sundayClosed")}</td>
                  <td>{t("closed")}</td>
                </tr>
                <tr>
                  <td>
                    {t("weekRange")} · {t("lunch")}
                  </td>
                  <td>{t("lunchHours")}</td>
                </tr>
                <tr>
                  <td>
                    {t("weekRange")} · {t("dinner")}
                  </td>
                  <td>{t("dinnerHours")}</td>
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
