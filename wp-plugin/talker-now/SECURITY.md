# Talker WordPress plugin — zip security

Thin client. No Gemini, n8n, or vendor secrets in this zip. `webhook_url` stays empty at activate; visitors still get the French stub. Gérant QCM / crawl is unchanged.

## Controls

| Control | Where |
| --- | --- |
| REST auth (nonce **or** application password **or** HMAC) | `Talker_Now_Security::authorize_message` |
| Rate limit per IP + per site (transients) | `Talker_Now_Security::consume_rate_limit` |
| Webhook HTTPS + block private / link-local / reserved IPs | `Talker_Now_Security::webhook_url_is_allowed` |
| `talker_site_key` on activate / first boot | `Talker_Now_Security::ensure_site_key` |
| Outbound HMAC `X-Talker-Signature` | `Talker_Now_Security::webhook_headers` |

`permission_callback` is **not** `__return_true`. The widget already sends `X-WP-Nonce` (`wp_rest`).

### Rate-limit constants (wp-config.php, before the plugin loads)

| Constant | Default | Meaning |
| --- | ---: | --- |
| `TALKER_NOW_RATE_WINDOW` | 60 | Bucket length (seconds) |
| `TALKER_NOW_RATE_SOFT` | 40 | Per-IP hits before a 1s sleep |
| `TALKER_NOW_RATE_HARD` | 90 | Per-IP hits → HTTP 429 |
| `TALKER_NOW_RATE_SITE_SOFT` | 80 | Site-wide hits before sleep |
| `TALKER_NOW_RATE_SITE_HARD` | 240 | Site-wide hits → HTTP 429 |
| `TALKER_NOW_RATE_SOFT_SLEEP` | 1 | Soft delay (set `0` in tests) |
| `TALKER_NOW_SIGN_SKEW` | 300 | Inbound HMAC timestamp skew |

Soft = request still runs (paying chat / stub). Hard = 429. Logged-in `manage_options` (gérant QCM / `site_read` poll) skips sleep and the normal hard cap so crawl is not broken; only extreme manager volume 429s (`3×` IP hard or `2×` site hard).

Empty or rejected `webhook_url` → French stub, HTTP 200. Invalid webhook is never posted.

### Outbound signature (backend must reject unsigned)

```
X-Talker-Timestamp: <unix seconds>
X-Talker-Signature: sha256=<hex>
X-Talker-Site: <home_url>
```

`hex = HMAC_SHA256( site_key, "{timestamp}.{raw_json_body}" )`. Option: `talker_site_key`. Allowlist later: `talker_now_webhook_url_is_allowed`.

## Cap'tain — verify

Replace `SITE` with the WordPress origin (pretty permalinks on).

### Missing nonce / signature → 401

```bash
curl -sD - -o /tmp/talker-auth.json -X POST \
  "$SITE/wp-json/talker/v1/message" \
  -H "Content-Type: application/json" \
  -d '{"message":"ping","actor":"visitor","surface":"public"}'
```

Expect `HTTP/1.1 401` and `"code":"talker_rest_forbidden"`. Widget path still works: it sends `X-WP-Nonce`.

### Burst → 429

```bash
# Optional: define TALKER_NOW_RATE_HARD 5 in wp-config.php, then:
for i in $(seq 1 12); do
  curl -s -o /dev/null -w "%{http_code}\n" -X POST \
    "$SITE/wp-json/talker/v1/message" \
    -H "Content-Type: application/json" \
    -d '{"message":"ping","actor":"visitor"}'
done
```

Unauthenticated hits still consume the IP/site buckets. After the hard cap: `429` and `"code":"talker_rate_limited"`. Default hard is 90/min/IP — lower `TALKER_NOW_RATE_HARD` to see it quickly.

### HMAC (outbound / inbound)

```bash
# After activate: wp option get talker_site_key
# Unsigned webhook posts must be rejected by the Talker backend.
# Signed inbound (optional, same formula as outbound):
TS=$(date +%s)
BODY='{"message":"ping","actor":"visitor"}'
SIG=$(printf '%s' "$TS.$BODY" | openssl dgst -sha256 -hmac "$SITE_KEY" | awk '{print $NF}')
curl -sD - -X POST "$SITE/wp-json/talker/v1/message" \
  -H "Content-Type: application/json" \
  -H "X-Talker-Timestamp: $TS" \
  -H "X-Talker-Signature: sha256=$SIG" \
  -d "$BODY"
```

### Offline (no WordPress)

```bash
php scripts/test-plugin-qcm.php
php scripts/test-plugin-security.php
```

QCM / crawl tests must still pass. Do not put Gemini or n8n tokens in the zip.
