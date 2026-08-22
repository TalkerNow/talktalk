type MarkProps = {
  className?: string;
  title?: string;
  filled?: boolean;
};

export function TalkerMark({ className, title, filled = false }: MarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={filled ? "/brand/symbole-plein.svg" : "/brand/symbole.svg"}
      alt={title ?? ""}
      className={className}
    />
  );
}

export function TalkerWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      aria-label="talker.now"
      className={`inline-flex items-center gap-2 leading-none ${compact ? "text-[15px]" : "text-[17px]"}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/symbole.svg"
        alt=""
        className="h-[1.05em] w-auto shrink-0"
      />
      <span className="tracking-[-0.02em]">
        <span className="font-bold text-[#111111]">talker</span>
        <span className="font-normal text-[#6B6B73]">.now</span>
      </span>
    </span>
  );
}
