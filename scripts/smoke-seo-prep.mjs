import { readFileSync } from "node:fs";

const { llmsTxt } = await import(new URL("../lib/seo/llms.ts", import.meta.url).href);
const { submitIndexNow, INDEXNOW_PUBLIC_KEY, isIndexNowSubmitEnabled } =
  await import(new URL("../lib/seo/indexnow.ts", import.meta.url).href);
const { twitterSiteFromEnv } = await import(
  new URL("../lib/seo/twitter.ts", import.meta.url).href
);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(llmsTxt.startsWith("# Talker\n"), "llms.txt starts with # Talker");
assert(
  llmsTxt.includes(
    "Agent conversationnel WordPress (plugin zip ~3 min) pour sites d'activité + agences.",
  ),
  "llms.txt one-liner",
);
for (const path of ["/", "/produit", "/installer", "/faq", "/contact"]) {
  assert(llmsTxt.includes(`talker.now${path === "/" ? "/" : path}`), `llms link ${path}`);
}
assert(!llmsTxt.includes("/methode"), "no /methode route");
assert(!llmsTxt.includes("/tarifs"), "no /tarifs route");
assert(!/chatbot/i.test(llmsTxt), "llms.txt is not chatbot-first");
assert(!/noindex|disallow|gate/i.test(llmsTxt), "llms.txt stays product facts");

const keyFile = readFileSync(
  new URL(`../public/${INDEXNOW_PUBLIC_KEY}.txt`, import.meta.url),
  "utf8",
).trim();
assert(keyFile === INDEXNOW_PUBLIC_KEY, "key file matches public key");

delete process.env.INDEXNOW_SUBMIT;
delete process.env.INDEXNOW_KEY;
assert(isIndexNowSubmitEnabled() === false, "submit defaults off");
const skipped = await submitIndexNow(["https://talker.now/"]);
assert(skipped.submitted === false && skipped.reason === "disabled", "no submit while off");

process.env.INDEXNOW_SUBMIT = "true";
const missing = await submitIndexNow(["https://talker.now/produit"]);
assert(missing.submitted === false && missing.reason === "missing-key", "key required");
process.env.INDEXNOW_KEY = "not-the-hosted-key";
const mismatch = await submitIndexNow(["https://talker.now/faq"]);
assert(mismatch.submitted === false && mismatch.reason === "key-mismatch", "key must match file");
delete process.env.INDEXNOW_SUBMIT;
delete process.env.INDEXNOW_KEY;

delete process.env.NEXT_PUBLIC_TWITTER_SITE;
assert(twitterSiteFromEnv() === "@TalkerNow", "twitter site defaults to @TalkerNow");
assert(twitterSiteFromEnv("") === "@TalkerNow", "blank env uses @TalkerNow");
assert(twitterSiteFromEnv("@TalkerNow") === "@TalkerNow", "twitter site passthrough");
assert(twitterSiteFromEnv("TalkerNow") === "@TalkerNow", "twitter site adds @");
assert(twitterSiteFromEnv("not a handle") === "@TalkerNow", "invalid env falls back to @TalkerNow");

console.log("smoke-seo-prep: ok");
