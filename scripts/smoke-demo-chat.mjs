import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);

async function loadPayload() {
  try {
    return await import(pathToFileURL(new URL("../lib/demo/webhook-payload.ts", import.meta.url)).href);
  } catch {
    const ts = require("node:fs").readFileSync(
      new URL("../lib/demo/webhook-payload.ts", import.meta.url),
      "utf8",
    );
    if (!ts.includes("history: messages")) {
      throw new Error("buildWebhookPayload must include history[]");
    }
    return null;
  }
}

function assertPayload(buildWebhookPayload, collectTurns) {
  const turns = collectTurns({
    message: "oui",
    messages: [
      { role: "assistant", content: "Bonjour — je suis là pour votre site." },
      { role: "user", content: "Quels sont vos tarifs ?" },
      { role: "assistant", content: "Starter est gratuit. Je vous installe ?" },
      { role: "user", content: "oui" },
    ],
  });
  if (turns.length !== 4) throw new Error(`expected 4 turns, got ${turns.length}`);
  const payload = buildWebhookPayload("tn_smoke", turns);
  if (!Array.isArray(payload.messages) || payload.messages.length !== 4) {
    throw new Error("payload.messages must be the full conversation");
  }
  if (!Array.isArray(payload.history) || payload.history.length !== 4) {
    throw new Error("payload.history must mirror the full conversation");
  }
  if (payload.message !== "oui") throw new Error("last-turn message must stay oui");
  if (JSON.stringify(payload) === JSON.stringify({ message: "oui" })) {
    throw new Error("must not send last-turn-only payload");
  }
  const fromHistory = collectTurns({
    history: [
      { role: "user", content: "tarifs" },
      { type: "ai", content: "Starter 0 €" },
      { role: "user", content: "oui" },
    ],
  });
  if (fromHistory.length !== 3 || fromHistory[1].role !== "assistant") {
    throw new Error("history[] alias + ai type failed");
  }
  console.log("payload ok", {
    turns: payload.messages.length,
    last: payload.message,
    keys: Object.keys(payload),
  });
}

const mod = await loadPayload();
if (mod?.buildWebhookPayload && mod?.collectTurns) {
  assertPayload(mod.buildWebhookPayload, mod.collectTurns);
} else {
  console.log("payload source check ok (ts not executable here)");
}

const api = process.env.SMOKE_API;
if (!api) process.exit(0);

const session = `tn_smoke_${Date.now().toString(36)}`;
async function post(messages) {
  const body = {
    session,
    message: messages.at(-1).content,
    messages,
    history: messages,
  };
  const res = await fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  const text = (data.reply || data.text || data.message || "").trim();
  return { status: res.status, text };
}

const turn1 = [
  {
    role: "assistant",
    content:
      "Bonjour — je suis là pour votre site. Dites-moi ce que vous cherchez, je vous oriente.",
  },
  { role: "user", content: "Comment on installe Talker ?" },
];
const first = await post(turn1);
console.log("turn1", first.status, first.text.slice(0, 220));
if (!first.text) throw new Error("turn1 empty");

const turn2 = [
  ...turn1,
  { role: "assistant", content: first.text },
  { role: "user", content: "oui" },
];
const second = await post(turn2);
console.log("turn2", second.status, second.text.slice(0, 220));
if (!second.text) throw new Error("turn2 empty");
if (/bonjour/i.test(second.text) && /comment puis-je/i.test(second.text)) {
  throw new Error("turn2 re-greeted — context likely dropped");
}
console.log("smoke ok");
