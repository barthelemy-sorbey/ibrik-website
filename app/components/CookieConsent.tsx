"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";

const GA_ID = "G-EJPQFPLDVS";
const STORAGE_KEY = "ibrik-consent";
// The CNIL caps audience-measurement cookies at 13 months (GA defaults to 2 years).
const GA_COOKIE_EXPIRES = 13 * 30 * 24 * 60 * 60;
// Fired by the footer "Cookies" link to reopen the banner.
export const OPEN_EVENT = "ibrik:cookie-settings";

type Consent = "granted" | "denied" | "open" | null;

const listeners = new Set<() => void>();
let reopened = false;

function readConsent(): Consent {
  if (reopened) return "open";
  const value = localStorage.getItem(STORAGE_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const reopen = () => {
    reopened = true;
    listeners.forEach((l) => l());
  };
  window.addEventListener(OPEN_EVENT, reopen);
  return () => {
    listeners.delete(listener);
    window.removeEventListener(OPEN_EVENT, reopen);
  };
}

function save(value: "granted" | "denied") {
  const previous = localStorage.getItem(STORAGE_KEY);
  localStorage.setItem(STORAGE_KEY, value);
  reopened = false;
  if (previous === "granted" && value === "denied") {
    // Withdrawal: stop gtag from rewriting its cookies, drop them, and reload
    // so gtag.js is gone too.
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      if (name.startsWith("_ga")) {
        document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname}`;
        document.cookie = `${name}=; Max-Age=0; path=/`;
      }
    });
    location.reload();
    return;
  }
  listeners.forEach((l) => l());
}

// Google Analytics sets cookies, so it only loads once the visitor accepts
// (CNIL). The choice is kept in localStorage and can be changed from the footer.
export default function CookieConsent() {
  const t = useTranslations("CookieConsent");
  // Server snapshot "unset": nothing renders until the client knows the choice.
  const consent = useSyncExternalStore<Consent | "unset">(
    subscribe,
    readConsent,
    () => "unset",
  );
  const stored =
    consent === "open" ? localStorage.getItem(STORAGE_KEY) : consent;

  return (
    <>
      {stored === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { cookie_expires: ${GA_COOKIE_EXPIRES} });`}
          </Script>
        </>
      )}
      {(consent === null || consent === "open") && (
        <section className="cookie-banner" aria-label={t("label")}>
          <p>
            {t("text")}{" "}
            <Link href="/legal#privacy">{t("more")}</Link>
          </p>
          <div className="cookie-banner__actions">
            <button type="button" onClick={() => save("denied")}>
              {t("decline")}
            </button>
            <button type="button" onClick={() => save("granted")}>
              {t("accept")}
            </button>
          </div>
        </section>
      )}
    </>
  );
}
