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
      className="relative overflow-visible py-12 lg:py-16 border-t border-foreground/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`grid items-center gap-10 overflow-visible lg:grid-cols-2 lg:gap-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="overflow-visible">
            <h2 className="text-4xl lg:text-6xl xl:text-7xl font-display font-semibold tracking-tight mb-8 leading-[0.95]">
              {t.context.title}
              <br />
              <AuroraText colors={AURORA}>{t.context.titleMuted}</AuroraText>
            </h2>
            <div className="flex lg:gap-20">
              <span
                className="hidden shrink-0 font-mono text-sm lg:block"
                aria-hidden
              >
                <span className="invisible">01</span>
              </span>
              <div className="flex-1">
                <p className="mb-10 text-xl leading-relaxed text-muted-foreground">
                  {t.context.body}
                </p>
                <div className="mb-10 border border-[#C43F17]/20 bg-[#F4DCD4] px-6 py-5 text-[#111111]">
                  <p className="text-xl leading-relaxed text-[#111111]">
                    {t.context.salmon}
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start gap-3 text-xl font-medium leading-relaxed text-[#111111]">
                      <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-[#C43F17]" aria-hidden />
                      {t.context.leaflet}
                    </li>
                    <li className="flex items-start gap-3 text-xl font-medium leading-relaxed text-[#111111]">
                      <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-[#C43F17]" aria-hidden />
                      {t.context.partner}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <VisitorOrbit />
        </div>
      </div>
    </section>
  );
}
