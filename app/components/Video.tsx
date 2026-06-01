import { useTranslations } from "next-intl";

export default function Video() {
  const t = useTranslations("Video");
  return (
    <section className="section s-video" id="universe">
      <div className="wrap">
        <div className="video-head">
          <h2 className="display reveal">
            <span style={{ whiteSpace: "pre-line" }}>{t("titlePre")}</span>
            <span className="accent" style={{ fontStyle: "italic" }}>
              {t("titleAccent")}
            </span>
          </h2>
          <p className="lead reveal d1" style={{ marginTop: 18 }}>
            {t.rich("lead", {
              em: (c) => <em>{c}</em>,
              strong: (c) => <strong>{c}</strong>,
            })}
          </p>
        </div>

        <div className="video-frame reveal d2">
          <div className="video-embed">
            <iframe
              src="https://www.youtube-nocookie.com/embed/NsV1GFRQWRY?start=402&rel=0"
              title={t("iframeTitle")}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="video-cap">
            <span>{t("capLeft")}</span>
            <span>{t("capRight")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
