const { COMPARATIF_META, COMPARATIF_PATH, comparatifFr, comparatifEn } =
  await import(new URL("../lib/content/comparatif.ts", import.meta.url).href);
const { faqFr } = await import(new URL("../lib/content/faq.ts", import.meta.url).href);
const { isPublicPath } = await import(new URL("../lib/gate/paths.ts", import.meta.url).href);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const banned = /meilleur|chatbot/i;

assert(COMPARATIF_PATH === "/comparatif-talker-live-chat", "slug");
assert(!isPublicPath(COMPARATIF_PATH), "comparatif must stay gated");
assert(!banned.test(COMPARATIF_META.title), "title must not say meilleur or chatbot");
assert(!banned.test(comparatifFr.h1), "H1 must not say meilleur or chatbot");
assert(
  comparatifFr.h1 === "Talker et le chat live — différences",
  "H1 mismatch",
);
assert(COMPARATIF_META.title === comparatifFr.h1, "document title matches H1");
assert(comparatifFr.rows.length === 6, "six fact rows");
assert(comparatifEn.rows.length === comparatifFr.rows.length, "EN rows match FR");

const talkerFacts = comparatifFr.rows.map((row) => row.talker).join("\n");
for (const fact of [
  "zip",
  "Pas un humain",
  "Pas d’upload de fichiers",
  "RAG",
  "pages publiques",
  "prompt métier",
  "toutes les 4 heures",
  "100 conversations par mois et par site",
  "49 € / mois en annuel pour 3 sites",
  "99 € / mois en annuel pour 10 sites",
]) {
  assert(talkerFacts.includes(fact), `missing fact: ${fact}`);
}

assert(!/Shopify|WooCommerce/i.test(talkerFacts), "no Shopify or Woo");
assert(!banned.test(talkerFacts), "facts must not say meilleur or chatbot");

const liveNames = comparatifFr.rows.map((row) => row.live).join("\n");
assert(liveNames.includes("Intercom"), "names Intercom");
assert(liveNames.includes("Crisp"), "names Crisp");
assert(liveNames.includes("Tidio"), "names Tidio");
assert(
  comparatifFr.rows.some((row) => row.engine.includes("AI Engine")),
  "names AI Engine",
);

const added = faqFr.items.filter((item) => /Intercom/.test(item.q));
assert(added.length === 2, "two FAQ questions name Intercom");
assert(faqFr.items.length === 16, "v3.2 fourteen plus two live-chat questions");
assert(
  !faqFr.items.some((item) => /Ancien chiffre|HARD JF/.test(JSON.stringify(item))),
  "no draft notes in FAQ",
);

console.log("smoke-comparatif: ok");
