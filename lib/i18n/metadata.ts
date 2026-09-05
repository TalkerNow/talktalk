import type { Metadata } from "next";
import { dictionaries, resolveLocale, type Locale, type Messages } from "./index";

export type MetaPage = keyof Messages["meta"];

const pageKeys = {
  home: { title: "homeTitle", description: "homeDescription" },
  produit: { title: "produitTitle", description: "produitDescription" },
  faq: { title: "faqTitle", description: "faqDescription" },
  contact: { title: "contactTitle", description: "contactDescription" },
  installer: { title: "installerTitle", description: "installerDescription" },
} as const;

export function localeFromSearchParams(
  searchParams: { lang?: string | string[] } | undefined,
): Locale {
  const raw = searchParams?.lang;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return resolveLocale(value);
}

export function localePageMetadata(locale: Locale, page: keyof typeof pageKeys): Metadata {
  const t = dictionaries[locale].meta;
  const keys = pageKeys[page];
  const title = t[keys.title];
  const description = t[keys.description];
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description },
  };
}

export async function metadataForPage(
  searchParams: Promise<{ lang?: string | string[] }> | { lang?: string | string[] },
  page: keyof typeof pageKeys,
): Promise<Metadata> {
  const params = await searchParams;
  return localePageMetadata(localeFromSearchParams(params), page);
}
