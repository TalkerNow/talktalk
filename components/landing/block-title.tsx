import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Pastel rust chip used as the crawlable section <h2>. Same fill on every block. */
export function BlockTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mb-6 inline-block rounded-full bg-[#F4D4C8] px-3.5 py-1.5 text-[13px] font-medium leading-none text-[#111111]",
        className
      )}
    >
      {children}
    </h2>
  );
}
