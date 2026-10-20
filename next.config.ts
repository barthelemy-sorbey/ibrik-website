import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Files in public/ are not fingerprinted: cache them for a month, and give a
// replaced photo or video a new file name so visitors pick it up at once.
const LONG_CACHE = "public, max-age=2592000, stale-while-revalidate=86400";

/**
 * Anciennes URL des sites précédents (Wix jusqu'en 2021, puis WordPress),
 * encore visibles dans les résultats de Google et de Bing après la bascule.
 * Elles répondaient en français, comme la racine du site aujourd'hui.
 *
 * Une redirection transmet au nouveau site l'ancienneté et les liens entrants
 * des anciennes pages, là où un 404 les perd. Inventaire relevé dans l'ancien
 * `sitemap_index.xml` (Yoast) et dans les archives du domaine (Wayback Machine) ;
 * la liste exacte des URL indexées est dans `app/lib/legacy-urls.ts`.
 *
 * Next normalise d'abord la barre oblique finale, puis applique ces règles :
 * `/presse/` devient `/presse`, qui suit la ligne correspondante.
 * `permanent: true` renvoie un 308, que Google traite comme un 301.
 */
const LEGACY_REDIRECTS: { source: string; destination: string }[] = [
  // Jusqu'en octobre 2026, le français vivait sous /fr et l'anglais à la racine.
  { source: "/fr", destination: "/" },
  { source: "/fr/:path*", destination: "/:path*" },

  // Pages et articles
  { source: "/decouvrir-ibrik", destination: "/#about" },
  { source: "/ibrik-kitchen-restaurant-paris-2", destination: "/" },
  { source: "/ibrik-ma-cuisine-des-balkans", destination: "/#about" },
  { source: "/voyage-a-bucarest", destination: "/#about" },
  { source: "/nous-trouver", destination: "/#visit" },
  { source: "/presse", destination: "/#press" },
  { source: "/le-figaro-a-table-avec-la-creatrice-dibrik", destination: "/#press" },
  { source: "/hot-news", destination: "/#events" },
  { source: "/ibrik-delivery", destination: "/#visit" },
  // Le café du 9e a fermé : la FAQ l'explique et lève la confusion des deux adresses.
  { source: "/ibrik-cafe-coffee-paris-9", destination: "/#faq" },
  { source: "/credits", destination: "/" },
  { source: "/mentions-legales", destination: "/legal" },
  { source: "/cgv", destination: "/" },

  // Boutique WooCommerce, fermée avec l'ancien site
  { source: "/boutique", destination: "/" },
  { source: "/bazar", destination: "/" },
  { source: "/mon-panier", destination: "/" },
  { source: "/mon-compte", destination: "/" },
  { source: "/valider-ma-commande", destination: "/" },
  { source: "/product/:slug*", destination: "/" },

  // Taxonomies WordPress (« Uncategorized » remonte encore dans les résultats)
  { source: "/category/:slug*", destination: "/" },
  { source: "/page_category/:slug*", destination: "/" },
  { source: "/author/:slug*", destination: "/" },
  { source: "/tag/:slug*", destination: "/" },

  // Médias : les PDF de cartes mènent à la carte, le reste à l'accueil.
  {
    source: "/wp-content/uploads/:year/:month/:file(.*[Mm][Ee][Nn][Uu].*)",
    destination: "/menus",
  },
  { source: "/wp-content/:path*", destination: "/" },

  // Site Wix (avant 2021) : pages et boutique en ligne
  { source: "/home", destination: "/" },
  { source: "/ibrik", destination: "/" },
  { source: "/ibrik-kitchen", destination: "/" },
  { source: "/nous", destination: "/#about" },
  { source: "/l-histoire-d-ibrik", destination: "/#about" },
  { source: "/contact", destination: "/#visit" },
  { source: "/menu-ibrik-kitchen-midi", destination: "/menus" },
  { source: "/copie-de-menu-ibrik-kitchen-midi", destination: "/menus" },
  { source: "/ibrik-coffee", destination: "/#faq" },
  { source: "/ibrik-deli", destination: "/" },
  { source: "/shop", destination: "/" },
  { source: "/cart-page", destination: "/" },
  { source: "/online-ordering", destination: "/" },
  { source: "/product-page/:slug*", destination: "/" },
  { source: "/product-category/:slug*", destination: "/" },

  // Cartes PDF datées du nouveau site, remplacées par des noms fixes
  { source: "/menus/ibrik-menu-midi-printemps-2026.pdf", destination: "/menus/ibrik-menu-midi.pdf" },
  { source: "/menus/ibrik-menu-soir-printemps-2026.pdf", destination: "/menus/ibrik-menu-soir.pdf" },
  {
    source: "/menus/ibrik-menu-samedi-midi-printemps-2026.pdf",
    destination: "/menus/ibrik-menu-samedi-midi.pdf",
  },

  // Flux RSS et anciens sitemaps Yoast
  { source: "/feed", destination: "/" },
  { source: "/comments/feed", destination: "/" },
  { source: "/sitemap_index.xml", destination: "/sitemap.xml" },
  {
    source: "/:type(post|page|category|page_category|author)-sitemap.xml",
    destination: "/sitemap.xml",
  },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // L'adresse de production Vercel sert le même site : tout renvoie au domaine.
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "ibrik-website.vercel.app" }],
        destination: "https://ibrik.fr/:path*",
        permanent: true,
      },
      ...LEGACY_REDIRECTS.map((rule) => ({ ...rule, permanent: true })),
    ];
  },
  async headers() {
    return [
      { source: "/brand/:path*", headers: [{ key: "Cache-Control", value: LONG_CACHE }] },
      { source: "/gallery/:path*", headers: [{ key: "Cache-Control", value: LONG_CACHE }] },
      {
        source: "/menus/:file(.*\\.pdf)",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
