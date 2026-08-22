"use client";

import { HeroArt } from "./hero-art";
import { useTalker } from "@/components/talker/provider";
import type { LandingContent } from "@/lib/content/types";

export function Hero({ content }: { content: LandingContent }) {
  const { openTalker } = useTalker();

  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <p className="mb-6 text-[13px] tracking-wide text-muted">
            Plugin WordPress · équipes de 5 à 30
          </p>
          <h1 className="max-w-[14ch] font-serif text-[clamp(3rem,8vw,6.1rem)] leading-[0.94] tracking-[-0.03em] text-ink">
            {content.heroTitle}
          </h1>
          <p className="mt-8 max-w-md text-[17px] leading-8 text-muted">
            {content.heroBody}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={openTalker}
              className="rounded-full bg-ink px-5 py-3 text-[14px] text-paper transition-colors hover:bg-rust"
            >
              {content.primaryCta}
            </button>
            <a
              href="#contact"
              className="rounded-full border border-ink px-5 py-3 text-[14px] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              {content.secondaryCta}
            </a>
          </div>
        </div>
        <HeroArt />
      </div>
    </section>
  );
}
