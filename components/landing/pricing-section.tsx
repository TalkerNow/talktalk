"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/ui/shine-border";
import { useLocale } from "@/components/i18n/locale-context";
import { SectionEyebrow } from "@/components/landing/section-eyebrow";
import type { Messages } from "@/lib/i18n";

type PlanCopy = Messages["pricing"]["plans"][number];
type AgencySites = 3 | 10;

/** Existing published tariffs — UX reshape only, do not change these amounts. */
const PLAN_PRICES = {
  starter: { monthly: 0, annual: 0, popular: false },
  pro: { monthly: 35, annual: 29, popular: true },
  agency3: { monthly: 69, annual: 45, popular: false },
  agency10: { monthly: 119, annual: 99, popular: false },
} as const;

const SHINE_KEYS = new Set(["starter", "agency"]);

function copyByKey(plans: Messages["pricing"]["plans"], key: string): PlanCopy {
  const found = plans.find((plan) => plan.key === key);
  if (!found) {
    throw new Error(`Missing pricing copy for ${key}`);
  }
  return found;
}

function packDiscountPercent(threePrice: number, tenPrice: number) {
  const tenAtThreeSiteRate = (threePrice / 3) * 10;
  return Math.round((1 - tenPrice / tenAtThreeSiteRate) * 100);
}

function AgencySitesToggle({
  value,
  onChange,
  sites3,
  sites10,
  discountPercent,
  ariaLabel,
}: {
  value: AgencySites;
  onChange: (value: AgencySites) => void;
  sites3: string;
  sites10: string;
  discountPercent: number;
  ariaLabel: string;
}) {
  const isTen = value === 10;

  return (
    <div className="mt-2 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(3)}
        className={`cursor-pointer text-sm transition-colors ${
          !isTen ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {sites3}
      </button>
      <button
        type="button"
        role="switch"
        aria-checked={isTen}
        aria-label={ariaLabel}
        onClick={() => onChange(isTen ? 3 : 10)}
        className="relative h-6 w-12 cursor-pointer rounded-full bg-foreground/12 p-0.5 transition-colors"
      >
        <div
          className={`h-5 w-5 rounded-full bg-black transition-transform duration-300 ${
            isTen ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
      <button
        type="button"
        onClick={() => onChange(10)}
        className={`cursor-pointer text-sm transition-colors ${
          isTen ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {sites10}
      </button>
      {isTen ? (
        <span className="px-2 py-0.5 bg-black text-white text-[10px] font-mono uppercase tracking-wider">
          -{discountPercent}%
        </span>
      ) : null}
    </div>
  );
}

export function PricingSection() {
  const { t } = useLocale();
  const [isAnnual, setIsAnnual] = useState(true);
  const [agencySites, setAgencySites] = useState<AgencySites>(3);

  const starterCopy = copyByKey(t.pricing.plans, "starter");
  const proCopy = copyByKey(t.pricing.plans, "pro");
  const agency3Copy = copyByKey(t.pricing.plans, "agency3");
  const agency10Copy = copyByKey(t.pricing.plans, "agency10");
  const agencyCopy = agencySites === 10 ? agency10Copy : agency3Copy;
  const agencyPrices =
    agencySites === 10 ? PLAN_PRICES.agency10 : PLAN_PRICES.agency3;
  const threePrice = isAnnual
    ? PLAN_PRICES.agency3.annual
    : PLAN_PRICES.agency3.monthly;
  const tenPrice = isAnnual
    ? PLAN_PRICES.agency10.annual
    : PLAN_PRICES.agency10.monthly;
  const agencyDiscount = packDiscountPercent(threePrice, tenPrice);

  const cards = [
    {
      key: "starter" as const,
      index: 0,
      popular: PLAN_PRICES.starter.popular,
      monthly: PLAN_PRICES.starter.monthly,
      annual: PLAN_PRICES.starter.annual,
      copy: starterCopy,
    },
    {
      key: "pro" as const,
      index: 1,
      popular: PLAN_PRICES.pro.popular,
      monthly: PLAN_PRICES.pro.monthly,
      annual: PLAN_PRICES.pro.annual,
      copy: proCopy,
    },
    {
      key: "agency" as const,
      index: 2,
      popular: false,
      monthly: agencyPrices.monthly,
      annual: agencyPrices.annual,
      copy: agencyCopy,
    },
  ];

  return (
    <section id="pricing" className="relative py-12 lg:py-16 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10">
          <SectionEyebrow>{t.pricing.eyebrow}</SectionEyebrow>
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

        <div className="mt-3 grid items-stretch gap-6 lg:grid-cols-3">
          {cards.map((plan) => {
            const shine = SHINE_KEYS.has(plan.key);
            const isAgency = plan.key === "agency";
            return (
              <div
                key={plan.key}
                className={`pricing-card relative flex cursor-default flex-col p-8 lg:p-10 ${
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

                <div className="relative z-10 mb-8 grid min-h-[17rem] grid-rows-[auto_minmax(2.5em,auto)_auto_1fr_auto]">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(plan.index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 min-h-[2.5em] font-display font-semibold text-3xl leading-tight text-foreground">
                    {plan.copy.title}
                  </h3>
                  {isAgency ? (
                    <AgencySitesToggle
                      value={agencySites}
                      onChange={setAgencySites}
                      sites3={t.pricing.sites3}
                      sites10={t.pricing.sites10}
                      discountPercent={agencyDiscount}
                      ariaLabel={t.pricing.agencySitesToggle}
                    />
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {plan.copy.description}
                    </p>
                  )}
                  <div aria-hidden="true" className="min-h-0" />
                  <div className="shrink-0 border-b border-foreground/10 pb-8">
                    <div className="flex items-end gap-2">
                      <span className="font-display font-semibold text-5xl lg:text-6xl leading-none tabular-nums text-foreground">
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

        <div className="mt-6 flex w-full items-center justify-center border border-foreground/12 bg-background px-6 py-4">
          <p className="w-full text-center text-sm leading-snug text-muted-foreground lg:whitespace-nowrap">
            {t.pricing.shopify}
          </p>
        </div>
      </div>
    </section>
  );
}
