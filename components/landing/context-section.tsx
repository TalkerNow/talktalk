"use client";

import { useEffect, useRef, useState } from "react";

export function ContextSection() {
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
          className={`max-w-3xl overflow-visible transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-display font-semibold tracking-tight mb-8 leading-[0.95]">
            Vos visiteurs ne cliquent plus.
            <br />
            <span className="text-foreground/30">Ils demandent.</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10">
            Les moteurs de recherche et les IA génératives répondent directement, sans renvoyer vers votre site. Un site vitrine statique perd un trafic qu&apos;il ne reverra jamais.
          </p>
          <div className="border border-[#C43F17]/20 bg-[#F4DCD4] px-6 py-5 mb-10 text-[#111111]">
            <p className="text-xl leading-relaxed text-[#111111]">
              Un site qui répond, qui engage, qui capte la demande sur place, c&apos;est la seule
              manière de transformer une visite en contact.
            </p>
            <p className="mt-4 pl-6 text-xl font-medium leading-relaxed text-[#111111] lg:pl-8">
              le site statique est un dépliant
            </p>
            <p className="mt-2 pl-6 text-xl font-medium leading-relaxed text-[#111111] lg:pl-8">
              votre site avec Talker devient un vendeur, une secrétaire, un partenaire
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
