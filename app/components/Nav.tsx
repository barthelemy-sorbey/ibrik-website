import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import { Link } from "../../i18n/navigation";

export default function Nav() {
  const t = useTranslations("Nav");
  return (
    <nav className="nav">
      <Link href="/#top" className="nav-mark">
        IBRIK
      </Link>
      <div className="nav-links">
        <Link href="/#about">{t("story")}</Link>
        <Link href="/#menu">{t("menu")}</Link>
        <Link href="/#events">{t("events")}</Link>
        <Link href="/#visit">{t("visit")}</Link>
      </div>
      <div className="nav-right">
        <LocaleSwitcher />
        <Link href="/#reserve" className="nav-cta">
          <span>{t("reserve")}</span>
        </Link>
      </div>
    </nav>
  );
}
