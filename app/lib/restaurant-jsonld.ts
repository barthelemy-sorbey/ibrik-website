/**
 * schema.org Restaurant node shared by the home page and /menus, so Google
 * and answer engines read the same name, address, hours and chef everywhere
 * (NAP consistency). Keep these facts in sync with the Location section.
 */
import { SITE_URL } from "./seo";

const BOOKING_URL = "https://bookings.zenchef.com/results?rid=352129&pid=1001";

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
    url: `${SITE_URL}/`,
    telephone: "+33170694250",
    email: "bureau@ibrik.fr",
    logo: `${SITE_URL}/brand/logo.png`,
    image: [
      `${SITE_URL}/brand/og-ibrik-kitchen.jpg`,
      `${SITE_URL}/brand/cathy.jpg`,
      `${SITE_URL}/brand/ibrik-hero-poster.jpg`,
    ],
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
    hasMap: "https://maps.app.goo.gl/M96VNxVcr9pbNgHx9",
    acceptsReservations: true,
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: BOOKING_URL,
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "FoodEstablishmentReservation", name: "Table" },
    },
    ...(hasMenu ? { hasMenu } : { hasMenu: `${SITE_URL}/menus` }),
    sameAs: [
      "https://www.instagram.com/ibrikparis",
      "https://www.facebook.com/ibrikkitchen",
    ],
  };
}
