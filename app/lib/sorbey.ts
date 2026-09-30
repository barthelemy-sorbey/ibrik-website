/**
 * Fiche Google d'IBRIK KITCHEN, lue via le back-end Sorbey (Convex), qui la
 * synchronise déjà : horaires, jours d'exception, avis et réponses de la
 * maison. Requêtes publiques, sans clé ni client Google de notre côté.
 *
 * Chaque réponse est mise en cache une heure (ISR). Si Sorbey ne répond pas,
 * le site retombe sur FALLBACK_HOURS et masque la section des avis.
 */
import {
  FALLBACK_HOURS,
  WEEKDAYS,
  type OpeningHours,
  type Period,
  type SpecialDay,
} from "./opening-hours";

const SORBEY_URL = "https://accurate-firefly-632.convex.cloud";
const LOCATION_SLUG = "ibrik-kitchen";
const LOCATION_ID = "js72jjg8bw8ks1k8mc1jzn1wfd8e52vn";

/** Secondes. Les pages qui lisent Sorbey exportent la même valeur en `revalidate`. */
const REVALIDATE = 3600;

async function sorbeyQuery<T>(path: string, args: Record<string, unknown>): Promise<T | null> {
  try {
    const res = await fetch(`${SORBEY_URL}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, args, format: "json" }),
      next: { revalidate: REVALIDATE, tags: ["sorbey"] },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.status !== "success") throw new Error(data.errorMessage);
    return data.value as T;
  } catch (error) {
    console.error(`[sorbey] ${path} failed:`, error);
    return null;
  }
}

type SorbeyPeriod = { openTime: string; closeTime: string };
type SorbeyDay =
  | { periods: SorbeyPeriod[] }
  | { openTime: string; closeTime: string; isClosed: boolean };

type SorbeyLocation = {
  aggregateRating?: number;
  reviewCount?: number;
  regularHours?: Partial<Record<string, SorbeyDay>>;
  specialHours?: {
    date: string;
    isClosed: boolean;
    openTime?: string;
    closeTime?: string;
  }[];
};

const getLocation = () =>
  sorbeyQuery<SorbeyLocation>("locations:getPublicBySlug", { slug: LOCATION_SLUG });

const toPeriod = (p: SorbeyPeriod): Period => ({ opens: p.openTime, closes: p.closeTime });

function dayPeriods(day: SorbeyDay | undefined): Period[] {
  if (!day) return [];
  if ("periods" in day) return day.periods.map(toPeriod);
  return day.isClosed ? [] : [toPeriod(day)];
}

export async function getOpeningHours(): Promise<OpeningHours> {
  const location = await getLocation();
  const regular = location?.regularHours;
  if (!regular) return FALLBACK_HOURS;

  const week = Object.fromEntries(
    WEEKDAYS.map((day) => [day, dayPeriods(regular[day])]),
  ) as OpeningHours["week"];
  // Une semaine sans aucun service est une fiche mal lue, pas un restaurant fermé.
  if (WEEKDAYS.every((day) => week[day].length === 0)) return FALLBACK_HOURS;

  const special = (location.specialHours ?? []).flatMap((d): SpecialDay[] => {
    if (d.isClosed) return [{ date: d.date, closed: true }];
    if (!d.openTime || !d.closeTime) return [];
    return [{ date: d.date, closed: false, period: { opens: d.openTime, closes: d.closeTime } }];
  });

  return { week, special };
}

type SorbeyReview = {
  authorName: string;
  rating: number;
  text?: string;
  publishedAt: number;
  googleOwnerReplyText?: string;
};

export type Review = {
  author: string;
  rating: number;
  text: string;
  publishedAt: number;
  reply?: string;
};

export type ReviewsData = {
  reviews: Review[];
  rating?: number;
  count?: number;
};

const TRANSLATED = "(Translated by Google)";
const ORIGINAL = "(Original)";

/**
 * Google colle sa traduction au texte : « (Translated by Google) … (Original) … ».
 * On ne garde que les mots de l'auteur, dans sa langue.
 */
export function originalText(text: string) {
  const translated = text.indexOf(TRANSLATED);
  if (translated === -1) return text.trim();
  const original = text.indexOf(ORIGINAL);
  if (original !== -1) return text.slice(original + ORIGINAL.length).trim();
  // Texte d'origine d'abord, traduction ensuite.
  return text.slice(0, translated).trim() || text.slice(translated + TRANSLATED.length).trim();
}

/** « CAROLINE CORMIER » → « Caroline C. » : un prénom, une initiale. */
function shortName(name: string) {
  const [first, ...rest] = name.trim().split(/\s+/);
  const firstName =
    first === first.toUpperCase()
      ? first.charAt(0) + first.slice(1).toLowerCase()
      : first;
  const last = rest.at(-1);
  return last ? `${firstName} ${last.charAt(0).toUpperCase()}.` : firstName;
}

/** Derniers avis 4 et 5 étoiles avec un texte, et leur réponse. */
export async function getReviews(count = 3): Promise<ReviewsData> {
  const [location, raw] = await Promise.all([
    getLocation(),
    sorbeyQuery<SorbeyReview[]>("reviews:getPublicByLocation", {
      locationId: LOCATION_ID,
      limit: 50,
    }),
  ]);

  const reviews = (raw ?? [])
    .filter((r) => r.rating >= 4 && r.text && originalText(r.text))
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .slice(0, count)
    .map((r) => ({
      author: shortName(r.authorName),
      rating: r.rating,
      text: originalText(r.text!),
      publishedAt: r.publishedAt,
      reply: r.googleOwnerReplyText
        ? originalText(r.googleOwnerReplyText)
        : undefined,
    }));

  return {
    reviews,
    rating: location?.aggregateRating,
    count: location?.reviewCount,
  };
}
