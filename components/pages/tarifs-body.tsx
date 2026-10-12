import { PricingSection } from "@/components/landing/pricing-section";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { FaqBlock, JsonLd, linkClass, SeeAlso } from "@/components/pages/article-shell";
import {
  TARIFS_H1,
  tarifsAfterHundred,
  tarifsAlso,
  tarifsFaq,
  tarifsFaqJsonLd,
  tarifsSummary,
  tarifsWhiteLabel,
} from "@/lib/content/tarifs";

export function TarifsBody() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7F6F4] noise-overlay">
      <JsonLd data={tarifsFaqJsonLd} />
      <Navigation />
      <div className="pt-32 lg:pt-40">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-[#111111] lg:text-6xl">
            {TARIFS_H1}
          </h1>
          <div className="mt-8 space-y-3 text-xl font-semibold leading-snug text-[#111111] md:text-2xl">
            {tarifsSummary.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="/installer"
              className="inline-flex h-11 items-center rounded-full bg-[#C43F17] px-5 text-sm font-medium text-white transition-colors hover:bg-[#A8350F]"
            >
              Installer Talker
            </a>
            <a href="#pricing" className={linkClass}>
              Voir le détail des plans
            </a>
          </div>
        </div>
      </div>

      <PricingSection showTarifsLink={false} />

      <div className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <section className="border-t border-[#DCD9CE] pt-10">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-[#111111] lg:text-3xl">
              {tarifsAfterHundred.title}
            </h2>
            <ul className="mt-6 space-y-3 text-base leading-relaxed text-[#52525B] lg:text-lg">
              {tarifsAfterHundred.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-14 border-t border-[#DCD9CE] pt-10">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-[#111111] lg:text-3xl">
              {tarifsWhiteLabel.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#52525B] lg:text-lg">
              {tarifsWhiteLabel.intro}
            </p>
            <div className="mt-6">
              <table className="w-full text-left text-sm leading-relaxed">
                <thead className="hidden md:table-header-group">
                  <tr className="border-b border-[#DCD9CE] text-[#111111]">
                    {tarifsWhiteLabel.columns.map((column) => (
                      <th key={column} className="py-3 pr-4 font-medium">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tarifsWhiteLabel.rows.map((row) => (
                    <tr
                      key={row.tool}
                      className="block border-t border-[#DCD9CE] py-4 md:table-row md:py-0"
                    >
                      <th className="block pb-2 font-medium text-[#111111] md:table-cell md:py-4 md:pr-4 md:align-top">
                        {row.tool}
                      </th>
                      <td className="block pb-2 text-[#52525B] md:table-cell md:py-4 md:pr-4 md:align-top">
                        <span className="mb-1 block text-xs font-medium text-[#111111] md:hidden">
                          Marque blanche à partir de
                        </span>
                        {row.from}
                      </td>
                      <td className="block pb-2 text-[#52525B] md:table-cell md:py-4 md:pr-4 md:align-top">
                        <span className="mb-1 block text-xs font-medium text-[#111111] md:hidden">
                          Prix relevé
                        </span>
                        {row.price}
                      </td>
                      <td className="block text-[#52525B] md:table-cell md:py-4 md:align-top">
                        <span className="mb-1 block text-xs font-medium text-[#111111] md:hidden">
                          À savoir
                        </span>
                        {row.note}{" "}
                        {row.source ? (
                          <a
                            href={row.source.href}
                            className={linkClass}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {row.source.label}
                          </a>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#6B6B73]">
              {tarifsWhiteLabel.footnote}
            </p>
          </section>

          <section className="mt-14 border-t border-[#DCD9CE] pt-10">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-[#111111] lg:text-3xl">
              FAQ
            </h2>
            <FaqBlock items={tarifsFaq} />
          </section>

          <SeeAlso links={tarifsAlso} />
        </div>
      </div>
      <FooterSection />
    </main>
  );
}
