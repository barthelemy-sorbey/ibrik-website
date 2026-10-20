@AGENTS.md

# IBRIK KITCHEN — site vitrine

Site du restaurant **IBRIK KITCHEN**, cuisine des Balkans de la cheffe Cathy
Paraschiv, 9 rue de Mulhouse, 75002 Paris (Sentier). Production : https://ibrik.fr (domaine apex ; `www` redirige en 301 via OVH, HTTP seulement).

## Contexte métier

- **Deux adresses à ne jamais confondre** : IBRIK KITCHEN (restaurant, Paris 2e)
  et IBRIK (café, Paris 9e). Ce site est celui du restaurant.
- Ouverture le 1er décembre 2018, jour de la fête nationale roumaine.
- Ouvert du lundi au samedi, 12:00–15:30 et 19:00–00:00. Fermé le dimanche.
  **La fiche Google fait foi** : le site lit horaires, jours d'exception et avis
  via le back-end Sorbey (`app/lib/sorbey.ts`, requêtes Convex publiques,
  relues toutes les heures). Pour changer un horaire, on change la fiche Google,
  pas le code. `FALLBACK_HOURS` ne sert que si Sorbey ne répond pas.
- Téléphone +33 1 70 69 42 50 · réservations via Zenchef (rid `352129`) ·
  événements : bureau@ibrik.fr.
- Ces faits (NAP) doivent rester identiques partout : `Location`, `Faq`,
  `MobileMenu`, `Footer`, `app/lib/restaurant-jsonld.ts`. Les horaires passent
  tous par `app/lib/opening-hours.ts` : ne jamais les réécrire en dur.

## Écrire pour IBRIK — obligatoire

Toute modification de texte (messages, metadata, alt, JSON-LD) suit
**`docs/charte-verbale.md`**. L'essentiel :

- `IBRIK KITCHEN` toujours en capitales. Français d'abord, anglais en miroir.
- Voix chaleureuse, enracinée, libre, littéraire et sobre, sensorielle. Phrases
  courtes et concrètes. Dire vrai avant de dire beau.
- Proscrits : vocabulaire marketing (incontournable, expérience unique…),
  superlatifs, clichés « pays de l'Est », exclamations, émoticônes,
  « authentique », « fusion », « concept ».
- Plats : *sarmale* (pluriel), *mici*, *mamaliga*, *papanasi* — en `<em>` dans
  les messages rich text. Les noms imprimés sur la carte (`MenusPage.*.items`)
  suivent les PDF.
- Le manifeste (About `p1`) se cite tel quel, sans reformulation.
- SEO : un seul `<h1>` par page contenant le mot-clé (accueil : le `<h1>` est
  `Hero.meta`) ; H2 descriptifs ; alt localisés « … IBRIK KITCHEN, Paris 2e ».
  Titles/metas de référence dans la charte, section 9.

## Stack

- Next.js 16 (App Router) + React 19, TypeScript. **Lire `node_modules/next/dist/docs/`
  avant d'écrire du code Next** — l'API diffère de la mémoire du modèle
  (ex. `proxy.ts` remplace `middleware.ts`, `PageProps<"/[locale]">` / `LayoutProps` globaux).
- i18n : `next-intl` 4. Locales `fr` (défaut, sans préfixe) et `en` (`/en`) —
  voir `i18n/routing.ts`. Jusqu'en octobre 2026 c'était l'inverse : `/fr/*`
  redirige en 308 vers la racine. Textes dans `messages/{fr,en}.json` : **toujours
  modifier les deux fichiers avec les mêmes clés**.
- Styles : un seul `app/globals.css` (pas de Tailwind). Polices locales
  Antwerp + Formula Condensed, DM Mono via `next/font/google`.
- Pas de tests. Vérifier avec `npm run lint` et `npm run build`.

## Carte du code

```
app/
  [locale]/layout.tsx        metadata (Metadata.title/description), polices, SDK Zenchef
  [locale]/page.tsx          accueil : sections + JSON-LD FAQPage & Restaurant
  [locale]/menus/page.tsx    /menus : metadata, JSON-LD Restaurant+Menu, Breadcrumb
  [locale]/not-found.tsx, error.tsx, global-error.tsx  → OopsScreen
  components/                une section = un composant = un namespace de messages
    Hero (H1) · About · Menu (extrait carte) · Press · Reviews (avis Google)
    Events · Reserve
    CrystalBall · Video · Faq · Location · Footer · Nav/MobileMenu
    Gallery (construit mais masqué, cf. commentaire dans page.tsx)
    MenusContent             rendu HTML complet des trois cartes
  lib/menus-data.ts          structure et prix des cartes (textes dans MenusPage.*)
  lib/faq-data.ts            ids FAQ → accordéon + JSON-LD FAQPage
  lib/restaurant-jsonld.ts   nœud schema.org Restaurant partagé, SITE_URL
  lib/sorbey.ts              fiche Google via Sorbey : horaires, avis 4-5★
  lib/legacy-urls.ts         anciennes URL indexées → sitemap-legacy.xml (temporaire)
  lib/opening-hours.ts       horaires → tableau, phrase FAQ, JSON-LD, cartes
  sitemap.ts, robots.ts, sitemap-legacy.xml/, llms.txt/
next.config.ts               redirections des anciens sites (Wix, WordPress)
public/menus/*.pdf           PDF des cartes, auto-hébergés, noms fixes
scripts/indexnow.mjs         signale les URL à Bing (npm run indexnow)
docs/charte-verbale.md       éléments de langage (voix, lexique, SEO)
```

## Recettes courantes

- **Changer un plat ou un prix** : prix/tags dans `app/lib/menus-data.ts`,
  nom/description dans `MenusPage.<menu>.items.<id>` des deux JSON. Si la
  carte imprimée change, remplacer le PDF de `public/menus/` **sous le même
  nom** (pas de saison ni de date dans le nom : une ancienne carte ne doit
  jamais rester en ligne à côté de la nouvelle).
- **Après un changement d'URL** (page ajoutée, renommée, redirigée) : déployer,
  puis `npm run indexnow` pour que Bing — donc ChatGPT — recrawle tout de suite.
- **Ajouter une question FAQ** : ajouter l'id dans `FAQ_IDS`, puis `Faq.<id>.q/a`
  en FR et EN. Réponses factuelles, autonomes (lisibles hors contexte par une IA).
- **Nouvelle section** : composant dans `app/components`, namespace de messages
  du même nom, H2 descriptif porteur de mot-clé.
- Commits au format `[content] …` / `[feature] …`, message en français.
