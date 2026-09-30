import { useLocale, useTranslations } from "next-intl";
import {
  closedDays,
  dayRangeLabel,
  formatPeriod,
  hoursRows,
  upcomingSpecialRows,
  type OpeningHours,
  type Translator,
} from "../lib/opening-hours";

export default function Location({ hours }: { hours: OpeningHours }) {
  const t = useTranslations("Location");
  const tHours = useTranslations("Hours") as Translator;
  const locale = useLocale();
  const closed = closedDays(hours);
  const special = upcomingSpecialRows(hours);

  // Dates "YYYY-MM-DD" lues en UTC pour ne pas glisser d'un jour ; majuscule
  // initiale comme les autres lignes du tableau (« Samedi 31 octobre »).
  const formatDay = (date: string, withWeekday = false) => {
    const label = new Intl.DateTimeFormat(locale, {
      weekday: withWeekday ? "long" : undefined,
      day: "numeric",
      month: "long",
      timeZone: "UTC",
    }).format(new Date(`${date}T00:00:00Z`));
    return label.charAt(0).toUpperCase() + label.slice(1);
  };

  return (
    <section className="section s-location" id="visit">
      <div className="wrap">
        <h2 className="display reveal">
          {t("titlePre")}
          <span className="accent" style={{ fontStyle: "italic" }}>
            {t("titleAccent")}
          </span>
          {t("titlePost")}
        </h2>

        <div className="loc-row" style={{ marginTop: 50 }}>
          <div className="loc-block reveal">
            <h3>{t("addressTitle")}</h3>
            <div className="lines" style={{ whiteSpace: "pre-line" }}>
              {t("addressLines")}
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
                href="https://maps.app.goo.gl/M96VNxVcr9pbNgHx9"
                target="_blank"
                rel="noopener noreferrer"
                style={{ borderBottom: "1px solid", paddingBottom: 2 }}
              >
                {t("openInMaps")}
              </a>
            </div>
          </div>

          <div className="loc-block reveal d1">
            <h3>{t("hoursTitle")}</h3>
            <table className="hours-table">
              <tbody>
                {closed.length > 0 && (
                  <tr className="closed">
                    <td>
                      {dayRangeLabel(closed, tHours)}
                      {closed.length === 1 && ` · ${tHours(`daysRo.${closed[0]}`)}`}
                    </td>
                    <td>{t("closed")}</td>
                  </tr>
                )}
                {hoursRows(hours).map((row) => (
                  <tr key={`${row.meal}-${row.days.join()}`}>
                    <td>
                      {dayRangeLabel(row.days, tHours)} · {t(row.meal)}
                    </td>
                    <td>{formatPeriod(row.period)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {special.length > 0 && (
              <>
                <h3 style={{ marginTop: 36 }}>{t("specialTitle")}</h3>
                <table className="hours-table">
                  <tbody>
                    {special.map((row) => (
                      <tr key={row.from} className={row.closed ? "closed" : undefined}>
                        <td>
                          {row.from === row.to
                            ? formatDay(row.from, true)
                            : `${formatDay(row.from)} — ${formatDay(row.to)}`}
                        </td>
                        <td>
                          {row.closed || !row.period
                            ? t("closed")
                            : formatPeriod(row.period)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
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
          <iframe
            src="https://www.google.com/maps?q=Ibrik+Kitchen,+9+rue+de+Mulhouse,+75002+Paris&output=embed"
            title={t("mapAlt")}
            width="100%"
            height="380"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
