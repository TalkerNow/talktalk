"use client";

import { useLocale } from "@/components/i18n/locale-context";

export function ProductDetailsIntro() {
  const { t } = useLocale();

  return (
    <section className="relative overflow-visible pb-8 pt-32 lg:pb-10 lg:pt-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <span className="mb-6 inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
          <span className="h-px w-8 shrink-0 bg-foreground/30" />
          {t.nav.features}
        </span>
        <h1 className="max-w-4xl text-4xl font-display font-semibold tracking-tight leading-[1.08] lg:text-6xl xl:text-7xl lg:leading-[0.98]">
          {t.produit.title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
          {t.produit.subtitle}
        </p>
        <ul className="mt-10 max-w-2xl space-y-3">
          {t.produit.bullets.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base leading-relaxed lg:text-lg">
              <span
                className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C43F17]"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
