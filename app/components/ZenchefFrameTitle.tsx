"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

// The Zenchef SDK injects its booking iframes without a title, which screen
// readers announce as an unnamed frame. Name them as they appear.
export default function ZenchefFrameTitle() {
  const t = useTranslations("Reserve");
  const title = t("widgetTitle");

  useEffect(() => {
    const name = () => {
      document
        .querySelectorAll<HTMLIFrameElement>('iframe[class*="ZC_sdk"]:not([title])')
        .forEach((frame) => frame.setAttribute("title", title));
    };
    name();
    const observer = new MutationObserver(name);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [title]);

  return null;
}
