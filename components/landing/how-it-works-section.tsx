"use client";

import { useEffect, useRef, useState } from "react";
import { TalkerWordmark } from "@/components/brand/mark";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/i18n/locale-context";

export function HowItWorksSection() {
  const { t } = useLocale();
  const steps = t.how.steps;
  const conversation = t.how.conversation;
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
          <span className="inline-flex items-center gap-3 text-sm font-mono text-white/45 mb-6">
            <span className="w-8 h-px bg-white/30" />
            {t.how.eyebrow}
          </span>
          <h2
            className={`text-4xl lg:text-6xl xl:text-7xl font-display font-semibold tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {t.how.title}
            <br />
            <span className="text-white/40">{t.how.titleMuted}</span>
          </h2>
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
              variant="iridescent"
              className="mt-8 rounded-full px-6 overflow-hidden"
              onClick={() => {
                window.location.hash = "pricing";
              }}
            >
              {t.how.createAgent}
            </Button>
          </div>

          <div className="flex w-full justify-end self-start lg:sticky lg:top-32">
            <div className="ml-auto flex h-[min(70vh,560px)] w-[min(calc(100vw-2rem),380px)] flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-paper bg-[#F7F6F4] text-ink text-[#111111] shadow-[0_16px_50px_rgba(0,0,0,0.14)]">
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <div className="min-w-0">
                  <TalkerWordmark className="text-[16px]" />
                  <p className="mt-1.5 text-[11px] leading-none text-muted-2">
                    {t.how.assistant}
                  </p>
                </div>
                <span className="rounded-full px-2 py-1 text-sm text-muted">
                  {t.how.close}
                </span>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                {conversation.map((message, index) => (
                  <p
                    key={`${message.from}-${index}`}
                    className={
                      message.from === "bot"
                        ? "max-w-[92%] rounded-2xl rounded-tl-md bg-[#f1ece5] px-3.5 py-2.5 text-[14px] leading-6 text-ink"
                        : "ml-auto max-w-[86%] rounded-2xl rounded-tr-md bg-ink bg-[#111111] px-3.5 py-2.5 text-[14px] leading-6 text-paper text-[#F7F6F4]"
                    }
                  >
                    {message.text}
                  </p>
                ))}
              </div>
              <div className="border-t border-line bg-white px-3 py-3">
                <div className="flex items-center gap-2 rounded-full bg-[#F1ECE5] px-4 py-2">
                  <input
                    disabled
                    readOnly
                    placeholder={t.how.placeholder}
                    className="min-w-0 flex-1 border-0 bg-transparent p-0 text-[14px] text-ink outline-none placeholder:text-[#6B6B73] disabled:opacity-50"
                  />
                  <span
                    className="inline-flex shrink-0 text-[#C43F17] opacity-40"
                    aria-hidden
                  >
                    <PaperPlane />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PaperPlane() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="20"
      height="20"
      aria-hidden
    >
      <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 15.445-7.843.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" />
    </svg>
  );
}
