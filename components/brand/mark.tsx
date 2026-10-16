import { cn } from "@/lib/utils";

/** Tight crop around the rust bubble + tail (not the padded source artboard). */
const BUBBLE_VIEWBOX = "-520 -470 1040 1080";

type MarkProps = {
  className?: string;
  title?: string;
  filled?: boolean;
};

export function TalkerMark({ className, title, filled = false }: MarkProps) {
  const decorative = !title;
  if (filled) {
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
          fill="#C43F17"
          fillRule="evenodd"
          d="M -312.50 338.28 A 500.00 433.35 0 1 1 -100.00 424.60 L -312.50 554.69 Z M -292.2 0 A 48.7 48.7 0 1 0 -194.8 0 A 48.7 48.7 0 1 0 -292.2 0 Z M -121.75 0 A 73.05 73.05 0 1 0 24.35 0 A 73.05 73.05 0 1 0 -121.75 0 Z M 97.4 0 A 97.4 97.4 0 1 0 292.2 0 A 97.4 97.4 0 1 0 97.4 0 Z"
        />
      </svg>
    );
  }
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
        d="M -93.33 396.27 A 466.65 400.00 0 1 0 -291.66 315.72 L -312.50 554.69 Z"
        fill="none"
        stroke="#C43F17"
        strokeWidth="66.70"
        strokeLinejoin="miter"
        strokeMiterlimit={10}
      />
      <circle cx="-243.5" cy="0" r="48.7" fill="#111111" />
      <circle cx="-48.7" cy="0" r="73.05" fill="#111111" />
      <circle cx="194.8" cy="0" r="97.4" fill="#111111" />
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
          d="M -93.33 396.27 A 466.65 400.00 0 1 0 -291.66 315.72 L -312.50 554.69 Z"
          fill="none"
          stroke="#C43F17"
          strokeWidth="66.70"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
        />
        <circle cx="-243.5" cy="0" r="48.7" fill="#111111" />
        <circle cx="-48.7" cy="0" r="73.05" fill="#111111" />
        <circle cx="194.8" cy="0" r="97.4" fill="#111111" />
      </svg>
      <span className="tracking-[-0.02em]">
        <span className="font-bold text-[#111111]">talker</span>
        <span className="font-normal text-[#6B6B73]">.now</span>
      </span>
    </span>
  );
}
