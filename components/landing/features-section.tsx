"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    number: "01",
    title: "Instant Deployment",
    description: "Push to production in seconds. Our edge network ensures your applications load instantly, anywhere in the world.",
    visual: "deploy",
  },
  {
    number: "02",
    title: "AI-Native Workflows",
    description: "Build intelligent applications with built-in AI capabilities. From inference to training, everything scales automatically.",
    visual: "ai",
  },
  {
    number: "03",
    title: "Real-time Collaboration",
    description: "Work together seamlessly. Live preview, instant feedback, and version control that actually makes sense.",
    visual: "collab",
  },
  {
    number: "04",
    title: "Enterprise Security",
    description: "Bank-grade encryption, SOC 2 compliance, and granular access controls. Your data stays yours.",
    visual: "security",
  },
];

function DeployVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill="none">
      <rect x="44" y="28" width="112" height="104" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <rect x="44" y="28" width="112" height="18" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="54" cy="37" r="2" fill="currentColor" opacity="0.35" />
      <circle cx="62" cy="37" r="2" fill="currentColor" opacity="0.35" />
      <circle cx="70" cy="37" r="2" fill="currentColor" opacity="0.35" />
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1="58"
          y1={64 + i * 16}
          x2={i % 2 === 0 ? 142 : 118}
          y2={64 + i * 16}
          stroke="currentColor"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

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
      <circle cx="58" cy="28" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M46 50c0-7 5.5-12 12-12s12 5 12 12" stroke="currentColor" strokeWidth="1.5" />
      <rect x="34" y="58" width="48" height="52" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <text x="58" y="91" textAnchor="middle" fontSize="22" fontFamily="ui-monospace, monospace" fill="currentColor">A</text>

      <circle cx="142" cy="28" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M130 50c0-7 5.5-12 12-12s12 5 12 12" stroke="currentColor" strokeWidth="1.5" />
      <rect x="118" y="58" width="48" height="52" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <text x="142" y="91" textAnchor="middle" fontSize="22" fontFamily="ui-monospace, monospace" fill="currentColor">B</text>

      <line x1="82" y1="84" x2="118" y2="84" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="100" cy="136" r="6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SecurityVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill="none">
      <path
        d="M100 22 L152 42 L152 86 Q152 128 100 144 Q48 128 48 86 L48 42 Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect x="86" y="78" width="28" height="22" rx="3" fill="currentColor" />
      <path
        d="M92 78 V68 Q92 56 100 56 Q108 56 108 68 V78"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="100" cy="87" r="3" fill="#F7F6F4" />
      <rect x="98.5" y="88" width="3" height="6" fill="#F7F6F4" />
    </svg>
  );
}

function AnimatedVisual({ type }: { type: string }) {
  switch (type) {
    case "deploy":
      return <DeployVisual />;
    case "ai":
      return <AIVisual />;
    case "collab":
      return <CollabVisual />;
    case "security":
      return <SecurityVisual />;
    default:
      return <DeployVisual />;
  }
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
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
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 py-16 lg:py-28 border-b border-foreground/10">
        {/* Number */}
        <div className="shrink-0">
          <span className="font-mono text-sm text-muted-foreground">{feature.number}</span>
        </div>
        
        {/* Content */}
        <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl lg:text-4xl font-display mb-4 group-hover:translate-x-2 transition-transform duration-500">
              {feature.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
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

export function FeaturesSection() {
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

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-32 lg:py-40"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Capabilities
          </span>
          <h2
            className={`text-4xl lg:text-6xl xl:text-7xl font-display font-semibold tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Everything you need.
            <br />
            <span className="text-muted-foreground">Nothing you don&apos;t.</span>
          </h2>
        </div>

        {/* Features List */}
        <div>
          {features.map((feature, index) => (
            <FeatureCard key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
