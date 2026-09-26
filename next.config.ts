import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Files in public/ are not fingerprinted: cache them for a month, and give a
// replaced photo or video a new file name so visitors pick it up at once.
const LONG_CACHE = "public, max-age=2592000, stale-while-revalidate=86400";

/**
 * Anciennes URL du site WordPress, indexées par Google depuis 2021 et encore
 * visibles dans les résultats de recherche après la bascule. Elles répondaient
 * en français : elles pointent donc vers `/fr`.
 *
 * Une redirection transmet au nouveau site l'ancienneté et les liens entrants
 * des anciennes pages, là où le 404 actuel les perd. Inventaire relevé dans
 * l'ancien `sitemap_index.xml` (Yoast) et dans les archives du domaine.
 *
 * Next normalise d'abord la barre oblique finale, puis applique ces règles :
 * `/presse/` devient `/presse`, qui suit la ligne correspondante.
 * `permanent: true` renvoie un 308, que Google traite comme un 301.
 */
const LEGACY_REDIRECTS: { source: string; destination: string }[] = [
  // Pages et articles
  { source: "/decouvrir-ibrik", destination: "/fr#about" },
  { source: "/ibrik-kitchen-restaurant-paris-2", destination: "/fr" },
  { source: "/ibrik-ma-cuisine-des-balkans", destination: "/fr#about" },
  { source: "/voyage-a-bucarest", destination: "/fr#about" },
  { source: "/nous-trouver", destination: "/fr#visit" },
  { source: "/presse", destination: "/fr#press" },
  { source: "/le-figaro-a-table-avec-la-creatrice-dibrik", destination: "/fr#press" },
  { source: "/hot-news", destination: "/fr#events" },
  { source: "/ibrik-delivery", destination: "/fr#visit" },
  // Le café du 9e a fermé : la FAQ l'explique et lève la confusion des deux adresses.
  { source: "/ibrik-cafe-coffee-paris-9", destination: "/fr#faq" },
  { source: "/credits", destination: "/fr" },
  { source: "/mentions-legales", destination: "/fr/legal" },
  { source: "/cgv", destination: "/fr" },

  // Boutique WooCommerce, fermée avec l'ancien site
  { source: "/boutique", destination: "/fr" },
  { source: "/bazar", destination: "/fr" },
  { source: "/mon-panier", destination: "/fr" },
  { source: "/mon-compte", destination: "/fr" },
  { source: "/valider-ma-commande", destination: "/fr" },
  { source: "/product/:slug*", destination: "/fr" },

  // Taxonomies WordPress (« Uncategorized » remonte encore dans les résultats)
  { source: "/category/:slug*", destination: "/fr" },
  { source: "/page_category/:slug*", destination: "/fr" },
  { source: "/author/:slug*", destination: "/fr" },
  { source: "/tag/:slug*", destination: "/fr" },

  // Médias : les PDF de cartes mènent à la carte, le reste à l'accueil.
  {
    source: "/wp-content/uploads/:year/:month/:file(.*[Mm][Ee][Nn][Uu].*)",
    destination: "/fr/menus",
  },
  { source: "/wp-content/:path*", destination: "/fr" },

  // Flux RSS et anciens sitemaps Yoast
  { source: "/feed", destination: "/fr" },
  { source: "/comments/feed", destination: "/fr" },
  { source: "/sitemap_index.xml", destination: "/sitemap.xml" },
  {
    source: "/:type(post|page|category|page_category|author)-sitemap.xml",
    destination: "/sitemap.xml",
  },
];

const nextConfig: NextConfig = {
  async redirects() {
    return LEGACY_REDIRECTS.map((rule) => ({ ...rule, permanent: true }));
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
