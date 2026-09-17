/**
 * schema.org Restaurant node shared by the home page and /menus, so Google
 * and answer engines read the same name, address, hours and chef everywhere
 * (NAP consistency). Keep these facts in sync with the Location section.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ibrik.fr";

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function buildRestaurantJsonLd({
  description,
  hasMenu,
}: {
  description: string;
  hasMenu?: unknown[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#restaurant`,
    name: "IBRIK KITCHEN",
    description,
    url: SITE_URL,
    telephone: "+33170694250",
    image: `${SITE_URL}/brand/logo.png`,
    priceRange: "€€",
    servesCuisine: ["Balkan", "Romanian", "Eastern European", "Greek", "Turkish"],
    founder: {
      "@type": "Person",
      name: "Cathy Paraschiv",
      jobTitle: "Cheffe",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "9 rue de Mulhouse",
      postalCode: "75002",
      addressLocality: "Paris",
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.8686723,
      longitude: 2.3465837,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: WEEKDAYS,
        opens: "12:00",
        closes: "15:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: WEEKDAYS,
        opens: "19:00",
        closes: "00:30",
      },
    ],
    acceptsReservations: true,
    ...(hasMenu ? { hasMenu } : { hasMenu: `${SITE_URL}/menus` }),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      reviewCount: 990,
    },
    sameAs: [
      "https://www.instagram.com/ibrikparis",
      "https://www.facebook.com/ibrikkitchen",
    ],
  };
}
