"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";

const installSnippet = `<script src="talker.now/widget.js"
  data-id="votre-id"></script>`;

export function DevelopersSection() {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(installSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    <section id="agence" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Agences
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Pour votre agence web
              <br />
              <span className="text-muted-foreground">ou votre développeur</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Une intégration standard, une doc claire, zéro configuration serveur.
            </p>
          </div>

          <div
            className={`lg:sticky lg:top-32 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              <div className="flex items-center border-b border-foreground/10">
                <span className="px-6 py-4 text-sm font-mono text-foreground relative">
                  Installer
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
                </span>
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-4 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Copier le script"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="p-8 font-mono text-sm bg-foreground/[0.01] min-h-[160px]">
                <pre className="text-foreground/80 whitespace-pre-wrap">{installSnippet}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
