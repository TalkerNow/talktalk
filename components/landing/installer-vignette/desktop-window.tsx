import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DesktopWindow({
  app,
  className,
  innerClassName,
  header,
  children,
}: {
  app: string;
  className?: string;
  innerClassName?: string;
  header?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      data-home-hero="desktop-window"
      data-home-hero-app={app}
      data-v={app}
      className={cn(
        "absolute touch-none select-none overflow-hidden rounded-lg bg-white/80 p-[3px] pt-0 shadow-[0_22px_55px_rgba(17,17,17,0.14)] backdrop-blur-md will-change-transform lg:rounded-2xl lg:p-1.5 lg:pt-0",
        className,
      )}
    >
      <div className="flex h-4 items-center gap-2 pl-1 lg:h-8 lg:pl-2">
        <div className="flex shrink-0 items-center gap-[3px] lg:gap-1.5">
          <span className="size-1.5 rounded-full bg-[#FF5F57] lg:size-3" />
          <span className="size-1.5 rounded-full bg-[#FEBC2E] lg:size-3" />
          <span className="size-1.5 rounded-full bg-[#28C840] lg:size-3" />
        </div>
        {header}
      </div>
      <div
        className={cn(
          "overflow-hidden rounded-md bg-white lg:rounded-xl lg:border lg:border-black/[0.06]",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
