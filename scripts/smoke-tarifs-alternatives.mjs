import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const { llmsTxt } = await import(new URL("../lib/seo/llms.ts", import.meta.url).href);
const { isPublicPath } = await import(new URL("../lib/gate/paths.ts", import.meta.url).href);

const root = fileURLToPath(new URL("..", import.meta.url));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const bannedStore = new RegExp(
  ["word", "press", ".", "org"].join("") +
    "|" +
    ["plugin", "directory"].join(" ") +
    "|" +
    ["répertoire", "de", "plugins"].join(" ") +
    "|" +
    ["annuaire", "de", "plugins"].join(" "),
  "i",
);

function walkText(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name === ".git") continue;
    const path = join(dir, name);
    const info = statSync(path);
    if (info.isDirectory()) {
      walkText(path, acc);
      continue;
    }
    if (/\.(ts|tsx|js|mjs|php|md|txt)$/.test(name)) acc.push(path);
  }
  return acc;
}

for (const dir of ["app", "components", "lib", "wp-plugin", "public"]) {
  for (const file of walkText(join(root, dir))) {
    const text = readFileSync(file, "utf8");
    assert(!bannedStore.test(text), `public plugin store mention in ${file}`);
  }
}

const TARIFS_PATH = "/tarifs";
const TARIFS_H1 = "Tarifs Talker";
const RATES_AS_OF = "Tarifs relevés le 08/10/2026";
const CAS_CLIENT_AGENCE_PATH = "/cas-client-agence";
const CAS_CLIENT_BANNER =
  "Modèle — non publié. Les champs entre crochets attendent un vrai client.";
const CAS_CLIENT_H1 = "[Nom de l'agence] installe Talker sur les sites de ses clients";
const ALTERNATIVE_ALT =
  "Illustration produit : Talker répond à 23 h 47 à un visiteur, conversation fictive";
const alternativePaths = [
  ["/alternative-tidio-wordpress", "Une alternative à Tidio pour WordPress"],
  ["/alternative-crisp-wordpress", "Une alternative à Crisp pour WordPress"],
  ["/alternative-chatbase-wordpress", "Une alternative à Chatbase pour WordPress"],
  ["/alternative-tawk-to-wordpress", "Une alternative à tawk.to pour WordPress"],
  ["/alternative-smartsupp-wordpress", "Une alternative à Smartsupp pour WordPress"],
  ["/alternative-livechat-wordpress", "Une alternative à LiveChat pour WordPress"],
  ["/alternative-botpress-wordpress", "Une alternative à Botpress pour WordPress"],
];

for (const path of [TARIFS_PATH, ...alternativePaths.map(([href]) => href), CAS_CLIENT_AGENCE_PATH]) {
  assert(!isPublicPath(path), `${path} must stay gated`);
}

const tarifsSource = readFileSync(new URL("../lib/content/tarifs.ts", import.meta.url), "utf8");
const alternativesSource = readFileSync(
  new URL("../lib/content/alternatives.ts", import.meta.url),
  "utf8",
);
const faqJsonLdSource = readFileSync(new URL("../lib/content/faq-jsonld.ts", import.meta.url), "utf8");
assert(tarifsSource.includes(`export const TARIFS_H1 = "${TARIFS_H1}"`), "tarifs H1");
assert(tarifsSource.includes(RATES_AS_OF), "tarifs date");
assert(faqJsonLdSource.includes('"@type": "FAQPage"'), "FAQPage builder");
assert(!faqJsonLdSource.includes('"@type": "Offer"'), "no Offer JSON-LD");
assert(!/meilleur/i.test(tarifsSource + alternativesSource), "no meilleur");
assert(!/nos clients/i.test(tarifsSource + alternativesSource), "no nos clients");
assert(!/gratuit à vie/i.test(tarifsSource + alternativesSource), "no gratuit à vie");
for (const [, h1] of alternativePaths) {
  assert(alternativesSource.includes(h1), `copy H1 ${h1}`);
}

