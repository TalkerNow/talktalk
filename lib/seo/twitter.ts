/** X/Twitter @handle from NEXT_PUBLIC_TWITTER_SITE. Unset until Cap'tain confirms. */
export function twitterSiteFromEnv(
  raw = process.env.NEXT_PUBLIC_TWITTER_SITE,
): string | undefined {
  const value = raw?.trim();
  if (!value) return undefined;
  const handle = value.startsWith("@") ? value : `@${value}`;
  if (!/^@[A-Za-z0-9_]{1,15}$/.test(handle)) return undefined;
  return handle;
}
