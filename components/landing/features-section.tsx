"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/i18n/locale-context";
import type { Messages } from "@/lib/i18n";

type FeatureItem = Messages["features"]["items"][number];

function AIVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Central node */}
      <circle cx="100" cy="80" r="12" fill="currentColor">
        <animate attributeName="r" values="12;14;12" dur="2s" repeatCount="indefinite" />
      </circle>
      
      {/* Orbiting nodes */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * 60) * (Math.PI / 180);
        const radius = 50;
        return (
          <g key={i}>
            {/* Connection line */}
            <line
              x1="100"
              y1="80"
              x2={100 + Math.cos(angle) * radius}
              y2={80 + Math.sin(angle) * radius}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.3"
            >
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </line>
            
            {/* Outer node */}
            <circle
              cx={100 + Math.cos(angle) * radius}
              cy={80 + Math.sin(angle) * radius}
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <animate
                attributeName="r"
                values="6;8;6"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}
      
    </svg>
  );
}

function CollabVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill="none">
      <rect x="52" y="18" width="96" height="124" rx="8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="100" cy="44" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M87 66c1.5-8 7.5-12 13-12s11.5 4 13 12" stroke="currentColor" strokeWidth="1.5" />
      <rect x="64" y="80" width="8" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M66 82.5h4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M80 86.5h44" stroke="currentColor" strokeWidth="1.5" />
      <rect x="64" y="101" width="14" height="10" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M64 103l7 5 7-5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M84 106h40" stroke="currentColor" strokeWidth="1.5" />
      <path d="M64 126h36" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SecurityVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill="none">
      <rect x="40" y="36" width="120" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="40" y="74" width="120" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="40" y="112" width="120" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M52 50 H88" stroke="currentColor" strokeWidth="1.5" />
      <path d="M52 88 H108" stroke="currentColor" strokeWidth="1.5" />
      <path d="M52 126 H96" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function AnimatedVisual({ type }: { type: string }) {
  switch (type) {
    case "ai":
      return <AIVisual />;
    case "collab":
      return <CollabVisual />;
    case "security":
      return <SecurityVisual />;
    default:
      return <AIVisual />;
  }
}

function FeatureCard({ feature, index }: { feature: FeatureItem; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 py-8 lg:py-10 border-b border-foreground/10">
        {/* Number */}
        <div className="shrink-0">
          <span className="font-mono text-sm text-muted-foreground">{feature.number}</span>
        </div>
        
        {/* Content */}
        <div className="flex-1 grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="text-3xl lg:text-4xl font-display mb-4 group-hover:translate-x-2 transition-transform duration-500">
              {feature.title}
            </h3>
            <ul className="space-y-2.5">
              {feature.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 text-base leading-snug text-muted-foreground lg:text-lg"
                >
                  <span
                    className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-[#C43F17]"
                    aria-hidden
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-48 h-40 text-foreground">
              <AnimatedVisual type={feature.visual} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection({
  variant = "section",
}: {
  variant?: "page" | "section";
}) {
  const { t } = useLocale();
  const features = t.features.items;
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isPage = variant === "page";
  const Heading = isPage ? "h1" : "h2";

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
      id="features"
      ref={sectionRef}
      className={
        isPage
          ? "relative overflow-visible pb-20 pt-32 lg:pb-28 lg:pt-40"
          : "relative py-12 lg:py-16"
      }
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={isPage ? "mb-12 lg:mb-16" : "mb-8 lg:mb-10"}>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            {t.features.eyebrow}
          </span>
          <Heading
            className={`font-display font-semibold tracking-tight transition-all duration-700 ${
              isPage
                ? "text-5xl lg:text-7xl xl:text-8xl"
                : "text-4xl lg:text-6xl xl:text-7xl"
            } ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {t.features.title}
            <br />
            <span className="text-muted-foreground">{t.features.titleMuted}</span>
          </Heading>
        </div>

        {/* Liste */}
        <div>
          {features.map((feature, index) => (
            <FeatureCard key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
