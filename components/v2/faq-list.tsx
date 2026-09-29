"use client";

import { useLocale } from "@/components/i18n/locale-context";
import { faqEn, faqFr } from "@/lib/content/faq";

/** `/v2/faq` accordion. Marks alternate cobalt MAIN and accent MAIN. */
export function FaqListV2() {
  const { locale } = useLocale();
  const copy = locale === "en" ? faqEn : faqFr;

  return (
    <section id="faq" className="relative overflow-visible pb-20 pt-32 lg:pb-28 lg:pt-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <h1 className="mb-12 font-display text-5xl font-semibold tracking-tight text-[#111111] lg:mb-16 lg:text-7xl xl:text-8xl">
          {copy.title}
        </h1>

        <div className="t1-faq max-w-3xl">
          {copy.items.map((item, index) => (
            <details
              key={item.q}
              className="t1-faq-item group"
              data-tone={index % 2 === 0 ? "cobalt" : "accent"}
            >
              <summary className="t1-faq-summary">
                <span className="font-display text-lg leading-snug tracking-tight text-[#111111] lg:text-2xl">
                  {item.q}
                </span>
                <span className="t1-faq-mark" aria-hidden>
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <div className="max-w-2xl space-y-3 px-3 pb-6 text-base leading-relaxed text-[#52525B] lg:pb-8 lg:text-lg">
                {(Array.isArray(item.a) ? item.a : [item.a]).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {item.c ? <p>{item.c}</p> : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
