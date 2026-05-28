import { ImageSlot } from "./Decor";

export default function Location() {
  return (
    <section className="section s-location" id="visit">
      <div className="wrap">
        <div className="section-head">
          <span>◆ 06 · Vizitează-ne</span>
          <span>Find the door</span>
        </div>

        <h2 className="display reveal">
          Come{" "}
          <span className="accent" style={{ fontStyle: "italic" }}>
            find
          </span>{" "}
          us.
        </h2>

        <div className="loc-row" style={{ marginTop: 50 }}>
          <div className="loc-block reveal">
            <h4>Address · Adresa</h4>
            <div className="lines">
              Strada Smârdan 14
              <br />
              Centrul Vechi, Bucharest
              <br />
              Romania · <span className="ro">România</span>
            </div>
            <div
              style={{
                marginTop: 24,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              <a
                href="#"
                style={{ borderBottom: "1px solid", paddingBottom: 2 }}
              >
                Open in maps →
              </a>
            </div>
          </div>

          <div className="loc-block reveal d1">
            <h4>Hours · Program</h4>
            <table className="hours-table">
              <tbody>
                <tr className="closed">
                  <td>Monday · luni</td>
                  <td>Closed</td>
                </tr>
                <tr>
                  <td>Tuesday — Thursday</td>
                  <td>17:00 — 23:00</td>
                </tr>
                <tr>
                  <td>Friday · vineri</td>
                  <td>17:00 — 01:00</td>
                </tr>
                <tr>
                  <td>Saturday · sâmbătă</td>
                  <td>12:00 — 01:00</td>
                </tr>
                <tr>
                  <td>Sunday · duminică</td>
                  <td>12:00 — 22:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            border: "1.5px solid var(--ink)",
            padding: 10,
            marginBottom: 60,
          }}
          className="reveal"
        >
          <ImageSlot
            placeholder="Map of Smârdan 14, Bucharest"
            style={{ height: 380 }}
          />
        </div>
      </div>
    </section>
  );
}
