"use client";

import { useEffect, useRef, useState } from "react";
import { TalkerChat } from "@/components/talker/chat";
import { useTalker } from "@/components/talker/provider";
import { ShineBorder } from "@/components/ui/shine-border";
import { useLocale } from "@/components/i18n/locale-context";

const BUBBLE_PX = 80;
const ATTRACT_REST_MS = 7000;
const ATTRACT_ON_MS = 4000;
const CHIP_LEAVE_MS = 220;

export function TalkerLauncherBubble() {
  const { t } = useLocale();
  const invites = t.bubble.chips;
  const { open, openTalker, closeTalker } = useTalker();
  const [chipsPinned, setChipsPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [attract, setAttract] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef(0);

  const clearHideTimer = () => {
    window.clearTimeout(hideTimer.current);
    hideTimer.current = 0;
  };

  const onChipRegionEnter = () => {
    clearHideTimer();
    setHovered(true);
  };

  const onChipRegionLeave = () => {
    clearHideTimer();
    hideTimer.current = window.setTimeout(() => {
      setHovered(false);
    }, CHIP_LEAVE_MS);
  };

  useEffect(() => () => clearHideTimer(), []);

  useEffect(() => {
    if (open) {
      setAttract(false);
      setHovered(false);
      clearHideTimer();
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAttract(false);
      return;
    }

    let cancelled = false;
    let restTimer = 0;
    let onTimer = 0;

    const pulse = () => {
      if (cancelled) return;
      setAttract(true);
      onTimer = window.setTimeout(() => {
        if (cancelled) return;
        setAttract(false);
        restTimer = window.setTimeout(pulse, ATTRACT_REST_MS);
      }, ATTRACT_ON_MS);
    };

    restTimer = window.setTimeout(pulse, 2400);
    return () => {
      cancelled = true;
      window.clearTimeout(restTimer);
      window.clearTimeout(onTimer);
    };
  }, [open]);

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

  const chipsShown = !open && (hovered || chipsPinned || attract);

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
            right: "calc(max(1.5rem, env(safe-area-inset-right)) + 20px)",
            bottom: "calc(7.5rem + 20px + env(safe-area-inset-bottom))",
          }}
        >
          <TalkerChat onClose={closeTalker} />
        </div>
      ) : null}

      <div
        ref={clusterRef}
        className="pointer-events-none fixed z-40"
        style={{
          right: "calc(max(1.5rem, env(safe-area-inset-right)) + 20px)",
          bottom: "calc(max(1.5rem, env(safe-area-inset-bottom)) + 20px)",
        }}
      >
        {!open ? (
          <div
            onPointerEnter={onChipRegionEnter}
            onPointerLeave={onChipRegionLeave}
            aria-hidden={!chipsShown}
            className={`absolute right-0 bottom-full z-30 flex w-max flex-col items-end gap-1.5 pb-3 transition-opacity duration-200 ${
              chipsShown
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            {invites.map((invite) => {
              const shine = invite.intent === "talker";
              return (
                <button
                  key={invite.label}
                  type="button"
                  tabIndex={chipsShown ? 0 : -1}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setChipsPinned(false);
                    setHovered(false);
                    openTalker(invite.intent);
                  }}
                  className={`relative rounded-full border bg-background px-3 py-1.5 text-[13px] text-ink transition-colors hover:border-ink ${
                    shine
                      ? "overflow-hidden border-foreground/12"
                      : "border-line"
                  }`}
                >
                  {shine ? (
                    <ShineBorder
                      borderWidth={1}
                      duration={16}
                      shineColor={["#C43F17", "#111111"]}
                    />
                  ) : null}
                  <span className="relative z-10">{invite.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        <button
          type="button"
          onPointerEnter={onChipRegionEnter}
          onPointerLeave={onChipRegionLeave}
          onClick={() => {
            if (open) {
              closeTalker();
              return;
            }
            setChipsPinned((pinned) => !pinned);
          }}
          aria-label={t.bubble.open}
          aria-expanded={open || chipsShown}
          className="pointer-events-auto relative z-10 flex size-[80px] cursor-pointer items-center justify-center overflow-visible border-0 bg-transparent p-0 shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C43F17]"
        >
          <span
            aria-hidden
            className={`talker-ripple ${attract ? "is-on" : ""}`}
          />
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
          <span
            aria-hidden
            className={`absolute top-0.5 right-0.5 z-20 flex size-5 items-center justify-center rounded-full bg-[#E11D48] text-[11px] font-semibold leading-none text-white transition-opacity duration-300 ${
              attract ? "opacity-100" : "opacity-0"
            }`}
          >
            1
          </span>
        </button>
      </div>
    </>
  );
}
