type MarkProps = {
  className?: string;
  title?: string;
};

export function TalkerMark({ className, title }: MarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <rect width="32" height="32" rx="9" fill="#C43F17" />
      <rect x="7.5" y="9.5" width="17" height="2.6" rx="1.3" fill="#F6F3EE" />
      <rect x="7.5" y="14.7" width="13" height="2.6" rx="1.3" fill="#F6F3EE" />
      <rect x="7.5" y="19.9" width="8.5" height="2.6" rx="1.3" fill="#F6F3EE" />
    </svg>
  );
}

export function TalkerWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <TalkerMark className="size-7 shrink-0" />
      <span
        className={`font-sans text-[15px] font-medium tracking-[-0.02em] text-ink ${compact ? "sr-only sm:not-sr-only" : ""}`}
      >
        talker
        <span className="text-rust">.now</span>
      </span>
    </span>
  );
}
