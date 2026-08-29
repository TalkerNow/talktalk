import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Attio-style pastel pill — crawlable section <h2>, CSS background only. */
export function SectionEyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mb-6 inline-flex items-center rounded-full bg-[#F4D4C8] px-3 py-1 text-xs font-medium leading-none text-[#111111]",
        className
      )}
    >
      {children}
    </h2>
  );
}
