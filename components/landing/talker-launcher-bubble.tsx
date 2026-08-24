"use client";

import { useEffect, useRef } from "react";
import { TalkerChat } from "@/components/talker/chat";
import { useTalker } from "@/components/talker/provider";
import { useLocale } from "@/components/i18n/locale-context";

const BUBBLE_PX = 56;
const BUBBLE_VIEWBOX = "-520 -470 1040 1080";

export function TalkerLauncherBubble() {
  const { t } = useLocale();
  const { open, openTalker, closeTalker } = useTalker();
  const panelRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeTalker();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeTalker]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (clusterRef.current?.contains(target)) return;
      closeTalker();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, closeTalker]);

  return (
    <>
      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Talker"
          className="fixed z-[60] w-[min(calc(100vw-2rem),380px)] h-[min(70vh,560px)] overflow-hidden rounded-2xl border border-foreground/10 bg-[#F7F6F4] shadow-[0_16px_50px_rgba(0,0,0,0.14)]"
          style={{
            right: "max(1.5rem, env(safe-area-inset-right))",
            bottom: "calc(5.75rem + env(safe-area-inset-bottom))",
          }}
        >
          <TalkerChat onClose={closeTalker} />
        </div>
      ) : null}

      <div
        ref={clusterRef}
        className="pointer-events-none fixed z-40 flex items-center"
        style={{
          right: "max(1.25rem, env(safe-area-inset-right))",
          bottom: "max(1.25rem, env(safe-area-inset-bottom))",
        }}
      >
        <button
          type="button"
          onClick={() => (open ? closeTalker() : openTalker())}
          aria-label={t.bubble.open}
          aria-expanded={open}
          className="pointer-events-auto flex cursor-pointer items-center overflow-visible border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C43F17]"
        >
          {!open ? (
            <span className="talker-capsule-pill-clip mr-2">
              <span className="inline-flex h-10 items-center rounded-full bg-[#F7F6F4] px-4 text-[14px] font-semibold text-[#111111] shadow-[0_8px_24px_rgba(17,17,17,0.10)]">
                Talker
              </span>
            </span>
          ) : null}

          <span className="relative flex size-[56px] items-center justify-center">
            <span aria-hidden className="talker-capsule-halo" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox={BUBBLE_VIEWBOX}
              width={BUBBLE_PX}
              height={BUBBLE_PX}
              role="img"
              aria-hidden="true"
              className="relative z-10"
            >
              <path
                d="M -93.33 396.27 A 466.65 400.00 0 1 0 -291.66 315.72 L -312.50 554.69 Z"
                fill="#C43F17"
              />
              <circle
                cx="-163"
                cy="0"
                r="60"
                fill="#111111"
                className={open ? undefined : "talker-typing-dot talker-typing-dot-1"}
              />
              <circle
                cx="0"
                cy="0"
                r="60"
                fill="#111111"
                className={open ? undefined : "talker-typing-dot talker-typing-dot-2"}
              />
              <circle
                cx="163"
                cy="0"
                r="60"
                fill="#111111"
                className={open ? undefined : "talker-typing-dot talker-typing-dot-3"}
              />
            </svg>
          </span>
        </button>
      </div>
    </>
  );
}
