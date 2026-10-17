import { existsSync } from "node:fs";
import { walk, rel, read, readJson, report } from "./lib.mjs";
import { visibleText, jsonLdBlocks, flattenLd, norm } from "./html.mjs";

const DIR = ".next/server/app";
if (!existsSync(DIR)) {
  console.error("[faq-h1] lancer « npm run build » d'abord.");
  process.exit(1);
}
const known = readJson("scripts/guards/known-exceptions.json");
const allowed = known.faqWordCount ?? [];
const h1Allowed = known.h1 ?? [];
const MIN = 40;
const MAX = 70;
const failures = [];
const warnings = [];
const used = new Set();
const pages = walk(DIR, [".html"]).filter((f) => !/_global-error|_not-found/.test(f));

for (const f of pages) {
  const page = rel(f).replace(`${DIR}/`, "/").replace(/\.html$/, "").replace(/\/index$/, "/");
  const html = read(f);
  const h1 = (html.replace(/<script[\s\S]*?<\/script>/gi, "").match(/<h1[\s>]/gi) ?? []).length;
  if (h1 !== 1 && !h1Allowed.some((a) => a.page === page && a.count === h1)) failures.push(`${page} : ${h1} H1 (il en faut exactement 1).`);
  const nodes = flattenLd(jsonLdBlocks(html));
  for (const n of nodes) if (n.__invalid) failures.push(`${page} : JSON-LD invalide (${n.__invalid}…).`);
  const text = visibleText(html);
  for (const faq of nodes.filter((n) => n["@type"] === "FAQPage")) {
    for (const q of faq.mainEntity ?? []) {
      const name = norm(q.name ?? "");
      const answer = norm(q.acceptedAnswer?.text ?? "");
      if (!text.includes(name)) failures.push(`${page} : question du JSON-LD absente de la page : « ${name} ».`);
      if (!text.includes(answer)) failures.push(`${page} : réponse du JSON-LD différente de la page pour « ${name} ».`);
      const words = answer.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
      if (words < MIN || words > MAX) {
        const idx = allowed.findIndex((a) => a.page === page && a.q === name);
        const noWorse = idx >= 0 && (words > MAX ? words <= allowed[idx].words : words >= allowed[idx].words);
        if (noWorse) used.add(idx);
        else failures.push(`${page} : « ${name} » fait ${words} mots (attendu ${MIN}-${MAX}).`);
      }
    }
  }
}
allowed.forEach((a, i) => {
  if (!used.has(i)) warnings.push(`exception de longueur inutile, à retirer : ${a.page} « ${a.q} »`);
});
report("faq-h1", failures, warnings);
