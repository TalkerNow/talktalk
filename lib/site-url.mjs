export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://talker.now";
}

export function siteOrigin() {
  return siteUrl().replace(/\/$/, "");
}
