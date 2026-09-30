import { createTranslator } from "next-intl";
import fr from "../../messages/fr.json";
import en from "../../messages/en.json";
import { FAQ_IDS } from "../lib/faq-data";
import {
  describeHours,
  type OpeningHours,
  type Translator,
} from "../lib/opening-hours";
import { getOpeningHours } from "../lib/sorbey";
import { MENU_PDF } from "../lib/menus-data";
import { SITE_URL, localizedUrl } from "../lib/seo";

/**
 * /llms.txt — plain facts for answer engines (https://llmstxt.org). Built from
 * the same messages as the site so the FAQ never drifts from what is rendered.
 * Keep NAP in sync with Location, Faq, Footer and restaurant-jsonld; hours come
 * from the Google listing via `getOpeningHours()`, re-read every hour.
 */
export const revalidate = 3600;

function translators(locale: "fr" | "en", hours: OpeningHours) {
  const messages = locale === "fr" ? fr : en;
  const tFaq = createTranslator({ locale, messages, namespace: "Faq" });
  const tHours = createTranslator({ locale, messages, namespace: "Hours" });
  const values = describeHours(hours, tHours as Translator, locale);
  const answer = (id: (typeof FAQ_IDS)[number]) => tFaq(`${id}.a`, values);
  return {
    hours: answer("hours"),
    faq: FAQ_IDS.map((id) => `### ${tFaq(`${id}.q`)}\n\n${answer(id)}`).join("\n\n"),
  };
}

const body = (hours: OpeningHours) => {
  const tFr = translators("fr", hours);
  const tEn = translators("en", hours);
  return `# IBRIK KITCHEN

> ${fr.Hero.blurb}
>
> ${en.Hero.blurb}

IBRIK KITCHEN est le restaurant, 9 rue de Mulhouse, Paris 2e ; IBRIK, le café de la même cheffe dans le 9e arrondissement, a fermé.
IBRIK KITCHEN is the restaurant, 9 rue de Mulhouse, Paris 2nd; IBRIK, the same chef's café in the 9th arrondissement, has closed.

## Informations pratiques · Key facts

- Nom · Name : IBRIK KITCHEN
- Cheffe · Chef : Cathy Paraschiv
- Adresse · Address : 9 rue de Mulhouse, 75002 Paris, France (Sentier)
- Métro : Sentier (3), Bonne Nouvelle (8, 9), Réaumur — Sébastopol (3, 4)
- Horaires : ${tFr.hours}
- Hours: ${tEn.hours}
- Téléphone · Phone : +33 1 70 69 42 50
- E-mail (réservations de groupe, événements · groups, events) : bureau@ibrik.fr
- Réserver · Book : https://bookings.zenchef.com/results?rid=352129&pid=1001
- Cuisine : des Balkans, roumaine d'abord · Balkan, Romanian first
- Instagram : https://www.instagram.com/ibrikparis
- Plan · Map : https://maps.app.goo.gl/M96VNxVcr9pbNgHx9

## Pages

- [Accueil](${localizedUrl("fr")}): le restaurant, la cheffe, la carte en bref, les événements, la réservation, la FAQ, l'accès.
- [La carte](${localizedUrl("fr", "/menus")}): les trois menus en HTML, avec les prix : midi en semaine, soir, samedi midi.
- [Home (English)](${localizedUrl("en")}): the restaurant, the chef, events, booking, FAQ, how to get there.
- [The menu (English)](${localizedUrl("en", "/menus")}): the three menus with prices: weekday lunch, dinner, Saturday lunch.

## Cartes en PDF · Menu PDFs

- [Midi · Lunch](${SITE_URL}${MENU_PDF.lunch})
- [Soir · Dinner](${SITE_URL}${MENU_PDF.dinner})
- [Samedi midi · Saturday lunch](${SITE_URL}${MENU_PDF.saturday})

## Questions fréquentes

${tFr.faq}

## Frequently asked questions

${tEn.faq}
`;
};

export async function GET() {
  return new Response(body(await getOpeningHours()), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
