"use client";

import { useEffect, useState, useRef } from "react";
import { useLocale } from "@/components/i18n/locale-context";
import { BlockTitle } from "@/components/landing/block-title";

export function IntegrationsSection() {
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
    <section id="integrations" ref={sectionRef} className="relative py-12 lg:py-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`text-center max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <BlockTitle>{t.integrations.eyebrow}</BlockTitle>
          <p className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            {t.integrations.title}
            <br />
            <span className="text-foreground/30">{t.integrations.titleMuted}</span>
          </p>
          <p className="text-xl text-muted-foreground">
            {t.integrations.body}
          </p>
        </div>
      </div>
    </section>
  );
}
