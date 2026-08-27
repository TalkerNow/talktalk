import type { LandingContent } from "@/lib/content/types";

export function BetaSection({ content }: { content: LandingContent }) {
  return (
    <section id="beta" className="scroll-mt-28 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl font-serif text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.05]">
          {content.betaTitle}
        </h2>
        <p className="mt-6 max-w-xl text-[17px] leading-8 text-muted">
          {content.betaBody}
        </p>
        <ol className="mt-14 grid gap-10 md:grid-cols-3">
          {content.betaPoints.map((point, index) => (
            <li key={point.title}>
              <p className="text-[12px] tracking-wide text-muted-2">
                [ 0{index + 1} ]
              </p>
              <h3 className="mt-3 text-[18px] font-medium">{point.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-muted">
                {point.body}
              </p>
            </li>
          ))}
        </ol>

        <div
          id="prix"
          className="mt-20 scroll-mt-28 border-t border-line pt-14"
        >
          <p className="text-[13px] tracking-wide text-muted">Prix</p>
          <h3 className="mt-3 max-w-2xl font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.1]">
            {content.priceTitle}
          </h3>
          <p className="mt-5 max-w-xl text-[17px] leading-8 text-muted">
            {content.priceBody}
          </p>
        </div>
      </div>
    </section>
  );
}
