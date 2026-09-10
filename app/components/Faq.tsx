import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";
import { FAQ_IDS } from "../lib/faq-data";

export default function Faq() {
  const t = useTranslations("Faq");

  return (
    <section className="section s-faq" id="faq">
      <div className="wrap">
        <div className="faq-head">
          <div>
            <div className="faq-eyebrow reveal">{t("eyebrow")}</div>
            <h2 className="display reveal" style={{ whiteSpace: "pre-line" }}>
              {t("title")}
            </h2>
          </div>
          <p className="lead reveal d1">{t("lead")}</p>
        </div>

        <div className="faq-list reveal d1">
          {FAQ_IDS.map((id) => (
            <details className="faq-item" key={id} name="ibrik-faq">
              <summary>
                <h3>{t(`${id}.q`)}</h3>
                <span className="faq-sign" aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p>{t(`${id}.a`)}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="faq-foot reveal">
          <span>{t("more")}</span>
          <div className="faq-foot-links">
            <Link href="/menus">{t("moreMenus")}</Link>
            <a href="tel:+33170694250">{t("morePhone")}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
