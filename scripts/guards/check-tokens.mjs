import { writeFileSync } from "node:fs";
import { BRAND_HEX_SET } from "../../lib/brand/tokens.ts";
import { walk, rel, read, readJson, report } from "./lib.mjs";

const BASELINE = "scripts/guards/tokens-baseline.json";
const update = process.argv.includes("--update");
const files = [
  ...walk("app", [".ts", ".tsx", ".css"]),
  ...walk("components", [".ts", ".tsx", ".css"]),
  ...walk("lib", [".ts", ".tsx", ".css"]),
].filter((f) => rel(f) !== "lib/brand/tokens.ts");

const HEX = /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?![0-9a-fA-F-])/g;
const FUNC_COLOR = /\b(?:rgba?|hsla?|oklch|oklab)\(/g;
const PALETTE = /(?<![\w-])(?:text|bg|border|ring|fill|stroke|from|via|to|outline|decoration|divide|shadow|accent|caret)-(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-\d{2,3}\b/g;
const INLINE = /\bstyle=\{\{/g;
const KEYS = ["hex", "offCharter", "arbitrary", "funcColor", "palette", "inline"];
const LABELS = { hex: "couleurs en dur", offCharter: "couleurs hors charte", arbitrary: "tailles arbitraires Tailwind", funcColor: "couleurs rgb()/hsl()/oklch()", palette: "couleurs de la palette Tailwind", inline: "styles inline" };
const ARBITRARY = /(?<![\w-])(?:-?[a-z]+(?:-[a-z]+)*)-\[[^\]\s"'`]+\]/g;

const current = {};
for (const f of files) {
  const text = read(f);
  const hexes = [...text.matchAll(HEX)].map((m) => m[0]);
  const offCharter = hexes.filter((h) => h.length === 7 && !BRAND_HEX_SET.has(h.toUpperCase())).length + hexes.filter((h) => h.length === 4).length;
  const arbitrary = [...text.matchAll(ARBITRARY)].filter((m) => !m[0].startsWith("data-") && !m[0].startsWith("aria-")).length;
  const entry = { hex: hexes.length, offCharter, arbitrary, funcColor: [...text.matchAll(FUNC_COLOR)].length, palette: [...text.matchAll(PALETTE)].length, inline: [...text.matchAll(INLINE)].length };
  if (KEYS.some((k) => entry[k])) current[rel(f)] = entry;
}

let baseline = {};
try {
  baseline = readJson(BASELINE);
} catch {
  baseline = {};
}

const failures = [];
const warnings = [];
const next = {};
for (const [file, now] of Object.entries(current)) {
  const was = baseline[file] ?? {};
  for (const k of KEYS) {
    if (now[k] > (was[k] ?? 0)) {
      failures.push(`${file} : ${now[k]} ${LABELS[k]} (plafond ${was[k] ?? 0}). Utiliser lib/brand/tokens.ts ou une variable CSS de app/globals.css.`);
    }
  }
  next[file] = Object.fromEntries(KEYS.map((k) => [k, Math.min(now[k], was[k] ?? 0)]));
  if (KEYS.some((k) => now[k] < (was[k] ?? 0))) {
    warnings.push(`${file} a baissé : lancer « npm run guard:tokens -- --update » pour abaisser le plafond.`);
  }
}

if (update) {
  const seeded = Object.keys(baseline).length ? next : current;
  const sorted = Object.fromEntries(Object.entries(seeded).filter(([, v]) => KEYS.some((k) => v[k])).sort());
  writeFileSync(BASELINE, JSON.stringify(sorted, null, 2) + "\n");
  console.log(`[tokens] plafonds écrits (${Object.keys(sorted).length} fichiers). Un plafond ne peut que baisser.`);
  process.exit(0);
}

report("tokens", failures, warnings);
