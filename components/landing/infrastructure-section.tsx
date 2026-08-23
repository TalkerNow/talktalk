"use client";

import { useEffect, useState, useRef } from "react";

const channels = [
  { name: "Site web", status: "Actif" },
  { name: "WhatsApp", status: "Actif" },
  { name: "Instagram", status: "Actif" },
  { name: "Facebook", status: "Actif" },
  { name: "SMS", status: "Actif" },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeChannel, setActiveChannel] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChannel((prev) => (prev + 1) % channels.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 lg:py-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Disponibilité
            </span>
            <h2 className="text-5xl lg:text-7xl font-display font-semibold tracking-tight mb-8 leading-[0.95]">
              Disponible quand
              <br />
              <span className="text-foreground/30">vos clients le sont.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Un prospect qui appelle un dimanche soir et tombe sur un répondeur, c&apos;est un client perdu. Talker répond nuit et jour, capte la demande, et vous transmet dès le lendemain matin.
            </p>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl lg:text-5xl font-display font-light mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Disponibilité</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display font-light mb-2">&lt;10 sec</div>
                <div className="text-sm text-muted-foreground">Temps de réponse moyen</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display font-light mb-2">0</div>
                <div className="text-sm text-muted-foreground">Appel manqué non traité</div>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between">
                <span className="text-sm font-mono text-muted-foreground">Disponibilité</span>
                <span className="flex items-center gap-2 text-xs font-mono text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Actif
                </span>
              </div>

              <div>
                {channels.map((channel, index) => (
                  <div
                    key={channel.name}
                    className={`px-6 py-3.5 border-b border-foreground/5 last:border-b-0 flex items-center justify-between transition-all duration-300 ${
                      activeChannel === index ? "bg-foreground/[0.02]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          activeChannel === index ? "bg-foreground" : "bg-foreground/20"
                        }`}
                      />
                      <div className="font-medium">{channel.name}</div>
                    </div>
                    <span className="flex items-center gap-2 text-sm text-green-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {channel.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
