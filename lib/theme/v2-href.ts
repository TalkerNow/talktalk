/** Territoire 1 is the live site. The flag stays true so the charter behaviors apply on every route. */
export function isV2Path(pathname?: string | null) {
  void pathname;
  return true;
}

/** Marketing links stay on the public routes. `/v2` redirects to those routes. */
export function toV2Href(href: string, pathname?: string | null) {
  void pathname;
  return href;
}
