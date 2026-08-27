import { TalkerWordmark } from "@/components/brand/mark";
import type { LandingContent } from "@/lib/content/types";

export function SiteFooter({ content }: { content: LandingContent }) {
  return (
    <footer className="border-t border-line px-5 pb-28 pt-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <TalkerWordmark />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            {content.footerLine}
          </p>
        </div>
        <nav className="flex flex-wrap gap-5 text-sm text-muted">
          <a href="#produit" className="hover:text-ink">
            {content.nav.produit}
          </a>
          <a href="#prix" className="hover:text-ink">
            {content.nav.prix}
          </a>
          <a href="#beta" className="hover:text-ink">
            {content.nav.beta}
          </a>
          <a href="#contact" className="hover:text-ink">
            {content.nav.contact}
          </a>
        </nav>
      </div>
    </footer>
  );
}
