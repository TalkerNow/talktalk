"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TalkerWordmark } from "@/components/brand/mark";
import { useTalker } from "./provider";
import { useLocale } from "@/components/i18n/locale-context";
import type { DemoStep } from "@/lib/content/demo";

type Message = {
  id: string;
  from: "bot" | "user";
  text: string;
};

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function TalkerChat({
  onClose,
  variant = "panel",
}: {
  onClose?: () => void;
  variant?: "panel" | "window";
}) {
  const { t } = useLocale();
  const demoSteps = t.demoSteps as Record<string, DemoStep>;
  const { intent, resetKey } = useTalker();
  const [stepId, setStepId] = useState("start");
  const [messages, setMessages] = useState<Message[]>([
    { id: "m0", from: "bot", text: demoSteps.start.bot },
  ]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const step = demoSteps[stepId];
  const lastBotIndex = messages.findLastIndex((message) => message.from === "bot");
  const showChips = Boolean(!pending && step?.chips?.length);

  useEffect(() => {
    setStepId("start");
    setMessages([{ id: "m0", from: "bot", text: demoSteps.start.bot }]);
    setDraft("");
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
  }, [resetKey, intent, demoSteps]);

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

  const nextFromText = (text: string) => {
    const needle = normalize(text);
    const match = [
      ...(step?.chips ?? []),
      ...(demoSteps.start.chips ?? []),
    ].find(
      (chip) =>
        normalize(chip.label) === needle || normalize(chip.userText) === needle,
    );
    if (match) return match.next;
    if (stepId === "email" || step?.askEmail) return "done";
    if (stepId === "question" || stepId === "rdv") return "email";
    if (stepId === "done") return "later";
    return "question";
  };

  const submitDraft = (event: React.FormEvent) => {
    event.preventDefault();
    const value = draft.trim();
    if (!value || pending) return;
    if ((step?.askEmail || stepId === "email") && !value.includes("@")) return;
    setDraft("");
    advance(nextFromText(value), value);
  };

  const chrome = useMemo(
    () => (
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="min-w-0">
          <TalkerWordmark className="text-[16px]" />
          <p className="mt-1.5 text-[11px] leading-none text-muted-2">
            {t.bubble.assistant}
          </p>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-2 py-1 text-sm text-muted transition-colors hover:text-ink"
            aria-label={t.bubble.closeTalker}
          >
            {t.bubble.close}
          </button>
        ) : null}
      </div>
    ),
    [onClose, t.bubble.assistant, t.bubble.close, t.bubble.closeTalker],
  );

  const askingEmail = Boolean(step?.askEmail);

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
        {messages.map((message, index) => (
          <div key={message.id}>
            <p
              className={
                message.from === "bot"
                  ? "max-w-[92%] rounded-2xl rounded-tl-md bg-[#f1ece5] px-3.5 py-2.5 text-[14px] leading-6 text-ink"
                  : "ml-auto max-w-[86%] rounded-2xl rounded-tr-md bg-ink px-3.5 py-2.5 text-[14px] leading-6 text-paper"
              }
            >
              {message.text}
            </p>
            {showChips && message.from === "bot" && index === lastBotIndex ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {step.chips?.map((chip) => (
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
          </div>
        ))}
        {pending ? (
          <p className="w-fit rounded-2xl bg-[#f1ece5] px-3.5 py-2.5">
            <span className="inline-flex items-center gap-1" aria-hidden>
              <span className="talker-typing-dot talker-typing-dot-1 size-1.5 rounded-full bg-[#111111]" />
              <span className="talker-typing-dot talker-typing-dot-2 size-1.5 rounded-full bg-[#111111]" />
              <span className="talker-typing-dot talker-typing-dot-3 size-1.5 rounded-full bg-[#111111]" />
            </span>
            <span className="sr-only">{t.bubble.writing}</span>
          </p>
        ) : null}
      </div>
      <form
        onSubmit={submitDraft}
        className="border-t border-line bg-white px-3 py-3"
      >
        <div className="flex items-center gap-2 rounded-full bg-[#F1ECE5] px-4 py-2">
          <label className="sr-only" htmlFor="talker-compose">
            {askingEmail ? t.contact.email : t.contact.message}
          </label>
          <input
            id="talker-compose"
            type={askingEmail ? "email" : "text"}
            required={askingEmail}
            disabled={pending}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={
              askingEmail
                ? (step.placeholder ?? t.demoSteps.email.placeholder)
                : t.bubble.placeholder
            }
            className="min-w-0 flex-1 border-0 bg-transparent p-0 text-[14px] text-ink outline-none placeholder:text-[#6B6B73] disabled:opacity-50"
          />
          <button
            type="submit"
            aria-label={t.bubble.send}
            disabled={pending || !draft.trim()}
            className="inline-flex shrink-0 text-[#C43F17] disabled:opacity-40"
          >
            <PaperPlane />
          </button>
        </div>
      </form>
      <p className="shrink-0 border-t border-foreground/8 bg-[#F7F6F4] px-3 py-2 text-center font-mono text-[10px] tracking-wide text-[#6B6B73]">
        {t.bubble.poweredBy}
      </p>
    </div>
  );
}

function PaperPlane() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="20"
      height="20"
      aria-hidden
    >
      <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 15.445-7.843.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" />
    </svg>
  );
}
