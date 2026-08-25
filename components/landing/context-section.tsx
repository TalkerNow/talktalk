"use client";

import { useEffect, useRef, useState } from "react";
import { AuroraText } from "@/components/ui/aurora-text";
import { useLocale } from "@/components/i18n/locale-context";
import { VisitorOrbit } from "@/components/landing/visitor-orbit";

const AURORA = ["#C43F17", "#111111", "#C43F17"];

export function ContextSection() {
  const { t } = useLocale();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      id="cas-usage"
      ref={sectionRef}
      className="relative overflow-x-clip py-12 lg:overflow-visible lg:py-16 border-t border-foreground/10"
    >
      <div className="max-w-[1400px] mx-auto min-w-0 px-6 lg:px-12">
        <div
          className={`grid min-w-0 grid-cols-1 items-start gap-6 overflow-x-clip transition-all duration-700 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-0 lg:overflow-visible ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="min-w-0 w-full max-w-full text-[clamp(1.65rem,7.5vw,2.25rem)] font-display font-semibold tracking-tight break-words leading-[1.05] lg:col-start-1 lg:mb-5 lg:text-6xl lg:leading-[0.95] xl:text-7xl">
            {t.context.title}
            <br />
            <AuroraText className="max-w-full" colors={AURORA}>
              {t.context.titleMuted}
            </AuroraText>
          </h2>

          <div className="w-full min-w-0 max-w-full justify-self-center lg:col-start-2 lg:row-span-2 lg:translate-x-6">
            <VisitorOrbit />
          </div>

          <div className="min-w-0 w-full lg:col-start-1">
            <p className="mb-5 max-w-xl text-base leading-snug text-muted-foreground sm:text-lg">
              {t.context.body}
            </p>
            <div className="max-w-xl border border-[#C43F17]/20 bg-[#F4DCD4] px-5 py-4 text-[#111111] sm:px-6">
              <p className="text-base leading-snug text-[#111111] sm:text-lg">
                {t.context.salmon}
              </p>
              <ul className="mt-3 space-y-1.5">
                <li className="flex items-start gap-3 text-base font-medium leading-snug text-[#111111] sm:text-lg">
                  <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-[#C43F17]" aria-hidden />
                  {t.context.leaflet}
                </li>
                <li className="flex items-start gap-3 text-base font-medium leading-snug text-[#111111] sm:text-lg">
                  <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-[#C43F17]" aria-hidden />
                  {t.context.partner}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
