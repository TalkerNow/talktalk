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
  return (
    <div className="flex justify-center" aria-hidden>
      <div className="origin-center scale-[0.72] sm:scale-[0.88] lg:scale-100">
        <div className="relative flex h-[460px] w-[460px] items-center justify-center overflow-visible">
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
  );
}
