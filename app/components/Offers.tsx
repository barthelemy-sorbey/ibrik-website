import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";

const OFFERS = [
  { id: "neighbours", value: "-10%" },
  { id: "secondService", value: "-20%" },
] as const;

export default function Offers() {
  const t = useTranslations("Offers");

  return (
    <section className="section s-offers" id="offers">
      <div className="wrap">
        <div className="offers-head">
          <div>
            <div className="offers-eyebrow reveal">{t("eyebrow")}</div>
            <h2 className="display reveal">
              <span style={{ whiteSpace: "pre-line" }}>{t("titlePre")}</span>
              <span className="accent">{t("titleAccent")}</span>
            </h2>
          </div>
          <p className="lead reveal d1">{t("lead")}</p>
        </div>

        <div className="offers-grid">
          {OFFERS.map((offer, i) => (
            <article
              className="offer-card reveal"
              key={offer.id}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="offer-value">{offer.value}</div>
              <h3>
                {t(`${offer.id}.name`)}
                <span className="ro"> — {t(`${offer.id}.ro`)}</span>
              </h3>
              <p>{t(`${offer.id}.desc`)}</p>
              <div className="offer-terms">{t(`${offer.id}.terms`)}</div>
            </article>
          ))}
        </div>

        <div className="offers-foot reveal">
          <span>{t("note")}</span>
          <Link href="/menus#lunch" className="offers-link">
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
