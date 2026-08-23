"use client";

import { useEffect, useState, useRef } from "react";
import { useLocale } from "@/components/i18n/locale-context";

const integrations = [
  { name: "WordPress" },
  { name: "Google Business" },
  { name: "WhatsApp" },
  { name: "Instagram" },
  { name: "Facebook" },
];

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
          className={`text-center max-w-3xl mx-auto mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            {t.integrations.eyebrow}
            <span className="w-8 h-px bg-foreground/30" />
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            {t.integrations.title}
            <br />
            <span className="text-foreground/30">{t.integrations.titleMuted}</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            {t.integrations.body}
          </p>
        </div>

        <div
          className={`grid grid-cols-2 md:grid-cols-5 gap-px bg-foreground/10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="bg-background px-6 py-6 hover:bg-foreground/[0.02] transition-all duration-300 group"
            >
              <div className="text-lg font-medium group-hover:translate-x-1 transition-transform">
                {integration.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
