"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../../i18n/navigation";
import { routing } from "../../i18n/routing";
import { useTransition } from "react";

export default function LocaleSwitcher() {
  const current = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="locale-switcher" role="group" aria-label="Language">
      {routing.locales.map((loc) => {
        const isActive = loc === current;
        return (
          <button
            key={loc}
            type="button"
            disabled={isActive || isPending}
            aria-current={isActive ? "true" : undefined}
            lang={loc}
            className={`loc ${isActive ? "is-active" : ""}`}
            onClick={() => {
              startTransition(() => {
                router.replace(pathname, { locale: loc });
              });
            }}
          >
            {loc.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
