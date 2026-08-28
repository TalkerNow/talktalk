import type { ReactNode } from "react";
import type { Messages } from "@/lib/i18n/fr";
import { cn } from "@/lib/utils";
import { DemoAssistantHeader, DemoPoweredBy } from "./demo-assistant-header";

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
    ? "px-2.5 py-1.5 text-[11px] leading-snug md:text-[13px] md:leading-snug"
    : "px-3.5 py-2.5 text-[14px] leading-6";

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#F7F6F4]">
      <DemoAssistantHeader
        name={copy.assistantName}
        role={copy.assistantRole}
        compact={compact}
        trailing={headerExtra}
      />
      <div
        className={cn(
          "min-h-0 flex-1 px-3 py-3",
          compact ? "space-y-1.5 overflow-hidden" : "space-y-3 overflow-y-auto px-4 py-4",
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
        {/* Hidden hooks kept for the GSAP timeline (no invite chips in this demo). */}
        <div data-v="chat-chips" className="hidden" aria-hidden>
          <span data-v="chip-talker">{copy.chipTalker}</span>
          <span>{copy.chipQuestion}</span>
        </div>
        <p
          data-v="chat-user"
          className={cn(
            "ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-[#111111] text-[#F7F6F4] opacity-0",
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
      <div className="border-t border-black/8 bg-white px-2.5 py-2 md:px-3 md:py-2.5">
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
      <DemoPoweredBy label={copy.poweredBy} compact={compact} />
    </div>
  );
}
