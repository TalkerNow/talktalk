"use client";

import { VarianteLabel } from "@/components/landing/variante-label";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import { useLocale } from "@/components/i18n/locale-context";

export function CtaVelocityVariant() {
  const { t } = useLocale();
  const band = `${t.cta.line1}   ${t.cta.line2}   ${t.cta.line3}   `;

  return (
    <section className="relative overflow-hidden border-t border-foreground/8 py-10 lg:py-14">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <VarianteLabel />
      </div>
      <div className="relative mt-6">
        <ScrollVelocityContainer className="font-display text-4xl font-semibold tracking-tight text-[#111111] md:text-6xl">
          <ScrollVelocityRow baseVelocity={3} direction={1} className="py-2">
            {band}
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={3} direction={-1} className="py-2 text-[#C43F17]">
            {band}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-[#F7F6F4]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-[#F7F6F4]" />
      </div>
    </section>
  );
}
