"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "1",
    title: "Installez le plugin et choisissez votre template",
    description: "Renseignez votre email et votre numéro de téléphone pour recevoir les alertes.",
  },
  {
    number: "2",
    title: "Talker lit votre site",
    description: "il apprend votre métier, vos horaires, vos prestations.",
  },
  {
    number: "3",
    title: "Activez : c'est en ligne et opérationnel",
    description:
      "Commencez à récolter vos leads et vos demandes directement par email ou par SMS sur votre téléphone.",
  },
];

const conversation = [
  { who: "Client", text: "Vous intervenez le week-end ?" },
  { who: "Talker", text: "Oui, majoration de 25% le samedi. Quel est votre besoin ?" },
  { who: "Client", text: "Fuite d'eau urgente" },
  { who: "Talker", text: "Je vous mets en contact avec [Nom]. Votre numéro ?" },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-12 lg:py-16 bg-[#0A0A0A] text-white overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              currentColor 40px,
              currentColor 41px
            )`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-white/45 mb-6">
            <span className="w-8 h-px bg-white/30" />
            Comment ça marche
          </span>
          <h2
            className={`text-4xl lg:text-6xl xl:text-7xl font-display font-semibold tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            3 étapes. 5 minutes.
            <br />
            <span className="text-white/40">Votre site passe à l&apos;IA.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="space-y-0">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className="w-full text-left py-7 lg:py-8 border-b border-white/10 transition-colors duration-500"
                >
                  <div className="flex items-start gap-6">
                    <span className="font-display text-3xl text-white">{step.number}</span>
                    <div className="flex-1">
                      <h3
                        className={`text-2xl lg:text-4xl font-display font-medium mb-3 inline-block transition-colors duration-500 ${
                          isActive ? "text-white border-b-2 border-white pb-1" : "text-white/60"
                        }`}
                      >
                        {step.title}
                      </h3>
                      {isActive && (
                        <>
                          {step.description ? (
                            <p className="text-[18px] lg:text-[20px] leading-relaxed text-white">
                              {step.description}
                            </p>
                          ) : null}
                          <div className="mt-4 h-px bg-white/15 overflow-hidden">
                            <div className="h-full bg-white w-0 animate-[progress_5s_linear_forwards]" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
            {activeStep === 2 ? (
              <Button
                className="mt-8 rounded-full bg-white px-6 text-[#111] hover:bg-white overflow-visible"
                onClick={() => {
                  window.location.hash = "pricing";
                }}
              >
                Créer mon agent gratuitement
              </Button>
            ) : null}
          </div>

          <div className="lg:sticky lg:top-32 self-start">
            <div className="border border-white/12 overflow-hidden bg-black/40">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                </div>
                <span className="text-xs font-mono text-white/40">Talker — widget.talker.now</span>
              </div>

              <div className="p-8 min-h-[280px] space-y-4">
                {conversation.map((line, index) => (
                  <div
                    key={`${line.who}-${index}`}
                    className={`flex ${line.who === "Talker" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                        line.who === "Talker"
                          ? "bg-white/10 text-white/85"
                          : "bg-white text-black"
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase tracking-wider opacity-60 mb-1">
                        {line.who}
                      </div>
                      {line.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 border-t border-white/10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="text-xs font-mono text-white/40">En ligne</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
