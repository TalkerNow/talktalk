"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedSphere } from "./animated-sphere";

const words = ["create", "build", "scale", "ship"];

const stats = [
  { value: "98%", label: "faster deployment", company: "STRIPE" },
  { value: "300%", label: "throughput increase", company: "LINEAR" },
  { value: "6x", label: "faster to ship", company: "NOTION" },
  { value: "20 days", label: "saved on builds", company: "NETFLIX" },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(1);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] opacity-40 pointer-events-none">
        <AnimatedSphere />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 lg:px-12 pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
            <span className="w-8 h-px bg-foreground/30" />
            The platform for modern teams
          </span>
        </div>

        <h1
          className={`text-[clamp(3.25rem,11vw,9.5rem)] font-display font-bold leading-[0.88] tracking-tight mb-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="block text-foreground">The platform</span>
          <span className="block text-foreground/30">
            to{" "}
            <span className="relative inline-block text-foreground/40">
              <span key={wordIndex} className="inline-flex">
                {words[wordIndex].split("").map((char, i) => (
                  <span
                    key={`${wordIndex}-${i}`}
                    className="inline-block animate-char-in"
                    style={{
                      animationDelay: `${i * 50}ms`,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-foreground/12" />
            </span>
          </span>
        </h1>

        <p
          className={`text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mb-10 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Your toolkit to stop configuring and start innovating.
          <br className="hidden sm:block" />
          Securely build, deploy, and scale the best
          <br className="hidden sm:block" />
          experiences.
        </p>

        <div
          className={`flex flex-col sm:flex-row items-start gap-3 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            size="lg"
            className="bg-black hover:bg-black/90 text-white px-8 h-14 text-base rounded-full group"
          >
            Start free trial
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 text-base rounded-full bg-transparent border-foreground/15 text-foreground hover:bg-foreground/5 shadow-none"
          >
            Watch demo
          </Button>
        </div>
      </div>

      <div
        className={`relative z-10 border-t border-foreground/10 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0">
              {stats.map((stat) => (
                <div
                  key={`${stat.company}-${i}`}
                  className="flex min-w-[280px] flex-col justify-center gap-1 border-r border-foreground/10 px-10 py-8 lg:min-w-[320px] lg:px-14 lg:py-10"
                >
                  <span className="text-4xl lg:text-5xl font-display font-semibold tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <span className="font-mono text-[11px] tracking-wider text-foreground/55">
                    {stat.company}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
