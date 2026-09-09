export const TALKER_TRANSCRIPT_KEY = "talkerDemoTranscript";
export const TALKER_DEMO_SESSION_KEY = "talkerDemoSession";

type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeTranscript(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export type TalkerMessage = {
  id: string;
  from: "bot" | "user";
  text: string;
};

export type TalkerTranscript = {
  v: 1;
  mode: "llm" | "scripted";
  messages: TalkerMessage[];
  stepId?: string;
};

function isMessage(value: unknown): value is TalkerMessage {
  if (!value || typeof value !== "object") return false;
  const message = value as TalkerMessage;
  return (
    typeof message.id === "string" &&
    (message.from === "bot" || message.from === "user") &&
    typeof message.text === "string" &&
    message.text.trim().length > 0
  );
}

export function parseTranscript(raw: string | null | undefined): TalkerTranscript | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as Partial<TalkerTranscript>;
    if (data.v !== 1) return null;
    if (data.mode !== "llm" && data.mode !== "scripted") return null;
    if (!Array.isArray(data.messages)) return null;
    const messages = data.messages.filter(isMessage);
    if (!messages.length) return null;
    return {
      v: 1,
      mode: data.mode,
      messages,
      stepId: typeof data.stepId === "string" ? data.stepId : undefined,
    };
  } catch {
    return null;
  }
}

export function readTranscript(): TalkerTranscript | null {
  if (typeof window === "undefined") return null;
  try {
    return parseTranscript(window.sessionStorage.getItem(TALKER_TRANSCRIPT_KEY));
  } catch {
    return null;
  }
}

export function writeTranscript(data: TalkerTranscript): void {
  if (typeof window === "undefined") return;
  const sanitized = parseTranscript(JSON.stringify(data));
  if (!sanitized) return;
  try {
    window.sessionStorage.setItem(TALKER_TRANSCRIPT_KEY, JSON.stringify(sanitized));
    notify();
  } catch {
    /* private mode / quota */
  }
}

export function clearTalkerSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(TALKER_TRANSCRIPT_KEY);
    window.sessionStorage.removeItem(TALKER_DEMO_SESSION_KEY);
    notify();
  } catch {
    /* ignore */
  }
}

export function nextMessageSeq(messages: TalkerMessage[]): number {
  let max = 0;
  for (const message of messages) {
    const match = /(\d+)$/.exec(message.id);
    if (match) max = Math.max(max, Number(match[1]));
  }
  return max;
}
