import gsap from "gsap";

export type ChatEls = {
  chips: Element | null;
  chipTalker: Element | null;
  user: Element | null;
  typing: Element | null;
  reply: Element | null;
};

export function resetChatDialogue(els: ChatEls) {
  gsap.set(els.chips, { autoAlpha: 1, scale: 1 });
  gsap.set(els.chipTalker, { scale: 1 });
  gsap.set([els.user, els.typing, els.reply], { autoAlpha: 0, y: 10 });
}

/**
 * Greeting is already on screen. Holds each line long enough to read,
 * then returns the absolute time when the reply has had air.
 */
export function addChatDialogue(
  tl: gsap.core.Timeline,
  els: ChatEls,
  opts: {
    t0?: number;
    cursor?: { el: Element | null; chipAt: { x: number; y: number } };
  } = {},
): number {
  const { chips, chipTalker, user, typing, reply } = els;
  let t = (opts.t0 ?? 0) + 2.2;

  if (opts.cursor?.el) {
    const cursor = opts.cursor.el;
    tl.to(cursor, { autoAlpha: 1, duration: 0.4 }, t);
    t += 0.2;
    tl.to(cursor, { ...opts.cursor.chipAt, duration: 0.8, ease: "power3.out" }, t);
    t += 0.9;
    tl.to(cursor, { scale: 0.84, duration: 0.08 }, t);
    tl.to(chipTalker, { scale: 0.96, duration: 0.08 }, t);
    t += 0.1;
    tl.to(cursor, { scale: 1, duration: 0.14 }, t);
    tl.to(chipTalker, { scale: 1, duration: 0.14 }, t);
    t += 0.25;
  } else {
    tl.to(chipTalker, { scale: 0.96, duration: 0.12 }, t);
    t += 0.12;
    tl.to(chipTalker, { scale: 1, duration: 0.14 }, t);
    t += 0.3;
  }

  tl.to(chips, { autoAlpha: 0, duration: 0.28 }, t);
  tl.to(user, { autoAlpha: 1, y: 0, duration: 0.35 }, t + 0.08);
  t += 2.0;

  tl.to(typing, { autoAlpha: 1, y: 0, duration: 0.28 }, t);
  t += 1.55;
  tl.to(typing, { autoAlpha: 0, duration: 0.2 }, t);
  t += 0.15;
  tl.to(reply, { autoAlpha: 1, y: 0, duration: 0.4 }, t);
  t += 4.6;

  return t;
}
