const PUBLIC_EXACT = new Set([
  "/gate",
  "/robots.txt",
  "/sitemap.xml",
  "/api/gate",
  "/api/health",
  "/favicon.ico",
  "/favicon.svg",
]);

export function isPublicPath(pathname: string) {
  if (PUBLIC_EXACT.has(pathname)) return true;
  return pathname.startsWith("/brand/");
}

export function safeNextPath(value: unknown): string {
  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw !== "string" || !raw.startsWith("/") || raw.startsWith("//")) {
    return "/";
  }

  try {
    const url = new URL(raw, "https://talker.now");
    if (url.origin !== "https://talker.now") return "/";
    if (url.pathname === "/gate" || url.pathname.startsWith("/gate/")) {
      return "/";
    }
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}
