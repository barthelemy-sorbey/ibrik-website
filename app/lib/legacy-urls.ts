/**
 * URL des anciens sites encore connues de Google et de Bing, relevées dans les
 * archives du domaine (Wayback Machine, octobre 2026). Toutes redirigent vers
 * le site actuel (`LEGACY_REDIRECTS`, dans `next.config.ts`).
 *
 * Elles alimentent `/sitemap-legacy.xml`, un sitemap temporaire : il pousse
 * les moteurs à recrawler ces adresses, donc à voir les redirections et à
 * retirer les anciennes pages et cartes PDF de leurs résultats. À supprimer,
 * avec sa ligne dans `robots.ts`, quand la Search Console et Bing Webmaster
 * Tools ne les montrent plus comme indexées (courant 2027).
 *
 * Les chemins sont écrits tels qu'ils ont été indexés, barre oblique finale
 * comprise.
 */
export const LEGACY_URLS: string[] = [
  // Site actuel, avant le passage du français à la racine (octobre 2026)
  "/fr",
  "/fr/menus",
  "/fr/legal",
  "/menus/ibrik-menu-midi-printemps-2026.pdf",
  "/menus/ibrik-menu-soir-printemps-2026.pdf",
  "/menus/ibrik-menu-samedi-midi-printemps-2026.pdf",

  // WordPress (2021-2026) : pages, boutique, taxonomies
  "/author/brunodmdm/",
  "/bazar/",
  "/boutique/",
  "/category/uncategorized/",
  "/cgv",
  "/credits",
  "/decouvrir-ibrik/",
  "/hot-news",
  "/ibrik-cafe-coffee-paris-9/",
  "/ibrik-delivery/",
  "/ibrik-kitchen-restaurant-paris-2/",
  "/ibrik-ma-cuisine-des-balkans/",
  "/le-figaro-a-table-avec-la-creatrice-dibrik/",
  "/mentions-legales",
  "/nous-trouver",
  "/page_category/restaurants/",
  "/presse/",
  "/product/ibrik-ma-cuisine-des-balkans/",
  "/product/le-tee-shirt-de-paques-ibrik-x-rocio-egio/",
  "/voyage-a-bucarest/",

  // WordPress : cartes et articles de presse en PDF
  "/wp-content/uploads/2021/05/2019-02-07-www.elle_.fr_.pdf",
  "/wp-content/uploads/2021/05/2019-05-23-LE-FIGAROSCOPE.pdf",
  "/wp-content/uploads/2021/06/Menu-IBRIK-DELI.pdf",
  "/wp-content/uploads/2021/06/MENU-KITCHEN-JUIN-.pdf",
  "/wp-content/uploads/2021/08/Menu-IBRIK-DELI-v6-renverse.pdf",
  "/wp-content/uploads/2021/08/MENU-MIDI-AOUT-2021.pdf",
  "/wp-content/uploads/2021/09/MENU-OCTOBRE.pdf",
  "/wp-content/uploads/2022/01/MENU-IBRIK-SOIR-ET-MIDI-2022.pdf",
  "/wp-content/uploads/2022/01/MenuIbrikcafe.pdf",
  "/wp-content/uploads/2022/09/MENUS-SOIR-ET-MIDI-SEPTEMBRE-22.pdf",
  "/wp-content/uploads/2022/10/MENU-OCT-22-PDF-SITE-.pdf",
  "/wp-content/uploads/2023/04/MENU-CAFE-FEV-2022.pdf",
  "/wp-content/uploads/2023/05/MENU-SS-2023.pdf",
  "/wp-content/uploads/2023/11/MENU-SOIR-MIDI-Novembre-2023.pdf",
  "/wp-content/uploads/2024/06/MENU-IBRIK-CAFE-JUIN-2024.pdf",
  "/wp-content/uploads/2024/08/MENU-IBRIK-KITCHEN-JUIN-2024-.pdf",
  "/wp-content/uploads/2024/08/MENU-INTERNET.pdf",
  "/wp-content/uploads/2024/11/MENU-AUTOMNE-INTERNET-.pdf",
  "/wp-content/uploads/2025/03/Menus-midisoir-Printemps-2025.pdf",
  "/wp-content/uploads/2026/03/MENU-IBRIK-MIDI-ET-SOIR.pdf",
  "/wp-content/uploads/2026/04/MENU-PRINTEMPS-2026-IBRIK.pdf",

  // Wix (avant 2021) : pages et boutique en ligne
  "/cart-page",
  "/contact",
  "/copie-de-menu-ibrik-kitchen-midi",
  "/home",
  "/ibrik",
  "/ibrik-coffee",
  "/ibrik-deli/",
  "/ibrik-kitchen",
  "/l-histoire-d-ibrik",
  "/menu-ibrik-kitchen-midi",
  "/nous",
  "/online-ordering",
  "/product-category/uncategorized/",
  "/shop",
  "/product-page/bamia",
  "/product-page/commande-fran%C3%A7ois-lecocq",
  "/product-page/copie-de-sarmale",
  "/product-page/copie-de-vin2",
  "/product-page/f%C3%A9ta-200",
  "/product-page/goulash",
  "/product-page/granola",
  "/product-page/ibrik-le-livre",
  "/product-page/le-tee-shirt-de-p%C3%A2ques-ibrik-x-rocio",
  "/product-page/pain-pita",
  "/product-page/panier-bamia",
  "/product-page/panier-goulash",
  "/product-page/panier-sarma",
  "/product-page/pickels-oignois-rouge",
  "/product-page/polenta",
  "/product-page/pr%C3%A9paration-pour-moelleux-pistaches-et-roses",
  "/product-page/viile-metamorphosis-pinot-noir-roumanie-rouge-bio",
  "/product-page/vin-1",
  "/product-page/vin3",
];
