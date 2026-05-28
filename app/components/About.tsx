import { ImageSlot } from "./Decor";

export default function About() {
  return (
    <section className="section s-about" id="about">
      <div className="wrap">
        <div className="section-head">
          <span>◆ 01 · Povestea noastră</span>
          <span>Our story · since 2020</span>
        </div>

        <div className="row">
          <div>
            <h2 className="display reveal">
              A kitchen
              <br />
              remembered
              <br />
              by hand.
            </h2>
            <div className="stamp reveal d1">poftă bună —</div>
            <div className="body reveal d2" style={{ marginTop: 30 }}>
              <p>
                Ibrik began the year the world stopped, in a single room above
                a bakery in Bucharest, with one copper <em>ibric</em>, two
                stools, and a recipe book held together with kitchen twine. We
                cooked for the people we missed.
              </p>
              <p>
                Five years on, the recipes haven&rsquo;t changed — sarmale that
                rest overnight,
                <em> mămăligă</em> stirred by the wrist, plum brandy from a
                cousin in Argeș. We still keep two stools by the door, in case
                anyone needs to come in from the cold.
              </p>
              <p style={{ fontStyle: "italic", marginTop: 24 }}>
                — Maria &amp; Andrei, bucătari
              </p>
            </div>
          </div>

          <div className="pic-col reveal d2">
            <div className="photo-card">
              <ImageSlot
                placeholder="Maria & Andrei in the kitchen"
                style={{ height: 360 }}
              />
              <div className="cap">
                <span>Maria &amp; Andrei</span>
                <span>01 / 03</span>
              </div>
            </div>
            <div className="photo-card">
              <ImageSlot
                placeholder="Copper ibric on the fire"
                style={{ height: 240 }}
              />
              <div className="cap">
                <span>The ibric</span>
                <span>02 / 03</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
