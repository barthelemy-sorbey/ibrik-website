"use client";

import { useEffect, useRef, useState } from "react";
import { PinTag, Steam } from "./Decor";

export default function Hero() {
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
        <span>Bucharest · București — Romanian Kitchen</span>
        <span className="sep" />
        <span>Est. MMXX · Open Tue–Sun</span>
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
        <PinTag>Kitchen</PinTag>
      </div>

      <div className="hero-foot">
        <div className="blurb reveal in">
          A small, loud, warm Romanian kitchen. Slow food from the Carpathians,
          the Danube delta and somebody&rsquo;s <em>bunică</em>&rsquo;s back
          garden — cooked the way it has always been cooked.
        </div>
        <div className="since">
          MMXX
          <small>Since · Din anul</small>
        </div>
        <div className="scroll-cue">
          <span>Scroll · derulează</span>
          <div className="line" />
        </div>
      </div>

      <div className="pattern-strip" aria-hidden="true" />
    </header>
  );
}
