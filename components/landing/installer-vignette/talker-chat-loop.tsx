"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocale } from "@/components/i18n/locale-context";
import { cn } from "@/lib/utils";
import { ChatPanel } from "./chat-panel";
import { addChatDialogue, resetChatDialogue } from "./chat-dialogue";

gsap.registerPlugin(useGSAP);

export function TalkerChatLoop({
  headerExtra,
  className,
}: {
  headerExtra?: ReactNode;
  className?: string;
}) {
  const { t, locale } = useLocale();
  const copy = t.installer.vignette;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          any: "(min-width: 0px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduceMotion } = context.conditions ?? {};
          const q = (sel: string) => root.querySelector(sel);
          const els = {
            chips: q('[data-v="chat-chips"]'),
            chipTalker: q('[data-v="chip-talker"]'),
            user: q('[data-v="chat-user"]'),
            typing: q('[data-v="chat-typing"]'),
            reply: q('[data-v="chat-reply"]'),
          };

          resetChatDialogue(els);
          if (reduceMotion) return;

          const tl = gsap.timeline({
            repeat: -1,
            repeatDelay: 1.4,
            defaults: { ease: "power2.out" },
          });
          tl.call(() => resetChatDialogue(els), undefined, 0);
          const done = addChatDialogue(tl, els);
          tl.to([els.user, els.reply], { autoAlpha: 0, duration: 0.4 }, done);
          tl.to(els.chips, { autoAlpha: 1, duration: 0.3 }, done + 0.15);

          const onVis = () => {
            if (document.hidden) tl.pause();
            else tl.resume();
          };
          document.addEventListener("visibilitychange", onVis);
          const io = new IntersectionObserver(
            ([entry]) => {
              if (!entry) return;
              if (entry.isIntersecting && !document.hidden) tl.resume();
              else tl.pause();
            },
            { threshold: 0.2 },
          );
          io.observe(root);

          return () => {
            document.removeEventListener("visibilitychange", onVis);
            io.disconnect();
          };
        },
        root,
      );

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={copy.ariaLabel}
      className={cn("flex min-h-0 flex-col", className)}
    >
      <ChatPanel copy={copy} headerExtra={headerExtra} />
    </div>
  );
}
