import fr from "../../messages/fr.json";
import en from "../../messages/en.json";
import { FAQ_IDS } from "../lib/faq-data";
import { MENU_PDF } from "../lib/menus-data";
import { SITE_URL, localizedUrl } from "../lib/seo";

/**
 * /llms.txt — plain facts for answer engines (https://llmstxt.org). Built from
 * the same messages as the site so the FAQ never drifts from what is rendered.
 * Keep NAP and hours in sync with Location, Faq, Footer and restaurant-jsonld.
 */
export const dynamic = "force-static";

function faq(messages: typeof fr) {
  return FAQ_IDS.map((id) => {
    const { q, a } = messages.Faq[id];
    return `### ${q}\n\n${a}`;
  }).join("\n\n");
}

const body = `# IBRIK KITCHEN

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
- Horaires · Hours : lundi–samedi · Monday–Saturday, 12:00–15:30 et 19:00–00:30. Fermé le dimanche · Closed on Sundays.
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

${faq(fr)}

## Frequently asked questions

${faq(en)}
`;

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
