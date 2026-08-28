import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function DemoAssistantHeader({
  name,
  role,
  compact = false,
  trailing,
}: {
  name: string;
  role?: string;
  compact?: boolean;
  trailing?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-black/8",
        compact ? "px-3 py-2 md:px-3.5 md:py-2.5" : "px-4 py-3",
      )}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <Image
          src="/demo/marie.webp"
          alt=""
          width={compact ? 28 : 36}
          height={compact ? 28 : 36}
          className={cn(
            "shrink-0 rounded-full object-cover ring-1 ring-black/8",
            compact ? "size-7 md:size-8" : "size-9",
          )}
        />
        <div className="min-w-0">
          <p
            className={cn(
              "truncate font-medium leading-none text-[#111111]",
              compact ? "text-[12px] md:text-[14px]" : "text-[15px]",
            )}
          >
            {name}
          </p>
          {role ? (
            <p
              className={cn(
                "mt-1 truncate leading-none text-[#6B6B73]",
                compact ? "text-[9px] md:text-[10px]" : "text-[11px]",
              )}
            >
              {role}
            </p>
          ) : null}
        </div>
      </div>
      {trailing}
    </div>
  );
}

export function DemoPoweredBy({
  label,
  compact = false,
}: {
  label: string;
  compact?: boolean;
}) {
  return (
    <p
      className={cn(
        "shrink-0 border-t border-black/8 bg-[#F7F6F4] text-center font-mono tracking-wide text-[#6B6B73]",
        compact
          ? "px-2 py-1.5 text-[8px] md:px-2.5 md:py-1.5 md:text-[9px]"
          : "px-3 py-2 text-[10px]",
      )}
    >
      {label}
    </p>
  );
}
