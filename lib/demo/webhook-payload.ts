export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

function turnText(item: { content?: unknown; text?: unknown; message?: unknown }) {
  for (const value of [item.content, item.text, item.message]) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function asTurn(item: unknown): ChatTurn | null {
  if (!item || typeof item !== "object") return null;
  const rec = item as {
    role?: unknown;
    type?: unknown;
    content?: unknown;
    text?: unknown;
    message?: unknown;
  };
  const rawRole = rec.role ?? rec.type;
  const role =
    rawRole === "user" || rawRole === "human"
      ? "user"
      : rawRole === "assistant" || rawRole === "ai"
        ? "assistant"
        : null;
  if (!role) return null;
  const content = turnText(rec);
  if (!content || content.length > 2000) return null;
  return { role, content };
}

export function collectTurns(body: unknown): ChatTurn[] {
  if (!body || typeof body !== "object") return [];
  const rec = body as Record<string, unknown>;
  const fromMessages = Array.isArray(rec.messages)
    ? rec.messages.map(asTurn).filter((turn): turn is ChatTurn => Boolean(turn))
    : [];
  const fromHistory = Array.isArray(rec.history)
    ? rec.history.map(asTurn).filter((turn): turn is ChatTurn => Boolean(turn))
    : [];
  const messages = fromMessages.length >= fromHistory.length ? fromMessages : fromHistory;

  if (messages.length === 0) {
    for (const key of ["message", "prompt", "chatInput"] as const) {
      const value = rec[key];
      if (typeof value === "string" && value.trim() && value.trim().length <= 2000) {
        messages.push({ role: "user", content: value.trim() });
        break;
      }
    }
  }

  return messages;
}

/** Full conversation for n8n — never last-turn-only. */
export function buildWebhookPayload(session: string, messages: ChatTurn[]) {
  const lastUser = [...messages].reverse().find((turn) => turn.role === "user");
  return {
    session,
    message: lastUser?.content ?? "",
    messages,
    history: messages,
  };
}
