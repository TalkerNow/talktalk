"use client";

import { AuroraText } from "@/components/ui/aurora-text";
import { VarianteLabel } from "@/components/landing/variante-label";
import { useLocale } from "@/components/i18n/locale-context";

const AURORA = ["#C43F17", "#111111", "#C43F17"];

export function AuroraVariant() {
  const { t } = useLocale();
  return (
    <section className="relative border-t border-foreground/8 py-8 lg:py-10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <VarianteLabel />
        <p className="mt-4 font-display text-4xl font-semibold leading-[0.95] tracking-tight lg:text-6xl">
          {t.compare.auroraBefore}
          <AuroraText colors={AURORA}>{t.compare.auroraWord}</AuroraText>
          {t.compare.auroraAfter}
        </p>
      </div>
    </section>
  );
}
