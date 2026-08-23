"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    number: "01",
    title: "Un agent qui connaît votre métier",
    description:
      "Formé sur votre activité, vos services et vos tarifs, et reprenant la syntaxe rédactionnelle de votre site. Que vous soyez un avocat, un musée, une entreprise du bâtiment ou une société de conseil et de services, il répond avec le bon vocabulaire, pas avec des réponses génériques de type IA.",
    visual: "ai",
  },
  {
    number: "02",
    title: "Capture les coordonnées, pas juste les questions",
    description: "Numéro de téléphone ou email récupéré avant la fin de la conversation. Prospect chaud transmis direct, client existant redirigé vers le bon service. Rien ne se perd dans un formulaire jamais rempli.",
    visual: "collab",
  },
  {
    number: "03",
    title: "Un support avant votre support",
    description: "Talker distingue un prospect d'un client en une phrase. Panne, question tarifaire, service additionnel : il qualifie la demande et vous transmet un dossier prêt à traiter. Votre client ne raconte plus son problème deux fois.",
    visual: "security",
  },
];

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
      <rect x="28" y="38" width="64" height="84" rx="12" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="60" cy="70" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M48 96c0-8 5.5-14 12-14s12 6 12 14" stroke="currentColor" strokeWidth="1.5" />
      <rect x="108" y="48" width="68" height="48" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M108 56 L142 78 L176 56" stroke="currentColor" strokeWidth="1.5" />
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
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 py-8 lg:py-10 border-b border-foreground/10">
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
      className="relative py-12 lg:py-16"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-8 lg:mb-10">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Fonctionnalités
          </span>
          <h2
            className={`text-4xl lg:text-6xl xl:text-7xl font-display font-semibold tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Ce qu&apos;il faut.
            <br />
            <span className="text-muted-foreground">Rien de plus.</span>
          </h2>
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
