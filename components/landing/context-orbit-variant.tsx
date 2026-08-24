"use client";

import { VarianteLabel } from "@/components/landing/variante-label";
import { VisitorOrbit } from "@/components/landing/visitor-orbit";
import { useLocale } from "@/components/i18n/locale-context";

export function ContextOrbitVariant() {
  const { t } = useLocale();
  return (
    <section className="relative overflow-visible border-t border-foreground/8 py-10 lg:py-14">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <VarianteLabel />
        <p className="mb-8 max-w-xl text-lg text-muted-foreground">{t.compare.orbitLead}</p>
        <VisitorOrbit />
      </div>
    </section>
  );
}
