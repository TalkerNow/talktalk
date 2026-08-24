"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/ui/shine-border";
import { VarianteLabel } from "@/components/landing/variante-label";
import { useLocale } from "@/components/i18n/locale-context";

const planPrices = [
  { key: "starter", monthly: 0, annual: 0, popular: false },
  { key: "pro", monthly: 35, annual: 29, popular: true },
  { key: "agency3", monthly: 69, annual: 45, popular: false },
  { key: "agency10", monthly: 119, annual: 99, popular: false },
] as const;

export function PricingShineVariant() {
  const { t } = useLocale();
  const [isAnnual, setIsAnnual] = useState(true);
  const plans = planPrices.map((meta, index) => ({
    ...meta,
    ...t.pricing.plans[index],
  }));

  return (
    <section className="relative border-t border-foreground/8 py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <VarianteLabel />
        <p className="mt-3 mb-8 text-lg text-muted-foreground">{t.compare.shineLead}</p>
        <div className="mb-8 flex items-center justify-center gap-4">
          <span className={`text-sm ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
            {t.pricing.monthly}
          </span>
          <button
            type="button"
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative h-6 w-12 rounded-full bg-foreground/12 p-0.5"
            aria-label={t.pricing.toggle}
          >
            <div
              className={`h-5 w-5 rounded-full bg-black transition-transform duration-300 ${
                isAnnual ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`text-sm ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
            {t.pricing.annual}
          </span>
        </div>
        <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, idx) => (
            <div
              key={plan.key}
              className={`relative flex flex-col overflow-hidden bg-background p-8 lg:p-10 ${
                plan.popular ? "border border-black" : "border border-foreground/12"
              }`}
            >
              <ShineBorder
                borderWidth={plan.popular ? 2 : 1}
                duration={16}
                shineColor={["#C43F17", "#111111"]}
              />
              {plan.popular ? (
                <span className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 bg-[#111111] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white">
                  {t.pricing.popular}
                </span>
              ) : null}
              <div className="relative z-10 mb-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-3xl font-semibold leading-tight text-foreground">
                  {plan.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-6 border-b border-foreground/10 pb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl font-semibold text-foreground">
                      {isAnnual ? plan.annual : plan.monthly}€
                    </span>
                    <span className="text-muted-foreground">{t.pricing.perMonth}</span>
                  </div>
                </div>
              </div>
              <ul className="relative z-10 mb-10 flex-1 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant="iridescent"
                className="relative z-10 mt-auto w-full rounded-full overflow-hidden"
              >
                <a href="/installer">{plan.cta}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
