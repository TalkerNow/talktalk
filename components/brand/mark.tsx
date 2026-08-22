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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo-principal.svg"
      alt="talker.now"
      className={`h-7 w-auto ${compact ? "max-md:h-6" : ""}`}
    />
  );
}
