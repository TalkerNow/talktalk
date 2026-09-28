"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "@/components/i18n/locale-context";
import {
  CONSENT_EVENT,
  CONSENT_OPEN_EVENT,
  readConsent,
  writeConsent,
} from "@/lib/consent";

const actionClass =
  "inline-flex h-11 items-center justify-center rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]";

function Switch({
  checked,
  disabled,
  label,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] disabled:cursor-not-allowed ${
        checked ? "bg-[#C43F17]" : "bg-[#DCD9CE]"
      }`}
    >
      <span
        aria-hidden
        className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}

export function CookieBanner() {
  const { t } = useLocale();
  const copy = t.consent;
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [hasChoice, setHasChoice] = useState(false);

  useEffect(() => {
    const sync = () => {
      const choice = readConsent();
      setHasChoice(Boolean(choice));
      setAnalytics(choice?.analytics ?? false);
      setOpen(choice === null);
      setPrefs(false);
      setReady(true);
    };
    sync();
    const onOpen = () => {
      const choice = readConsent();
      setHasChoice(Boolean(choice));
      setAnalytics(choice?.analytics ?? false);
      setPrefs(true);
      setOpen(true);
    };
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const panel = panelRef.current;
    if (!open || !panel) {
      root.style.setProperty("--cookie-banner-offset", "0px");
      return;
    }
    const apply = () => {
      root.style.setProperty("--cookie-banner-offset", `${panel.offsetHeight}px`);
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(panel);
    return () => {
      observer.disconnect();
      root.style.setProperty("--cookie-banner-offset", "0px");
    };
  }, [open, prefs, ready]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !prefs) return;
      setPrefs(false);
      if (readConsent()) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, prefs]);

  if (!ready || !open) return null;

  const save = (nextAnalytics: boolean) => {
    writeConsent(nextAnalytics);
  };

  return (
    <div
      ref={panelRef}
      role="region"
      aria-labelledby={titleId}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-[#DCD9CE] bg-white shadow-[0_-12px_40px_rgba(17,17,17,0.06)]"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-5">
        <div className="max-w-3xl">
          <h2 id={titleId} className="text-sm font-semibold text-[#111111]">
            {copy.title}
          </h2>
          <p className="mt-1.5 text-sm leading-6 text-[#52525B]">{copy.body}</p>
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <a
              href="/confidentialite"
              className="text-[#111111] underline decoration-[#E3B49F] underline-offset-2 hover:text-[#A8350F]"
            >
              {copy.privacy}
            </a>
            <a
              href="/mentions-legales"
              className="text-[#111111] underline decoration-[#E3B49F] underline-offset-2 hover:text-[#A8350F]"
            >
              {copy.legal}
            </a>
          </p>
        </div>

        {prefs ? (
          <div className="border-t border-[#DCD9CE] pt-3">
            <div className="flex items-start justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-medium text-[#111111]">{copy.necessary}</p>
                <p className="mt-1 text-sm leading-5 text-[#52525B]">
                  {copy.necessaryHelp}
                </p>
                <p className="mt-1 text-xs text-[#6B6B73]">{copy.alwaysOn}</p>
              </div>
              <Switch checked disabled label={copy.necessary} onChange={() => {}} />
            </div>
            <div className="flex items-start justify-between gap-4 border-t border-[#EDEBE3] py-3">
              <div>
                <p className="text-sm font-medium text-[#111111]">{copy.analytics}</p>
                <p className="mt-1 text-sm leading-5 text-[#52525B]">
                  {copy.analyticsHelp}
                </p>
              </div>
              <Switch
                checked={analytics}
                label={copy.analytics}
                onChange={setAnalytics}
              />
            </div>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                className={`${actionClass} border border-[#DCD9CE] bg-[#F4F3EE] text-[#111111] hover:bg-[#EDEBE3]`}
                onClick={() => {
                  setPrefs(false);
                  if (hasChoice) setOpen(false);
                }}
              >
                {hasChoice ? copy.close : copy.back}
              </button>
              <button
                type="button"
                className={`${actionClass} bg-[#C43F17] text-white hover:bg-[#A8350F]`}
                onClick={() => save(analytics)}
              >
                {copy.save}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
            <button
              type="button"
              className={`${actionClass} col-span-2 text-[#52525B] hover:text-[#111111] sm:order-1`}
              onClick={() => setPrefs(true)}
            >
              {copy.preferences}
            </button>
            <button
              type="button"
              className={`${actionClass} border border-[#DCD9CE] bg-[#F4F3EE] text-[#111111] hover:bg-[#EDEBE3] sm:order-2`}
              onClick={() => save(false)}
            >
              {copy.refuse}
            </button>
            <button
              type="button"
              className={`${actionClass} bg-[#C43F17] text-white hover:bg-[#A8350F] sm:order-3`}
              onClick={() => save(true)}
            >
              {copy.accept}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
