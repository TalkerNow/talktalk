/**
 * Talker symbole — rayon 25, queue I2, points croissants.
 * Lock JF 2026-09-29. Stroke and dots are coral #C43F17.
 * Corner radius is 25 on a 93×71 body. Tight crop includes the tail.
 */
export const BUBBLE_VIEWBOX = "13.8 11.8 105 92.6";

export const BUBBLE_STROKE = 6.4;

export const BUBBLE_OUTLINE =
  "M 45 18 H 87.86 C 101.66 18 112.86 29.19 112.86 43 V 64.43 C 112.86 78.24 101.66 89.43 87.86 89.43 H 62.86 C 48.86 89.43 53 97.36 45 98.36 C 39 92.36 28 73.54 20 63.54 V 43 C 20 29.19 31.19 18 45 18 Z";

/** Small → medium → large, left to right, centered in the body. */
export const BUBBLE_DOTS = [
  { cx: 47.68, cy: 53.71, r: 4.46 },
  { cx: 66.43, cy: 53.71, r: 6.07 },
  { cx: 86.96, cy: 53.71, r: 7.86 },
] as const;

/** Solid coral silhouette with the three dots punched out. For the tiny dark chip only. */
export const BUBBLE_FILLED = `${BUBBLE_OUTLINE} M 43.22 53.71 A 4.46 4.46 0 1 0 52.14 53.71 A 4.46 4.46 0 1 0 43.22 53.71 Z M 60.36 53.71 A 6.07 6.07 0 1 0 72.5 53.71 A 6.07 6.07 0 1 0 60.36 53.71 Z M 79.1 53.71 A 7.86 7.86 0 1 0 94.82 53.71 A 7.86 7.86 0 1 0 79.1 53.71 Z`;
