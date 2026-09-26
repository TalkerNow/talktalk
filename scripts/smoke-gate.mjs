import { createHmac, timingSafeEqual } from "node:crypto";

const { isPublicPath, safeNextPath } = await import(
  new URL("../lib/gate/paths.ts", import.meta.url).href
);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(isPublicPath("/gate"), "login path must be public");
assert(isPublicPath("/robots.txt"), "robots.txt must be public");
assert(isPublicPath("/api/health"), "health must be public");
assert(isPublicPath("/brand/symbole.svg"), "brand assets must be public");
assert(!isPublicPath("/"), "home must be gated");
assert(!isPublicPath("/produit"), "produit must be gated");
assert(!isPublicPath("/methode"), "methode must be gated");
assert(!isPublicPath("/api/demo-chat"), "demo chat must be gated");

assert(safeNextPath("/produit") === "/produit", "relative next path");
assert(safeNextPath("/faq?lang=en") === "/faq?lang=en", "next path keeps query");
assert(safeNextPath("https://evil.test") === "/", "absolute next rejected");
assert(safeNextPath("//evil.test") === "/", "protocol-relative next rejected");
assert(safeNextPath("/gate") === "/", "gate next collapses to home");
assert(safeNextPath("/gate?next=/") === "/", "nested gate next rejected");

const token = createHmac("sha256", "secret").update("talker-gate-v1").digest("hex");
const other = createHmac("sha256", "nope").update("talker-gate-v1").digest("hex");
assert(token !== other, "tokens must differ per password");
assert(
  timingSafeEqual(Buffer.from(token), Buffer.from(token)),
  "matching tokens compare",
);

console.log("smoke-gate: ok");
