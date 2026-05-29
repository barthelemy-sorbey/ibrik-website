import { useTranslations } from "next-intl";
import { ImageSlot } from "./Decor";

export default function About() {
  const t = useTranslations("About");
  return (
    <section className="section s-about" id="about">
      <div className="wrap">
        <div className="row">
          <div>
            <h2 className="display reveal" style={{ whiteSpace: "pre-line" }}>
              {t("title")}
            </h2>
            <div className="stamp reveal d1">{t("stamp")}</div>
            <div className="body reveal d2" style={{ marginTop: 30 }}>
              <p>{t.rich("p1", { em: (c) => <em>{c}</em> })}</p>
              <p>{t.rich("p2", { em: (c) => <em>{c}</em> })}</p>
              <p style={{ fontStyle: "italic", marginTop: 24 }}>
                {t("signature")}
              </p>
            </div>
          </div>

          <div className="pic-col reveal d2">
            <div className="photo-card">
              <ImageSlot
                placeholder={t("photoAlt1")}
                style={{ height: 360 }}
              />
              <div className="cap">
                <span>{t("photoCap1")}</span>
                <span>01 / 03</span>
              </div>
            </div>
            <div className="photo-card">
              <ImageSlot
                placeholder={t("photoAlt2")}
                style={{ height: 240 }}
              />
              <div className="cap">
                <span>{t("photoCap2")}</span>
                <span>02 / 03</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
