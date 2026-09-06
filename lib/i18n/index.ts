import { en } from "./en";
import { fr, type Messages } from "./fr";

export type Locale = "fr" | "en";
export type { Messages };

export const STORAGE_KEY = "talker-lang";

export {
  DEFAULT_LOCALE,
  FRENCH_DEFAULT_COUNTRIES,
  VERCEL_IP_COUNTRY_HEADER,
  localeFromCountry,
} from "./geo";

export const dictionaries: Record<Locale, Messages> = { fr, en };

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "fr" || value === "en";
}
