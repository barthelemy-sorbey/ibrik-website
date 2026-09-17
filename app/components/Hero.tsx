"use client";

import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "../../i18n/navigation";
import logo from "../../public/brand/ibrik-kitchen-logo.png";

const HERO_POSTER = "/brand/ibrik-hero-poster.webp";

export default function Hero() {
  const t = useTranslations("Hero");
  // The poster is the hero's largest paint: let the browser fetch it with the
  // HTML instead of discovering it once the <video> is parsed.
  preload(HERO_POSTER, { as: "image", fetchPriority: "high" });
  const wmRef = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    if (wmRef.current) wmRef.current.classList.add("in");
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallax = Math.min(scroll * 0.35, 200);
  const fade = Math.max(0, 1 - scroll / 600);

  return (
    <header className="hero" id="top">
      <div className="hero-meta">
        <h1 className="hero-title">{t("meta")}</h1>
        <span className="sep" />
        <span>{t("metaRight")}</span>
      </div>

      <div className="hero-main">
        <div className="hero-text-col">
          <div className="hero-brand-stack">
            <div
              className="hero-wordmark"
              ref={wmRef}
              style={{
                transform: `translateY(${-parallax * 0.3}px)`,
                opacity: fade,
              }}
            >
              <Image
                src={logo}
                alt="IBRIK KITCHEN"
                className="ibrik-logo"
                priority
                sizes="(max-width: 900px) 88vw, 42vw"
              />
            </div>
            <div className="hero-ctas">
              <a
                href="https://bookings.zenchef.com/results?rid=352129&pid=1001"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-reserve-cta"
              >
                {t("reserveCta")}
                <span aria-hidden="true">→</span>
              </a>
              <Link href="/menus" className="hero-menus-cta">
                {t("menusCta")}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <p className="hero-takeaway">{t("takeaway")}</p>
          </div>
        </div>

        <div className="hero-video-col">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_POSTER}
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/brand/ibrik-hero.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="hero-foot">
        <div className="blurb reveal in">
          {t.rich("blurb", { em: (chunks) => <em>{chunks}</em> })}
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
