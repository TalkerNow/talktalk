import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr, type Messages } from "./fr";
import { it } from "./it";
import { nl } from "./nl";
import { pl } from "./pl";

export const locales = ["fr", "en", "de", "it", "es", "nl", "pl"] as const;
export type Locale = (typeof locales)[number];
export type { Messages };

export const STORAGE_KEY = "talker-lang";

export const localeInfo: Record<
  Locale,
  { label: string; htmlLang: string; bcp47: string }
> = {
  fr: { label: "Français", htmlLang: "fr", bcp47: "fr-FR" },
  en: { label: "English", htmlLang: "en", bcp47: "en-GB" },
  de: { label: "Deutsch", htmlLang: "de", bcp47: "de-DE" },
  it: { label: "Italiano", htmlLang: "it", bcp47: "it-IT" },
  es: { label: "Español", htmlLang: "es", bcp47: "es-ES" },
  nl: { label: "Nederlands", htmlLang: "nl", bcp47: "nl-NL" },
  pl: { label: "Polski", htmlLang: "pl", bcp47: "pl-PL" },
};

export const dictionaries: Record<Locale, Messages> = {
  fr,
  en,
  de,
  it,
  es,
  nl,
  pl,
};

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function resolveLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : "fr";
}
