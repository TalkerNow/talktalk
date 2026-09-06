"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LOCALE,
  dictionaries,
  isLocale,
  STORAGE_KEY,
  type Locale,
  type Messages,
} from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  t: Messages;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readQueryLocale() {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("lang");
}

function persistLocale(locale: Locale) {
  window.localStorage.setItem(STORAGE_KEY, locale);
  const url = new URL(window.location.href);
  url.searchParams.set("lang", locale);
  window.history.replaceState({}, "", url);
  document.documentElement.lang = locale;
}

export function LocaleProvider({
  children,
  defaultLocale = DEFAULT_LOCALE,
}: {
  children: React.ReactNode;
  defaultLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const fromQuery = readQueryLocale();
    if (isLocale(fromQuery)) {
      setLocaleState(fromQuery);
      persistLocale(fromQuery);
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) {
      setLocaleState(stored);
      persistLocale(stored);
      return;
    }
    setLocaleState(defaultLocale);
    document.documentElement.lang = defaultLocale;
  }, [defaultLocale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    persistLocale(next);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      t: dictionaries[locale],
      setLocale,
    }),
    [locale, setLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
