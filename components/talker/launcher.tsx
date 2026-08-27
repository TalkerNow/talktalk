"use client";

import { useEffect } from "react";
import { TalkerMark } from "@/components/brand/mark";
import { TalkerChat } from "./chat";
import { useTalker } from "./provider";

export function TalkerLauncher() {
  const { open, openTalker, closeTalker } = useTalker();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeTalker();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeTalker]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 md:pb-6">
      <div className="pointer-events-auto flex w-full max-w-[540px] flex-col items-center">
        {open ? (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Démo Talker"
            className="mb-3 h-[min(70vh,560px)] w-full overflow-hidden rounded-[28px] border border-line bg-paper shadow-[0_20px_70px_rgba(22,19,16,0.16)]"
          >
            <TalkerChat onClose={closeTalker} />
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => (open ? closeTalker() : openTalker())}
          aria-expanded={open}
          className="group flex items-center justify-center rounded-full border border-line bg-paper shadow-[0_10px_40px_rgba(22,19,16,0.12)] transition-transform hover:-translate-y-0.5 md:w-full md:justify-between md:px-5 md:py-3"
        >
          <span className="hidden items-center gap-3 md:flex">
            <TalkerMark className="size-8" />
            <span className="text-left">
              <span className="block text-[15px] font-medium text-ink">
                {open ? "Talker est ouvert" : "Talker pose les questions"}
              </span>
              <span className="block text-[12px] text-muted">
                {open
                  ? "Répondez par choix, comme sur un site"
                  : "La démo, c’est le produit"}
              </span>
            </span>
          </span>
          <span className="flex size-14 items-center justify-center md:size-11 md:rounded-full md:bg-ink">
            <TalkerMark className="size-8 md:hidden" />
            <span className="hidden md:inline-flex text-paper">
              <ArrowUp />
            </span>
          </span>
          <span className="sr-only">
            {open ? "Fermer Talker" : "Ouvrir Talker"}
          </span>
        </button>
      </div>
    </div>
  );
}

function ArrowUp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 19V5M12 5 6 11M12 5l6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
