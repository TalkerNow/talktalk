/**
 * Territoire 1 Musclé (Light) — Cobalt Précision + Vermillon Solaire.
 * Source: HARD-talker-home-v2-color-20260926.
 * Scoped to `/v2` (`html.t1`). The live `/` theme does not read these tokens.
 */
export const territoire1 = {
  cobalt50: "#EEF4FF",
  cobalt300: "#A4C1FD",
  cobalt: "#1E4AE9",
  cobalt600: "#1638C4",
  cobalt800: "#0D2073",
  vermillon50: "#FFF1ED",
  vermillon300: "#FF9E82",
  vermillon: "#FF4B26",
  vermillon600: "#E6320D",
  vermillon800: "#941E08",
} as const;

/** Injected on `/v2` so `app/v2/t1.css` can map roles without a second hex list. */
export const t1VarStyle = `:root{--t1-cobalt-50:${territoire1.cobalt50};--t1-cobalt-300:${territoire1.cobalt300};--t1-cobalt:${territoire1.cobalt};--t1-cobalt-600:${territoire1.cobalt600};--t1-cobalt-800:${territoire1.cobalt800};--t1-vermillon-50:${territoire1.vermillon50};--t1-vermillon-300:${territoire1.vermillon300};--t1-vermillon:${territoire1.vermillon};--t1-vermillon-600:${territoire1.vermillon600};--t1-vermillon-800:${territoire1.vermillon800}}`;
