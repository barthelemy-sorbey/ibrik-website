import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../../i18n/routing";

// Unmatched URLs are rewritten into the [locale] segment by the proxy, so this
// catch-all is what surfaces the localised not-found.tsx above.
export default async function CatchAllPage({
  params,
}: PageProps<"/[locale]/[...rest]">) {
  const { locale } = await params;
  if (hasLocale(routing.locales, locale)) setRequestLocale(locale);
  notFound();
}
