"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    description: "Pour tester sans engagement",
    price: { monthly: 0, annual: 0 },
    features: [
      "1 Talker",
      "100 conversations/mois",
      "1 canal (site web)",
      "Support par email",
    ],
    cta: "Créer mon agent gratuitement",
    popular: false,
  },
  {
    name: "Pro",
    description: "Pour un artisan qui veut convertir sérieusement",
    price: { monthly: 49, annual: 41 },
    features: [
      "3 Talker inclus",
      "Conversations illimitées",
      "Tous les canaux (site, WhatsApp, Instagram, Facebook, SMS)",
      "Capture automatique téléphone/email",
      "Collecte d'avis Google",
      "Support prioritaire",
    ],
    cta: "Créer mon agent gratuitement",
    popular: true,
  },
  {
    name: "Entreprise",
    description: "Pour les agences web et réseaux d'artisans multi-établissements",
    price: { monthly: null, annual: null },
    features: [
      "10 Talker et plus",
      "Tout Pro inclus",
      "Un agent par site ou par établissement",
      "Tableau de bord multi-comptes",
      "Marque blanche disponible",
      "Chargé de compte dédié",
    ],
    cta: "Installer",
    popular: false,
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="relative py-12 lg:py-16 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10">
          <span className="font-mono text-xs tracking-[0.2em] text-foreground uppercase block mb-6">
            Tarifs
          </span>
          <h2 className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6 leading-[0.95]">
            Un tarif clair.
            <br />
            <span className="text-stroke">Pas de surprise.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Testez gratuitement, passez à la vitesse supérieure quand vous êtes prêt. Aucun frais caché.
          </p>
        </div>

        <div className="mb-8 flex items-center justify-center gap-4 lg:mb-10">
          <span
            className={`text-sm transition-colors ${
              !isAnnual ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Mensuel
          </span>
          <button
            type="button"
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-12 h-6 bg-foreground/12 rounded-full p-0.5 transition-colors"
            aria-label="Basculer facturation annuelle"
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
            Annuel
          </span>
          {isAnnual && (
            <span className="px-2 py-0.5 bg-black text-white text-[10px] font-mono uppercase tracking-wider">
              -17%
            </span>
          )}
        </div>

        <div className="mt-3 grid items-stretch gap-6 md:grid-cols-3">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative flex flex-col p-8 lg:p-10 ${
                plan.popular
                  ? "border border-black bg-background"
                  : "border border-foreground/12 bg-background"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black text-white text-[10px] font-mono uppercase tracking-[0.16em]">
                  Le plus choisi
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
                      {isAnnual ? plan.price.annual : plan.price.monthly}€
                    </span>
                    <span className="text-muted-foreground">/mois</span>
                  </div>
                ) : (
                  <span className="font-display font-semibold text-4xl lg:text-5xl text-foreground">
                    Sur devis
                  </span>
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

              <Button
                variant="iridescent"
                className="w-full rounded-full"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
