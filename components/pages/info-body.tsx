"use client";

import { useLocale } from "@/components/i18n/locale-context";
import type { LegalPage } from "@/lib/content/site-pages";

const linkClass =
  "text-[#C43F17] underline decoration-[#E3B49F] underline-offset-2 transition-colors hover:text-[#A8350F]";

function LegalArticle({ page }: { page: LegalPage }) {
  return (
    <article>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-[#111111] lg:text-6xl">
        {page.title}
      </h1>
      <p className="mt-6 bg-[#EDEBE3] px-4 py-3 text-sm leading-6 text-[#52525B]">
        {page.notice}
      </p>
      <div className="mt-12 space-y-10">
        {page.sections.map((section) => (
          <section key={section.title} className="border-t border-[#DCD9CE] pt-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-[#111111]">
              {section.title}
            </h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-[#52525B] lg:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {section.links?.length ? (
              <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-base">
                {section.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={linkClass}
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                ))}
              </p>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}

export function InfoBody({
  kind,
}: {
  kind: "recrutement" | "methode" | "privacy" | "terms" | "mentions" | "gdpr";
}) {
  const { t } = useLocale();

  if (kind === "recrutement") {
    const copy = t.pages.recrutement;
    return (
      <article>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-[#111111] lg:text-6xl">
          {copy.title}
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-[#52525B]">{copy.lead}</p>
        <a
          href="mailto:hello@talker.now"
          className="mt-8 inline-flex h-11 items-center rounded-full bg-[#C43F17] px-5 text-sm font-medium text-white transition-colors hover:bg-[#A8350F]"
        >
          {copy.cta}
        </a>
      </article>
    );
  }

  if (kind === "methode") {
    const copy = t.pages.methode;
    return (
      <article>
        <p className="mb-4 font-mono text-sm text-[#6B6B73]">{copy.eyebrow}</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-[#111111] lg:text-6xl">
          {copy.title}
        </h1>
        <p className="mt-6 text-xl leading-snug text-[#52525B]">{copy.subhead}</p>

        <section id="trafic" className="mt-14 border-t border-[#DCD9CE] pt-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-[#111111] lg:text-3xl">
            {copy.traficTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#52525B] lg:text-lg">
            {copy.traficBody}
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#52525B] lg:text-lg">
            {copy.traficFollow}{" "}
            <a href="/faq" className={linkClass}>
              {copy.faqLabel}
            </a>
            .
          </p>
        </section>

        <section id="zip" className="mt-14 border-t border-[#DCD9CE] pt-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-[#111111] lg:text-3xl">
            {copy.zipTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#52525B] lg:text-lg">
            {copy.zipLead}
          </p>
          <ul className="mt-5 space-y-2.5">
            {copy.steps.map((step, index) => (
              <li
                key={step}
                className="flex items-start gap-3 text-base leading-relaxed text-[#52525B] lg:text-lg"
              >
                <span
                  className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-[#C43F17]"
                  aria-hidden
                />
                <span>
                  {step}
                  {index === 1 ? (
                    <>
                      {" "}
                      <a href="/installer" className={linkClass}>
                        {copy.installLabel}
                      </a>
                      .
                    </>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </article>
    );
  }

  const legal = {
    privacy: t.pages.privacy,
    terms: t.pages.terms,
    mentions: t.pages.mentions,
    gdpr: t.pages.gdpr,
  }[kind];

  return <LegalArticle page={legal} />;
}
