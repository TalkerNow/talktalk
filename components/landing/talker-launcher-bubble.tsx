"use client";

import { useEffect, useRef, useState } from "react";
import { TalkerChat } from "@/components/talker/chat";
import { useTalker } from "@/components/talker/provider";
import { useLocale } from "@/components/i18n/locale-context";

const TYPING_MS = 2400;
const PAUSE_MS = 2000;
const BUBBLE_PX = 80;

/** Original idle mark: ellipse + bottom-left tail. Same command list as BAR for interpolation. */
const IDLE_PATH = [-93.33, 396.27, 466.65, 400, 0, 1, 0, -291.66, 315.72, -312.5, 554.69] as const;
/** Stretched, slightly lower rounded bar; tail retracted onto the outline. */
const BAR_PATH = [520, 110, 640, 155, 0, 1, 0, -520, 110, -520, 110] as const;

const IDLE_MS = 8000;
const MORPH_MS = 2400;
const HOLD_MS = 2800;
const INVITE_SHOW_MS = 4200;
const INVITE_GAP_MS = 12000;

type PathNums = readonly number[];

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerpPath(from: PathNums, to: PathNums, t: number) {
  const n = from.map((value, i) => {
    if (i === 4 || i === 5 || i === 6) return value;
    return value + (to[i] - value) * t;
  });
  return `M ${n[0]} ${n[1]} A ${n[2]} ${n[3]} ${n[4]} ${n[5]} ${n[6]} ${n[7]} ${n[8]} L ${n[9]} ${n[10]} Z`;
}

export function TalkerLauncherBubble() {
  const { t } = useLocale();
  const invites = t.bubble.chips;
  const { open, openTalker, closeTalker } = useTalker();
  const [typing, setTyping] = useState(true);
  const [morph, setMorph] = useState(0);
  const [invitesOpen, setInvitesOpen] = useState(false);
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
    if (open) {
      setMorph(0);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMorph(0);
      return;
    }

    let cancelled = false;
    let raf = 0;
    let phase: "idle" | "toBar" | "bar" | "toIdle" = "idle";
    let phaseStart = performance.now();

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - phaseStart;

      if (phase === "idle") {
        if (elapsed >= IDLE_MS) {
          phase = "toBar";
          phaseStart = now;
        }
      } else if (phase === "toBar") {
        const t = Math.min(1, elapsed / MORPH_MS);
        setMorph(easeInOutCubic(t));
        if (t >= 1) {
          phase = "bar";
          phaseStart = now;
        }
      } else if (phase === "bar") {
        setMorph(1);
        if (elapsed >= HOLD_MS) {
          phase = "toIdle";
          phaseStart = now;
        }
      } else {
        const t = Math.min(1, elapsed / MORPH_MS);
        setMorph(easeInOutCubic(1 - t));
        if (t >= 1) {
          setMorph(0);
          phase = "idle";
          phaseStart = now;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setInvitesOpen(false);
      return;
    }

    let gapTimer = 0;
    let hideTimer = 0;

    const burst = () => {
      setInvitesOpen(true);
      hideTimer = window.setTimeout(() => {
        setInvitesOpen(false);
        gapTimer = window.setTimeout(burst, INVITE_GAP_MS);
      }, INVITE_SHOW_MS);
    };

    gapTimer = window.setTimeout(burst, 4500);
    return () => {
      window.clearTimeout(gapTimer);
      window.clearTimeout(hideTimer);
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

  const d = lerpPath(IDLE_PATH, BAR_PATH, morph);
  const svgW = BUBBLE_PX + morph * 72;
  const svgH = BUBBLE_PX - morph * 12;

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
        className="group/talker pointer-events-none fixed z-40"
        style={{
          right: "calc(56px + env(safe-area-inset-right))",
          bottom: "calc(40px + env(safe-area-inset-bottom))",
        }}
      >
        {!open ? (
          <div
            className={`absolute right-0 bottom-full mb-3 flex w-max flex-col items-end gap-1.5 transition-opacity duration-500 ${
              invitesOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            } group-hover/talker:pointer-events-auto group-hover/talker:opacity-100`}
          >
            {invites.map((invite) => (
              <button
                key={invite.label}
                type="button"
                onClick={() => openTalker(invite.intent)}
                className="rounded-full border border-line bg-background px-3 py-1.5 text-[13px] text-ink transition-colors hover:border-ink"
              >
                {invite.label}
              </button>
            ))}
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => (open ? closeTalker() : openTalker())}
          aria-label={t.bubble.open}
          aria-expanded={open}
          className="pointer-events-auto relative cursor-pointer overflow-visible border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C43F17]"
          style={{ width: svgW, height: svgH }}
        >
          <span aria-hidden className="talker-capsule-halo" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-682.69 -622.02 1365.38 1365.38"
            width={svgW}
            height={svgH}
            role="img"
            aria-hidden="true"
            className="relative z-10 drop-shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
          >
            <path
              d={d}
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
              opacity={1 - morph}
              className={typing && morph < 0.2 ? "talker-typing-dot talker-typing-dot-1" : undefined}
            />
            <circle
              cx="0"
              cy="0"
              r="60"
              fill="#111111"
              opacity={1 - morph}
              className={typing && morph < 0.2 ? "talker-typing-dot talker-typing-dot-2" : undefined}
            />
            <circle
              cx="163"
              cy="0"
              r="60"
              fill="#111111"
              opacity={1 - morph}
              className={typing && morph < 0.2 ? "talker-typing-dot talker-typing-dot-3" : undefined}
            />
            <text
              x="0"
              y="18"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#111111"
              fontFamily="var(--font-inter), Inter, system-ui, sans-serif"
              fontSize="240"
              fontWeight="600"
              opacity={morph}
            >
              Talker
            </text>
          </svg>
        </button>
      </div>
    </>
  );
}
