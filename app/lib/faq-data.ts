/**
 * Question ids for the home-page FAQ. The same list drives the rendered
 * accordion and the FAQPage JSON-LD, so answers stay in sync with what
 * search engines and answer engines read.
 */
export const FAQ_IDS = [
  "where",
  "hours",
  "cuisine",
  "booking",
  "lunchDeals",
  "vegetarian",
  "budget",
  "groups",
  "chef",
  "order",
] as const;

export type FaqId = (typeof FAQ_IDS)[number];
