import type { ReactNode } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

const linkClass =
  "text-[#C43F17] underline decoration-[#E3B49F] underline-offset-2 transition-colors hover:text-[#A8350F]";

export function ArticleShell({
  children,
  wide = false,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7F6F4] noise-overlay">
      <Navigation />
      <div className="pb-24 pt-32 lg:pb-32 lg:pt-40">
        <div className={`mx-auto px-6 lg:px-12 ${wide ? "max-w-5xl" : "max-w-3xl"}`}>
          {children}
        </div>
      </div>
      <FooterSection />
    </main>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function SeeAlso({
  links,
}: {
  links: readonly { href: string; label: string }[];
}) {
  return (
    <p className="mt-12 border-t border-[#DCD9CE] pt-8 text-base leading-relaxed text-[#52525B]">
      Voir aussi{" "}
      {links.map((link, index) => (
        <span key={link.href}>
          {index > 0 ? " · " : null}
          <a href={link.href} className={linkClass}>
            {link.label}
          </a>
        </span>
      ))}
      .
    </p>
  );
}

export function FaqBlock({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  return (
    <div className="mt-6 space-y-8">
      {items.map((item) => (
        <div key={item.q}>
          <h3 className="text-lg font-medium text-[#111111]">{item.q}</h3>
          <p className="mt-2 text-base leading-relaxed text-[#52525B] lg:text-lg">
            {item.a}
          </p>
        </div>
      ))}
    </div>
  );
}

export { linkClass };
