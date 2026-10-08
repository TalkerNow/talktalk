"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/ui/shine-border";
import { useLocale } from "@/components/i18n/locale-context";
import type { Messages } from "@/lib/i18n";

type PlanCopy = Messages["pricing"]["plans"][number];
type PlanKey = "starter" | "pro" | "pro3" | "proMax";

/** Published grid. Pro 3 annual is 49 € (HARD 2026-09-26). Monthly stays as last published. */
const PLAN_PRICES: Record<
  PlanKey,
  { monthly: number; annual: number; popular: boolean }
> = {
  starter: { monthly: 0, annual: 0, popular: false },
  pro: { monthly: 35, annual: 29, popular: true },
  pro3: { monthly: 69, annual: 49, popular: false },
  proMax: { monthly: 119, annual: 99, popular: false },
};

const PLAN_ORDER: readonly PlanKey[] = ["starter", "pro", "pro3", "proMax"];

const SHINE_KEYS = new Set<PlanKey>(["starter"]);

function copyByKey(plans: Messages["pricing"]["plans"], key: string): PlanCopy {
  const found = plans.find((plan) => plan.key === key);
  if (!found) {
    throw new Error(`Missing pricing copy for ${key}`);
  }
  return found;
}

export function PricingSection({
  showTarifsLink = true,
}: {
  showTarifsLink?: boolean;
}) {
  const { t } = useLocale();
  const [isAnnual, setIsAnnual] = useState(true);

  const cards = PLAN_ORDER.map((key, index) => ({
    key,
    index,
    ...PLAN_PRICES[key],
    copy: copyByKey(t.pricing.plans, key),
  }));

  return (
    <section id="pricing" className="relative scroll-mt-24 border-t border-foreground/10 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10">
          <h2 className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground leading-[0.95]">
            {t.pricing.title}
          </h2>
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

        <div className="mt-3 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((plan) => {
            const shine = SHINE_KEYS.has(plan.key);
            return (
              <div
                key={plan.key}
                className={`pricing-card relative flex cursor-default flex-col p-6 lg:p-8 ${
                  plan.popular
                    ? "pricing-card-popular overflow-visible border border-black bg-background"
                    : shine
                      ? "overflow-hidden border border-foreground/12 bg-background"
                      : "overflow-visible border border-foreground/12 bg-background"
                }`}
              >
                {shine ? (
                  <ShineBorder
                    borderWidth={1}
                    duration={16}
                    shineColor={["#C43F17", "#111111"]}
                  />
                ) : null}

                {plan.popular && (
                  <span className="pricing-card-badge absolute -top-3 left-1/2 z-20 -translate-x-1/2 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white">
                    {t.pricing.popular}
                  </span>
                )}

                <div className="relative z-10 mb-8">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(plan.index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display font-semibold text-3xl leading-tight text-foreground">
                    {plan.copy.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {plan.copy.description}
                  </p>
                  <div className="mt-6 border-b border-foreground/10 pb-8">
                    <div className="flex items-end gap-2">
                      <span className="font-display font-semibold text-5xl leading-none tabular-nums text-foreground">
                        {isAnnual ? plan.annual : plan.monthly}€
                      </span>
                      <span className="pb-1 text-muted-foreground">{t.pricing.perMonth}</span>
                    </div>
                  </div>
                </div>

                <ul className="relative z-10 space-y-4 mb-10 flex-1">
                  {plan.copy.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant="iridescent"
                  className={
                    plan.key === "starter"
                      ? "relative z-10 mt-auto h-auto min-h-9 w-full shrink-0 cursor-pointer whitespace-normal rounded-full px-4 py-3 text-center text-[13px] leading-tight overflow-hidden"
                      : "relative z-10 mt-auto w-full shrink-0 cursor-pointer rounded-full overflow-hidden"
                  }
                >
                  <a href="/installer">{plan.copy.cta}</a>
                </Button>
              </div>
            );
          })}
        </div>
        {showTarifsLink ? (
          <p className="mt-10 text-center">
            <a
              href="/tarifs"
              className="text-sm text-[#C43F17] underline decoration-[#E3B49F] underline-offset-2 transition-colors hover:text-[#A8350F]"
            >
              {t.pricing.detailsLink}
            </a>
          </p>
        ) : null}
      </div>
    </section>
  );
}
