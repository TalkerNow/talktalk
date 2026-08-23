"use client";

import { useEffect, useRef, useState } from "react";
import { TalkerChat } from "@/components/talker/chat";
import { useTalker } from "@/components/talker/provider";

const TYPING_MS = 2000;
const PAUSE_MS = 3500;
const BUBBLE_PX = 80;

const invites = [
  "Quels sont vos horaires ?",
  "Demander une intervention",
  "Prendre rendez-vous",
];

export function TalkerLauncherBubble() {
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
            right: "max(1.5rem, env(safe-area-inset-right))",
            bottom: "calc(7.5rem + env(safe-area-inset-bottom))",
          }}
        >
          <TalkerChat onClose={closeTalker} />
        </div>
      ) : null}

      <div
        ref={clusterRef}
        className="group/talker pointer-events-none fixed z-40"
        style={{
          right: "max(1.5rem, env(safe-area-inset-right))",
          bottom: "max(1.5rem, env(safe-area-inset-bottom))",
        }}
      >
        {!open ? (
          <div className="pointer-events-none absolute bottom-full right-0 hidden w-max flex-col items-end gap-1.5 pb-3 opacity-0 transition-opacity duration-200 group-hover/talker:pointer-events-auto group-hover/talker:opacity-100 md:flex">
            {invites.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => openTalker()}
                className="rounded-full border border-foreground/10 bg-[#EFEDE9] px-3 py-1.5 text-left text-[12px] font-normal normal-case tracking-normal text-[#6B6B73] shadow-none transition-colors hover:bg-[#E8E6E2] hover:text-[#55555C]"
              >
                {label}
              </button>
            ))}
          </div>
        ) : null}

        <div className="relative size-[80px]">
          {typing && !open ? (
            <>
              <span aria-hidden className="talker-ripple talker-ripple-rust" />
              <span aria-hidden className="talker-ripple talker-ripple-ink" />
            </>
          ) : null}

          <button
            type="button"
            onClick={() => (open ? closeTalker() : openTalker())}
            aria-label="Ouvrir Talker"
            aria-expanded={open}
            className="pointer-events-auto relative z-10 flex size-[80px] cursor-pointer items-center justify-center overflow-visible border-0 bg-transparent p-0 shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C43F17]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-682.69 -622.02 1365.38 1365.38"
              width={BUBBLE_PX}
              height={BUBBLE_PX}
              role="img"
              aria-hidden="true"
              className="drop-shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
            >
              <path
                d="M -93.33 396.27 A 466.65 400.00 0 1 0 -291.66 315.72 L -312.50 554.69 Z"
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
            {!open ? (
              <span className="absolute top-0.5 right-0.5 flex size-5 items-center justify-center rounded-full bg-[#E11D48] text-[11px] font-semibold leading-none text-white">
                1
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </>
  );
}
