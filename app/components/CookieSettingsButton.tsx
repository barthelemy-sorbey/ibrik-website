"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { OPEN_EVENT } from "./CookieConsent";

// Lets visitors change their cookie choice at any time (CNIL).
export default function CookieSettingsButton({
  className = "foot-cookies",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const t = useTranslations("CookieConsent");
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      {children ?? t("settings")}
    </button>
  );
}
