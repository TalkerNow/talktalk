import type { ReactNode } from "react";
import { TalkerWordmark } from "@/components/brand/mark";
import type { Messages } from "@/lib/i18n/fr";
import { cn } from "@/lib/utils";

type Copy = Messages["installer"]["vignette"];

export function ChatPanel({
  copy,
  compact = false,
  headerExtra,
}: {
  copy: Copy;
  compact?: boolean;
  headerExtra?: ReactNode;
}) {
  const bubble = compact
    ? "px-2.5 py-2 text-[11px] leading-4 md:text-[13px] md:leading-5"
    : "px-3.5 py-2.5 text-[14px] leading-6";
  const chip = compact
    ? "px-2.5 py-1 text-[10px] md:text-[12px]"
    : "px-3 py-1.5 text-[13px]";

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#F7F6F4]">
      <div className="flex items-center justify-between border-b border-black/8 px-3 py-2.5 md:px-4 md:py-3">
        <div className="min-w-0">
          <TalkerWordmark
            className={compact ? "text-[13px] md:text-[15px]" : "text-[16px]"}
          />
          <p className="mt-1 text-[9px] leading-none text-[#6B6B73] md:mt-1.5 md:text-[11px]">
            {copy.assistant}
          </p>
        </div>
        {headerExtra}
      </div>
      <div
        className={cn(
          "min-h-0 flex-1 space-y-2 px-3 py-3",
          compact ? "overflow-hidden" : "overflow-y-auto",
          !compact && "space-y-3 px-4 py-4",
        )}
      >
        <p
          className={cn(
            "max-w-[92%] rounded-2xl rounded-tl-md bg-[#f1ece5] text-[#111111]",
            bubble,
          )}
        >
          {copy.greeting}
        </p>
        <div data-v="chat-chips" className="flex flex-wrap gap-1.5">
          <span
            data-v="chip-talker"
            className={cn(
              "rounded-full border border-[#C43F17]/40 bg-white text-[#111111]",
              chip,
            )}
          >
            {copy.chipTalker}
          </span>
          <span
            className={cn(
              "rounded-full border border-black/10 bg-white text-[#111111]",
              chip,
            )}
          >
            {copy.chipQuestion}
          </span>
        </div>
        <p
          data-v="chat-user"
          className={cn(
            "ml-auto max-w-[80%] rounded-2xl rounded-tr-md bg-[#111111] text-[#F7F6F4] opacity-0",
            bubble,
          )}
        >
          {copy.userMessage}
        </p>
        <p
          data-v="chat-typing"
          className={cn("w-fit rounded-2xl bg-[#f1ece5] opacity-0", bubble)}
        >
          <span className="inline-flex items-center gap-1">
            <span className="talker-typing-dot talker-typing-dot-1 size-1.5 rounded-full bg-[#111111]" />
            <span className="talker-typing-dot talker-typing-dot-2 size-1.5 rounded-full bg-[#111111]" />
            <span className="talker-typing-dot talker-typing-dot-3 size-1.5 rounded-full bg-[#111111]" />
          </span>
        </p>
        <p
          data-v="chat-reply"
          className={cn(
            "max-w-[92%] rounded-2xl rounded-tl-md bg-[#f1ece5] text-[#111111] opacity-0",
            bubble,
          )}
        >
          {copy.botReply}
        </p>
      </div>
      <div className="border-t border-black/8 bg-white px-2.5 py-2 md:px-3 md:py-3">
        <div
          className={cn(
            "rounded-full bg-[#F1ECE5] text-[#6B6B73]",
            compact
              ? "px-3 py-1.5 text-[10px] md:text-[12px]"
              : "px-4 py-2 text-[14px]",
          )}
        >
          {copy.compose}
        </div>
      </div>
    </div>
  );
}
