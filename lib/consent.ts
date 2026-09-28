export const GA_MEASUREMENT_ID = "G-ZCPSJ5XXD7";

export const CONSENT_STORAGE_KEY = "talker_consent";
export const CONSENT_COOKIE = "talker_consent";
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
export const CONSENT_EVENT = "talker-consent";
export const CONSENT_OPEN_EVENT = "talker-consent-open";

export type ConsentChoice = {
  necessary: true;
  analytics: boolean;
  updatedAt: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function parseChoice(raw: string | null): ConsentChoice | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as Partial<ConsentChoice>;
    if (typeof data.analytics !== "boolean") return null;
    return {
      necessary: true,
      analytics: data.analytics,
      updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : "",
    };
  } catch {
    return null;
  }
}

function readCookie(name: string) {
  const prefix = `${name}=`;
  for (const part of document.cookie.split("; ")) {
    if (part.startsWith(prefix)) {
      return decodeURIComponent(part.slice(prefix.length));
    }
  }
  return null;
}

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = parseChoice(window.localStorage.getItem(CONSENT_STORAGE_KEY));
    if (stored) return stored;
  } catch {
    // Storage can throw in private modes. Fall through to the cookie.
  }
  return parseChoice(readCookie(CONSENT_COOKIE));
}

export function writeConsent(analytics: boolean): ConsentChoice {
  const choice: ConsentChoice = {
    necessary: true,
    analytics,
    updatedAt: new Date().toISOString(),
  };
  const raw = JSON.stringify(choice);
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, raw);
  } catch {
    // Cookie below still persists the choice.
  }
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(raw)}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_EVENT, { detail: choice }));
  return choice;
}

export function setAnalyticsDisabled(disabled: boolean) {
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_MEASUREMENT_ID}`] = disabled;
}

let configured = false;
let lastConfigAt = 0;

function installGtag() {
  window.dataLayer = window.dataLayer || [];
  if (window.gtag) return;
  window.gtag = function gtag() {
    // The Google tag reads an Arguments object. A rest array is ignored.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
}

/** Queue a GA4 page view. The gtag script itself is mounted only after this runs. */
export function enableAnalytics() {
  setAnalyticsDisabled(false);
  installGtag();
  const now = Date.now();
  if (now - lastConfigAt < 800) return;
  lastConfigAt = now;
  if (!configured) {
    window.gtag?.("js", new Date());
    configured = true;
  }
  window.gtag?.("config", GA_MEASUREMENT_ID);
}

export function disableAnalytics() {
  setAnalyticsDisabled(true);
  lastConfigAt = 0;
}
