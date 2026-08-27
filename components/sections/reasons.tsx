"use client";

import { useEffect, useState } from "react";
import type { LandingContent, Reason } from "@/lib/content/types";

export function Reasons({ content }: { content: LandingContent }) {
  const [activeId, setActiveId] = useState(content.reasons[0]?.id ?? "");
  const [indexOpen, setIndexOpen] = useState(false);
  const active =
    content.reasons.find((reason) => reason.id === activeId) ??
    content.reasons[0];

  useEffect(() => {
    const nodes = content.reasons
      .map((reason) => document.getElementById(reason.id))
      .filter((node): node is HTMLElement => Boolean(node));
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        let best = content.reasons[0]?.id ?? "";
        let bestRatio = -1;
        for (const reason of content.reasons) {
          const ratio = ratios.get(reason.id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = reason.id;
          }
        }
        if (bestRatio > 0) setActiveId(best);
      },
      {
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
        rootMargin: "-18% 0px -42% 0px",
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [content.reasons]);

  return (
    <section id="raisons" className="relative scroll-mt-24">
      <div className="px-5 pb-6 pt-10 md:pt-16">
        <p className="mx-auto max-w-6xl font-serif text-[clamp(2rem,5vw,3.6rem)] leading-none">
          {content.reasonsEyebrow}
        </p>
      </div>

      {content.reasons.map((reason) => (
        <ReasonBlock key={reason.id} reason={reason} />
      ))}

      {active ? (
        <div className="pointer-events-none fixed bottom-6 left-4 z-30 hidden md:block">
          <div className="pointer-events-auto relative">
            <button
              type="button"
              onClick={() => setIndexOpen((open) => !open)}
              className="flex items-center gap-3 rounded-xl border border-line bg-paper px-3 py-2.5 shadow-[0_10px_30px_rgba(22,19,16,0.1)]"
              aria-expanded={indexOpen}
            >
              <span className="font-serif text-lg text-muted">
                {active.number}
              </span>
              <span className="max-w-[14rem] truncate text-left text-[13px] text-ink">
                {active.title}
              </span>
              <span className="text-muted" aria-hidden>
                ⌄
              </span>
            </button>
            {indexOpen ? (
              <ul className="absolute bottom-full mb-2 w-[22rem] rounded-xl border border-line bg-paper p-2 shadow-[0_16px_40px_rgba(22,19,16,0.12)]">
                {content.reasons.map((reason) => (
                  <li key={reason.id}>
                    <a
                      href={`#${reason.id}`}
                      onClick={() => setIndexOpen(false)}
                      className={`flex items-start gap-3 rounded-lg px-3 py-2 text-left ${
                        reason.id === active.id ? "bg-[#f1ece5]" : ""
                      }`}
                    >
                      <span className="font-serif text-muted">
                        {reason.number}
                      </span>
                      <span className="text-[13px] leading-5 text-ink">
                        {reason.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ReasonBlock({ reason }: { reason: Reason }) {
  return (
    <article
      id={reason.id}
      className="min-h-[72vh] scroll-mt-28 px-5 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-serif text-[clamp(3rem,8vw,6rem)] leading-none text-[#d7d0c7]">
          {reason.number}
        </p>
        <h2 className="mt-4 max-w-3xl font-serif text-[clamp(2.1rem,5vw,4.2rem)] leading-[1.05] tracking-[-0.02em]">
          {reason.title}
        </h2>
        <p className="mt-6 max-w-xl text-[17px] leading-8 text-muted">
          {reason.body}
        </p>
      </div>
    </article>
  );
}
