/**
 * First-visit locale from Vercel geo (`x-vercel-ip-country`).
 *
 * FR, BE, CH, MC → fr
 * everywhere else, including EE, and when the header is missing → en
 *
 * Missing-header fallback is EN (not the previous implicit FR default) so
 * Estonian soft-launch reviewers and local/non-Vercel previews land on English.
 *
 * Manual switcher (`?lang=` / localStorage `talker-lang`) still wins and is
 * the only persistence — geo is not written until the visitor picks a language.
 */
export const DEFAULT_LOCALE = "en" as const;

export const VERCEL_IP_COUNTRY_HEADER = "x-vercel-ip-country";

export const FRENCH_DEFAULT_COUNTRIES = new Set(["FR", "BE", "CH", "MC"]);

export function localeFromCountry(
  country: string | null | undefined
): "fr" | "en" {
  if (!country) return DEFAULT_LOCALE;
  const code = country.trim().toUpperCase();
  if (FRENCH_DEFAULT_COUNTRIES.has(code)) return "fr";
  return DEFAULT_LOCALE;
}
