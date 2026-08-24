"use client";

import { useEffect, useRef, useState } from "react";
import { TalkerChat } from "@/components/talker/chat";
import { useTalker } from "@/components/talker/provider";
import { useLocale } from "@/components/i18n/locale-context";

const BUBBLE_PX = 80;

export function TalkerLauncherBubble() {
  const { t } = useLocale();
  const invites = t.bubble.chips;
  const { open, openTalker, closeTalker } = useTalker();
  const [chipsPinned, setChipsPinned] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setChipsPinned(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeTalker();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeTalker]);

  useEffect(() => {
    if (open) {
      const onPointerDown = (event: PointerEvent) => {
        const target = event.target as Node;
        if (panelRef.current?.contains(target)) return;
        if (clusterRef.current?.contains(target)) return;
        closeTalker();
      };
      document.addEventListener("pointerdown", onPointerDown);
      return () => document.removeEventListener("pointerdown", onPointerDown);
    }

    if (!chipsPinned) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (clusterRef.current?.contains(target)) return;
      setChipsPinned(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, chipsPinned, closeTalker]);

  const chipsVisible = !open && chipsPinned;

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
          <div
            className={`absolute right-0 bottom-full z-30 mb-3 flex w-max flex-col items-end gap-1.5 transition-opacity duration-200 ${
              chipsVisible
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            } md:group-hover/talker:pointer-events-auto md:group-hover/talker:opacity-100`}
          >
            {invites.map((invite) => (
              <button
                key={invite.label}
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setChipsPinned(false);
                  openTalker(invite.intent);
                }}
                className="rounded-full border border-line bg-background px-3 py-1.5 text-[13px] text-ink transition-colors hover:border-ink"
              >
                {invite.label}
              </button>
            ))}
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => {
            if (open) {
              closeTalker();
              return;
            }
            setChipsPinned((pinned) => !pinned);
          }}
          aria-label={t.bubble.open}
          aria-expanded={open || chipsPinned}
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
              className="talker-typing-dot talker-typing-dot-1"
            />
            <circle
              cx="0"
              cy="0"
              r="60"
              fill="#111111"
              className="talker-typing-dot talker-typing-dot-2"
            />
            <circle
              cx="163"
              cy="0"
              r="60"
              fill="#111111"
              className="talker-typing-dot talker-typing-dot-3"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
