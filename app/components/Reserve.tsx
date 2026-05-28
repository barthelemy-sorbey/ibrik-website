"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SpinSeal } from "./Decor";

export default function Reserve() {
  const t = useTranslations("Reserve");
  const [party, setParty] = useState(2);
  const [time, setTime] = useState("19:30");
  const [submitted, setSubmitted] = useState(false);
  const times = [
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ];

  return (
    <section className="section s-reserve" id="reserve">
      <div className="wrap">
        <div className="section-head">
          <span>{t("kicker")}</span>
          <span>{t("kickerRight")}</span>
        </div>

        <div className="reserve-row">
          <div>
            <h2 className="display reveal">
              <span style={{ whiteSpace: "pre-line" }}>{t("titlePre")}</span>
              <span className="accent" style={{ fontStyle: "italic" }}>
                {t("titleAccent")}
              </span>
            </h2>
            <p
              className="lead reveal d1"
              style={{ marginTop: 18, maxWidth: "32ch" }}
            >
              {t("lead")}
            </p>

            {submitted ? (
              <div className="reserve-form reveal in" style={{ marginTop: 40 }}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 56,
                    lineHeight: 1,
                    margin: 0,
                  }}
                >
                  {t("thanks")}
                </p>
                <p style={{ fontSize: 19, maxWidth: "40ch", marginTop: 10 }}>
                  {t.rich(party === 1 ? "confirmed_one" : "confirmed_other", {
                    count: party,
                    time,
                    strong: (c) => <strong>{c}</strong>,
                    em: (c) => <em>{c}</em>,
                  })}
                </p>
                <button
                  className="reserve-submit"
                  onClick={() => setSubmitted(false)}
                >
                  {t("bookAnother")}
                </button>
              </div>
            ) : (
              <form
                className="reserve-form reveal d2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                  window.scrollTo({
                    top:
                      e.currentTarget.getBoundingClientRect().top +
                      window.scrollY -
                      100,
                    behavior: "smooth",
                  });
                }}
                style={{ marginTop: 40 }}
              >
                <div className="row2">
                  <label>
                    {t("name")}
                    <input
                      className="field"
                      type="text"
                      required
                      placeholder={t("namePh")}
                    />
                  </label>
                  <label>
                    {t("phone")}
                    <input
                      className="field"
                      type="tel"
                      required
                      placeholder={t("phonePh")}
                    />
                  </label>
                </div>
                <div className="row2">
                  <label>
                    {t("date")}
                    <input
                      className="field"
                      type="date"
                      required
                      defaultValue="2026-06-12"
                    />
                  </label>
                  <label>
                    {t("party")}
                    <div className="chips">
                      {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                        <button
                          type="button"
                          key={n}
                          className={`chip ${party === n ? "is-active" : ""}`}
                          onClick={() => setParty(n)}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </label>
                </div>
                <label>
                  {t("time")}
                  <div className="chips">
                    {times.map((tm) => (
                      <button
                        type="button"
                        key={tm}
                        className={`chip ${time === tm ? "is-active" : ""}`}
                        onClick={() => setTime(tm)}
                      >
                        {tm}
                      </button>
                    ))}
                  </div>
                </label>
                <label>
                  {t("notes")}
                  <input
                    className="field"
                    type="text"
                    placeholder={t("notesPh")}
                  />
                </label>

                <button type="submit" className="reserve-submit">
                  {t("submit")}
                </button>
              </form>
            )}
          </div>

          <aside className="reserve-aside reveal d3">
            <SpinSeal
              text="IBRIK KITCHEN · BUN VENIT · "
              color="var(--ink)"
              size={140}
            />
            <div
              className="stamp"
              style={{ marginTop: 30, whiteSpace: "pre-line" }}
            >
              {t("asideStamp")}
            </div>
            <p>{t("asideP1")}</p>
            <p style={{ marginTop: 22 }}>{t("asideP2")}</p>
            <a href="tel:+40212345678" className="tel">
              +40 21 234 56 78
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
