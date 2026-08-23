"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTalker } from "@/components/talker/provider";
import { useLocale } from "@/components/i18n/locale-context";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const { t } = useLocale();
  const phrases = t.hero.phrases;
  const stats = t.hero.stats;
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const { openTalker } = useTalker();

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    setWordIndex(0);
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % phrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [phrases]);

  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-visible">
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
            {t.hero.eyebrow}
          </span>
        </div>

        <h1
          className={`text-[clamp(2.1rem,6.4vw,6.2rem)] font-display font-bold leading-[0.96] tracking-tight mb-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="block text-foreground">{t.hero.titleBefore}</span>
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
          <span className="block text-foreground/30">{t.hero.titleAfter}</span>
        </h1>

        <p
          className={`text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {t.hero.subtitle}
        </p>

        <div
          className={`flex flex-col sm:flex-row items-start gap-3 overflow-visible transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            size="lg"
            variant="iridescent"
            className="h-14 rounded-full px-8 text-base group overflow-hidden"
          >
            {t.hero.createAgent}
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 text-base rounded-full bg-transparent border-foreground/15 text-foreground hover:bg-foreground/5 shadow-none"
            onClick={() => openTalker()}
          >
            {t.hero.seeDemo}
          </Button>
        </div>

        <div
          className={`mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-green-500" />
          {t.hero.wordpress}
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
