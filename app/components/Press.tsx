import { useTranslations } from "next-intl";

// Distinctions (guides, classements) puis citations de presse. Le texte de
// chaque entrée vit dans `Press.<id>` ; les guillemets font partie du message
// pour suivre la typographie de chaque langue.
const PRESS = [
  { id: "gaultmillau", by: "Gault&Millau", award: true },
  { id: "laliste", by: "LaListe", award: true },
  { id: "lemonde", by: "Le Monde", award: false },
  { id: "telerama", by: "Télérama", award: false },
  { id: "figaroscope", by: "Le Figaroscope", award: false },
  { id: "lobrano", by: "Alexander Lobrano", award: false },
] as const;

export default function Press() {
  const t = useTranslations("Press");

  return (
    <section className="section s-press" id="press">
      <div className="wrap">
        <h2 className="display reveal" style={{ whiteSpace: "pre-line" }}>
          {t("title")}
        </h2>
      </div>

      <div className="press-band">
        <div className="wrap press-band-inner">
          {PRESS.map((p) => (
            <span className="press-logo" key={p.id}>
              {p.by}
            </span>
          ))}
        </div>
      </div>

      <div className="wrap">
        <div className="press-quotes">
          {PRESS.map((p) => (
            <div
              className={`press-quote reveal${p.award ? " is-award" : ""}`}
              key={p.id}
            >
              <p>{t(`${p.id}.text`)}</p>
              <div className="by">
                <span>{p.by}</span>
                <span>{t(`${p.id}.loc`)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
