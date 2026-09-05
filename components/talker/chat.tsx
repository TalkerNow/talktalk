"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { TalkerWordmark } from "@/components/brand/mark";
import { useTalker } from "./provider";
import { useLocale } from "@/components/i18n/locale-context";
import type { DemoStep } from "@/lib/content/demo";
import { DEMO_LLM_ENABLED } from "@/lib/demo/flags";

type Message = {
  id: string;
  from: "bot" | "user";
  text: string;
};

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

const DEMO_SESSION_KEY = "talkerDemoSession";

function demoSessionId() {
  try {
    const existing = window.sessionStorage.getItem(DEMO_SESSION_KEY);
    if (existing) return existing;
    const id = `tn_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    window.sessionStorage.setItem(DEMO_SESSION_KEY, id);
    return id;
  } catch {
    return `tn_${Date.now().toString(36)}`;
  }
}

export function TalkerChat({
  onClose,
  variant = "panel",
}: {
  onClose?: () => void;
  variant?: "panel" | "window";
}) {
  const { resetKey } = useTalker();
  return DEMO_LLM_ENABLED ? (
    <DemoLlmChat key={resetKey} onClose={onClose} variant={variant} />
  ) : (
    <ScriptedDemoChat key={resetKey} onClose={onClose} variant={variant} />
  );
}

function ChatShell({
  onClose,
  variant,
  children,
}: {
  onClose?: () => void;
  variant: "panel" | "window";
  children: ReactNode;
}) {
  const { t } = useLocale();
  const chrome = useMemo(
    () => (
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <TalkerWordmark className="text-[16px]" />
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-[22px] leading-none text-[#6B6B73] transition-colors hover:bg-[#EDEBE3] hover:text-[#111111]"
            aria-label={t.bubble.close}
          >
            <span aria-hidden>×</span>
          </button>
        ) : null}
      </div>
    ),
    [onClose, t.bubble.close],
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
      {children}
    </div>
  );
}

function DemoLlmChat({
  onClose,
  variant,
}: {
  onClose?: () => void;
  variant: "panel" | "window";
}) {
  const { t } = useLocale();
  const [messages, setMessages] = useState<Message[]>([
    { id: "m0", from: "bot", text: t.bubble.opener },
  ]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const idRef = useRef(0);
  const lastBotIndex = messages.findLastIndex((message) => message.from === "bot");
  const showSuggest =
    !pending && messages.every((message) => message.from !== "user");

  useEffect(() => {
    scroller.current?.scrollTo({
      top: scroller.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, pending]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const sendToLlm = async (text: string) => {
    const value = text.trim();
    if (!value || pending) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    idRef.current += 1;
    const userId = `u-${idRef.current}`;
    idRef.current += 1;
    const botId = `b-${idRef.current}`;
    const history = [
      ...messages,
      { id: userId, from: "user" as const, text: value },
    ];
    setDraft("");
    setPending(true);
    setMessages([
      ...history,
      { id: botId, from: "bot", text: "" },
    ]);

    const applyBot = (next: string) => {
      setMessages((current) =>
        current.map((message) =>
          message.id === botId ? { ...message, text: next } : message,
        ),
      );
    };

    const turns = history
      .filter((message) => message.text.trim())
      .map((message) => ({
        role: message.from === "bot" ? ("assistant" as const) : ("user" as const),
        content: message.text,
      }));

    try {
      const response = await fetch("/api/demo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          session: demoSessionId(),
          message: value,
          messages: turns,
          history: turns,
        }),
      });

      let data: { reply?: string; message?: string; text?: string } = {};
      try {
        data = (await response.json()) as typeof data;
      } catch {
        /* keep empty */
      }
      const reply = (data.reply || data.message || data.text || "").trim();
      applyBot(reply || t.bubble.fallback);
    } catch (error) {
      if (controller.signal.aborted) return;
      console.error("[demo-chat]", error);
      applyBot(t.bubble.fallback);
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setPending(false);
    }
  };

  const submitDraft = (event: React.FormEvent) => {
    event.preventDefault();
    void sendToLlm(draft);
  };

  return (
    <ChatShell onClose={onClose} variant={variant}>
      <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((message, index) => {
          if (message.from === "bot" && !message.text && pending) return null;
          return (
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
              {showSuggest &&
              message.from === "bot" &&
              index === lastBotIndex ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {t.bubble.suggest.map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => void sendToLlm(chip.userText)}
                      className="rounded-full border border-line bg-background px-3 py-1.5 text-[13px] text-ink transition-colors hover:border-ink"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
        {pending && messages.at(-1)?.from === "bot" && !messages.at(-1)?.text ? (
          <TypingDots label={t.bubble.writing} />
        ) : null}
      </div>
      <Compose
        draft={draft}
        pending={pending}
        placeholder={t.bubble.placeholder}
        sendLabel={t.bubble.send}
        fieldLabel={t.contact.message}
        onDraft={setDraft}
        onSubmit={submitDraft}
      />
    </ChatShell>
  );
}

function ScriptedDemoChat({
  onClose,
  variant,
}: {
  onClose?: () => void;
  variant: "panel" | "window";
}) {
  const { t } = useLocale();
  const demoSteps = t.demoSteps as Record<string, DemoStep>;
  const { intent } = useTalker();
  const [stepId, setStepId] = useState("start");
  const [messages, setMessages] = useState<Message[]>(() => {
    const start: Message[] = [
      { id: "m0", from: "bot", text: demoSteps.start.bot },
    ];
    const chip = intent
      ? demoSteps.start.chips?.find((item) => item.next === intent)
      : undefined;
    if (!chip) return start;
    return [...start, { id: "u-seed", from: "user", text: chip.userText }];
  });
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(() => {
    if (!intent) return false;
    return Boolean(demoSteps.start.chips?.some((item) => item.next === intent) && demoSteps[intent]);
  });
  const scroller = useRef<HTMLDivElement>(null);
  const step = demoSteps[stepId];
  const lastBotIndex = messages.findLastIndex((message) => message.from === "bot");
  const showChips = Boolean(!pending && step?.chips?.length);
  const askingEmail = Boolean(step?.askEmail);

  useEffect(() => {
    if (!intent) return;
    const chip = demoSteps.start.chips?.find((item) => item.next === intent);
    const next = demoSteps[intent];
    if (!chip || !next) return;

    const timer = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: `b-${current.length}`, from: "bot", text: next.bot },
      ]);
      setStepId(intent);
      setPending(false);
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [intent, demoSteps]);

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

  return (
    <ChatShell onClose={onClose} variant={variant}>
      <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
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
        {pending ? <TypingDots label={t.bubble.writing} /> : null}
      </div>
      <Compose
        draft={draft}
        pending={pending}
        placeholder={
          askingEmail
            ? (step.placeholder ?? t.demoSteps.email.placeholder)
            : t.bubble.placeholder
        }
        sendLabel={t.bubble.send}
        fieldLabel={askingEmail ? t.contact.email : t.contact.message}
        inputType={askingEmail ? "email" : "text"}
        required={askingEmail}
        onDraft={setDraft}
        onSubmit={submitDraft}
      />
    </ChatShell>
  );
}

function TypingDots({ label }: { label: string }) {
  return (
    <p className="w-fit rounded-2xl bg-[#f1ece5] px-3.5 py-2.5">
      <span className="inline-flex items-center gap-1" aria-hidden>
        <span className="talker-typing-dot talker-typing-dot-1 size-1.5 rounded-full bg-[#111111]" />
        <span className="talker-typing-dot talker-typing-dot-2 size-1.5 rounded-full bg-[#111111]" />
        <span className="talker-typing-dot talker-typing-dot-3 size-1.5 rounded-full bg-[#111111]" />
      </span>
      <span className="sr-only">{label}</span>
    </p>
  );
}

function Compose({
  draft,
  pending,
  placeholder,
  sendLabel,
  fieldLabel,
  inputType = "text",
  required = false,
  onDraft,
  onSubmit,
}: {
  draft: string;
  pending: boolean;
  placeholder: string;
  sendLabel: string;
  fieldLabel: string;
  inputType?: "text" | "email";
  required?: boolean;
  onDraft: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
}) {
  return (
    <>
      <form onSubmit={onSubmit} className="border-t border-line bg-white px-3 py-3">
        <div className="flex items-center gap-2 rounded-full bg-[#F1ECE5] px-4 py-2">
          <label className="sr-only" htmlFor="talker-compose">
            {fieldLabel}
          </label>
          <input
            id="talker-compose"
            type={inputType}
            required={required}
            disabled={pending}
            value={draft}
            onChange={(event) => onDraft(event.target.value)}
            placeholder={placeholder}
            className="min-w-0 flex-1 border-0 bg-transparent p-0 text-[14px] text-ink outline-none placeholder:text-[#6B6B73] disabled:opacity-50"
          />
          <button
            type="submit"
            aria-label={sendLabel}
            disabled={pending || !draft.trim()}
            className="inline-flex shrink-0 text-[#C43F17] disabled:opacity-40"
          >
            <PaperPlane />
          </button>
        </div>
      </form>
      <PoweredBy />
    </>
  );
}

function PoweredBy() {
  const { t } = useLocale();
  return (
    <p className="inline-flex w-full shrink-0 items-center justify-center gap-2 border-t border-foreground/8 bg-[#F7F6F4] px-3 py-2 font-mono text-[10px] tracking-wide text-[#6B6B73]">
      <span className="h-2 w-2 rounded-full bg-green-500" />
      {t.bubble.poweredBy}
    </p>
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
