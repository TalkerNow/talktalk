"use client";

import { useEffect, useId, useRef, useState } from "react";
import { TalkerChat } from "@/components/talker/chat";
import { useTalker } from "@/components/talker/provider";
import { useLocale } from "@/components/i18n/locale-context";

const BUBBLE_PX = 80;
const RX = 466.65;
const RY = 400;
const VIEW_LEFT = -682.69;
const VIEW_TOP = -622.02;
const VIEW_MIN = 1365.38;
const EXTRA_MAX = 1080;
const WORD = "talker";
const TAIL_S = { x: -93.33, y: 396.27 };
const TAIL_E = { x: -291.66, y: 315.72 };
const TAIL_T = { x: -312.5, y: 554.69 };
const TAIL_ORIGIN = { x: -192.5, y: 356 };

const IDLE_MS = 9000;
const STRETCH_MS = 2800;
const HOLD_MS = 1100;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function stadiumPath(extra: number) {
  const w = Math.max(0, extra);
  return [
    `M 0 ${-RY}`,
    `A ${RX} ${RY} 0 0 0 0 ${RY}`,
    `L ${w} ${RY}`,
    `A ${RX} ${RY} 0 0 0 ${w} ${-RY}`,
    `L 0 ${-RY}`,
    "Z",
  ].join(" ");
}

function letterOpacity(morph: number, index: number) {
  const start = (index + 0.08) / WORD.length;
  const end = (index + 0.92) / WORD.length;
  if (morph <= start) return 0;
  if (morph >= end) return 1;
  return (morph - start) / (end - start);
}

export function TalkerLauncherBubble() {
  const { t } = useLocale();
  const invites = t.bubble.chips;
  const clipId = useId().replace(/:/g, "");
  const { open, openTalker, closeTalker } = useTalker();
  const [morph, setMorph] = useState(0);
  const [chipsPinned, setChipsPinned] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMorph(0);
      return;
    }

    let cancelled = false;
    let raf = 0;
    let phase: "idle" | "out" | "hold" | "in" = "idle";
    let phaseStart = performance.now();
    let idleFor = 2400;

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - phaseStart;

      if (phase === "idle") {
        if (elapsed >= idleFor) {
          phase = "out";
          phaseStart = now;
        }
      } else if (phase === "out") {
        const t = Math.min(1, elapsed / STRETCH_MS);
        setMorph(easeInOutCubic(t));
        if (t >= 1) {
          phase = "hold";
          phaseStart = now;
        }
      } else if (phase === "hold") {
        setMorph(1);
        if (elapsed >= HOLD_MS) {
          phase = "in";
          phaseStart = now;
        }
      } else {
        const t = Math.min(1, elapsed / STRETCH_MS);
        setMorph(easeInOutCubic(1 - t));
        if (t >= 1) {
          setMorph(0);
          phase = "idle";
          phaseStart = now;
          idleFor = IDLE_MS + Math.random() * 4000;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

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

  const extra = morph * EXTRA_MAX;
  const viewW = VIEW_MIN + extra;
  const svgW = (viewW / VIEW_MIN) * BUBBLE_PX;
  const tailScale = Math.max(0, 1 - morph * 1.25);
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
          className="pointer-events-auto relative cursor-pointer overflow-visible border-0 bg-transparent p-0 shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C43F17]"
          style={{ width: svgW, height: BUBBLE_PX }}
        >
          <span className="absolute top-0 left-0 size-[80px]">
            <span aria-hidden className="talker-ripple" />
            {!open ? (
              <span className="absolute top-0.5 right-0.5 z-20 flex size-5 items-center justify-center rounded-full bg-[#E11D48] text-[11px] font-semibold leading-none text-white">
                1
              </span>
            ) : null}
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`${VIEW_LEFT} ${VIEW_TOP} ${viewW} ${VIEW_MIN}`}
            width={svgW}
            height={BUBBLE_PX}
            role="img"
            aria-hidden="true"
            className="relative z-10 drop-shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
          >
            <defs>
              <clipPath id={clipId}>
                <rect
                  x={220}
                  y={-280}
                  width={220 + extra}
                  height={560}
                />
              </clipPath>
            </defs>
            <path
              d={stadiumPath(extra)}
              fill="#F7F6F4"
              stroke="#C43F17"
              strokeWidth="66.70"
              strokeLinejoin="miter"
              strokeMiterlimit={10}
            />
            {tailScale > 0.02 ? (
              <g
                transform={`translate(${TAIL_ORIGIN.x} ${TAIL_ORIGIN.y}) scale(${tailScale}) translate(${-TAIL_ORIGIN.x} ${-TAIL_ORIGIN.y})`}
              >
                <path
                  d={`M ${TAIL_S.x} ${TAIL_S.y} L ${TAIL_T.x} ${TAIL_T.y} L ${TAIL_E.x} ${TAIL_E.y} Z`}
                  fill="#F7F6F4"
                  stroke="none"
                />
                <path
                  d={`M ${TAIL_S.x} ${TAIL_S.y} L ${TAIL_T.x} ${TAIL_T.y} L ${TAIL_E.x} ${TAIL_E.y}`}
                  fill="none"
                  stroke="#C43F17"
                  strokeWidth="66.70"
                  strokeLinejoin="miter"
                  strokeLinecap="round"
                  strokeMiterlimit={10}
                />
              </g>
            ) : null}
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
            <text
              x={380}
              y={20}
              textAnchor="start"
              dominantBaseline="middle"
              fill="#111111"
              fontFamily="var(--font-inter), Inter, system-ui, sans-serif"
              fontSize="252"
              fontWeight="700"
              clipPath={`url(#${clipId})`}
            >
              {Array.from(WORD).map((letter, index) => (
                <tspan key={index} opacity={letterOpacity(morph, index)}>
                  {letter}
                </tspan>
              ))}
            </text>
          </svg>
        </button>
      </div>
    </>
  );
}
