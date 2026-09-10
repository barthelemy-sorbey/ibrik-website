"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

const LINKS = [
  { href: "/#about", key: "story" },
  { href: "/menus", key: "menu" },
  { href: "/#offers", key: "offers" },
  { href: "/#events", key: "events" },
  // { href: "/#gallery", key: "gallery" }, // hidden while the gallery is off
  { href: "/#faq", key: "faq" },
  { href: "/#visit", key: "visit" },
] as const;

export default function MobileMenu() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        className={`nav-burger${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? t("closeMenu") : t("openMenu")}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nav-burger__bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <div
        id="mobile-menu"
        className="mobile-menu"
        hidden={!open}
      >
        <nav className="mobile-menu__links" aria-label={t("menuLabel")}>
          {LINKS.map(({ href, key }, i) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              style={{ animationDelay: `${60 + i * 35}ms` }}
            >
              <span className="mobile-menu__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="mobile-menu__foot">
          <div className="mobile-menu__lang" onClick={close}>
            <span className="mobile-menu__label">{t("language")}</span>
            <LocaleSwitcher />
          </div>

          <a
            href="https://bookings.zenchef.com/results?rid=352129&pid=1001"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-menu__cta"
            onClick={close}
          >
            {t("reserve")}
            <span aria-hidden="true">→</span>
          </a>

          <div className="mobile-menu__contact">
            <a href="tel:+33170694250">+33 1 70 69 42 50</a>
            <a
              href="https://maps.app.goo.gl/M96VNxVcr9pbNgHx9"
              target="_blank"
              rel="noopener noreferrer"
            >
              9 rue de Mulhouse · 75002 Paris
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
