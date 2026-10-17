import { PLAN_PRICES, BADGE_OPTION, PAID_PLAN_KEYS, annualDiscountPercent, maxAnnualDiscountPercent } from "../../lib/pricing/plans.ts";
import { walk, rel, read, readJson, report } from "./lib.mjs";

const exceptions = readJson("scripts/guards/known-exceptions.json").prices;
const files = [
  ...walk("lib", [".ts", ".tsx"]),
  ...walk("components", [".tsx", ".ts"]),
  ...walk("app", [".tsx", ".ts"]),
].filter((f) => !rel(f).startsWith("lib/pricing/"));

const plans = [
  { label: "Pro Max", re: /\bPro Max\b/g, allowed: [PLAN_PRICES.agency10.annual, PLAN_PRICES.agency10.monthly] },
  { label: "Pro 3", re: /\bPro 3\b/g, allowed: [PLAN_PRICES.agency3.annual, PLAN_PRICES.agency3.monthly] },
  { label: "Pro", re: /\bPro\b(?! 3| Max)/g, allowed: [PLAN_PRICES.pro.annual, PLAN_PRICES.pro.monthly] },
  { label: "Starter", re: /\bStarter\b/g, allowed: [PLAN_PRICES.starter.monthly] },
];
const badgeAllowed = [BADGE_OPTION.annual, BADGE_OPTION.monthly];
const discounts = PAID_PLAN_KEYS.map(annualDiscountPercent);
const maxDiscount = maxAnnualDiscountPercent();

const failures = [];
const warnings = [];
const usedExceptions = new Set();

function isExcepted(file, line) {
  const hit = exceptions.findIndex((e) => e.file === file && line.includes(e.match));
  if (hit >= 0) usedExceptions.add(hit);
  return hit >= 0;
}

function priceAfter(text, from) {
  const tail = text.slice(from, from + 45);
  const m = tail.match(/^[^.;€$\n(]*?(?:(\d+(?:,\d+)?)\s?€|€\s?(\d+(?:,\d+)?))/);
  if (!m) return null;
  return m[1] ?? m[2];
}

for (const f of files) {
  const file = rel(f);
  const lines = read(f).split("\n");
  lines.forEach((line, i) => {
    const where = `${file}:${i + 1}`;
    for (const p of plans) {
      for (const m of line.matchAll(p.re)) {
        const after = line.slice(m.index + m[0].length);
        if (/^\s*\d/.test(after) && p.label === "Pro") continue;
        if (p.label === "Starter" && /Sans badge/.test(line.slice(Math.max(0, m.index - 30), m.index))) continue;
        const v = priceAfter(line, m.index + m[0].length);
        if (v === null) continue;
        const n = Number(v.replace(",", "."));
        if (!p.allowed.includes(n) && !isExcepted(file, line)) {
          failures.push(`${where} « ${p.label} » à ${v} € ; la source (lib/pricing/plans.ts) donne ${p.allowed.join(" ou ")} €.`);
        }
      }
    }
    for (const m of line.matchAll(/Sans badge/g)) {
      const v = priceAfter(line, m.index + m[0].length);
      if (v !== null && !badgeAllowed.includes(v) && !isExcepted(file, line)) {
        failures.push(`${where} Option Sans badge à ${v} € ; la source donne ${badgeAllowed.join(" ou ")} €.`);
      }
    }
    const annualContext = /annuel|annual|isAnnual/i.test(line) || (file.endsWith("pricing-section.tsx") && /^\s*-\d+%\s*$/.test(line));
    if (!annualContext) return;
    for (const m of line.matchAll(/(?:[−-]\s?(\d+)\s?%|(\d+)\s?% de moins|(\d+)\s?% (?:less|off))/g)) {
      const n = Number(m[1] ?? m[2] ?? m[3]);
      if (isExcepted(file, line)) continue;
      if (!discounts.includes(n)) {
        failures.push(`${where} remise annuelle ${n} % ; les remises calculées sont ${[...new Set(discounts)].join(" et ")} %.`);
        continue;
      }
      const claimsAll = /Pro 3/.test(line) && n !== annualDiscountPercent("agency3") && !line.includes(`${annualDiscountPercent("agency3")}`);
      if (claimsAll) failures.push(`${where} ${n} % appliqué à Pro 3, dont la remise calculée est ${annualDiscountPercent("agency3")} %.`);
    }
  });
  if (file.endsWith("pricing-section.tsx")) {
    lines.forEach((line, i) => {
      const m = line.match(/^\s*-(\d+)%\s*$/);
      if (m && Number(m[1]) !== maxDiscount && !isExcepted(file, line)) {
        failures.push(`${file}:${i + 1} badge annuel -${m[1]}% ; la remise maximale calculée est ${maxDiscount} %.`);
      }
    });
  }
}

exceptions.forEach((e, i) => {
  if (!usedExceptions.has(i)) warnings.push(`exception inutile, à retirer de known-exceptions.json : ${e.file} « ${e.match} »`);
});

report("prix", failures, warnings);
