"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { PinTag, Steam } from "./Decor";

export default function Hero() {
  const t = useTranslations("Hero");
  const wmRef = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    if (wmRef.current) wmRef.current.classList.add("in");
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const letters = "IBRIK".split("");
  const parallax = Math.min(scroll * 0.35, 200);
  const fade = Math.max(0, 1 - scroll / 600);

  return (
    <header className="hero" id="top">
      <Steam />
      <div className="hero-meta">
        <span>{t("meta")}</span>
        <span className="sep" />
        <span>{t("metaRight")}</span>
      </div>

      <div
        className="hero-wordmark"
        ref={wmRef}
        style={{
          transform: `translateY(${-parallax * 0.3}px)`,
          opacity: fade,
        }}
      >
        <div className="ibrik" aria-label="IBRIK">
          {letters.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </div>
      </div>

      <div className="hero-tagline" style={{ opacity: fade }}>
        <PinTag>{t("tagline")}</PinTag>
      </div>

      <div className="hero-foot">
        <div className="blurb reveal in">
          {t.rich("blurb", { em: (chunks) => <em>{chunks}</em> })}
        </div>
        <div className="since">
          MMXIX
          <small>{t("since")}</small>
        </div>
        <div className="scroll-cue">
          <span>{t("scroll")}</span>
          <div className="line" />
        </div>
      </div>

      <div className="pattern-strip" aria-hidden="true" />
    </header>
  );
}
