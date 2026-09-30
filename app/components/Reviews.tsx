import { useLocale, useTranslations } from "next-intl";
import type { ReviewsData } from "../lib/sorbey";

// Avis de la fiche Google, relayés par Sorbey : 4 et 5 étoiles seulement, dans
// la langue de leur auteur. Pas de balisage Review/AggregateRating en JSON-LD :
// Google ignore les avis qu'un établissement publie sur son propre site.
export default function Reviews({ reviews, rating, count }: ReviewsData) {
  const t = useTranslations("Reviews");
  const locale = useLocale();
  if (reviews.length === 0) return null;

  const month = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  });
  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });

  return (
    <section className="section s-reviews" id="reviews">
      <div className="wrap">
        <div className="reviews-head">
          <h2 className="display reveal" style={{ whiteSpace: "pre-line" }}>
            {t("title")}
          </h2>
          <p className="lead reveal d1">{t("lead")}</p>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <figure className="review reveal" key={`${review.author}-${review.publishedAt}`}>
              <div
                className="stars"
                role="img"
                aria-label={t("stars", { rating: String(review.rating) })}
              >
                {"★".repeat(review.rating)}
              </div>
              <blockquote>
                <p>{review.text}</p>
              </blockquote>
              <figcaption>
                <span>{review.author || t("anonymous")}</span>
                <span>{month.format(review.publishedAt)}</span>
              </figcaption>
              {review.reply && (
                <div className="review-reply">
                  <div className="review-reply-label">{t("reply")}</div>
                  <p>{review.reply}</p>
                </div>
              )}
            </figure>
          ))}
        </div>

        <div className="reviews-foot reveal">
          {rating && count ? (
            <span>
              {t("rating", {
                rating: number.format(rating),
                count: number.format(count),
              })}
            </span>
          ) : (
            <span />
          )}
          <a
            href="https://maps.app.goo.gl/M96VNxVcr9pbNgHx9"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("all")}
          </a>
        </div>
      </div>
    </section>
  );
}
