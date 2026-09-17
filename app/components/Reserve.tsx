import { useTranslations } from "next-intl";
import { SpinSeal } from "./Decor";

export default function Reserve() {
  const t = useTranslations("Reserve");

  return (
    <section className="section s-reserve" id="reserve">
      <div className="wrap">
        <div className="reserve-row">
          <div className="reserve-main">
            <h2 className="display reveal">
              <span style={{ whiteSpace: "pre-line" }}>{t("titlePre")}</span>
              <span className="accent" style={{ fontStyle: "italic" }}>
                {t("titleAccent")}
              </span>
            </h2>
            <p className="lead reveal d1" style={{ marginTop: 18, maxWidth: "34ch" }}>
              {t("lead")}
            </p>

            <div className="reserve-online reveal d2">
              <div className="reserve-eyebrow">{t("onlineEyebrow")}</div>
              <a
                href="https://bookings.zenchef.com/results?rid=352129&pid=1001"
                target="_blank"
                rel="noopener noreferrer"
                className="reserve-cta"
              >
                {t("onlineCta")}
                <span aria-hidden="true">→</span>
              </a>
              <div
                className="zc-widget-config reserve-widget"
                data-restaurant="352129"
                data-primary-color="0f4d33"
                data-open="false"
                data-pax="2"
              />
            </div>

            <div className="reserve-divider reveal d3" aria-hidden="true">
              <span>{t("or")}</span>
            </div>

            <div className="reserve-direct reveal d3">
              <div className="reserve-eyebrow">{t("directEyebrow")}</div>
              <div className="reserve-direct-grid">
                <a href="tel:+33170694250" className="reserve-direct-link">
                  <span className="reserve-direct-kind">{t("callLabel")}</span>
                  <span className="reserve-direct-value">+33 1 70 69 42 50</span>
                </a>
                <a href="mailto:bureau@ibrik.fr" className="reserve-direct-link">
                  <span className="reserve-direct-kind">{t("emailLabel")}</span>
                  <span className="reserve-direct-value">bureau@ibrik.fr</span>
                </a>
              </div>
            </div>
          </div>

          <aside className="reserve-aside reveal d4">
            <SpinSeal
              text="IBRIK KITCHEN · BUN VENIT · "
              color="var(--ink)"
              size={140}
            />
            <div
              className="stamp"
              style={{ marginTop: 30, whiteSpace: "pre-line" }}
            >
              {t("asideStamp")}
            </div>
            <p>{t("asideP1")}</p>
            <p style={{ marginTop: 18 }}>{t("asideP2")}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
