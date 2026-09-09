"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import OopsScreen from "../components/OopsScreen";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Nav />
      <OopsScreen
        code="500"
        eyebrow={t("eyebrow")}
        seal={t("seal")}
        titlePre={t("titlePre")}
        titleAccent={t("titleAccent")}
        lead={t("lead")}
        actions={
          <>
            <button
              type="button"
              className="oops-cta"
              onClick={() => unstable_retry()}
            >
              {t("ctaRetry")}
            </button>
            <Link href="/" className="oops-link">
              {t("ctaHome")}
            </Link>
            <a href="tel:+33170694250" className="oops-link">
              +33 1 70 69 42 50
            </a>
          </>
        }
        note={
          error.digest ? (
            <>
              {t("digestLabel")} <span className="oops-digest">{error.digest}</span>
            </>
          ) : (
            t("note")
          )
        }
      />
      <Footer />
    </>
  );
}
