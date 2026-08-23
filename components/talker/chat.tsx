"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { demoSteps } from "@/lib/content/demo";
import { TalkerWordmark } from "@/components/brand/mark";
import { useTalker } from "./provider";

type Message = {
  id: string;
  from: "bot" | "user";
  text: string;
};

export function TalkerChat({
  onClose,
  variant = "panel",
}: {
  onClose?: () => void;
  variant?: "panel" | "window";
}) {
  const { intent, resetKey } = useTalker();
  const [stepId, setStepId] = useState("start");
  const [messages, setMessages] = useState<Message[]>([
    { id: "m0", from: "bot", text: demoSteps.start.bot },
  ]);
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const step = demoSteps[stepId];

  useEffect(() => {
    setStepId("start");
    setMessages([{ id: "m0", from: "bot", text: demoSteps.start.bot }]);
    setEmail("");
    setPending(false);

    if (!intent) return;

    const chip = demoSteps.start.chips?.find((item) => item.next === intent);
    const next = demoSteps[intent];
    if (!chip || !next) return;

    setPending(true);
    setMessages((current) => [
      ...current,
      { id: `u-${current.length}`, from: "user", text: chip.userText },
    ]);

    const timer = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: `b-${current.length}`, from: "bot", text: next.bot },
      ]);
      setStepId(intent);
      setPending(false);
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [resetKey, intent]);

  useEffect(() => {
    scroller.current?.scrollTo({
      top: scroller.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, stepId, pending]);

  const advance = (nextId: string, userText?: string) => {
    const next = demoSteps[nextId];
    if (!next) return;
    setPending(true);
    if (userText) {
      setMessages((current) => [
        ...current,
        { id: `u-${current.length}`, from: "user", text: userText },
      ]);
    }
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: `b-${current.length}`, from: "bot", text: next.bot },
      ]);
      setStepId(nextId);
      setPending(false);
    }, 1800);
  };

  const submitEmail = (event: React.FormEvent) => {
    event.preventDefault();
    const value = email.trim();
    if (!value.includes("@")) return;
    advance("done", value);
    setEmail("");
  };

  const chrome = useMemo(
    () => (
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="min-w-0">
          <TalkerWordmark className="text-[16px]" />
          <p className="mt-1.5 text-[11px] leading-none text-muted-2">
            L&apos;assistant du cabinet
          </p>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-2 py-1 text-sm text-muted transition-colors hover:text-ink"
            aria-label="Fermer Talker"
          >
            Fermer
          </button>
        ) : null}
      </div>
    ),
    [onClose],
  );

  return (
    <div
      className={
        variant === "panel"
          ? "flex h-full min-h-[420px] flex-col bg-paper"
          : "flex h-full flex-col bg-paper"
      }
    >
      {chrome}
      <div
        ref={scroller}
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
      >
        {messages.map((message) => (
          <p
            key={message.id}
            className={
              message.from === "bot"
                ? "max-w-[92%] rounded-2xl rounded-tl-md bg-[#f1ece5] px-3.5 py-2.5 text-[14px] leading-6 text-ink"
                : "ml-auto max-w-[86%] rounded-2xl rounded-tr-md bg-ink px-3.5 py-2.5 text-[14px] leading-6 text-paper"
            }
          >
            {message.text}
          </p>
        ))}
        {pending ? (
          <p className="w-fit rounded-2xl bg-[#f1ece5] px-3.5 py-2.5">
            <span className="inline-flex items-center gap-1" aria-hidden>
              <span className="talker-typing-dot talker-typing-dot-1 size-1.5 rounded-full bg-[#111111]" />
              <span className="talker-typing-dot talker-typing-dot-2 size-1.5 rounded-full bg-[#111111]" />
              <span className="talker-typing-dot talker-typing-dot-3 size-1.5 rounded-full bg-[#111111]" />
            </span>
            <span className="sr-only">Talker écrit</span>
          </p>
        ) : null}
      </div>
      <div className="border-t border-line px-3 py-3">
        {step?.chips && !pending ? (
          <div className="mb-3 flex flex-wrap gap-2">
            {step.chips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => advance(chip.next, chip.userText)}
                className="rounded-full border border-line bg-background px-3 py-1.5 text-[13px] text-ink transition-colors hover:border-ink"
              >
                {chip.label}
              </button>
            ))}
          </div>
        ) : null}
        {step?.askEmail && !pending ? (
          <form onSubmit={submitEmail} className="mb-3 flex gap-2">
            <label className="sr-only" htmlFor="talker-demo-email">
              Email
            </label>
            <input
              id="talker-demo-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={step.placeholder ?? "email@cabinet.fr"}
              className="min-w-0 flex-1 rounded-full border border-line bg-background px-3 py-2 text-[13px] outline-none focus:border-ink"
            />
            <button
              type="submit"
              className="rounded-full bg-ink px-3 py-2 text-[13px] text-paper"
            >
              Envoyer
            </button>
          </form>
        ) : null}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-muted-2">
            <span
              className="inline-flex size-7 items-center justify-center rounded-full border border-line"
              aria-hidden
              title="Pièce jointe — plus tard"
            >
              <ClipIcon />
            </span>
            <span
              className="inline-flex size-7 items-center justify-center rounded-full border border-line"
              aria-hidden
              title="Micro — plus tard"
            >
              <MicIcon />
            </span>
          </div>
          <p className="text-[10px] tracking-wide text-muted-2">
            Démo — Talker mène le fil
          </p>
        </div>
      </div>
    </div>
  );
}

function ClipIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 12.5 14.2 6.3a3 3 0 1 1 4.2 4.2l-8.1 8.1a4.2 4.2 0 0 1-6-6l7.4-7.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="9"
        y="3.5"
        width="6"
        height="11"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M6 11.5a6 6 0 0 0 12 0M12 17.5V20.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
