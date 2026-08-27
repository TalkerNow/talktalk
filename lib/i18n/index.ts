import { en } from "./en";
import { fr, type Messages } from "./fr";

export type Locale = "fr" | "en";
export type { Messages };

export const STORAGE_KEY = "talker-lang";

export const dictionaries: Record<Locale, Messages> = { fr, en };

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "fr" || value === "en";
}
