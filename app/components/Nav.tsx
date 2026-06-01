import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import LogoMark from "./LogoMark";
import { Link } from "../../i18n/navigation";

export default function Nav() {
  const t = useTranslations("Nav");
  return (
    <nav className="nav">
      <Link href="/#top" className="nav-mark" aria-label="Ibrik Kitchen">
        <LogoMark height={36} priority />
      </Link>
      <div className="nav-links">
        <Link href="/#about">{t("story")}</Link>
        <Link href="/menus">{t("menu")}</Link>
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
