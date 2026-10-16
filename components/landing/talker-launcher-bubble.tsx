"use client";

import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { TalkerChat } from "@/components/talker/chat";
import { useTalker } from "@/components/talker/provider";
import { useLocale } from "@/components/i18n/locale-context";

const BUBBLE_PX = 80;
const STAGE_MS = [3200, 3600, 3600];
const PILL_PX = [168, 244];
const TOUCH_SLOP_PX = 16;
const FINE_HOVER_MQ = "(hover: hover) and (pointer: fine)";
const TOUCH_SAFE_CLASS =
  "select-none touch-manipulation [-webkit-touch-callout:none] [-webkit-user-select:none]";

function useFineHover() {
  const [fineHover, setFineHover] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(FINE_HOVER_MQ);
    const sync = () => setFineHover(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return fineHover;
}

function isTouchPointer(event: ReactPointerEvent) {
  return event.pointerType === "touch";
}

function withinTouchSlop(
  start: { x: number; y: number } | null,
  event: ReactPointerEvent,
) {
  if (!start) return false;
  const dx = event.clientX - start.x;
  const dy = event.clientY - start.y;
  return dx * dx + dy * dy <= TOUCH_SLOP_PX * TOUCH_SLOP_PX;
}

function TouchSafeButton({
  onActivate,
  className,
  children,
  onPointerEnter,
  onPointerLeave,
  ...props
}: {
  onActivate: () => void;
  className?: string;
  children: ReactNode;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "onPointerDown" | "onPointerUp" | "type"
>) {
  const ignoreClickRef = useRef(false);
  const touchOriginRef = useRef<{ x: number; y: number } | null>(null);

  const clearTouchOrigin = () => {
    touchOriginRef.current = null;
  };

  return (
    <button
      type="button"
      {...props}
      className={className}
      onContextMenu={(event) => event.preventDefault()}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerCancel={clearTouchOrigin}
      onPointerDown={(event) => {
        if (!isTouchPointer(event)) return;
        touchOriginRef.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerUp={(event) => {
        if (!isTouchPointer(event)) return;
        const origin = touchOriginRef.current;
        touchOriginRef.current = null;
        if (!withinTouchSlop(origin, event)) return;
        ignoreClickRef.current = true;
        window.setTimeout(() => {
          ignoreClickRef.current = false;
        }, 400);
        onActivate();
      }}
      onClick={() => {
        if (ignoreClickRef.current) {
          ignoreClickRef.current = false;
          return;
        }
        onActivate();
      }}
    >
      {children}
    </button>
  );
}

export function TalkerLauncherBubble() {
  const { t } = useLocale();
  const invites = t.bubble.chips;
  const { open, openTalker, closeTalker, resetKey } = useTalker();
  const fineHover = useFineHover();
  const [stage, setStage] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    let cancelled = false;
    let timer = 0;
    let current = 0;
    const next = () => {
      if (cancelled) return;
      current = (current + 1) % 3;
      setStage(current);
      timer = window.setTimeout(next, STAGE_MS[current]);
    };
    timer = window.setTimeout(next, 2400 + STAGE_MS[0]);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
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

  const pill = !open && stage > 0 ? invites[stage - 1] : null;
  const pulsing = !open && stage === 0;

  const activate = () => {
    if (open) {
      closeTalker();
      return;
    }
    const intent = pill?.intent;
    setStage(0);
    if (intent) openTalker(intent);
    else openTalker();
  };

  return (
    <>
      <div
        ref={panelRef}
        hidden={!open}
        role={open ? "dialog" : undefined}
        aria-modal={open ? true : undefined}
        aria-hidden={!open}
        aria-label="Talker"
        className="talker-demo-panel overflow-hidden rounded-2xl border border-foreground/10 bg-[#F7F6F4] shadow-[0_16px_50px_rgba(0,0,0,0.14)]"
      >
        <TalkerChat key={resetKey} onClose={closeTalker} />
      </div>

      <div
        ref={clusterRef}
        className={`pointer-events-none fixed z-40 ${TOUCH_SAFE_CLASS}`}
        style={{
          right: "calc(max(1.5rem, env(safe-area-inset-right)) + 20px)",
          bottom:
            "calc(max(1.5rem, env(safe-area-inset-bottom)) + 20px + var(--cookie-banner-offset, 0px))",
        }}
      >
        <TouchSafeButton
          onActivate={activate}
          aria-label={pill ? pill.label : t.bubble.open}
          aria-expanded={open}
          data-stage={open ? "open" : stage}
          style={{ width: pill ? PILL_PX[stage - 1] : BUBBLE_PX }}
          className={`talker-morph pointer-events-auto relative z-10 flex h-[80px] cursor-pointer items-center justify-end overflow-visible border-0 bg-transparent p-0 shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C43F17] ${fineHover ? "talker-morph-hover" : ""} ${TOUCH_SAFE_CLASS}`}
        >
          <span
            aria-hidden
            className={`talker-wave ${pulsing ? "is-on" : ""}`}
          />
          <span
            aria-hidden
            className={`talker-pill ${pill ? "is-on" : ""} ${TOUCH_SAFE_CLASS}`}
          >
            {invites.map((invite, index) => (
              <span
                key={invite.label}
                className={`talker-pill-label ${stage - 1 === index ? "is-on" : ""}`}
              >
                {invite.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="#C43F17" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            ))}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-682.69 -622.02 1365.38 1365.38"
            width={BUBBLE_PX}
            height={BUBBLE_PX}
            role="img"
            aria-hidden="true"
            className={`talker-morph-icon pointer-events-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.12)] ${pill ? "is-off" : ""} ${TOUCH_SAFE_CLASS}`}
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
              cx="-243.5"
              cy="0"
              r="48.7"
              fill="#111111"
              className="talker-typing-dot talker-typing-dot-1"
            />
            <circle
              cx="-48.7"
              cy="0"
              r="73.05"
              fill="#111111"
              className="talker-typing-dot talker-typing-dot-2"
            />
            <circle
              cx="194.8"
              cy="0"
              r="97.4"
              fill="#111111"
              className="talker-typing-dot talker-typing-dot-3"
            />
          </svg>
          <span
            aria-hidden
            className={`absolute top-0.5 right-0.5 z-20 flex size-5 items-center justify-center rounded-full bg-[#E11D48] text-[11px] font-semibold leading-none text-white transition-opacity duration-300 ${TOUCH_SAFE_CLASS} ${
              pulsing ? "opacity-100" : "opacity-0"
            }`}
          >
            1
          </span>
        </TouchSafeButton>
      </div>
    </>
  );
}
