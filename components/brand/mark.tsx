import { cn } from "@/lib/utils";
import {
  BUBBLE_DOTS,
  BUBBLE_OUTLINE,
  BUBBLE_STROKE,
  BUBBLE_VIEWBOX,
} from "@/components/brand/bubble";

type MarkProps = {
  className?: string;
  title?: string;
};

function BubbleDots() {
  return (
    <>
      {BUBBLE_DOTS.map((dot) => (
        <circle
          key={dot.cx}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill={dot.fill}
        />
      ))}
    </>
  );
}

export function TalkerMark({ className, title }: MarkProps) {
  const decorative = !title;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={BUBBLE_VIEWBOX}
      width="1em"
      height="1em"
      role="img"
      aria-hidden={decorative ? true : undefined}
      aria-label={title}
      className={className}
    >
      <path
        d={BUBBLE_OUTLINE}
        fill="none"
        stroke="#C43F17"
        strokeWidth={BUBBLE_STROKE}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <BubbleDots />
    </svg>
  );
}

export function TalkerWordmark({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-label="talker.now"
      className={cn(
        "inline-flex items-center gap-2 leading-none",
        "whitespace-nowrap",
        compact ? "text-[28px]" : "text-[30px]",
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={BUBBLE_VIEWBOX}
        width="1em"
        height="1em"
        role="img"
        aria-hidden="true"
        className="h-[1.2em] w-auto shrink-0"
      >
        <path
          d={BUBBLE_OUTLINE}
          fill="none"
          stroke="#C43F17"
          strokeWidth={BUBBLE_STROKE}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <BubbleDots />
      </svg>
      <span className="tracking-[-0.02em]">
        <span className="font-bold text-[#111111]">talker</span>
        <span className="font-normal text-[#6B6B73]">.now</span>
      </span>
    </span>
  );
}
