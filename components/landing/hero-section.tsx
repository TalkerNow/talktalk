"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const phrases = [
  "décrit vos prestations",
  "donne vos tarifs",
  "donne vos disponibilités",
  "capte le numéro",
  "capte l'email",
  "demande des avis google",
];

const stats = [
  { value: "+50%", label: "de leads sur votre site" },
  { value: "-80%", label: "de temps passé à répondre aux mêmes questions" },
  { value: "3x", label: "plus d'avis Google collectés" },
  { value: "24/7", label: "disponibilité, zéro rendez-vous manqué" },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % phrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 lg:px-12 pt-32 pb-10 lg:pt-40 lg:pb-12">
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground max-w-2xl">
            <span className="w-8 h-px bg-foreground/30 shrink-0" />
            Les IA aspirent le trafic de votre site. Talker le récupère.
          </span>
        </div>

        <h1
          className={`text-[clamp(2.1rem,6.4vw,6.2rem)] font-display font-bold leading-[0.96] tracking-tight mb-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="block text-foreground">Le chatbot IA qui</span>
          <span className="block text-foreground/40">
            <span className="relative inline-block">
              <span key={wordIndex} className="inline-flex flex-wrap">
                {phrases[wordIndex].split("").map((char, i) => (
                  <span
                    key={`${wordIndex}-${i}`}
                    className="inline-block animate-char-in"
                    style={{
                      animationDelay: `${i * 50}ms`,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-foreground/12" />
            </span>
          </span>
          <span className="block text-foreground/30">à votre place</span>
        </h1>

        <p
          className={`text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Un chatbot IA qui connaît votre métier, capte le numéro ou l&apos;email de vos prospects, répond aux tarifs sans que vous leviez le petit doigt, trie les demandes de vos clients existants, et récupère vos avis Google. Installé en 10 minutes, sans code.
        </p>

        <div
          className={`flex flex-col sm:flex-row items-start gap-3 overflow-visible transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            size="lg"
            variant="iridescent"
            className="rounded-full px-8 h-14 text-base group"
          >
            Essayer gratuitement
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 text-base rounded-full bg-transparent border-foreground/15 text-foreground hover:bg-foreground/5 shadow-none"
          >
            Voir une démo
          </Button>
        </div>

        <div
          className={`mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Disponible sur WordPress — extension officielle sur le store
        </div>
      </div>

      <div
        className={`relative z-10 border-t border-foreground/10 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0">
              {stats.map((stat) => (
                <div
                  key={`${stat.value}-${stat.label}-${i}`}
                  className="flex min-w-[300px] flex-col justify-center gap-1 border-r border-foreground/10 px-10 py-5 lg:min-w-[360px] lg:px-14 lg:py-6"
                >
                  <span className="text-4xl lg:text-5xl font-display font-semibold tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
