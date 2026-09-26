import { useTranslations } from "next-intl";
import { COUNTRIES, DANUBE, LAKES } from "../lib/wine-map-geo";
import {
  MAP_H,
  MAP_LABELS,
  MAP_W,
  SCALE_KM,
  SCALE_LEN,
  START_STOP,
  WINE_ROUTES,
  project,
} from "../lib/wine-routes";

export default function Events() {
  const t = useTranslations("Events");

  return (
    <section className="section s-events" id="events">
      <div className="pattern-strip top" aria-hidden="true" />
      <div className="wrap">
        <div className="events-row">
          <h2 className="display reveal">
            <span style={{ whiteSpace: "pre-line" }}>{t("titlePre")}</span>
            <span className="accent">{t("titleAccent")}</span>
          </h2>
          <div className="body reveal d1">
            <p>{t.rich("p1", { i: (c) => <i>{c}</i> })}</p>
            <p>{t("p2")}</p>
          </div>
        </div>

        <article className="wine-card reveal">
          <header className="wine-card__head">
            <div>
              <span className="eyebrow">{t("wine.eyebrow")}</span>
              <h3>{t("wine.title")}</h3>
              <p>{t("wine.intro")}</p>
            </div>
            <p className="wine-card__legend">{t("wine.legend")}</p>
          </header>

          <figure className="wine-map">
            <svg
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              role="img"
              aria-label={t("wine.map.alt")}
            >
              <rect width={MAP_W} height={MAP_H} className="wine-map__sea" />
              {COUNTRIES.map((c) => (
                <path
                  key={c.id}
                  d={c.d}
                  className={c.focus ? "wine-map__land is-focus" : "wine-map__land"}
                />
              ))}
              {LAKES.map((d, i) => (
                <path key={i} d={d} className="wine-map__lake" />
              ))}
              {DANUBE.map((d, i) => (
                <path key={i} d={d} className="wine-map__river" />
              ))}

              {MAP_LABELS.map((l) => {
                const [x, y] = project(l.lat, l.lon);
                return (
                  <text
                    key={l.key}
                    x={x}
                    y={y}
                    transform={
                      l.rotate ? `rotate(${l.rotate} ${x} ${y})` : undefined
                    }
                    className={`wine-map__label ${l.kind
                      .split(" ")
                      .map((k) => `is-${k}`)
                      .join(" ")}`}
                  >
                    {t(`wine.map.${l.key}`)}
                  </text>
                );
              })}

              {WINE_ROUTES.map((r) => (
                <g key={r.id} className={`wine-route is-${r.id}`}>
                  <polyline
                    className="wine-route__path"
                    points={r.stops
                      .map((s) => project(s.lat, s.lon).join(","))
                      .join(" ")}
                  />
                  {r.stops.map((s) => {
                    const [x, y] = project(s.lat, s.lon);
                    const [dx, dy, anchor] = s.label;
                    return (
                      <g key={s.n} transform={`translate(${x} ${y})`}>
                        {s.n === START_STOP && (
                          <circle r="24" className="wine-route__start" />
                        )}
                        <line
                          x1={dx * 0.3}
                          y1={dy * 0.3}
                          x2={dx * 0.8}
                          y2={dy * 0.8}
                          className="wine-route__leader"
                        />
                        <text
                          x={dx}
                          y={dy + (dy < 0 ? 0 : 5)}
                          textAnchor={anchor}
                          className="wine-route__place"
                        >
                          {t(`wine.stops.${s.n}.short`)}
                        </text>
                        <circle r="13" className="wine-route__dot" />
                        <text dy="0.36em" className="wine-route__n">
                          {s.n}
                        </text>
                      </g>
                    );
                  })}
                </g>
              ))}

              <g
                className="wine-map__compass"
                transform={`translate(${MAP_W - 40} 34)`}
              >
                <text y="0">N</text>
                <line x1="0" y1="10" x2="0" y2="44" />
                <path d="M-5 18 0 8 5 18" />
              </g>
              <g
                className="wine-map__scale"
                transform={`translate(28 ${MAP_H - 30})`}
              >
                <line x1="0" y1="0" x2={SCALE_LEN} y2="0" />
                <line x1="0" y1="-5" x2="0" y2="5" />
                <line x1={SCALE_LEN} y1="-5" x2={SCALE_LEN} y2="5" />
                <text x="0" y="20">0</text>
                <text x={SCALE_LEN} y="20" textAnchor="end">
                  {t("wine.map.scale", { km: SCALE_KM })}
                </text>
              </g>
            </svg>
            <figcaption>{t("wine.map.caption")}</figcaption>
          </figure>

          <div className="wine-routes">
            {WINE_ROUTES.map((r) => (
              <section key={r.id} className={`wine-route-list is-${r.id}`}>
                <h4>{t(`wine.routes.${r.id}.name`)}</h4>
                <p className="wine-route-list__note">
                  {t(`wine.routes.${r.id}.note`)}
                </p>
                <ol>
                  {r.stops.map((s) => (
                    <li key={s.n} value={s.n}>
                      <span className="wine-stop__n" aria-hidden="true">
                        {s.n}
                      </span>
                      <div>
                        <strong>{t(`wine.stops.${s.n}.place`)}</strong>
                        <span>{t(`wine.stops.${s.n}.note`)}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>

          <footer className="wine-card__foot">
            <div>
              <h4>{t("wine.startTitle")}</h4>
              <p>{t.rich("wine.startBody", { b: (c) => <b>{c}</b> })}</p>
            </div>
            <div>
              <h4>{t("wine.tasteTitle")}</h4>
              <p>{t("wine.tasteBody")}</p>
            </div>
          </footer>
        </article>
      </div>
      <div className="pattern-strip bottom" aria-hidden="true" />
    </section>
  );
}
