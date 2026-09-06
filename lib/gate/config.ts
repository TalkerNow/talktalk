export const GATE_COOKIE = "talker_site_gate";
export const GATE_MAX_AGE = 60 * 60 * 24 * 30;
export const ROBOTS_HEADER = "noindex, nofollow";

export function isGateEnabled() {
  return process.env.SITE_GATE_ENABLED === "true";
}

export function getSitePassword() {
  return process.env.SITE_PASSWORD ?? "";
}

export function isGateMisconfigured() {
  return isGateEnabled() && getSitePassword().length === 0;
}
