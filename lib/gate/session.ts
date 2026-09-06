import { createHmac, timingSafeEqual } from "node:crypto";
import { getSitePassword, isGateEnabled, isGateMisconfigured } from "./config";

const TOKEN_PAYLOAD = "talker-gate-v1";

export function createGateToken(password: string) {
  return createHmac("sha256", password).update(TOKEN_PAYLOAD).digest("hex");
}

export function passwordsMatch(submitted: string, expected: string) {
  const left = createHmac("sha256", TOKEN_PAYLOAD).update(submitted).digest();
  const right = createHmac("sha256", TOKEN_PAYLOAD).update(expected).digest();
  return timingSafeEqual(left, right);
}

export function isValidGateCookie(token: string | undefined) {
  if (!isGateEnabled() || isGateMisconfigured()) return false;
  const password = getSitePassword();
  if (!token || !password) return false;
  const expected = createGateToken(password);
  if (token.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

export function cookieSecure(request: Request) {
  const url = new URL(request.url);
  if (url.protocol === "https:") return true;
  return request.headers.get("x-forwarded-proto") === "https";
}
