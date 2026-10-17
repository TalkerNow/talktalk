import { existsSync } from "node:fs";
import { walk, rel, read, readJson, report } from "./lib.mjs";
import { visibleText, norm } from "./html.mjs";

const BUILT = ".next/server/app";
if (!existsSync(BUILT)) {
  console.error("[mots-interdits] lancer « npm run build » d'abord.");
  process.exit(1);
}
const RULES = [
  { re: /V[ÉE]RIFIER/i, why: "marqueur interne « à vérifier »" },
  { re: /\bTODO\b|\bFIXME\b|\bXXX\b/, why: "marqueur de travail" },
  { re: /\bTROU\b/, why: "marqueur « TROU »" },
  { re: /lorem ipsum/i, why: "faux texte" },
  { re: /\bFrancfort\b|\bFrankfurt\b/i, why: "localisation non sourcée (voir RELEVE hébergement : Nuremberg et eu-central-1)" },
  { re: /\bnos clients\b/i, why: "« nos clients » interdit (AGENTS.md)" },
  { re: /\[[^\]]{0,40}(?:à compléter|placeholder|TBD)[^\]]{0,40}\]/i, why: "texte à compléter" },
];
const allowed = readJson("scripts/guards/known-exceptions.json").forbidden ?? [];
const failures = [];
const warnings = [];
const used = new Set();
const targets = [
  ...walk(BUILT, [".html"]).map((f) => ({ f, text: visibleText(read(f)) + " " + jsonLd(read(f)) })),
  ...walk(BUILT, [".body"]).map((f) => ({ f, text: norm(read(f)) })),
  ...["lib/demo/system-prompt-client.ts"].filter(existsSync).map((f) => ({ f, text: read(f) })),
];
function jsonLd(html) {
  return [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]).join(" ");
}
for (const { f, text } of targets) {
  for (const r of RULES) {
    const m = text.match(r.re);
    const ex = allowed.findIndex((a) => a.file === rel(f) && a.rule === r.why);
    if (m && ex >= 0) {
      used.add(ex);
      continue;
    }
    if (m) {
      const i = m.index ?? 0;
      failures.push(`${rel(f)} : ${r.why} — « …${text.slice(Math.max(0, i - 40), i + 40)}… »`);
    }
  }
}
allowed.forEach((a, i) => {
  if (!used.has(i)) warnings.push(`exception inutile, à retirer : ${a.file} (${a.rule})`);
});
report("mots-interdits", failures, warnings);
