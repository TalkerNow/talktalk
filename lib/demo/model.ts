import { openai } from "@ai-sdk/openai";

const DEFAULT_GATEWAY_MODEL = "openai/gpt-5.4";

export function demoChatModel() {
  const requested = process.env.DEMO_CHAT_MODEL ?? DEFAULT_GATEWAY_MODEL;

  if (process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN) {
    return requested;
  }

  if (process.env.OPENAI_API_KEY) {
    return openai(requested.replace(/^openai\//, ""));
  }

  return requested;
}
