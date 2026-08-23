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
        viewBox="-682.69 -622.02 1365.38 1365.38"
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
          d="M -312.50 338.28 A 500.00 433.35 0 1 1 -100.00 424.60 L -312.50 554.69 Z M -223 0 A 60 60 0 1 0 -103 0 A 60 60 0 1 0 -223 0 Z M -60 0 A 60 60 0 1 0 60 0 A 60 60 0 1 0 -60 0 Z M 103 0 A 60 60 0 1 0 223 0 A 60 60 0 1 0 103 0 Z"
        />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-682.69 -622.02 1365.38 1365.38"
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
      <circle cx="-163" cy="0" r="60" fill="#111111" />
      <circle cx="0" cy="0" r="60" fill="#111111" />
      <circle cx="163" cy="0" r="60" fill="#111111" />
    </svg>
  );
}

export function TalkerWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      aria-label="talker.now"
      className={`inline-flex items-center gap-2 leading-none ${compact ? "text-[18px]" : "text-[17px]"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-682.69 -622.02 1365.38 1365.38"
        width="1em"
        height="1em"
        role="img"
        aria-hidden="true"
        className="h-[1.05em] w-auto shrink-0"
      >
        <path
          d="M -93.33 396.27 A 466.65 400.00 0 1 0 -291.66 315.72 L -312.50 554.69 Z"
          fill="none"
          stroke="#C43F17"
          strokeWidth="66.70"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
        />
        <circle cx="-163" cy="0" r="60" fill="#111111" />
        <circle cx="0" cy="0" r="60" fill="#111111" />
        <circle cx="163" cy="0" r="60" fill="#111111" />
      </svg>
      <span className="tracking-[-0.02em]">
        <span className="font-bold text-[#111111]">talker</span>
        <span className="font-normal text-[#6B6B73]">.now</span>
      </span>
    </span>
  );
}
