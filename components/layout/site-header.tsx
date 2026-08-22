"use client";

import { useEffect, useId, useState } from "react";
import { TalkerWordmark } from "@/components/brand/mark";
import { useTalker } from "@/components/talker/provider";
import type { LandingContent } from "@/lib/content/types";

export function SiteHeader({ content }: { content: LandingContent }) {
  const { openTalker } = useTalker();
  const [bannerOpen, setBannerOpen] = useState(true);
  const [productOpen, setProductOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const productId = useId();

  useEffect(() => {
    const close = () => setProductOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      {bannerOpen ? (
        <div className="relative bg-[#efe8de] px-4 py-2 text-center text-[13px] text-ink">
          {content.banner}
          <button
            type="button"
            onClick={() => setBannerOpen(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-2 text-muted"
            aria-label="Fermer l’annonce"
          >
            ×
          </button>
        </div>
      ) : null}

      <div className="border-b border-line/70 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5">
          <button
            type="button"
            onClick={openTalker}
            className="rounded-md focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-ink"
            aria-label="Ouvrir Talker"
          >
            <TalkerWordmark />
          </button>

          <nav className="hidden items-center gap-7 text-[14px] md:flex">
            <div
              className="relative"
              onMouseEnter={() => setProductOpen(true)}
              onMouseLeave={() => setProductOpen(false)}
            >
              <button
                type="button"
                aria-expanded={productOpen}
                aria-controls={productId}
                onClick={() => setProductOpen((open) => !open)}
                className="text-muted transition-colors hover:text-ink"
              >
                {content.nav.produit}
              </button>
              {productOpen ? (
                <div
                  id={productId}
                  className="absolute left-1/2 top-full z-50 w-[360px] -translate-x-1/2 pt-4"
                >
                  <div className="rounded-2xl border border-line bg-paper p-5 shadow-[0_18px_50px_rgba(22,19,16,0.1)]">
                    <p className="font-serif text-2xl text-ink">
                      {content.nav.produit}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {content.productMenu.map((item) => (
                        <li key={item.title}>
                          <a
                            href={item.href}
                            onClick={() => setProductOpen(false)}
                            className="block"
                          >
                            <span className="block text-[15px] font-medium text-ink">
                              {item.title}
                            </span>
                            <span className="block text-[13px] text-muted">
                              {item.subtitle}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
            <a className="text-muted hover:text-ink" href="#prix">
              {content.nav.prix}
            </a>
            <a className="text-muted hover:text-ink" href="#beta">
              {content.nav.beta}
            </a>
            <a className="text-muted hover:text-ink" href="#contact">
              {content.nav.contact}
            </a>
            <button
              type="button"
              onClick={openTalker}
              className="rounded-full bg-ink px-4 py-2 text-[13px] text-paper transition-colors hover:bg-rust"
            >
              {content.primaryCta}
            </button>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={openTalker}
              className="rounded-full bg-ink px-3 py-1.5 text-[12px] text-paper"
            >
              Démo
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="p-2"
              aria-expanded={menuOpen}
              aria-label="Menu"
            >
              <span className="sr-only">Menu</span>
              <span className="block h-px w-5 bg-ink" />
              <span className="mt-1.5 block h-px w-5 bg-ink" />
              <span className="mt-1.5 block h-px w-5 bg-ink" />
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="border-t border-line bg-background px-5 py-5 md:hidden">
            <p className="font-serif text-3xl">{content.nav.produit}</p>
            <ul className="mt-4 space-y-3">
              {content.productMenu.map((item) => (
                <li key={item.title}>
                  <a href={item.href} onClick={() => setMenuOpen(false)}>
                    <span className="block font-medium">{item.title}</span>
                    <span className="block text-sm text-muted">
                      {item.subtitle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 text-[15px]">
              <a href="#prix" onClick={() => setMenuOpen(false)}>
                {content.nav.prix}
              </a>
              <a href="#beta" onClick={() => setMenuOpen(false)}>
                {content.nav.beta}
              </a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                {content.nav.contact}
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
