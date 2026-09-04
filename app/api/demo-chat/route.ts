import { site } from "@/lib/site";
import { DEMO_CHAT_FALLBACK } from "@/lib/demo/system-prompt-client";

export const maxDuration = 30;

type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

function fallbackResponse(status = 503) {
  return Response.json(
    { reply: DEMO_CHAT_FALLBACK, message: DEMO_CHAT_FALLBACK },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

function webhookUrl() {
  return (
    process.env.DEMO_CHAT_WEBHOOK?.trim() ||
    process.env.NEXT_PUBLIC_DEMO_CHAT_WEBHOOK?.trim() ||
    ""
  );
}

function parseIncoming(body: unknown): { messages: ChatTurn[]; session: string } | null {
  if (!body || typeof body !== "object") return null;
  const rec = body as Record<string, unknown>;

  const session =
    typeof rec.session === "string" && rec.session.trim()
      ? rec.session.trim().slice(0, 80)
      : "";
  if (!session) return null;

  const messages: ChatTurn[] = [];
  if (Array.isArray(rec.messages)) {
    for (const item of rec.messages) {
      if (!item || typeof item !== "object") continue;
      const role = (item as { role?: unknown }).role;
      const content = (item as { content?: unknown }).content;
      if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
        continue;
      }
      const text = content.trim();
      if (!text || text.length > 2000) continue;
      messages.push({ role, content: text });
    }
  }

  if (messages.length === 0 && typeof rec.message === "string") {
    const text = rec.message.trim();
    if (text && text.length <= 2000) {
      messages.push({ role: "user", content: text });
    }
  }

  if (messages.length === 0 || messages.length > 24) return null;
  if (messages.at(-1)?.role !== "user") return null;
  return { messages, session };
}

function extractReply(data: unknown): string {
  if (typeof data === "string") return data.trim();
  if (!data || typeof data !== "object") return "";

  if (Array.isArray(data) && data[0]) {
    return extractReply(data[0]);
  }

  const rec = data as Record<string, unknown>;
  for (const key of ["reply", "text", "message", "output", "question"] as const) {
    const value = rec[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }

  const choices = rec.choices;
  if (Array.isArray(choices) && choices[0] && typeof choices[0] === "object") {
    const content = (choices[0] as { message?: { content?: unknown } }).message
      ?.content;
    if (typeof content === "string" && content.trim()) return content.trim();
  }

  if (rec.json) return extractReply(rec.json);
  if (rec.data) return extractReply(rec.data);
  return "";
}

function stripTags(value: string) {
  return value.replace(/<[^>]+>/g, "").trim();
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fallbackResponse(400);
  }

  const parsed = parseIncoming(body);
  if (!parsed) {
    return fallbackResponse(400);
  }

  const hook = webhookUrl();
  if (!hook) {
    console.warn("[demo-chat] DEMO_CHAT_WEBHOOK is empty");
    return fallbackResponse(503);
  }

  try {
    new URL(hook);
  } catch {
    console.error("[demo-chat] DEMO_CHAT_WEBHOOK is not a valid URL");
    return fallbackResponse(503);
  }

  const lastUser = parsed.messages.at(-1);
  if (!lastUser) return fallbackResponse(400);

  const payload = {
    site: site.url,
    session: parsed.session,
    message: lastUser.content,
    messages: parsed.messages,
    intent: "message",
    actor: "visitor",
    surface: "preview",
    sent_at: new Date().toISOString(),
  };

  try {
    const response = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(20_000),
      cache: "no-store",
    });

    const raw = await response.text();
    let data: unknown = raw;
    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      /* keep raw string */
    }

    const reply = stripTags(extractReply(data));
    if (!response.ok || !reply) {
      console.error("[demo-chat] webhook empty or failed", response.status);
      return fallbackResponse(503);
    }

    return Response.json(
      { reply, message: reply },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[demo-chat]", error);
    return fallbackResponse(503);
  }
}
