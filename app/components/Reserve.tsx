"use client";

import { useState } from "react";
import { SpinSeal } from "./Decor";

export default function Reserve() {
  const [party, setParty] = useState(2);
  const [time, setTime] = useState("19:30");
  const [submitted, setSubmitted] = useState(false);
  const times = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

  return (
    <section className="section s-reserve" id="reserve">
      <div className="wrap">
        <div className="section-head">
          <span>◆ 05 · Rezervări</span>
          <span>Reservations</span>
        </div>

        <div className="reserve-row">
          <div>
            <h2 className="display reveal">
              Save a
              <br />
              <span className="accent" style={{ fontStyle: "italic" }}>
                chair.
              </span>
            </h2>
            <p
              className="lead reveal d1"
              style={{ marginTop: 18, maxWidth: "32ch" }}
            >
              We hold a few tables back for walk-ins each night, but the room
              fills early on weekends. Book ahead — we&rsquo;ll keep the candle
              lit.
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
                  Mulțumim!
                </p>
                <p style={{ fontSize: 19, maxWidth: "40ch", marginTop: 10 }}>
                  Your request for{" "}
                  <strong>
                    {party} {party === 1 ? "person" : "people"}
                  </strong>{" "}
                  at <strong>{time}</strong> is in. We&rsquo;ll confirm by email
                  within the hour. <em>Pe curând.</em>
                </p>
                <button
                  className="reserve-submit"
                  onClick={() => setSubmitted(false)}
                >
                  Book another →
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
                    Your name · numele
                    <input
                      className="field"
                      type="text"
                      required
                      placeholder="Maria Popescu"
                    />
                  </label>
                  <label>
                    Phone · telefon
                    <input
                      className="field"
                      type="tel"
                      required
                      placeholder="+40 ..."
                    />
                  </label>
                </div>
                <div className="row2">
                  <label>
                    Date · data
                    <input
                      className="field"
                      type="date"
                      required
                      defaultValue="2026-06-12"
                    />
                  </label>
                  <label>
                    Party · persoane
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
                  Time · ora
                  <div className="chips">
                    {times.map((t) => (
                      <button
                        type="button"
                        key={t}
                        className={`chip ${time === t ? "is-active" : ""}`}
                        onClick={() => setTime(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </label>
                <label>
                  Notes · note · allergies, occasions, anything we should know
                  <input
                    className="field"
                    type="text"
                    placeholder="Birthday for Andrei — please no candles"
                  />
                </label>

                <button type="submit" className="reserve-submit">
                  Reserve · rezervă →
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
            <div className="stamp" style={{ marginTop: 30 }}>
              Walk-ins
              <br />
              welcome.
            </div>
            <p>
              Two seats are always kept at the counter for the brave and the
              hungry — first come, served immediately, with a țuică on the
              house.
            </p>
            <p style={{ marginTop: 22 }}>
              For larger parties or last-minute miracles, call us.
            </p>
            <a href="tel:+40212345678" className="tel">
              +40 21 234 56 78
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
