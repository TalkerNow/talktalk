"use client";

import { Fragment, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocale } from "@/components/i18n/locale-context";
import { cn } from "@/lib/utils";
import { DemoAssistantHeader, DemoPoweredBy } from "./demo-assistant-header";

gsap.registerPlugin(useGSAP);

export function TalkerChatLoop({
  headerExtra,
  className,
}: {
  headerExtra?: ReactNode;
  className?: string;
}) {
  const { t, locale } = useLocale();
  const conversation = t.how.conversation;
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
          const msgs = Array.from(root.querySelectorAll<HTMLElement>("[data-v='msg']"));
          const typings = Array.from(
            root.querySelectorAll<HTMLElement>("[data-v='typing']"),
          );

          const reset = () => {
            gsap.set(msgs, { autoAlpha: 0, y: 6 });
            gsap.set(typings, { autoAlpha: 0, y: 4, display: "none" });
          };

          reset();

          if (reduceMotion) {
            gsap.set(msgs, { autoAlpha: 1, y: 0 });
            return;
          }

          const tl = gsap.timeline({
            repeat: -1,
            repeatDelay: 1.2,
            defaults: { ease: "power2.out" },
          });
          tl.call(reset, undefined, 0);

          let t = 0.35;
          conversation.forEach((message, index) => {
            const msgEl = msgs[index];
            if (!msgEl) return;

            if (message.from === "bot") {
              const typingEl = root.querySelector<HTMLElement>(
                `[data-v="typing"][data-i="${index}"]`,
              );
              if (typingEl) {
                tl.set(typingEl, { display: "block" }, t);
                tl.to(typingEl, { autoAlpha: 1, y: 0, duration: 0.22 }, t);
                t += 0.85;
                tl.to(typingEl, { autoAlpha: 0, duration: 0.15 }, t);
                tl.set(typingEl, { display: "none" }, t + 0.15);
                t += 0.08;
              }
            }

            tl.to(msgEl, { autoAlpha: 1, y: 0, duration: 0.28 }, t);
            t += message.from === "user" ? 1.15 : 2.1;
          });

          t += 1.6;
          tl.to(msgs, { autoAlpha: 0, duration: 0.35 }, t);

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
      aria-label={t.how.title}
      className={cn("flex min-h-0 flex-col", className)}
    >
      <DemoAssistantHeader
        name={t.how.assistantName}
        role={t.how.assistantRole}
        trailing={headerExtra}
      />

      <div className="min-h-0 flex-1 space-y-1 overflow-y-auto px-4 py-3">
        {conversation.map((message, index) => (
          <Fragment key={`${message.from}-${index}`}>
            {message.from === "bot" ? (
              <p
                data-v="typing"
                data-i={index}
                className="hidden w-fit rounded-2xl bg-[#f1ece5] px-3 py-1.5 opacity-0"
              >
                <span className="inline-flex items-center gap-1">
                  <span className="talker-typing-dot talker-typing-dot-1 size-1.5 rounded-full bg-[#111111]" />
                  <span className="talker-typing-dot talker-typing-dot-2 size-1.5 rounded-full bg-[#111111]" />
                  <span className="talker-typing-dot talker-typing-dot-3 size-1.5 rounded-full bg-[#111111]" />
                </span>
              </p>
            ) : null}
            <p
              data-v="msg"
              data-i={index}
              className={cn(
                "px-3 py-1.5 text-[14px] leading-snug opacity-0",
                message.from === "bot"
                  ? "max-w-[92%] rounded-2xl rounded-tl-md bg-[#f1ece5] text-[#111111]"
                  : "ml-auto max-w-[86%] rounded-2xl rounded-tr-md bg-[#111111] text-[#F7F6F4]",
              )}
            >
              {message.text}
            </p>
          </Fragment>
        ))}
      </div>

      <div className="border-t border-black/8 bg-white px-3 py-3">
        <div className="rounded-full bg-[#F1ECE5] px-4 py-2 text-[14px] text-[#6B6B73]">
          {t.how.placeholder}
        </div>
      </div>
      <DemoPoweredBy label={t.how.poweredBy} />
    </div>
  );
}
