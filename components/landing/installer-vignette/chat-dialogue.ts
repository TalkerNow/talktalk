import gsap from "gsap";

export type ChatEls = {
  user: Element | null;
  typing: Element | null;
  reply: Element | null;
};

const REPLY_READ_HOLD_S = 6.8;

export function resetChatDialogue(els: ChatEls) {
  gsap.set([els.user, els.typing, els.reply], { autoAlpha: 0, y: 10 });
}

export function addChatDialogue(
  tl: gsap.core.Timeline,
  els: ChatEls,
  opts: {
    t0?: number;
    cursor?: { el: Element | null };
  } = {},
): number {
  const { user, typing, reply } = els;
  let t = (opts.t0 ?? 0) + 2.6;

  if (opts.cursor?.el) {
    const cursor = opts.cursor.el;
    tl.to(cursor, { autoAlpha: 1, duration: 0.35 }, t - 0.4);
  }

  tl.to(user, { autoAlpha: 1, y: 0, duration: 0.35 }, t);
  t += 2.4;

  tl.to(typing, { autoAlpha: 1, y: 0, duration: 0.28 }, t);
  t += 1.55;
  tl.to(typing, { autoAlpha: 0, duration: 0.2 }, t);
  t += 0.15;
  tl.to(reply, { autoAlpha: 1, y: 0, duration: 0.4 }, t);
  t += REPLY_READ_HOLD_S;

  return t;
}
