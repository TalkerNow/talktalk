"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import { useLocale } from "@/components/i18n/locale-context";

export function CtaSection() {
  const { t } = useLocale();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const band = `${t.cta.line1}   ${t.cta.line2}   ${t.cta.line3}   `;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-12 lg:py-16">
      <div
        className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative">
          <ScrollVelocityContainer className="font-display text-4xl font-semibold tracking-tight text-[#111111] md:text-6xl">
            <ScrollVelocityRow baseVelocity={3} direction={1} className="py-2">
              {band}
            </ScrollVelocityRow>
            <ScrollVelocityRow
              baseVelocity={3}
              direction={-1}
              className="py-2 text-[#C43F17]"
            >
              {band}
            </ScrollVelocityRow>
          </ScrollVelocityContainer>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-[#F7F6F4]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-[#F7F6F4]" />
        </div>

        <div className="mx-auto mt-10 max-w-[1400px] px-6 lg:px-12">
          <div className="flex flex-col items-start gap-4 overflow-visible sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="iridescent"
              className="h-14 rounded-full px-8 text-base group overflow-hidden"
            >
              <a href="/installer">
                {t.cta.createAgent}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          <p className="mt-8 font-mono text-sm text-muted-foreground">
            {t.cta.noCard}
          </p>
        </div>
      </div>
    </section>
  );
}
