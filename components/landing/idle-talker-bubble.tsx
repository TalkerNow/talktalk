import {
  BUBBLE_DOTS,
  BUBBLE_OUTLINE,
  BUBBLE_STROKE,
  BUBBLE_VIEWBOX,
} from "@/components/brand/bubble";

export function IdleTalkerBubble({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={BUBBLE_VIEWBOX}
      role="img"
      aria-hidden="true"
      className={className}
    >
      <path
        d={BUBBLE_OUTLINE}
        fill="#F7F6F4"
        stroke="#C43F17"
        strokeWidth={BUBBLE_STROKE}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {BUBBLE_DOTS.map((dot) => (
        <circle key={dot.cx} cx={dot.cx} cy={dot.cy} r={dot.r} fill={dot.fill} />
      ))}
    </svg>
  );
}
