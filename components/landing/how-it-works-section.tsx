"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "I",
    title: "Décrivez votre activité",
    description: "Un formulaire simple : métier, services, tarifs, horaires. 5 minutes suffisent.",
  },
  {
    number: "II",
    title: "Configurez vos réponses",
    description: "Choisissez ce qu'il capte (téléphone, email, prise de RDV) et ce qu'il ne fait pas. Aucun code à écrire.",
  },
  {
    number: "III",
    title: "Collez le script, c'est en ligne",
    description: "",
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
      className="relative py-24 lg:py-32 bg-[#0A0A0A] text-white overflow-hidden"
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
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-white/45 mb-6">
            <span className="w-8 h-px bg-white/30" />
            Comment ça marche
          </span>
          <h2
            className={`text-4xl lg:text-6xl xl:text-7xl font-display font-semibold tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Trois étapes.
            <br />
            <span className="text-white/40">Zéro prise de tête.</span>
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
                  className={`w-full text-left py-8 border-b border-white/10 transition-all duration-500 ${
                    isActive ? "opacity-100" : "opacity-35 hover:opacity-60"
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <span className="font-display text-3xl text-white/30">{step.number}</span>
                    <div className="flex-1">
                      <h3
                        className={`text-2xl lg:text-3xl font-display font-medium mb-3 inline-block ${
                          isActive ? "text-white border-b-2 border-white pb-1" : "text-white/70"
                        }`}
                      >
                        {step.title}
                      </h3>
                      {isActive && (
                        <>
                          {step.description ? (
                            <p className="text-white/55 leading-relaxed">
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
