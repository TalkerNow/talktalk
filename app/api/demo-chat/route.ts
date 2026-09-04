import {
  createTextStreamResponse,
  isStepCount,
  streamText,
  tool,
  toTextStream,
} from "ai";
import { z } from "zod";
import { demoChatModel } from "@/lib/demo/model";
import {
  DEMO_CHAT_FALLBACK,
  DEMO_SYSTEM_PROMPT,
} from "@/lib/demo/system-prompt-client";

export const maxDuration = 30;

type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const PHONE_RE = /(?:\+33|0)[1-9](?:[\s.-]?\d{2}){4}/;
const CLIENT_RE = /\b(je suis client|déjà client|already a (?:client|customer)|i already (?:have|use) talker)\b/i;

function fallbackResponse() {
  return Response.json(
    { message: DEMO_CHAT_FALLBACK },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}

function parseMessages(body: unknown): ChatTurn[] | null {
  if (!body || typeof body !== "object") return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 24) return null;

  const messages: ChatTurn[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") return null;
    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
      return null;
    }
    const text = content.trim();
    if (!text || text.length > 2000) return null;
    messages.push({ role, content: text });
  }

  if (messages.at(-1)?.role !== "user") return null;
  return messages;
}

function logContactFromTurns(messages: ChatTurn[]) {
  const lastUser = [...messages].reverse().find((item) => item.role === "user");
  if (!lastUser) return;
  const email = lastUser.content.match(EMAIL_RE)?.[0];
  const phone = lastUser.content.match(PHONE_RE)?.[0];
  const existingClient = CLIENT_RE.test(lastUser.content);
  if (!email && !phone && !existingClient) return;
  console.log("[demo-chat-cr]", {
    to: "hello@talker.now",
    email: email ?? null,
    phone: phone ?? null,
    existingClient,
    excerpt: lastUser.content.slice(0, 400),
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: DEMO_CHAT_FALLBACK }, { status: 400 });
  }

  const messages = parseMessages(body);
  if (!messages) {
    return Response.json({ message: DEMO_CHAT_FALLBACK }, { status: 400 });
  }

  logContactFromTurns(messages);

  try {
    const result = streamText({
      model: demoChatModel(),
      instructions: DEMO_SYSTEM_PROMPT,
      messages,
      stopWhen: isStepCount(3),
      tools: {
        handoffToTeam: tool({
          description:
            "Remonter un contact (e-mail ou téléphone) ou un client existant au CR hello@talker.now. À appeler dès qu’un visiteur laisse un moyen d’être joint, ou s’il dit qu’il est déjà client.",
          inputSchema: z.object({
            email: z.string().optional(),
            phone: z.string().optional(),
            name: z.string().optional(),
            note: z.string(),
            kind: z.enum(["prospect", "client"]),
          }),
          execute: async (input) => {
            console.log("[demo-chat-cr]", {
              to: "hello@talker.now",
              source: "tool",
              ...input,
            });
            return { ok: true, routed: "hello@talker.now" };
          },
        }),
      },
    });

    return createTextStreamResponse({
      headers: { "Cache-Control": "no-store" },
      stream: toTextStream({ stream: result.stream }),
    });
  } catch (error) {
    console.error("[demo-chat]", error);
    return fallbackResponse();
  }
}
