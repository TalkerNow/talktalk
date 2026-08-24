"use client";

import { useRef, type RefObject } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { IdleTalkerBubble } from "@/components/landing/idle-talker-bubble";
import { VarianteLabel } from "@/components/landing/variante-label";
import { useLocale } from "@/components/i18n/locale-context";

const PEOPLE = [
  "/orbit/camille.svg",
  "/orbit/luc.svg",
  "/orbit/amina.svg",
  "/orbit/noah.svg",
  "/orbit/ines.svg",
  "/orbit/marc.svg",
] as const;

const DURATION = 6;

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
      className="z-10 size-12 overflow-hidden rounded-full bg-[#EDECEA] shadow-[0_4px_14px_rgba(17,17,17,0.10)] ring-2 ring-white"
    >
      <img src={src} alt="" width={48} height={48} className="size-full object-cover" />
    </div>
  );
}

function BeamRoundTrip({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  delay = 0,
  pathColor,
  gradientStartColor,
  gradientStopColor,
}: {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  delay?: number;
  pathColor: string;
  gradientStartColor: string;
  gradientStopColor: string;
}) {
  const shared = {
    containerRef,
    fromRef,
    toRef,
    curvature,
    duration: DURATION,
    pathColor,
    gradientStartColor,
    gradientStopColor,
  };

  return (
    <>
      <AnimatedBeam {...shared} delay={delay} />
      <AnimatedBeam {...shared} delay={delay + DURATION / 2} reverse />
    </>
  );
}

export function InfraBeamVariant() {
  const { t } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const p1 = useRef<HTMLDivElement>(null);
  const p2 = useRef<HTMLDivElement>(null);
  const p3 = useRef<HTMLDivElement>(null);
  const p4 = useRef<HTMLDivElement>(null);
  const p5 = useRef<HTMLDivElement>(null);
  const p6 = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden border-t border-foreground/8 py-8 lg:py-10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <VarianteLabel />
        <p className="mt-3 mb-6 max-w-xl text-sm text-muted-foreground">{t.compare.beamLead}</p>
        <div
          ref={containerRef}
          className="relative mx-auto flex h-[280px] w-full max-w-2xl items-center justify-center overflow-visible p-4 sm:h-[320px]"
        >
          <div className="flex size-full max-h-[240px] max-w-xl flex-col justify-between">
            <div className="flex flex-row items-center justify-between">
              <PersonNode src={PEOPLE[0]} nodeRef={p1} />
              <PersonNode src={PEOPLE[1]} nodeRef={p2} />
            </div>
            <div className="flex flex-row items-center justify-between">
              <PersonNode src={PEOPLE[2]} nodeRef={p3} />
              <div ref={centerRef} className="z-10 flex size-20 items-center justify-center">
                <IdleTalkerBubble className="size-[72px]" />
              </div>
              <PersonNode src={PEOPLE[3]} nodeRef={p4} />
            </div>
            <div className="flex flex-row items-center justify-between">
              <PersonNode src={PEOPLE[4]} nodeRef={p5} />
              <PersonNode src={PEOPLE[5]} nodeRef={p6} />
            </div>
          </div>

          <BeamRoundTrip
            containerRef={containerRef}
            fromRef={p1}
            toRef={centerRef}
            curvature={-60}
            delay={0}
            pathColor="rgba(196,63,23,0.22)"
            gradientStartColor="#C43F17"
            gradientStopColor="#111111"
          />
          <BeamRoundTrip
            containerRef={containerRef}
            fromRef={p2}
            toRef={centerRef}
            curvature={-60}
            delay={0.25}
            pathColor="rgba(196,63,23,0.22)"
            gradientStartColor="#C43F17"
            gradientStopColor="#111111"
          />
          <BeamRoundTrip
            containerRef={containerRef}
            fromRef={p3}
            toRef={centerRef}
            delay={0.1}
            pathColor="rgba(17,17,17,0.18)"
            gradientStartColor="#111111"
            gradientStopColor="#C43F17"
          />
          <BeamRoundTrip
            containerRef={containerRef}
            fromRef={p4}
            toRef={centerRef}
            delay={0.35}
            pathColor="rgba(17,17,17,0.18)"
            gradientStartColor="#111111"
            gradientStopColor="#C43F17"
          />
          <BeamRoundTrip
            containerRef={containerRef}
            fromRef={p5}
            toRef={centerRef}
            curvature={60}
            delay={0.2}
            pathColor="rgba(196,63,23,0.22)"
            gradientStartColor="#C43F17"
            gradientStopColor="#111111"
          />
          <BeamRoundTrip
            containerRef={containerRef}
            fromRef={p6}
            toRef={centerRef}
            curvature={60}
            delay={0.45}
            pathColor="rgba(196,63,23,0.22)"
            gradientStartColor="#C43F17"
            gradientStopColor="#111111"
          />
        </div>
      </div>
    </section>
  );
}
