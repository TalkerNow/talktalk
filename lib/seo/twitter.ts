/** Locked X/Twitter handle. NEXT_PUBLIC_TWITTER_SITE overrides this. */
export const DEFAULT_TWITTER_SITE = "@TalkerNow";

export function twitterSiteFromEnv(
  raw = process.env.NEXT_PUBLIC_TWITTER_SITE,
): string | undefined {
  const value = raw?.trim() || DEFAULT_TWITTER_SITE;
  const handle = value.startsWith("@") ? value : `@${value}`;
  if (!/^@[A-Za-z0-9_]{1,15}$/.test(handle)) return undefined;
  return handle;
}
