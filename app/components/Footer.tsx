import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="big">IBRIK</div>
        <div className="row">
          <div className="col">
            <h5>{t("visit")}</h5>
            <a
              href="https://www.google.com/maps/place/Ibrik+Kitchen/@48.868745,2.3467575,17z"
              target="_blank"
              rel="noopener noreferrer"
            >
              9 rue de Mulhouse
            </a>
            <a>75002 Paris · Sentier</a>
            <a href="tel:+33170694250">+33 1 70 69 42 50</a>
            <a href="mailto:bună@ibrik.fr">bună@ibrik.fr</a>
          </div>
          <div className="col">
            <h5>{t("menu")}</h5>
            <Link href="/#menu">{t("menuStarters")}</Link>
            <Link href="/#menu">{t("menuMains")}</Link>
            <Link href="/#menu">{t("menuSweets")}</Link>
            <Link href="/#menu">{t("menuDrinks")}</Link>
          </div>
          <div className="col">
            <h5>{t("follow")}</h5>
            <a>{t("follow1")}</a>
            <a>{t("follow2")}</a>
            <a>{t("follow3")}</a>
          </div>
          <div className="col">
            <h5>{t("careOf")}</h5>
            <a>{t("care1")}</a>
            <a>{t("care2")}</a>
            <a>{t("care3")}</a>
            <a>{t("care4")}</a>
          </div>
        </div>
        <div className="bottom">
          <span>{t("copy")}</span>
          <span>{t("tag")}</span>
        </div>
      </div>
    </footer>
  );
}
