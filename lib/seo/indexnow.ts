/**
 * IndexNow readiness. The key file is public (not a secret):
 * `public/<INDEXNOW_PUBLIC_KEY>.txt` is served at `/<key>.txt`.
 *
 * Submit stays off unless INDEXNOW_SUBMIT=true.
 * Enable submit only after Cap'tain gate-off GO (robots no longer Disallow: /).
 * Do not call this from CI while the site is gated.
 */
export const INDEXNOW_PUBLIC_KEY = "0cb96670f134d3ad83d2dfa0fa98e432";

export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export function indexNowHost() {
  const raw = process.env.INDEXNOW_HOST?.trim() || "talker.now";
  return raw.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function isIndexNowSubmitEnabled() {
  return process.env.INDEXNOW_SUBMIT === "true";
}

export function indexNowKeyLocation(host = indexNowHost()) {
  return `https://${host}/${INDEXNOW_PUBLIC_KEY}.txt`;
}

export type IndexNowSkipReason =
  | "disabled"
  | "missing-key"
  | "key-mismatch"
  | "empty-urls"
  | "bad-host";

export type IndexNowResult =
  | { submitted: false; reason: IndexNowSkipReason }
  | { submitted: true; status: number };

/**
 * POST a url list to IndexNow. No-ops unless INDEXNOW_SUBMIT=true and
 * INDEXNOW_KEY matches the hosted key file. Never called from the build.
 */
export async function submitIndexNow(urls: string[]): Promise<IndexNowResult> {
  if (!isIndexNowSubmitEnabled()) {
    return { submitted: false, reason: "disabled" };
  }

  const key = process.env.INDEXNOW_KEY?.trim() ?? "";
  if (!key) return { submitted: false, reason: "missing-key" };
  if (key !== INDEXNOW_PUBLIC_KEY) {
    return { submitted: false, reason: "key-mismatch" };
  }

  const host = indexNowHost();
  const list = urls.map((url) => url.trim()).filter(Boolean);
  if (list.length === 0) return { submitted: false, reason: "empty-urls" };

  for (const url of list) {
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return { submitted: false, reason: "bad-host" };
    }
    if (parsed.protocol !== "https:" || parsed.host !== host) {
      return { submitted: false, reason: "bad-host" };
    }
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation: indexNowKeyLocation(host),
      urlList: list,
    }),
  });

  return { submitted: true, status: response.status };
}
