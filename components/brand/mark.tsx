type MarkProps = {
  className?: string;
  title?: string;
};

export function TalkerMark({ className, title }: MarkProps) {
  return (
    // Official rust bubble/waves from talker-now-logo.svg (cropped region).
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/talker-now-mark.svg"
      alt={title ?? ""}
      className={className}
    />
  );
}

export function TalkerWordmark({ compact = false }: { compact?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/talker-now-logo.svg"
      alt="talker.now"
      className={`h-7 w-auto ${compact ? "max-md:h-6" : ""}`}
    />
  );
}
