import { ArticleShell, linkClass } from "@/components/pages/article-shell";
import {
  CAS_CLIENT_BANNER,
  CAS_CLIENT_H1,
  casClientAsk,
  casClientBrief,
  casClientCta,
  casClientQuote,
  casClientSections,
} from "@/lib/content/cas-client-agence";

export function CasClientAgenceBody() {
  return (
    <ArticleShell>
      <p className="bg-[#FBF2DC] px-4 py-3 text-sm font-medium text-[#8A6100]">
        {CAS_CLIENT_BANNER}
      </p>
      <article className="mt-8">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-[#111111] lg:text-5xl">
          {CAS_CLIENT_H1}
        </h1>

        <section className="mt-8 bg-[#EDEBE3] px-5 py-5">
          <h2 className="text-sm font-medium text-[#111111]">En bref</h2>
          <dl className="mt-4 space-y-2 text-base text-[#52525B]">
            {casClientBrief.map((row) => (
              <div key={row.label} className="flex flex-wrap gap-x-2">
                <dt className="font-medium text-[#111111]">{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-12 space-y-10">
          {casClientSections.map((section) => (
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
            </section>
          ))}

          <section className="border-t border-[#DCD9CE] pt-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-[#111111]">
              Citation
            </h2>
            <blockquote className="mt-4 text-base leading-relaxed text-[#52525B] lg:text-lg">
              <p>« {casClientQuote.text} »</p>
              <footer className="mt-3 text-sm text-[#111111]">{casClientQuote.who}</footer>
            </blockquote>
          </section>
        </div>

        <p className="mt-12 text-lg leading-relaxed text-[#111111]">{casClientCta}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="/installer"
            className="inline-flex h-11 items-center rounded-full bg-[#C43F17] px-5 text-sm font-medium text-white transition-colors hover:bg-[#A8350F]"
          >
            Installer Talker
          </a>
          <a href="/tarifs" className={linkClass}>
            Tarifs
          </a>
        </div>

        <section className="mt-14 border-t border-[#DCD9CE] pt-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-[#111111]">
            Infos à demander à l&apos;agence
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-relaxed text-[#52525B]">
            {casClientAsk.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>
      </article>
    </ArticleShell>
  );
}