const frPricing = readFileSync(new URL("../lib/i18n/fr.ts", import.meta.url), "utf8");
const enPricing = readFileSync(new URL("../lib/i18n/en.ts", import.meta.url), "utf8");
assert(
  frPricing.includes(
    '"100 conversations par mois et par site, gratuites, sans carte, sans limite de durée"',
  ),
  "FR starter card",
);
assert(!frPricing.includes("100 conversations offertes par site"), "FR starter is not one-time");
assert(!frPricing.includes("par installation"), "FR pricing is not per install");
assert(
  enPricing.includes(
    '"100 conversations per month per site, free, no card, no time limit"',
  ),
  "EN starter card",
);
assert(!enPricing.includes("offered per site"), "EN starter is not one-time");
assert(!enPricing.includes("per install"), "EN pricing is not per install");
const outsideChannels = /whatsapp|instagram|messenger|facebook|tous les canaux|all channels/i;
assert(!outsideChannels.test(frPricing), "FR pricing does not promise outside channels");
assert(!outsideChannels.test(enPricing), "EN pricing does not promise outside channels");
assert(!outsideChannels.test(tarifsSource), "tarifs does not promise outside channels");
const faqSource = readFileSync(new URL("../lib/content/faq.ts", import.meta.url), "utf8");
const comparatifSource = readFileSync(
  new URL("../lib/content/comparatif.ts", import.meta.url),
  "utf8",
);
const llmsSource = readFileSync(new URL("../lib/seo/llms.ts", import.meta.url), "utf8");
assert(!outsideChannels.test(faqSource), "FAQ does not promise outside channels");
assert(!outsideChannels.test(comparatifSource), "comparatif does not promise outside channels");
assert(!outsideChannels.test(llmsSource), "llms does not promise outside channels");
const pricingSection = readFileSync(
  new URL("../components/landing/pricing-section.tsx", import.meta.url),
  "utf8",
);
assert(pricingSection.includes("lg:grid-cols-3"), "three pricing cards");
assert(!pricingSection.includes("grid-cols-4"), "pricing is not four cards");
assert(pricingSection.includes("function AgencySitesToggle"), "site count radio");
assert(pricingSection.includes("ShineBorder"), "shine border kept");
assert(pricingSection.includes("pricing-card-popular"), "popular badge kept");
assert(pricingSection.includes("transition-transform duration-300"), "radio animation kept");
assert(
  pricingSection.includes('SHINE_KEYS = new Set(["starter", "agency"])'),
  "shine on starter and third card",
);
assert(pricingSection.includes("min-h-[17rem]"), "card header frame kept");
assert(pricingSection.includes("lg:text-6xl"), "price size kept");
assert(frPricing.includes('title: "Pro 3"'), "FR plan Pro 3");
assert(frPricing.includes('title: "Pro Max"'), "FR plan Pro Max");
assert(frPricing.includes('description: "1 site"'), "FR site count");
assert(frPricing.includes('description: "3 sites"'), "FR 3 sites");
assert(frPricing.includes('description: "10 sites"'), "FR 10 sites");
assert(!frPricing.includes("Agences & Entreprises"), "FR plan name is not Agences");
assert(!frPricing.includes("Agence ·"), "FR plan name is not Agence");
assert(!enPricing.includes("Agencies &"), "EN plan name is not Agencies");
assert(tarifsSource.includes("Pro 3"), "tarifs names Pro 3");
assert(tarifsSource.includes("Pro Max"), "tarifs names Pro Max");
assert(!/Agences & Entreprises|Agence ·/.test(tarifsSource), "tarifs has no Agence plan name");
assert(
  tarifsSource.includes(
    "Au-delà de 100 conversations dans le mois, passez à un plan payant ou attendez le mois suivant.",
  ),
  "neutral monthly cap",
);
assert(tarifsSource.includes("Propulsé par Talker"), "powered by Talker");
assert(!tarifsSource.includes("une seule fois"), "tarifs is not once");
assert(!tarifsSource.includes("offertes par site"), "tarifs is not a one-time gift");
assert(!/50, 75 et 90/.test(tarifsSource), "no 50/75/90 emails");
assert(!alternativesSource.includes("offertes par site"), "alternatives are not one-time");
assert(!alternativesSource.includes("100 premières"), "alternatives are not the first 100");
assert(frPricing.includes('detailsLink: "Tout comprendre sur les tarifs"'), "home link FR");
assert(frPricing.includes('{ name: "Tarifs", href: "/tarifs" }'), "footer Tarifs");
assert(enPricing.includes('{ name: "Pricing", href: "/tarifs" }'), "footer Pricing");

const nav = readFileSync(new URL("../components/landing/navigation.tsx", import.meta.url), "utf8");
assert(nav.includes('href: "/tarifs"'), "menu Tarifs");
assert(!nav.includes('href: "#pricing"'), "menu no longer uses the pricing anchor");

