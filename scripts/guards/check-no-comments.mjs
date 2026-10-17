import { execSync } from "node:child_process";
import { report } from "./lib.mjs";

const base = process.env.GUARD_BASE || "origin/main";
const EXT = /\.(ts|tsx|js|jsx|mjs|cjs|css|php|ya?ml|sh)$/;
let diff = "";
try {
  diff = execSync(`git diff --unified=0 --no-color ${base}...HEAD`, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
} catch {
  console.error(`[commentaires] impossible de comparer avec ${base}.`);
  process.exit(1);
}
const failures = [];
let file = null;
let lineNo = 0;
for (const raw of diff.split("\n")) {
  if (raw.startsWith("+++ ")) {
    file = raw.slice(4).replace(/^b\//, "");
    continue;
  }
  const hunk = raw.match(/^@@ -\d+(?:,\d+)? \+(\d+)/);
  if (hunk) {
    lineNo = Number(hunk[1]);
    continue;
  }
  if (!file || !EXT.test(file) || file.startsWith("wp-plugin/vendor/")) continue;
  if (raw.startsWith("+") && !raw.startsWith("+++")) {
    const line = raw.slice(1);
    const code = line.replace(/(["'`])(?:\\.|(?!\1).)*\1/g, '""');
    const t = code.trim();
    const isComment =
      t.startsWith("//") ||
      t.startsWith("/*") ||
      t.startsWith("{/*") ||
      t.startsWith("<!--") ||
      (t.startsWith("*") && !t.startsWith("**") && /^\*(\s|\/|$)/.test(t)) ||
      /[;,{}()\]]\s*\/\/(?!\/)/.test(code) ||
      /\s\/\*[\s\S]*\*\//.test(code) ||
      (file.endsWith(".php") && /^\s*#(?!\[)/.test(line)) ||
      (/\.(ya?ml|sh)$/.test(file) && !(lineNo === 1 && t.startsWith("#!")) && (t.startsWith("#") || /\s#\s/.test(code)));
    if (isComment) failures.push(`${file}:${lineNo} commentaire ajouté : ${t.slice(0, 80)}`);
    lineNo++;
  }
}
report("commentaires", failures);
