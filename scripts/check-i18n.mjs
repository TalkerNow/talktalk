#!/usr/bin/env node
/**
 * Contrôle i18n EU — nothing left in FR on non-FR packs.
 *
 * Checklist (also printed at the end):
 *  1. Flag selector switches locale (?lang= + localStorage talker-lang)
 *  2. Home / produit / faq / contact / installer copy updates
 *  3. Chat chrome (placeholder, send, close, powered-by) updates
 *  4. Installer vignette + WP zip strings follow the selected / WP locale
 *  5. Demo webhook payload includes locale + lang
 *
 * Usage: node scripts/check-i18n.mjs
 */

import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const i18nDir = join(root, "lib/i18n");
const locales = ["fr", "en", "de", "it", "es", "nl", "pl"];

const leftover = [
  "Bonjour",
  "Propulsé par",
  "Fonctionnalités",
  "Télécharger Talker",
  "Créer mon agent gratuitement",
  "Oui je veux",
  "OK facile",
  "Posez votre question",
  "Boîte de réception",
  "Je n’arrive pas",
  "Écrivez-moi",
  "Mon entreprise",
  "vous me voyez",
];

let failed = 0;
function assert(ok, label) {
  if (ok) {
    console.log(`ok  ${label}`);
    return;
  }
  failed += 1;
  console.log(`FAIL  ${label}`);
}

for (const locale of locales) {
  const path = join(i18nDir, `${locale}.ts`);
  const src = readFileSync(path, "utf8");
  assert(src.includes("satisfies Messages") || locale === "fr", `${locale}.ts typed against Messages`);
  assert(src.includes("langLabel:"), `${locale}.ts has langLabel`);
  assert(src.includes("meta:"), `${locale}.ts has locale-aware meta`);
  assert(src.includes("bubble:"), `${locale}.ts has chat chrome`);
  if (locale === "fr") continue;
  for (const needle of leftover) {
    const hit = src.includes(needle);
    assert(!hit, `${locale}.ts has no leftover « ${needle} »`);
  }
}

const index = readFileSync(join(i18nDir, "index.ts"), "utf8");
for (const locale of locales) {
  assert(index.includes(`"${locale}"`) || index.includes(`'${locale}'`), `index.ts lists ${locale}`);
}

const payload = readFileSync(join(root, "lib/demo/webhook-payload.ts"), "utf8");
assert(payload.includes("locale") && payload.includes("lang:"), "webhook payload carries locale/lang");

const widget = readFileSync(join(root, "wp-plugin/talker-now/includes/class-widget.php"), "utf8");
assert(widget.includes("talker_now_widget_i18n") && widget.includes("locale"), "WP widget localizes chrome + locale");

const rest = readFileSync(join(root, "wp-plugin/talker-now/includes/class-rest.php"), "utf8");
assert(rest.includes("'locale'") && rest.includes("talker_now_i18n"), "WP REST forwards locale and localized stubs");

const phpLocales = readdirSync(join(root, "wp-plugin/talker-now/includes"));
assert(phpLocales.includes("class-i18n.php"), "WP i18n pack file exists");

console.log("");
console.log("Manual Contrôle");
console.log("  • Open preview, click each EU flag: FR EN DE IT ES NL PL");
console.log("  • Confirm nav, hero, FAQ, pricing, contact, installer, chat chrome switch");
console.log("  • Confirm ?lang=de (etc.) updates <html lang> and document.title");
console.log("  • Confirm /api/demo-chat body includes locale when chatting");
console.log("  • WP zip: widget i18n follows the site/user locale; QCM templates too");
console.log("");
console.log(failed ? `${failed} failed` : "all passed");
process.exit(failed ? 1 : 0);
