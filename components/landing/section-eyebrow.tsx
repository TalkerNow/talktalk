import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Charte v1 accent pastille — Attio-tight pill, no hairline rails. */
export function SectionEyebrow({
  children,
  className,
  onDark = false,
}: {
  children: ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span
      className={cn(
        "mb-6 inline-flex items-center rounded-full px-3 py-1 text-xs font-mono font-medium tracking-wide text-[#C43F17]",
        onDark ? "bg-[#FAEDE7]/90" : "bg-[#FAEDE7]",
        className
      )}
    >
      {children}
    </span>
  );
}
