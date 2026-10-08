import {
  ArticleShell,
  FaqBlock,
  JsonLd,
  SeeAlso,
} from "@/components/pages/article-shell";
import {
  ALTERNATIVE_ILLUSTRATION,
  alternativeAlsoLinks,
  alternativeFaqJsonLd,
  getAlternative,
  type AlternativeId,
} from "@/lib/content/alternatives";

export function AlternativeBody({ id }: { id: AlternativeId }) {
  const page = getAlternative(id);

  return (
    <ArticleShell wide>
      <JsonLd data={alternativeFaqJsonLd(id)} />
      <article>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-[#111111] lg:text-6xl">
          {page.h1}
        </h1>

        <section className="mt-8 bg-[#EDEBE3] px-5 py-5">
          <h2 className="text-sm font-medium text-[#111111]">Réponse courte</h2>
          <p className="mt-3 text-lg leading-relaxed text-[#111111]">{page.shortAnswer}</p>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-[#111111]">
            {page.tableTitle}
          </h2>
          <table className="mt-6 w-full text-left text-sm leading-relaxed lg:text-base">
            <thead className="hidden md:table-header-group">
              <tr className="border-b border-[#DCD9CE] text-[#111111]">
                <th className="py-3 pr-4 font-medium"> </th>
                <th className="py-3 pr-4 font-medium">Talker</th>
                <th className="py-3 font-medium">{page.otherName}</th>
              </tr>
            </thead>
            <tbody>
              {page.rows.map((row) => (
                <tr
                  key={row.label}
                  className="block border-t border-[#DCD9CE] py-4 md:table-row md:py-0"
                >
                  <th className="block pb-2 font-medium text-[#111111] md:table-cell md:w-[22%] md:py-4 md:pr-4 md:align-top">
                    {row.label}
                  </th>
                  <td className="block pb-2 text-[#52525B] md:table-cell md:py-4 md:pr-4 md:align-top">
                    <span className="mb-1 block text-xs font-medium text-[#111111] md:hidden">
                      Talker
                    </span>
                    {row.talker}
                  </td>
                  <td className="block text-[#52525B] md:table-cell md:py-4 md:align-top">
                    <span className="mb-1 block text-xs font-medium text-[#111111] md:hidden">
                      {page.otherName}
                    </span>
                    {row.other}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-14 border-t border-[#DCD9CE] pt-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-[#111111]">
            {page.whenOtherTitle}
          </h2>
          <ul className="mt-4 space-y-2 text-base leading-relaxed text-[#52525B] lg:text-lg">
            {page.whenOther.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-[#111111]">
            {page.whenTalkerTitle}
          </h2>
          <ul className="mt-4 space-y-2 text-base leading-relaxed text-[#52525B] lg:text-lg">
            {page.whenTalker.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <figure className="mt-14">
          {/* Plain img: /_next/image is outside the site gate, this file is not. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ALTERNATIVE_ILLUSTRATION.src}
            alt={ALTERNATIVE_ILLUSTRATION.alt}
            width={ALTERNATIVE_ILLUSTRATION.width}
            height={ALTERNATIVE_ILLUSTRATION.height}
            className="h-auto w-full"
          />
          <figcaption className="mt-3 text-sm text-[#6B6B73]">
            {ALTERNATIVE_ILLUSTRATION.caption}
          </figcaption>
        </figure>

        <section className="mt-14 border-t border-[#DCD9CE] pt-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-[#111111]">
            FAQ
          </h2>
          <FaqBlock items={page.faq} />
        </section>

        <section className="mt-14 border-t border-[#DCD9CE] pt-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-[#111111]">
            Sources
          </h2>
          <p className="mt-4 flex flex-col gap-2 text-base">
            {page.sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                className="break-all text-[#C43F17] underline decoration-[#E3B49F] underline-offset-2 hover:text-[#A8350F]"
                target="_blank"
                rel="noopener noreferrer"
              >
                {source.label}
              </a>
            ))}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#6B6B73]">{page.sourceNote}</p>
        </section>

        <SeeAlso links={alternativeAlsoLinks(id)} />
      </article>
    </ArticleShell>
  );
}
