"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function CrystalBall() {
  const t = useTranslations("CrystalBall");
  const dishes = t.raw("dishes") as string[];

  const [dish, setDish] = useState<string | null>(null);
  const [reading, setReading] = useState(false);

  const readFortune = () => {
    if (reading) return;
    setReading(true);
    // pick a dish different from the current one
    let next = dish;
    while (next === dish && dishes.length > 1) {
      next = dishes[Math.floor(Math.random() * dishes.length)];
    }
    // small delay so the ball "thinks" while the gaze animation runs
    window.setTimeout(() => {
      setDish(next ?? dishes[0]);
      setReading(false);
    }, 1100);
  };

  const revealed = dish !== null;

  return (
    <section className="section s-oracle" id="oracle">
      <div className="oracle-aura" aria-hidden="true" />

      <div className="wrap oracle-wrap">
        <div className="oracle-eyebrow mono reveal">{t("eyebrow")}</div>
        <h2 className="display reveal d1">{t("title")}</h2>
        <p className="oracle-intro reveal d2">{t("intro")}</p>

        <div className="oracle-stage reveal d2">
          <div className="cb-clouds" aria-hidden="true">
            <span className="cb-cloud c1" />
            <span className="cb-cloud c2" />
            <span className="cb-cloud c3" />
            <span className="cb-cloud c4" />
            <span className="cb-cloud c5" />
          </div>

          <button
            type="button"
            className={`crystal-ball${reading ? " is-reading" : ""}${
              revealed ? " is-revealed" : ""
            }`}
            onClick={readFortune}
            aria-label={t("cta")}
          >
            <span className="cb-glass" aria-hidden="true">
              <span className="cb-swirl" />
              <span className="cb-sparkle s1" />
              <span className="cb-sparkle s2" />
              <span className="cb-sparkle s3" />
              <span className="cb-shine" />
              <span className="cb-hint mono">?</span>
            </span>
            <span className="cb-base" aria-hidden="true" />
          </button>
        </div>

        <div className="oracle-readout" aria-live="polite">
          {revealed ? (
            <p key={dish} className="oracle-fortune">
              {t("reveal")} <em>{dish}</em>
              {t("revealEnd")}
            </p>
          ) : (
            <p className="oracle-readout-empty">{t("idle")}</p>
          )}
        </div>

        <button
          type="button"
          className="oracle-cta"
          onClick={readFortune}
          disabled={reading}
        >
          {reading ? t("ctaReading") : revealed ? t("ctaAgain") : t("cta")}
          <span aria-hidden="true">✦</span>
        </button>
      </div>
    </section>
  );
}
