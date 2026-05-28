const events = [
  {
    num: "01",
    name: "Masa mare",
    ro: "the long table",
    meta: "12–24 guests · whole back room · 3 courses, family style",
    cap: "From €58 / pers",
  },
  {
    num: "02",
    name: "Buyout",
    ro: "all of us",
    meta: "Up to 60 guests · full restaurant · custom menu with the kitchen",
    cap: "From €4 200",
  },
  {
    num: "03",
    name: "Botez & Nuntă",
    ro: "christening & wedding",
    meta: "Catering off-site · sarmale by the hundred · țuică by the case",
    cap: "By quote",
  },
  {
    num: "04",
    name: "Cooking masterclass",
    ro: "stăm la bucătărie",
    meta: "Saturdays · 4 hours · 8 hands at the counter · papanași included",
    cap: "€95 / pers",
  },
];

export default function Events() {
  return (
    <section className="section s-events" id="events">
      <div className="wrap">
        <div className="section-head">
          <span>◆ 04 · Evenimente private</span>
          <span>Private events</span>
        </div>

        <div className="events-row">
          <div>
            <h2 className="display reveal">
              Gather
              <br />
              <span className="accent">your people.</span>
            </h2>
            <div className="body reveal d1" style={{ marginTop: 24 }}>
              <p>
                There is a Romanian word —{" "}
                <span
                  style={{ fontStyle: "italic", color: "var(--orange)" }}
                >
                  petrecere
                </span>{" "}
                — that means a party, a feast, and the act of &ldquo;passing
                time&rdquo; all at once. We were built for it.
              </p>
              <p>
                Whether it&rsquo;s twelve around the long table or sixty taking
                the whole room, we cook the way our families cook for theirs:
                too much, all at once, and so good that nobody quite leaves on
                time.
              </p>
              <p
                style={{
                  marginTop: 28,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontSize: 11,
                }}
              >
                Enquire · evenimente@ibrik.ro
              </p>
            </div>
          </div>

          <div className="events-cards">
            {events.map((e, i) => (
              <div
                className="events-card reveal"
                key={e.num}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="num">{e.num}</div>
                <div>
                  <h4>
                    {e.name}
                    <span className="ro">— {e.ro}</span>
                  </h4>
                  <div className="meta">{e.meta}</div>
                </div>
                <div className="cap">{e.cap}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
