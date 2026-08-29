"use client";

import { AuroraText } from "@/components/ui/aurora-text";
import { useLocale } from "@/components/i18n/locale-context";

const AURORA = ["#C43F17", "#111111", "#C43F17"];

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
          <br />
          <AuroraText className="max-w-full" colors={AURORA}>
            {t.produit.titleMuted}
          </AuroraText>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
          {t.produit.subtitle}
        </p>
        <div className="mt-8 flex flex-col lg:flex-row gap-8 lg:gap-20">
          <div className="hidden lg:block shrink-0" aria-hidden>
            <span className="font-mono text-sm">01</span>
          </div>
          <div className="flex-1 grid lg:grid-cols-2 gap-8">
            <ul className="space-y-3">
              {t.produit.bullets.map((item) => (
                <li key={item} className="text-lg text-muted-foreground leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
