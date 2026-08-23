"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "./locale-context";
import type { Locale } from "@/lib/i18n";

function FlagFR({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden preserveAspectRatio="none">
      <rect width="1" height="2" fill="#002395" />
      <rect x="1" width="1" height="2" fill="#FFFFFF" />
      <rect x="2" width="1" height="2" fill="#ED2939" />
    </svg>
  );
}

function FlagUK({ className }: { className?: string }) {
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

const options: { locale: Locale; Flag: typeof FlagFR; label: string }[] = [
  { locale: "en", Flag: FlagUK, label: "English" },
  { locale: "fr", Flag: FlagFR, label: "Français" },
];

export function LanguageSwitcher() {
  const { locale, t, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const TriggerFlag = locale === "en" ? FlagUK : FlagFR;

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative flex items-center self-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={t.langLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        onFocus={() => setOpen(true)}
        className="inline-flex items-center justify-center bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C43F17]"
      >
        <TriggerFlag className="h-4 w-6 shrink-0" />
      </button>
      {open ? (
        <div
          role="listbox"
          aria-label={t.langLabel}
          className="absolute left-0 top-full z-50 mt-1 min-w-[7.5rem] border border-foreground/12 bg-[#F7F6F4] py-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
        >
          {options.map(({ locale: value, Flag, label }) => (
            <button
              key={value}
              type="button"
              role="option"
              aria-selected={locale === value}
              onClick={() => {
                setLocale(value);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-[12px] transition-colors hover:bg-foreground/5 ${
                locale === value ? "text-foreground" : "text-foreground/70"
              }`}
            >
              <Flag className="h-4 w-6 shrink-0" />
              {label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
