const PRESS = [
  {
    stars: "★★★★★",
    text: "The sarmale is a love letter written in cabbage and smoke. We did not stop eating.",
    by: "The Guardian",
    loc: "London",
  },
  {
    stars: "★★★★★",
    text: "An act of memory. Ibrik makes a Bucharest grandmother's table feel inevitable, even necessary.",
    by: "Eater",
    loc: "Best New Restaurants 2025",
  },
  {
    stars: "★★★★★",
    text: "A papanași so tender it briefly cured a hangover and a heartbreak in the same bite.",
    by: "Time Out",
    loc: "Critic's Pick",
  },
];

const PRESS_MARQUEE = [
  "The Guardian",
  "Eater",
  "Time Out",
  "Condé Nast",
  "Financial Times",
  "Saveur",
  "Bon Appétit",
  "Monocle",
];

export default function Press() {
  return (
    <section className="section s-press">
      <div className="wrap">
        <div className="section-head">
          <span>◆ 03 · Presa & Recenzii</span>
          <span>What the critics wrote</span>
        </div>

        <h2 className="display reveal">
          They keep
          <br />
          coming back.
        </h2>
      </div>

      <div className="press-marquee">
        <div className="press-track">
          {PRESS_MARQUEE.concat(PRESS_MARQUEE).map((p, i) => (
            <span className="press-logo" key={i}>
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="wrap">
        <div className="press-quotes">
          {PRESS.map((q) => (
            <div className="press-quote reveal" key={q.by}>
              <div className="stars">{q.stars}</div>
              <p>&ldquo;{q.text}&rdquo;</p>
              <div className="by">
                <span>{q.by}</span>
                <span>{q.loc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
