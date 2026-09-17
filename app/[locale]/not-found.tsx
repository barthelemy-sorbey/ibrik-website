import { getTranslations } from "next-intl/server";
import { Link } from "../../i18n/navigation";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import OopsScreen from "../components/OopsScreen";

export const metadata = { title: "404 — IBRIK KITCHEN" };

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <>
      <Nav />
      <OopsScreen
        code="404"
        eyebrow={t("eyebrow")}
        seal={t("seal")}
        titlePre={t("titlePre")}
        titleAccent={t("titleAccent")}
        lead={t("lead")}
        actions={
          <>
            <Link href="/" className="oops-cta">
              {t("ctaHome")}
            </Link>
            <Link href="/menus" className="oops-link">
              {t("ctaMenus")}
            </Link>
            <a href="tel:+33170694250" className="oops-link">
              +33 1 70 69 42 50
            </a>
          </>
        }
        note={t("note")}
      />
      <Footer />
    </>
  );
}
