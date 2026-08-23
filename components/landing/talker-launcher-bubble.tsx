"use client";

import { useEffect, useState } from "react";
import { TalkerChat } from "@/components/talker/chat";
import { useTalker } from "@/components/talker/provider";

const TYPING_MS = 2000;
const PAUSE_MS = 3500;

export function TalkerLauncherBubble() {
  const { open, openTalker, closeTalker } = useTalker();
  const [typing, setTyping] = useState(true);

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

  return (
    <>
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Talker"
          className="fixed z-[60] w-[min(calc(100vw-2rem),380px)] h-[min(70vh,560px)] overflow-hidden rounded-2xl border border-foreground/10 bg-[#F7F6F4] shadow-[0_16px_50px_rgba(0,0,0,0.14)]"
          style={{
            right: "max(1.5rem, env(safe-area-inset-right))",
            bottom: "calc(5.5rem + env(safe-area-inset-bottom))",
          }}
        >
          <TalkerChat onClose={closeTalker} />
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => (open ? closeTalker() : openTalker())}
        aria-label="Ouvrir Talker"
        aria-expanded={open}
        className="fixed z-40 flex size-[60px] cursor-pointer items-center justify-center overflow-visible border-0 bg-transparent p-0 shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C43F17]"
        style={{
          right: "max(1.5rem, env(safe-area-inset-right))",
          bottom: "max(1.5rem, env(safe-area-inset-bottom))",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-682.69 -622.02 1365.38 1365.38"
          width="60"
          height="60"
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
          <span className="absolute top-0 right-0 flex size-5 items-center justify-center rounded-full bg-[#E11D48] text-[11px] font-semibold leading-none text-white">
            1
          </span>
        ) : null}
      </button>
    </>
  );
}
