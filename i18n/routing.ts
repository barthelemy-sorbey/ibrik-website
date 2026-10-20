import { defineRouting } from "next-intl/routing";

// Le français à la racine : la fiche Google pointe sur https://ibrik.fr/, et
// cette adresse a toujours servi le site en français. L'anglais vit sous /en.
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
