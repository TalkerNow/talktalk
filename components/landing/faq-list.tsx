"use client";

import { useLocale } from "@/components/i18n/locale-context";

export function FaqList({ variant = "page" }: { variant?: "page" | "section" }) {
  const { t } = useLocale();
  const isPage = variant === "page";
  const Heading = isPage ? "h1" : "h2";

  return (
    <section
      id="faq"
      className={
        isPage
          ? "relative overflow-visible pb-20 pt-32 lg:pb-28 lg:pt-40"
          : "relative overflow-visible py-12 lg:py-16"
      }
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Heading
          className={
            isPage
              ? "mb-12 font-display text-5xl font-semibold tracking-tight lg:mb-16 lg:text-7xl xl:text-8xl"
              : "mb-8 font-display text-4xl font-semibold tracking-tight lg:mb-10 lg:text-6xl xl:text-7xl"
          }
        >
          {t.faq.title}
        </Heading>

        <div className="max-w-3xl border-t border-[#DCD9CE]">
          {t.faq.items.map((item) => (
            <details
              key={item.q}
              className="group border-b border-[#DCD9CE] open:bg-transparent"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C43F17] lg:py-6">
                <span className="font-display text-lg leading-snug tracking-tight text-[#111111] lg:text-2xl">
                  {item.q}
                </span>
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center text-2xl font-light leading-none text-[#C43F17]"
                  aria-hidden
                >
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <div className="max-w-2xl space-y-3 pb-6 text-base leading-relaxed text-[#52525B] lg:pb-8 lg:text-lg">
                {(Array.isArray(item.a) ? item.a : [item.a]).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
