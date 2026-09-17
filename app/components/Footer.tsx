import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";
import LogoMark from "./LogoMark";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-logo">
          <LogoMark
            variant="cream"
            height={140}
            sizes="(max-width: 720px) 70vw, 400px"
          />
        </div>
        <div className="row">
          <div className="col">
            <h5>{t("visit")}</h5>
            <a
              href="https://maps.app.goo.gl/M96VNxVcr9pbNgHx9"
              target="_blank"
              rel="noopener noreferrer"
            >
              9 rue de Mulhouse
            </a>
            <a>75002 Paris · Sentier</a>
            <a href="tel:+33170694250">+33 1 70 69 42 50</a>
            <a href="mailto:contact@ibrik.fr">contact@ibrik.fr</a>
          </div>
          <div className="col">
            <h5>{t("menu")}</h5>
            <Link href="/menus#lunch">{t("menuStarters")}</Link>
            <Link href="/menus#dinner">{t("menuMains")}</Link>
            <Link href="/menus#saturday">{t("menuSweets")}</Link>
          </div>
          <div className="col">
            <h5>{t("follow")}</h5>
            <a
              href="https://www.instagram.com/ibrikparis/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("follow1")}
            </a>
            <a
              href="https://www.facebook.com/ibrikkitchen/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("follow2")}
            </a>
          </div>
          <div className="col">
            <h5>{t("careOf")}</h5>
            <a>{t("care1")}</a>
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
