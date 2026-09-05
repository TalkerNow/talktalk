"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "./locale-context";
import { localeFlags } from "./flags";
import { locales, localeInfo, type Locale } from "@/lib/i18n";

function MenuSwitcher() {
  const { locale, t, setLocale } = useLocale();

  return (
    <div className="flex flex-wrap items-center gap-3" role="group" aria-label={t.langLabel}>
      {locales.map((value) => {
        const Flag = localeFlags[value];
        const active = locale === value;
        return (
          <button
            key={value}
            type="button"
            aria-label={localeInfo[value].label}
            aria-pressed={active}
            onClick={() => setLocale(value)}
            className={`relative inline-flex items-center justify-center bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C43F17] ${
              active ? "opacity-100" : "opacity-40"
            }`}
          >
            <Flag className="h-4 w-6 shrink-0" />
            {active ? (
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#C43F17]" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function NavSwitcher() {
  const { locale, t, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const TriggerFlag = localeFlags[locale];

  const close = () => {
    setOpen(false);
    setPinned(false);
  };

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
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
      onMouseLeave={() => {
        if (!pinned) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-label={t.langLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setPinned(true);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="inline-flex items-center justify-center bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C43F17]"
      >
        <TriggerFlag className="h-4 w-6 shrink-0" />
      </button>
      {open ? (
        <div
          role="listbox"
          aria-label={t.langLabel}
          className="absolute left-0 top-full z-50 pointer-events-auto before:absolute before:-top-2 before:right-0 before:left-0 before:h-2 before:content-['']"
        >
          <div className="min-w-[9.5rem] border border-foreground/12 bg-[#F7F6F4] py-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            {locales.map((value: Locale) => {
              const Flag = localeFlags[value];
              return (
                <button
                  key={value}
                  type="button"
                  role="option"
                  aria-selected={locale === value}
                  onClick={() => {
                    setLocale(value);
                    close();
                  }}
                  className={`flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-[12px] transition-colors hover:bg-foreground/5 ${
                    locale === value ? "text-foreground" : "text-foreground/70"
                  }`}
                >
                  <Flag className="h-4 w-6 shrink-0" />
                  {localeInfo[value].label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function LanguageSwitcher({
  variant = "nav",
}: {
  variant?: "nav" | "menu";
}) {
  if (variant === "menu") return <MenuSwitcher />;
  return <NavSwitcher />;
}
