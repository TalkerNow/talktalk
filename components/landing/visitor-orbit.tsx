"use client";

import { useEffect, useRef, useState } from "react";
import { IdleTalkerBubble } from "@/components/landing/idle-talker-bubble";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";

const OUTER = [
  "/orbit/camille.svg",
  "/orbit/luc.svg",
  "/orbit/amina.svg",
  "/orbit/noah.svg",
  "/orbit/ines.svg",
] as const;

const INNER = [
  "/orbit/marc.svg",
  "/orbit/sofia.svg",
  "/orbit/yanis.svg",
  "/orbit/lea.svg",
] as const;

const CANVAS = 460;

function VisitorPastille({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      width={48}
      height={48}
      draggable={false}
      className="size-full rounded-full object-cover shadow-[0_4px_14px_rgba(17,17,17,0.12)] ring-2 ring-white"
    />
  );
}

export function VisitorOrbit() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const update = () => {
      const width = frame.getBoundingClientRect().width;
      setScale(width > 0 ? Math.min(1, width / CANVAS) : 1);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className="mx-auto w-full min-w-0 max-w-[min(460px,100%)]" aria-hidden>
      <div className="relative aspect-square w-full min-w-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 size-[460px] origin-center"
          style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        >
          <div className="relative flex size-full items-center justify-center">
            <IdleTalkerBubble className="relative z-10 size-[88px] drop-shadow-[0_8px_20px_rgba(0,0,0,0.08)]" />
            <OrbitingCircles
              className="motion-reduce:animate-none"
              duration={48}
              iconSize={48}
              path
              radius={190}
            >
              {OUTER.map((src) => (
                <VisitorPastille key={src} src={src} />
              ))}
            </OrbitingCircles>
            <OrbitingCircles
              className="motion-reduce:animate-none"
              duration={40}
              iconSize={40}
              path
              radius={112}
              reverse
            >
              {INNER.map((src) => (
                <VisitorPastille key={src} src={src} />
              ))}
            </OrbitingCircles>
          </div>
        </div>
      </div>
    </div>
  );
}
