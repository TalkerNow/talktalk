"use client";

// Parked: same-avatar round-trip beam. Not mounted on the public landing.
import { useEffect, useRef, useState, type RefObject } from "react";
import { motion } from "motion/react";
import { IdleTalkerBubble } from "@/components/landing/idle-talker-bubble";

const PEOPLE = [
  "/orbit/camille.svg",
  "/orbit/luc.svg",
  "/orbit/amina.svg",
  "/orbit/noah.svg",
  "/orbit/ines.svg",
  "/orbit/marc.svg",
] as const;

const TRIP_MS = 3.2;
const GAP_MS = 0.45;
const SLOT = TRIP_MS + GAP_MS;
const PEOPLE_COUNT = PEOPLE.length;

function PersonNode({
  src,
  nodeRef,
}: {
  src: string;
  nodeRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={nodeRef}
      className="z-10 size-8 overflow-hidden rounded-full bg-[#EDECEA] shadow-[0_3px_10px_rgba(17,17,17,0.10)] ring-2 ring-white"
    >
      <img src={src} alt="" width={32} height={32} className="size-full object-cover" />
    </div>
  );
}

function RoundTripPulse({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  delay = 0,
  pathColor,
  pulseColor,
}: {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  delay?: number;
  pathColor: string;
  pulseColor: string;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathD, setPathD] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const from = fromRef.current.getBoundingClientRect();
      const to = toRef.current.getBoundingClientRect();
      setSize({ width: containerRect.width, height: containerRect.height });
      const startX = from.left - containerRect.left + from.width / 2;
      const startY = from.top - containerRect.top + from.height / 2;
      const endX = to.left - containerRect.left + to.width / 2;
      const endY = to.top - containerRect.top + to.height / 2;
      const controlY = startY - curvature;
      setPathD(
        `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`
      );
    };

    const resizeObserver = new ResizeObserver(updatePath);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    updatePath();
    return () => resizeObserver.disconnect();
  }, [containerRef, fromRef, toRef, curvature]);

  useEffect(() => {
    if (!pathRef.current || !pathD) return;
    setPathLength(pathRef.current.getTotalLength());
  }, [pathD]);

  const pulse = Math.min(40, Math.max(20, pathLength * 0.18));

  return (
    <svg
      fill="none"
      width={size.width}
      height={size.height}
      className="pointer-events-none absolute top-0 left-0 transform-gpu"
      viewBox={`0 0 ${size.width} ${size.height}`}
    >
      <path
        ref={pathRef}
        d={pathD}
        stroke={pathColor}
        strokeWidth={1.25}
        strokeLinecap="round"
      />
      {pathLength > 0 ? (
        <motion.path
          d={pathD}
          stroke={pulseColor}
          strokeWidth={1.85}
          strokeLinecap="round"
          strokeDasharray={`${pulse} ${pathLength}`}
          initial={{ strokeDashoffset: pathLength }}
          animate={{ strokeDashoffset: [pathLength, 0, pathLength] }}
          transition={{
            duration: TRIP_MS,
            times: [0, 0.5, 1],
            ease: ["easeOut", "easeIn"],
            delay,
            repeat: Infinity,
            repeatDelay: SLOT * (PEOPLE_COUNT - 1),
          }}
        />
      ) : null}
    </svg>
  );
}

export function TalkerBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const p1 = useRef<HTMLDivElement>(null);
  const p2 = useRef<HTMLDivElement>(null);
  const p3 = useRef<HTMLDivElement>(null);
  const p4 = useRef<HTMLDivElement>(null);
  const p5 = useRef<HTMLDivElement>(null);
  const p6 = useRef<HTMLDivElement>(null);

  const emitters = [
    { ref: p1, curvature: -28, color: "#C43F17", track: "rgba(196,63,23,0.28)" },
    { ref: p2, curvature: -28, color: "#111111", track: "rgba(17,17,17,0.22)" },
    { ref: p3, curvature: 0, color: "#C43F17", track: "rgba(196,63,23,0.28)" },
    { ref: p4, curvature: 0, color: "#111111", track: "rgba(17,17,17,0.22)" },
    { ref: p5, curvature: 28, color: "#C43F17", track: "rgba(196,63,23,0.28)" },
    { ref: p6, curvature: 28, color: "#111111", track: "rgba(17,17,17,0.22)" },
  ] as const;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex h-[168px] w-full max-w-md items-center justify-center overflow-visible sm:h-[180px]"
      aria-hidden
    >
      <div className="flex size-full max-h-[148px] max-w-sm flex-col justify-between py-1">
        <div className="flex flex-row items-center justify-between px-6">
          <PersonNode src={PEOPLE[0]} nodeRef={p1} />
          <PersonNode src={PEOPLE[1]} nodeRef={p2} />
        </div>
        <div className="flex flex-row items-center justify-between">
          <PersonNode src={PEOPLE[2]} nodeRef={p3} />
          <div ref={centerRef} className="z-10 flex size-14 items-center justify-center">
            <IdleTalkerBubble className="size-[52px]" />
          </div>
          <PersonNode src={PEOPLE[3]} nodeRef={p4} />
        </div>
        <div className="flex flex-row items-center justify-between px-6">
          <PersonNode src={PEOPLE[4]} nodeRef={p5} />
          <PersonNode src={PEOPLE[5]} nodeRef={p6} />
        </div>
      </div>

      {emitters.map((emitter, index) => (
        <RoundTripPulse
          key={PEOPLE[index]}
          containerRef={containerRef}
          fromRef={emitter.ref}
          toRef={centerRef}
          curvature={emitter.curvature}
          delay={index * SLOT}
          pathColor={emitter.track}
          pulseColor={emitter.color}
        />
      ))}
    </div>
  );
}
