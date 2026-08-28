import gsap from "gsap";

export type ChatEls = {
  chips: Element | null;
  chipTalker: Element | null;
  user: Element | null;
  typing: Element | null;
  reply: Element | null;
};

export function resetChatDialogue(els: ChatEls) {
  gsap.set(els.chips, { autoAlpha: 0, scale: 1 });
  gsap.set(els.chipTalker, { scale: 1 });
  gsap.set([els.user, els.typing, els.reply], { autoAlpha: 0, y: 10 });
}

/**
 * Greeting is already on screen. Holds each line long enough to read,
 * then returns the absolute time when the reply has had air.
 * Sequence: greeting → visitor → typing → Talker reply (no invite chips).
 */
export function addChatDialogue(
  tl: gsap.core.Timeline,
  els: ChatEls,
  opts: {
    t0?: number;
    cursor?: { el: Element | null; chipAt: { x: number; y: number } };
  } = {},
): number {
  const { chips, user, typing, reply } = els;
  let t = (opts.t0 ?? 0) + 2.6;

  if (opts.cursor?.el) {
    const cursor = opts.cursor.el;
    tl.to(cursor, { autoAlpha: 1, duration: 0.35 }, t - 0.4);
  }

  if (chips) {
    gsap.set(chips, { autoAlpha: 0 });
  }

  tl.to(user, { autoAlpha: 1, y: 0, duration: 0.35 }, t);
  t += 2.4;

  tl.to(typing, { autoAlpha: 1, y: 0, duration: 0.28 }, t);
  t += 1.55;
  tl.to(typing, { autoAlpha: 0, duration: 0.2 }, t);
  t += 0.15;
  tl.to(reply, { autoAlpha: 1, y: 0, duration: 0.4 }, t);
  // Longer hold: install instructions need time to read.
  t += 6.8;

  return t;
}
