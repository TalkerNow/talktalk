import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

export const ROOT = process.cwd();

export function walk(dir, exts, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, exts, out);
    else if (exts.some((e) => name.endsWith(e))) out.push(full);
  }
  return out;
}

export function rel(p) {
  return relative(ROOT, p).split("\\").join("/");
}

export function read(p) {
  return readFileSync(p, "utf8");
}

export function readJson(p) {
  return JSON.parse(readFileSync(join(ROOT, p), "utf8"));
}

export function report(name, failures, warnings = []) {
  for (const w of warnings) console.log(`[${name}] avertissement : ${w}`);
  if (failures.length) {
    for (const f of failures) console.error(`[${name}] ÉCHEC : ${f}`);
    console.error(`[${name}] ${failures.length} erreur(s).`);
    process.exit(1);
  }
  console.log(`[${name}] OK`);
}
