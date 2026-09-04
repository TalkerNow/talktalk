export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

function asTurn(item: unknown): ChatTurn | null {
  if (!item || typeof item !== "object") return null;
  const rec = item as { role?: unknown; type?: unknown; content?: unknown };
  const rawRole = rec.role ?? rec.type;
  const role =
    rawRole === "user" || rawRole === "human"
      ? "user"
      : rawRole === "assistant" || rawRole === "ai"
        ? "assistant"
        : null;
  if (!role || typeof rec.content !== "string") return null;
  const content = rec.content.trim();
  if (!content || content.length > 2000) return null;
  return { role, content };
}

export function collectTurns(body: unknown): ChatTurn[] {
  if (!body || typeof body !== "object") return [];
  const rec = body as Record<string, unknown>;
  const raw = Array.isArray(rec.messages)
    ? rec.messages
    : Array.isArray(rec.history)
      ? rec.history
      : [];

  const messages: ChatTurn[] = [];
  for (const item of raw) {
    const turn = asTurn(item);
    if (turn) messages.push(turn);
  }

  if (messages.length === 0 && typeof rec.message === "string") {
    const text = rec.message.trim();
    if (text && text.length <= 2000) {
      messages.push({ role: "user", content: text });
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
