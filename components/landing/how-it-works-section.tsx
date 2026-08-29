"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/i18n/locale-context";
import { BlockTitle } from "@/components/landing/block-title";
import { TalkerChatLoop } from "@/components/landing/installer-vignette/talker-chat-loop";

export function HowItWorksSection() {
  const { t } = useLocale();
  const steps = t.how.steps;
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
  }, [steps.length]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-visible bg-[#0A0A0A] py-12 text-white lg:py-16"
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
          <BlockTitle>{t.how.eyebrow}</BlockTitle>
          <p
            className={`text-4xl lg:text-6xl xl:text-7xl font-display font-semibold tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {t.how.title}
            <br />
            <span className="text-white/40">{t.how.titleMuted}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="space-y-0 overflow-visible">
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
            <Button
              asChild
              variant="iridescent"
              className="mt-8 rounded-full px-6 overflow-hidden"
            >
              <a href="/installer">{t.how.createAgent}</a>
            </Button>
          </div>

          <div className="flex w-full justify-end self-start lg:sticky lg:top-32">
            <TalkerChatLoop
              className="ml-auto flex h-[min(70vh,560px)] w-[min(calc(100vw-2rem),380px)] flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-[#F7F6F4] text-[#111111] shadow-[0_16px_50px_rgba(0,0,0,0.14)]"
              headerExtra={
                <span className="rounded-full px-2 py-1 text-sm text-[#6B6B73]">
                  {t.how.close}
                </span>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
