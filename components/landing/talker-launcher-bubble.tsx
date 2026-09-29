"use client";

import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { TalkerChat } from "@/components/talker/chat";
import { useTalker, type TalkerIntent } from "@/components/talker/provider";
import { ShineBorder } from "@/components/ui/shine-border";
import { useLocale } from "@/components/i18n/locale-context";
import { isV2Path } from "@/lib/theme/v2-href";

const BUBBLE_PX = 80;
const ATTRACT_REST_MS = 7000;
const ATTRACT_ON_MS = 4000;
const CHIP_LEAVE_MS = 220;
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
  const pathname = usePathname();
  const invites = t.bubble.chips;
  const hideNudges = isV2Path(pathname);
  const { open, openTalker, closeTalker, resetKey } = useTalker();
  const fineHover = useFineHover();
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
    if (!fineHover) return;
    clearHideTimer();
    setHovered(true);
  };

  const onChipRegionLeave = () => {
    if (!fineHover) return;
    clearHideTimer();
    hideTimer.current = window.setTimeout(() => {
      setHovered(false);
    }, CHIP_LEAVE_MS);
  };

  useEffect(() => () => clearHideTimer(), []);

  useEffect(() => {
    if (open) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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

  const chipsShown =
    !open && ((fineHover && hovered) || chipsPinned || attract);

  const toggleBubble = () => {
    if (open) {
      closeTalker();
      return;
    }
    setChipsPinned(false);
    setHovered(false);
    setAttract(false);
    openTalker();
  };

  const openFromChip = (intent: TalkerIntent) => {
    setChipsPinned(false);
    setHovered(false);
    setAttract(false);
    openTalker(intent);
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
        {!open && !hideNudges ? (
          <div
            onPointerEnter={fineHover ? onChipRegionEnter : undefined}
            onPointerLeave={fineHover ? onChipRegionLeave : undefined}
            aria-hidden={!chipsShown}
            className={`absolute right-0 bottom-full z-30 flex w-max flex-col items-end gap-1.5 pb-3 transition-opacity duration-200 ${TOUCH_SAFE_CLASS} ${
              chipsShown
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            {invites.map((invite) => {
              const shine = invite.intent === "talker";
              return (
                <TouchSafeButton
                  key={invite.label}
                  tabIndex={chipsShown ? 0 : -1}
                  onActivate={() => openFromChip(invite.intent)}
                  className={`relative max-w-[min(calc(100vw-6rem),20rem)] rounded-full border bg-background px-3 py-1.5 text-left text-[13px] leading-snug text-ink transition-colors hover:border-ink ${TOUCH_SAFE_CLASS} ${
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
                  <span className={`relative z-10 ${TOUCH_SAFE_CLASS}`}>
                    {invite.label}
                  </span>
                </TouchSafeButton>
              );
            })}
          </div>
        ) : null}

        <TouchSafeButton
          onActivate={toggleBubble}
          onPointerEnter={fineHover ? onChipRegionEnter : undefined}
          onPointerLeave={fineHover ? onChipRegionLeave : undefined}
          aria-label={t.bubble.open}
          aria-expanded={open}
          className={`pointer-events-auto relative z-10 flex size-[80px] cursor-pointer items-center justify-center overflow-visible border-0 bg-transparent p-0 shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C43F17] ${TOUCH_SAFE_CLASS}`}
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
            className={`pointer-events-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.12)] ${TOUCH_SAFE_CLASS}`}
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
            className={`absolute top-0.5 right-0.5 z-20 flex size-5 items-center justify-center rounded-full bg-[#E11D48] text-[11px] font-semibold leading-none text-white transition-opacity duration-300 ${TOUCH_SAFE_CLASS} ${
              attract ? "opacity-100" : "opacity-0"
            }`}
          >
            1
          </span>
        </TouchSafeButton>
      </div>
    </>
  );
}
