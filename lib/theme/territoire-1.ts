/**
 * Territoire 1 Musclé (Light) — Cobalt Précision + orange accent.
 * Cobalt: HARD-talker-home-v2-color-20260926.
 * Accent MAIN #FF6B2C: HARD-talker-accent-ff6b2c-20260926.
 * Shades 50/300/600/800 keep the previous ramp's lightness, on the #FF6B2C hue.
 * Applied on the live site via `html.t1`.
 */
export const territoire1 = {
  cobalt50: "#EEF4FF",
  cobalt300: "#A4C1FD",
  cobalt: "#1E4AE9",
  cobalt600: "#1638C4",
  cobalt800: "#0D2073",
  accent50: "#FFF2ED",
  accent300: "#FDA885",
  accent: "#FF6B2C",
  accent600: "#E54E0D",
  accent800: "#943208",
} as const;

/** Injected on the document so `app/v2/t1.css` can map roles without a second hex list. */
export const t1VarStyle = `:root{--t1-cobalt-50:${territoire1.cobalt50};--t1-cobalt-300:${territoire1.cobalt300};--t1-cobalt:${territoire1.cobalt};--t1-cobalt-600:${territoire1.cobalt600};--t1-cobalt-800:${territoire1.cobalt800};--t1-accent-50:${territoire1.accent50};--t1-accent-300:${territoire1.accent300};--t1-accent:${territoire1.accent};--t1-accent-600:${territoire1.accent600};--t1-accent-800:${territoire1.accent800}}`;
