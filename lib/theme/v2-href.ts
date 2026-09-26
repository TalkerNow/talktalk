const V2_PAGES = new Set([
  "/",
  "/produit",
  "/installer",
  "/contact",
  "/faq",
  "/methode",
]);

export function isV2Path(pathname: string | null | undefined) {
  return pathname === "/v2" || Boolean(pathname?.startsWith("/v2/"));
}

/** On `/v2/*`, keep marketing links inside the colored charter. Elsewhere, return `href` unchanged. */
export function toV2Href(href: string, pathname: string | null | undefined) {
  if (!isV2Path(pathname) || href === "#") return href;
  if (href.startsWith("#")) return `/v2${href}`;

  const hashIndex = href.indexOf("#");
  const path = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : href.slice(hashIndex);
  if (!V2_PAGES.has(path)) return href;

  const base = path === "/" ? "/v2" : `/v2${path}`;
  return `${base}${hash}`;
}
