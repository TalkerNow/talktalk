"use client";

import { useLocale } from "@/components/i18n/locale-context";

const linkClass =
  "text-[#C43F17] underline decoration-[#E3B49F] underline-offset-2 transition-colors hover:text-[#A8350F]";

export function ComparatifBody() {
  const { t } = useLocale();
  const copy = t.comparatif;

  return (
    <article id="comparatif">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-[#111111] lg:text-6xl">
        {copy.h1}
      </h1>
      <p className="mt-8 text-lg leading-relaxed text-[#52525B]">{copy.lead}</p>

      <div className="mt-14 space-y-10">
        {copy.rows.map((row) => (
          <section key={row.criterion} className="border-t border-[#DCD9CE] pt-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-[#111111]">
              {row.criterion}
            </h2>
            <dl className="mt-5 space-y-5">
              <div>
                <dt className="text-sm font-medium text-[#111111]">{copy.columns.talker}</dt>
                <dd className="mt-1 text-base leading-relaxed text-[#52525B] lg:text-lg">
                  {row.talker}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-[#111111]">{copy.columns.live}</dt>
                <dd className="mt-1 text-base leading-relaxed text-[#52525B] lg:text-lg">
                  {row.live}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-[#111111]">{copy.columns.engine}</dt>
                <dd className="mt-1 text-base leading-relaxed text-[#52525B] lg:text-lg">
                  {row.engine}
                </dd>
              </div>
            </dl>
          </section>
        ))}
      </div>

      <p className="mt-12 border-t border-[#DCD9CE] pt-8 text-base leading-relaxed text-[#52525B]">
        {copy.also}{" "}
        <a href="/faq" className={linkClass}>
          {copy.faqLabel}
        </a>
        {" · "}
        <a href="/installer" className={linkClass}>
          {copy.downloadLabel}
        </a>
        .
      </p>
    </article>
  );
}
