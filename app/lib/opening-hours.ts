/**
 * Horaires d'IBRIK KITCHEN. La source de vérité est la fiche Google, relayée
 * par Sorbey (`app/lib/sorbey.ts`) ; FALLBACK_HOURS ne sert que si Sorbey ne
 * répond pas. Tout ce qui affiche des horaires (Location, Faq, JSON-LD,
 * llms.txt, sous-titres des cartes) passe par ce module : une seule vérité.
 */

export const WEEKDAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type Weekday = (typeof WEEKDAYS)[number];
export type Meal = "lunch" | "dinner";

/** Heures au format "HH:MM". Un service du soir peut fermer après minuit. */
export type Period = { opens: string; closes: string };

/** Un jour d'exception (fermeture, horaires de fête), date "YYYY-MM-DD". */
export type SpecialDay = { date: string; closed: boolean; period?: Period };

export type OpeningHours = {
  week: Record<Weekday, Period[]>;
  special: SpecialDay[];
};

const LUNCH: Period = { opens: "12:00", closes: "15:00" };
const DINNER: Period = { opens: "19:00", closes: "23:00" };

export const FALLBACK_HOURS: OpeningHours = {
  week: {
    monday: [LUNCH, DINNER],
    tuesday: [LUNCH, DINNER],
    wednesday: [LUNCH, DINNER],
    thursday: [LUNCH, DINNER],
    friday: [LUNCH, DINNER],
    saturday: [LUNCH, DINNER],
    sunday: [],
  },
  special: [],
};

/** Minimal translator shape, so helpers accept next-intl's `t` or `createTranslator`. */
export type Translator = (key: string, values?: Record<string, string>) => string;

export function mealOf(period: Period): Meal {
  return period.opens < "17:00" ? "lunch" : "dinner";
}

const periodKey = (p: Period) => `${p.opens}-${p.closes}`;
const dayKey = (periods: Period[]) => periods.map(periodKey).join("|");

/** Splits days (in week order) into runs of consecutive days. */
function dayRuns(days: Weekday[]): Weekday[][] {
  const runs: Weekday[][] = [];
  for (const day of days) {
    const run = runs.at(-1);
    const prev = run?.at(-1);
    if (run && prev && WEEKDAYS.indexOf(day) === WEEKDAYS.indexOf(prev) + 1) {
      run.push(day);
    } else {
      runs.push([day]);
    }
  }
  return runs;
}

/** Groups the days of the week by an arbitrary key, keeping week order. */
function groupDays<K>(keyOf: (day: Weekday) => K | null) {
  const groups = new Map<string, { key: K; days: Weekday[] }>();
  for (const day of WEEKDAYS) {
    const key = keyOf(day);
    if (key === null) continue;
    const id = JSON.stringify(key);
    const group = groups.get(id) ?? { key, days: [] };
    group.days.push(day);
    groups.set(id, group);
  }
  return [...groups.values()];
}

export const closedDays = (hours: OpeningHours) =>
  WEEKDAYS.filter((day) => hours.week[day].length === 0);

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** "Lundi — Samedi", "Lundi, Mercredi — Vendredi" : pour le tableau. */
export function dayRangeLabel(days: Weekday[], t: Translator) {
  return dayRuns(days)
    .map((run) => {
      const first = capitalize(t(`days.${run[0]}`));
      if (run.length === 1) return first;
      return `${first} — ${capitalize(t(`days.${run[run.length - 1]}`))}`;
    })
    .join(", ");
}

export const formatPeriod = (p: Period) => `${p.opens} — ${p.closes}`;

export type HoursRow = { days: Weekday[]; meal: Meal; period: Period };

/**
 * Une ligne par service et par plage horaire, déjeuners d'abord :
 * « Lundi — Samedi · Déjeuner | 12:00 — 15:00 ».
 */
export function hoursRows(hours: OpeningHours): HoursRow[] {
  return (["lunch", "dinner"] as const).flatMap((meal) =>
    groupDays((day) => {
      const period = hours.week[day].find((p) => mealOf(p) === meal);
      return period ?? null;
    }).map(({ key, days }) => ({ days, meal, period: key })),
  );
}

