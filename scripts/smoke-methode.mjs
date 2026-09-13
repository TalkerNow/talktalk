const { buildMethodeJsonLd, METHODE_META, methodeFr } = await import(
  new URL("../lib/content/methode.ts", import.meta.url).href
);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const banned = /chatbot/i;

assert(!banned.test(METHODE_META.title), "title must not contain chatbot");
assert(!banned.test(METHODE_META.h1), "H1 must not contain chatbot");
assert(!banned.test(methodeFr.h1), "FR H1 must not contain chatbot");

assert(
  METHODE_META.title ===
    "Talker — la méthode pour répondre aux visiteurs sur WordPress",
  "title mismatch"
);
assert(
  METHODE_META.description ===
    "Comment Talker lit le site, traite objections et métier, et envoie les conversations. Sources citées, pas de chiffres inventés.",
  "description mismatch"
);
assert(methodeFr.h1 === "La méthode Talker", "H1 mismatch");
assert(
  methodeFr.subhead ===
    "Plugin WordPress : zip, activer, les visiteurs ont une réponse — sans live chat.",
  "subhead mismatch"
);
assert(methodeFr.faq.length >= 5, "FAQ must have 5–6 items");
assert(methodeFr.faq.length <= 6, "FAQ must have 5–6 items");

const jsonLd = buildMethodeJsonLd();
const types = jsonLd["@graph"].map((node) => node["@type"]);
assert(types.includes("Article"), "JSON-LD must include Article");
assert(types.includes("FAQPage"), "JSON-LD must include FAQPage");
assert(!types.includes("Offer"), "JSON-LD must not include Offer");
assert(
  !types.includes("AggregateRating"),
  "JSON-LD must not include AggregateRating"
);

const serialized = JSON.stringify(jsonLd);
assert(!/"@type":"Offer"/.test(serialized), "serialized JSON-LD has Offer");
assert(
  !/"@type":"AggregateRating"/.test(serialized),
  "serialized JSON-LD has AggregateRating"
);

console.log("smoke-methode: ok");
