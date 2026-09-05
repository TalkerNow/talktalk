import type { Locale } from "@/lib/i18n";

type FlagProps = { className?: string };

export function FlagFR({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden preserveAspectRatio="none">
      <rect width="1" height="2" fill="#002395" />
      <rect x="1" width="1" height="2" fill="#FFFFFF" />
      <rect x="2" width="1" height="2" fill="#ED2939" />
    </svg>
  );
}

export function FlagUK({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden preserveAspectRatio="none">
      <rect width="3" height="2" fill="#012169" />
      <path d="M0,0 L3,2 M3,0 L0,2" stroke="#FFFFFF" strokeWidth="0.36" />
      <path d="M0,0 L3,2 M3,0 L0,2" stroke="#C8102E" strokeWidth="0.12" />
      <path d="M1.5,0 V2 M0,1 H3" stroke="#FFFFFF" strokeWidth="0.6" />
      <path d="M1.5,0 V2 M0,1 H3" stroke="#C8102E" strokeWidth="0.36" />
    </svg>
  );
}

export function FlagDE({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 5 3" className={className} aria-hidden preserveAspectRatio="none">
      <rect width="5" height="1" fill="#000000" />
      <rect y="1" width="5" height="1" fill="#DD0000" />
      <rect y="2" width="5" height="1" fill="#FFCE00" />
    </svg>
  );
}

export function FlagIT({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden preserveAspectRatio="none">
      <rect width="1" height="2" fill="#009246" />
      <rect x="1" width="1" height="2" fill="#FFFFFF" />
      <rect x="2" width="1" height="2" fill="#CE2B37" />
    </svg>
  );
}

export function FlagES({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden preserveAspectRatio="none">
      <rect width="3" height="2" fill="#C60B1E" />
      <rect y="0.5" width="3" height="1" fill="#FFC400" />
    </svg>
  );
}

export function FlagNL({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden preserveAspectRatio="none">
      <rect width="3" height="2" fill="#21468B" />
      <rect width="3" height="0.67" fill="#AE1C28" />
      <rect y="0.67" width="3" height="0.66" fill="#FFFFFF" />
    </svg>
  );
}

export function FlagPL({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 8 5" className={className} aria-hidden preserveAspectRatio="none">
      <rect width="8" height="5" fill="#DC143C" />
      <rect width="8" height="2.5" fill="#FFFFFF" />
    </svg>
  );
}

type FlagComponent = (props: FlagProps) => ReturnType<typeof FlagFR>;

export const localeFlags: Record<Locale, FlagComponent> = {
  fr: FlagFR,
  en: FlagUK,
  de: FlagDE,
  it: FlagIT,
  es: FlagES,
  nl: FlagNL,
  pl: FlagPL,
};
