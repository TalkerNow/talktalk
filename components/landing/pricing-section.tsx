"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "For individuals and small projects",
    price: { monthly: 0, annual: 0 },
    features: [
      "Up to 3 projects",
      "1GB storage",
      "Community support",
      "Basic analytics",
      "SSL certificates",
    ],
    cta: "Start free",
    popular: false,
  },
  {
    name: "Pro",
    description: "For growing teams and businesses",
    price: { monthly: 29, annual: 24 },
    features: [
      "Unlimited projects",
      "100GB storage",
      "Priority support",
      "Advanced analytics",
      "Custom domains",
      "Team collaboration",
      "API access",
    ],
    cta: "Start trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large-scale operations",
    price: { monthly: null, annual: null },
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "24/7 dedicated support",
      "Custom integrations",
      "SLA guarantee",
      "On-premise option",
      "Security audit",
      "Custom contracts",
    ],
    cta: "Contact sales",
    popular: false,
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="relative py-32 lg:py-40 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-mono text-xs tracking-[0.2em] text-foreground uppercase block mb-6">
            Pricing
          </span>
          <h2 className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6 leading-[0.95]">
            Simple, transparent
            <br />
            <span className="text-stroke">pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-16">
          <span
            className={`text-sm transition-colors ${
              !isAnnual ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Monthly
          </span>
          <button
            type="button"
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-12 h-6 bg-foreground/12 rounded-full p-0.5 transition-colors"
            aria-label="Toggle annual billing"
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
            Annual
          </span>
          {isAnnual && (
            <span className="px-2 py-0.5 bg-black text-white text-[10px] font-mono uppercase tracking-wider">
              Save 17%
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative flex flex-col p-8 lg:p-10 ${
                plan.popular
                  ? "border border-black bg-background md:-my-4 md:py-12 lg:py-14"
                  : "border border-foreground/12 bg-background"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black text-white text-[10px] font-mono uppercase tracking-[0.16em]">
                  Most Popular
                </span>
              )}

              <div className="mb-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display font-semibold text-3xl text-foreground mt-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              <div className="mb-8 pb-8 border-b border-foreground/10">
                {plan.price.monthly !== null ? (
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-semibold text-5xl lg:text-6xl text-foreground">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                ) : (
                  <span className="font-display font-semibold text-5xl text-foreground">Custom</span>
                )}
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group ${
                  plan.popular
                    ? "bg-black text-white hover:bg-black/90"
                    : "bg-[#EFECE8] border border-foreground/10 text-foreground hover:border-foreground/30"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          All plans include automatic updates, HTTPS, and DDoS protection.{" "}
          <a href="#" className="underline underline-offset-4 hover:text-foreground transition-colors">
            Compare all features
          </a>
        </p>
      </div>
    </section>
  );
}
