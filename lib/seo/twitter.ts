/** Locked X/Twitter handle. Always emitted. A valid NEXT_PUBLIC_TWITTER_SITE may override it. */
export const DEFAULT_TWITTER_SITE = "@TalkerNow";

export function twitterSiteFromEnv(
  raw = process.env.NEXT_PUBLIC_TWITTER_SITE,
): string {
  const value = raw?.trim();
  if (!value) return DEFAULT_TWITTER_SITE;
  const handle = value.startsWith("@") ? value : `@${value}`;
  if (!/^@[A-Za-z0-9_]{1,15}$/.test(handle)) return DEFAULT_TWITTER_SITE;
  return handle;
}
