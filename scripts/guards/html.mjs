const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", "#39": "'", "#x27": "'" };

export function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z0-9#]+);/gi, (m, n) => ENTITIES[n] ?? m);
}

export function norm(s) {
  return decode(s).replace(/[\u00a0\u202f\s]+/g, " ").replace(/[’]/g, "'").trim();
}

export function visibleText(html) {
  const body = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<!--[\s\S]*?-->/g, "");
  return norm(body.replace(/<[^>]+>/g, " "));
}

export function jsonLdBlocks(html) {
  const out = [];
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      out.push(JSON.parse(m[1]));
    } catch {
      out.push({ __invalid: m[1].slice(0, 80) });
    }
  }
  return out;
}

export function flattenLd(node, out = []) {
  if (Array.isArray(node)) node.forEach((n) => flattenLd(n, out));
  else if (node && typeof node === "object") {
    out.push(node);
    if (node["@graph"]) flattenLd(node["@graph"], out);
  }
  return out;
}
