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
const ARBITRARY = /(?<![\w-])(?:-?[a-z]+(?:-[a-z]+)*)-\[[^\]\s"'`]+\]/g;

const current = {};
for (const f of files) {
  const text = read(f);
  const hexes = [...text.matchAll(HEX)].map((m) => m[0]);
  const offCharter = hexes.filter((h) => h.length === 7 && !BRAND_HEX_SET.has(h.toUpperCase())).length + hexes.filter((h) => h.length === 4).length;
  const arbitrary = [...text.matchAll(ARBITRARY)].filter((m) => !m[0].startsWith("data-") && !m[0].startsWith("aria-")).length;
  const entry = { hex: hexes.length, offCharter, arbitrary };
  if (entry.hex || entry.arbitrary) current[rel(f)] = entry;
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
  const was = baseline[file] ?? { hex: 0, offCharter: 0, arbitrary: 0 };
  for (const k of ["hex", "offCharter", "arbitrary"]) {
    if (now[k] > was[k]) {
      const label = { hex: "couleurs en dur", offCharter: "couleurs hors charte", arbitrary: "tailles arbitraires Tailwind" }[k];
      failures.push(`${file} : ${now[k]} ${label} (plafond ${was[k]}). Utiliser lib/brand/tokens.ts ou une variable CSS de app/globals.css.`);
    }
  }
  next[file] = {
    hex: Math.min(now.hex, was.hex),
    offCharter: Math.min(now.offCharter, was.offCharter),
    arbitrary: Math.min(now.arbitrary, was.arbitrary),
  };
  if (now.hex < was.hex || now.offCharter < was.offCharter || now.arbitrary < was.arbitrary) {
    warnings.push(`${file} a baissé : lancer « npm run guard:tokens -- --update » pour abaisser le plafond.`);
  }
}

if (update) {
  const seeded = Object.keys(baseline).length ? next : current;
  const sorted = Object.fromEntries(Object.entries(seeded).filter(([, v]) => v.hex || v.arbitrary).sort());
  writeFileSync(BASELINE, JSON.stringify(sorted, null, 2) + "\n");
  console.log(`[tokens] plafonds écrits (${Object.keys(sorted).length} fichiers). Un plafond ne peut que baisser.`);
  process.exit(0);
}

report("tokens", failures, warnings);