/** Horaires d'un service un jour donné, pour les sous-titres des cartes. */
export function serviceHours(hours: OpeningHours, day: Weekday, meal: Meal) {
  const find = (h: OpeningHours) =>
    h.week[day].find((p) => mealOf(p) === meal);
  return formatPeriod(find(hours) ?? find(FALLBACK_HOURS)!);
}

/**
 * Valeurs `{open}` et `{closed}` de la réponse FAQ `Faq.hours.a` :
 * « du lundi au samedi : déjeuner de 12h00 à 15h00, dîner de 19h00 à 23h00 ».
 * `t` est le traducteur du namespace `Hours`.
 */
export function describeHours(hours: OpeningHours, t: Translator, locale: string) {
  const list = new Intl.ListFormat(locale, { type: "conjunction" });
  const time = (hhmm: string) => {
    const [h, m] = hhmm.split(":");
    return t("time", { h, m });
  };

  const open = groupDays((day) => {
    const periods = hours.week[day];
    return periods.length ? dayKey(periods) : null;
  })
    .map(({ days }) => {
      const dayPhrase = list.format(
        dayRuns(days).map((run) =>
          run.length === 1
            ? t("single", { day: t(`days.${run[0]}`) })
            : t("range", {
                from: t(`days.${run[0]}`),
                to: t(`days.${run[run.length - 1]}`),
              }),
        ),
      );
      const services = hours.week[days[0]]
        .map((p) =>
          t("service", {
            meal: t(mealOf(p)),
            opens: time(p.opens),
            closes: time(p.closes),
          }),
        )
        .join(", ");
      return t("group", { days: dayPhrase, services });
    })
    .join(t("groupSeparator"));

  const closed = closedDays(hours);
  return {
    open,
    closed: closed.length
      ? list.format(closed.map((day) => t("closedDay", { day: t(`days.${day}`) })))
      : "none",
  };
}

/** Date du jour à Paris, "YYYY-MM-DD". */
function todayInParis() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(
    new Date(),
  );
}

function addDays(date: string, n: number) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export type SpecialRow = { from: string; to: string; closed: boolean; period?: Period };

/**
 * Jours d'exception des `withinDays` prochains jours, les jours consécutifs au
 * même régime réunis en une ligne (« 3 août — 24 août · Fermé »).
 */
export function upcomingSpecialRows(hours: OpeningHours, withinDays = 60): SpecialRow[] {
  const today = todayInParis();
  const horizon = addDays(today, withinDays);
  const rows: SpecialRow[] = [];
  for (const day of [...hours.special].sort((a, b) => a.date.localeCompare(b.date))) {
    if (day.date < today || day.date > horizon) continue;
    const last = rows.at(-1);
    const sameRegime =
      last?.closed === day.closed &&
      (day.closed || periodKey(day.period!) === periodKey(last.period!));
    if (last && sameRegime && addDays(last.to, 1) === day.date) {
      last.to = day.date;
    } else {
      rows.push({ from: day.date, to: day.date, closed: day.closed, period: day.period });
    }
  }
  return rows;
}

const SCHEMA_DAYS: Record<Weekday, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

/** `openingHoursSpecification` et `specialOpeningHoursSpecification` schema.org. */
export function hoursJsonLd(hours: OpeningHours) {
  const byPeriod = new Map<string, { period: Period; days: Weekday[] }>();
  for (const day of WEEKDAYS) {
    for (const period of hours.week[day]) {
      const entry = byPeriod.get(periodKey(period)) ?? { period, days: [] };
      entry.days.push(day);
      byPeriod.set(periodKey(period), entry);
    }
  }

  const today = todayInParis();
  const special = hours.special.filter((d) => d.date >= today);

  return {
    openingHoursSpecification: [...byPeriod.values()].map(({ period, days }) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: days.map((d) => SCHEMA_DAYS[d]),
      opens: period.opens,
      closes: period.closes,
    })),
    ...(special.length && {
      // Google lit une fermeture comme opens = closes = "00:00".
      specialOpeningHoursSpecification: special.map((d) => ({
        "@type": "OpeningHoursSpecification",
        validFrom: d.date,
        validThrough: d.date,
        opens: d.closed || !d.period ? "00:00" : d.period.opens,
        closes: d.closed || !d.period ? "00:00" : d.period.closes,
      })),
    }),
  };
}