assert(llmsTxt.includes("/tarifs"), "llms tarifs");
assert(llmsTxt.includes("/alternative-crisp-wordpress"), "llms crisp");
assert(llmsTxt.includes("/alternative-tawk-to-wordpress"), "llms tawk");
assert(llmsTxt.includes("/alternative-smartsupp-wordpress"), "llms smartsupp");
assert(llmsTxt.includes("/alternative-livechat-wordpress"), "llms livechat");
assert(llmsTxt.includes("/alternative-botpress-wordpress"), "llms botpress");
assert(!/chatbot/i.test(alternativesSource), "alternatives avoid chatbot in copy");
assert(llmsTxt.includes("/comparatif-talker-live-chat"), "llms comparatif");
assert(!llmsTxt.includes(CAS_CLIENT_AGENCE_PATH), "llms omits the unpublished case");
assert(!/\/tarifs is not a page/.test(readFileSync(new URL("../lib/seo/llms.ts", import.meta.url), "utf8")), "old tarifs comment removed");

for (const name of [
  "talker-23h47-paysage-1200x630.png",
  "talker-23h47-carre-1080.png",
  "talker-23h47-portrait-1080x1350.png",
]) {
  assert(existsSync(new URL(`../public/visuels/${name}`, import.meta.url)), `missing ${name}`);
}

const casSource = readFileSync(new URL("../app/cas-client-agence/page.tsx", import.meta.url), "utf8");
assert(casSource.includes("isGateEnabled()"), "case page checks the gate");
assert(casSource.includes("notFound()"), "case page 404 when the gate is off");
assert(casSource.includes("index: false"), "case page noindex");
assert(casSource.includes("follow: false"), "case page nofollow");
assert(!nav.includes("cas-client-agence"), "case page is not in the menu");

const sitemap = readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");
assert(!sitemap.includes("cas-client-agence"), "case page stays out of the sitemap");
assert(!sitemap.includes("/tarifs"), "sitemap file is untouched");

const password = process.env.SITE_PASSWORD;
if (typeof password !== "string" || password.length === 0) {
  throw new Error("SITE_PASSWORD is missing; the HTTP smoke cannot open the gate");
}
assert(process.env.SITE_GATE_ENABLED === "true", "SITE_GATE_ENABLED must be true");

const base = (process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000").replace(/\/$/, "");

async function fetchManual(path, cookie) {
  const headers = cookie ? { cookie } : undefined;
  let response;
  try {
    response = await fetch(`${base}${path}`, { redirect: "manual", headers });
  } catch (error) {
    const message = error instanceof Error ? error.message : "request failed";
    throw new Error(`HTTP smoke could not reach ${base}${path}: ${message}`);
  }
  return response;
}

for (const path of [TARIFS_PATH, "/alternative-crisp-wordpress", CAS_CLIENT_AGENCE_PATH]) {
  const bare = await fetchManual(path);
  assert(bare.status === 307, `${path} without cookie expected 307, got ${bare.status}`);
  const location = bare.headers.get("location") ?? "";
  assert(location.includes("/gate"), `${path} without cookie should redirect to /gate`);
}

const login = await fetch(`${base}/api/gate`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ password, next: TARIFS_PATH }),
});
assert(login.status === 200, `gate login failed (${login.status})`);
const setCookies =
  typeof login.headers.getSetCookie === "function" ? login.headers.getSetCookie() : [];
const gateCookie = setCookies.find((value) => value.startsWith("talker_site_gate="));
assert(gateCookie, "gate session cookie missing");
const cookie = gateCookie.split(";")[0];

async function readPage(path) {
  const response = await fetchManual(path, cookie);
  assert(response.status === 200, `${path} behind the gate expected 200, got ${response.status}`);
  return response.text();
}

const tarifsHtml = await readPage(TARIFS_PATH);
assert(tarifsHtml.includes(TARIFS_H1), "tarifs H1 in HTML");
assert(tarifsHtml.includes(RATES_AS_OF), "tarifs date in HTML");
assert(tarifsHtml.includes('"@type":"FAQPage"'), "tarifs FAQPage JSON-LD");
assert(!tarifsHtml.includes('"@type":"Offer"'), "tarifs HTML has no Offer");
assert(
  tarifsHtml.includes("Faut-il une carte bancaire pour commencer ?"),
  "FAQ question visible and in JSON-LD",
);

for (const [path, h1] of alternativePaths) {
  const html = await readPage(path);
  assert(html.includes(h1), `H1 HTML ${path}`);
  assert(html.includes(RATES_AS_OF), `date HTML ${path}`);
  assert(html.includes('"@type":"FAQPage"'), `FAQPage ${path}`);
  assert(html.includes(ALTERNATIVE_ALT), `illustration alt ${path}`);
}

const casHtml = await readPage(CAS_CLIENT_AGENCE_PATH);
assert(casHtml.includes(CAS_CLIENT_BANNER), "unpublished banner");
assert(casHtml.includes(CAS_CLIENT_H1), "case H1");
assert(/noindex/i.test(casHtml), "cas-client-agence is noindex");

console.log("smoke-tarifs-alternatives: ok");
