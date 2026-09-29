"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "@/components/i18n/locale-context";
import {
  isMethodeLink,
  methodeEn,
  methodeFr,
  type MethodeInline,
} from "@/lib/content/methode";
import { toV2Href } from "@/lib/theme/v2-href";

function RichText({ parts }: { parts: MethodeInline[] }) {
  const pathname = usePathname();
  return (
    <>
      {parts.map((part, index) => {
        if (!isMethodeLink(part)) {
          return <span key={index}>{part}</span>;
        }

        if (part.internal) {
          return (
            <a
              key={index}
              href={toV2Href(part.href, pathname)}
              className="text-[#C43F17] underline decoration-[#C43F17]/40 underline-offset-2 transition-colors hover:text-[#A8350F] hover:decoration-[#A8350F]"
            >
              {part.text}
            </a>
          );
        }

        return (
          <a
            key={index}
            href={part.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C43F17] underline decoration-[#C43F17]/40 underline-offset-2 transition-colors hover:text-[#A8350F] hover:decoration-[#A8350F]"
          >
            {part.text}
          </a>
        );
      })}
    </>
  );
}

export function MethodeArticle() {
  const { locale } = useLocale();
  const copy = locale === "en" ? methodeEn : methodeFr;

  return (
    <article className="relative overflow-visible pb-20 pt-32 lg:pb-28 lg:pt-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <header className="mb-14 max-w-3xl lg:mb-20">
          <span className="t1-kicker mb-6 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
            <span className="h-px w-8 bg-foreground/30" />
            {copy.eyebrow}
          </span>
          <h1 className="font-display text-5xl font-semibold tracking-tight lg:text-7xl xl:text-8xl">
            {copy.h1}
          </h1>
          <p className="mt-8 text-xl leading-snug text-[#52525B] lg:text-2xl">
            {copy.subhead}
          </p>
          <div className="mt-8 space-y-4 text-base leading-relaxed text-[#52525B] lg:text-lg">
            {copy.intro.map((parts) => (
              <p key={parts.map((part) => (isMethodeLink(part) ? part.text : part)).join("")}>
                <RichText parts={parts} />
              </p>
            ))}
          </div>
        </header>

        <div className="max-w-3xl space-y-16 lg:space-y-20">
          {copy.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="border-t border-[#DCD9CE] pt-10"
            >
              <h2 className="mb-6 font-display text-3xl font-semibold tracking-tight text-[#111111] lg:text-4xl">
                {section.h2}
              </h2>
              <div className="space-y-5">
                {section.blocks.map((block, blockIndex) => {
                  if (block.type === "p") {
                    return (
                      <p
                        key={`${section.id}-p-${blockIndex}`}
                        className="text-base leading-relaxed text-[#52525B] lg:text-lg"
                      >
                        <RichText parts={block.parts} />
                      </p>
                    );
                  }

                  if (block.type === "h3") {
                    return (
                      <h3
                        key={`${section.id}-h3-${blockIndex}`}
                        className="pt-4 font-display text-xl font-semibold tracking-tight text-[#111111] lg:text-2xl"
                      >
                        {block.title}
                      </h3>
                    );
                  }

                  if (block.type === "ul") {
                    return (
                      <ul
                        key={`${section.id}-ul-${blockIndex}`}
                        className="space-y-2.5"
                      >
                        {block.items.map((item) => (
                          <li
                            key={item
                              .map((part) =>
                                isMethodeLink(part) ? part.text : part
                              )
                              .join("")}
                            className="flex items-start gap-3 text-base leading-relaxed text-[#52525B] lg:text-lg"
                          >
                            <span
                              className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-[#C43F17]"
                              aria-hidden
                            />
                            <span>
                              <RichText parts={item} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <aside
                      key={`${section.id}-callout-${blockIndex}`}
                      className="bg-[#FAEDE7] px-5 py-5 sm:px-6"
                    >
                      <h3 className="font-display text-xl font-semibold tracking-tight text-[#111111] lg:text-2xl">
                        {block.title}
                      </h3>
                      <ul className="mt-4 space-y-2.5">
                        {block.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-base leading-relaxed text-[#111111] lg:text-lg"
                          >
                            <span
                              className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-[#C43F17]"
                              aria-hidden
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </aside>
                  );
                })}
              </div>
            </section>
          ))}

          <section id="faq-methode" className="border-t border-[#DCD9CE] pt-10">
            <h2 className="mb-8 font-display text-3xl font-semibold tracking-tight text-[#111111] lg:text-4xl">
              {copy.faqTitle}
            </h2>
            <div className="border-t border-[#DCD9CE]">
              {copy.faq.map((item) => (
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
                  <div className="max-w-2xl pb-6 text-base leading-relaxed text-[#52525B] lg:pb-8 lg:text-lg">
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
