import type { LandingContent } from "@/lib/content/types";

export function HowSection({ content }: { content: LandingContent }) {
  return (
    <section id="produit" className="scroll-mt-28 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-[13px] tracking-wide text-muted">{content.whoTitle}</p>
          <h2 className="mt-3 font-serif text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] tracking-[-0.02em]">
            {content.whoBody}
          </h2>
        </div>
        <p className="mt-12 text-[13px] tracking-wide text-muted">
          {content.howTitle}
        </p>
        <p className="mt-3 max-w-xl text-[17px] leading-8 text-muted">
          {content.howBody}
        </p>
        <ol className="mt-14 grid gap-10 md:grid-cols-3">
          {content.howSteps.map((step, index) => (
            <li key={step.title}>
              <p className="font-serif text-4xl text-muted-2">
                0{index + 1}
              </p>
              <h3 className="mt-3 text-[18px] font-medium">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
