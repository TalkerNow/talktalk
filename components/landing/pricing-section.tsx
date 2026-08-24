"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/i18n/locale-context";

const planPrices = [
  { key: "starter", monthly: 0, annual: 0, popular: false },
  { key: "pro", monthly: 35, annual: 29, popular: true },
  { key: "agency3", monthly: 69, annual: 45, popular: false },
  { key: "agency10", monthly: 119, annual: 99, popular: false },
] as const;

export function PricingSection() {
  const { t } = useLocale();
  const [isAnnual, setIsAnnual] = useState(true);
  const plans = planPrices.map((meta, index) => ({
    ...meta,
    ...t.pricing.plans[index],
  }));

  return (
    <section id="pricing" className="relative py-12 lg:py-16 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10">
          <span className="font-mono text-xs tracking-[0.2em] text-foreground uppercase block mb-6">
            {t.pricing.eyebrow}
          </span>
          <h2 className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6 leading-[0.95]">
            {t.pricing.title}
            <br />
            <span className="text-stroke">{t.pricing.titleMuted}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.pricing.lead}
          </p>
        </div>

        <div className="mb-8 flex items-center justify-center gap-4 lg:mb-10">
          <span
            className={`text-sm transition-colors ${
              !isAnnual ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {t.pricing.monthly}
          </span>
          <button
            type="button"
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-12 h-6 bg-foreground/12 rounded-full p-0.5 transition-colors"
            aria-label={t.pricing.toggle}
          >
            <div
              className={`w-5 h-5 bg-black rounded-full transition-transform duration-300 ${
                isAnnual ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <span
            className={`text-sm transition-colors ${
              isAnnual ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {t.pricing.annual}
          </span>
          {isAnnual && (
            <span className="px-2 py-0.5 bg-black text-white text-[10px] font-mono uppercase tracking-wider">
              -17%
            </span>
          )}
        </div>

        <div className="mt-3 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, idx) => (
            <div
              key={plan.key}
              className={`pricing-card relative flex cursor-default flex-col overflow-visible p-8 lg:p-10 ${
                plan.popular
                  ? "pricing-card-popular border border-black bg-background"
                  : "border border-foreground/12 bg-background"
              }`}
            >
              {plan.popular && (
                <span className="pricing-card-badge absolute -top-3 left-1/2 z-20 -translate-x-1/2 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white">
                  {t.pricing.popular}
                </span>
              )}

              <div className="mb-8 grid min-h-[17rem] grid-rows-[auto_minmax(2.5em,auto)_auto_1fr_auto]">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 min-h-[2.5em] font-display font-semibold text-3xl leading-tight text-foreground">
                  {plan.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
                <div aria-hidden="true" className="min-h-0" />
                <div className="shrink-0 border-b border-foreground/10 pb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-semibold text-5xl lg:text-6xl text-foreground">
                      {isAnnual ? plan.annual : plan.monthly}€
                    </span>
                    <span className="text-muted-foreground">{t.pricing.perMonth}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {!plan.popular && (
                <svg
                  className="pricing-card-frame pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <rect
                    className="pricing-card-stroke pricing-card-stroke-cw"
                    pathLength="100"
                    x="0.6"
                    y="0.6"
                    width="98.8"
                    height="98.8"
                  />
                  <rect
                    className="pricing-card-stroke pricing-card-stroke-ccw"
                    pathLength="100"
                    x="0.6"
                    y="0.6"
                    width="98.8"
                    height="98.8"
                  />
                </svg>
              )}

              <Button
                asChild
                variant="iridescent"
                className={
                  plan.key === "starter"
                    ? "relative z-10 mt-auto h-auto min-h-9 w-full shrink-0 cursor-pointer whitespace-normal rounded-full px-4 py-3 text-center text-[13px] leading-tight overflow-hidden"
                    : "relative z-10 mt-auto w-full shrink-0 cursor-pointer rounded-full overflow-hidden"
                }
              >
                <a href="/installer">{plan.cta}</a>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex w-full items-center justify-center border border-foreground/12 bg-background px-6 py-4">
          <p className="w-full text-center text-sm leading-snug text-muted-foreground lg:whitespace-nowrap">
            {t.pricing.shopify}
          </p>
        </div>
      </div>
    </section>
  );
}
