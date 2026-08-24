"use client";

import { useEffect, useRef, useState } from "react";
import { TalkerChat } from "@/components/talker/chat";
import { useTalker } from "@/components/talker/provider";
import { useLocale } from "@/components/i18n/locale-context";

const TYPING_MS = 2400;
const PAUSE_MS = 2000;
const BUBBLE_PX = 80;

export function TalkerLauncherBubble() {
  const { t } = useLocale();
  const { open, openTalker, closeTalker } = useTalker();
  const [typing, setTyping] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTyping(false);
      return;
    }

    let pauseTimer = 0;
    let typeTimer = 0;
    setTyping(true);

    const cycle = () => {
      setTyping(true);
      typeTimer = window.setTimeout(() => {
        setTyping(false);
        pauseTimer = window.setTimeout(cycle, PAUSE_MS);
      }, TYPING_MS);
    };

    typeTimer = window.setTimeout(() => {
      setTyping(false);
      pauseTimer = window.setTimeout(cycle, PAUSE_MS);
    }, TYPING_MS);

    return () => {
      window.clearTimeout(typeTimer);
      window.clearTimeout(pauseTimer);
    };
  }, [open]);

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
            right: "calc(56px + env(safe-area-inset-right))",
            bottom: "calc(132px + env(safe-area-inset-bottom))",
          }}
        >
          <TalkerChat onClose={closeTalker} />
        </div>
      ) : null}

      <div
        ref={clusterRef}
        className={`talker-capsule pointer-events-none fixed z-40 ${open ? "is-open" : ""}`}
        style={{
          right: "calc(56px + env(safe-area-inset-right))",
          bottom: "calc(40px + env(safe-area-inset-bottom))",
        }}
      >
        <button
          type="button"
          onClick={() => (open ? closeTalker() : openTalker())}
          aria-label={t.bubble.open}
          aria-expanded={open}
          className="pointer-events-auto relative flex cursor-pointer items-center overflow-visible border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C43F17]"
        >
          <span className="relative flex size-[80px] shrink-0 items-center justify-center">
            <span aria-hidden className="talker-capsule-halo" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-682.69 -622.02 1365.38 1365.38"
              width={BUBBLE_PX}
              height={BUBBLE_PX}
              role="img"
              aria-hidden="true"
              className="relative z-10 drop-shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
            >
              <g transform="translate(-192.5 356)">
                <g className="talker-capsule-tail-scale">
                  <g transform="translate(192.5 -356)">
                    <path
                      d="M -93.33 396.27 L -312.50 554.69 L -291.66 315.72"
                      fill="#F7F6F4"
                      stroke="#C43F17"
                      strokeWidth="66.70"
                      strokeLinejoin="miter"
                      strokeMiterlimit={10}
                    />
                  </g>
                </g>
              </g>
              <path
                d="M 0 -400 A 466.65 400.00 0 1 0 0 400 A 466.65 400.00 0 1 0 0 -400 Z"
                fill="#F7F6F4"
                stroke="#C43F17"
                strokeWidth="66.70"
                strokeLinejoin="miter"
                strokeMiterlimit={10}
              />
              <circle
                cx="-163"
                cy="0"
                r="60"
                fill="#111111"
                className={typing ? "talker-typing-dot talker-typing-dot-1" : undefined}
              />
              <circle
                cx="0"
                cy="0"
                r="60"
                fill="#111111"
                className={typing ? "talker-typing-dot talker-typing-dot-2" : undefined}
              />
              <circle
                cx="163"
                cy="0"
                r="60"
                fill="#111111"
                className={typing ? "talker-typing-dot talker-typing-dot-3" : undefined}
              />
            </svg>
          </span>
          <span className="talker-capsule-pill-track -ml-2">
            <span className="talker-capsule-pill inline-flex h-10 w-[5.75rem] shrink-0 items-center justify-center rounded-full bg-[#F7F6F4] text-[14px] font-semibold text-[#111111] shadow-[0_8px_24px_rgba(17,17,17,0.10)]">
              Talker
            </span>
          </span>
        </button>
      </div>
    </>
  );
}
