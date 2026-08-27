"use client";

import { useState } from "react";
import { TalkerWordmark } from "@/components/brand/mark";
import { AnimatedWave } from "./animated-wave";
import { ContactForm } from "./contact-form";
import { useLocale } from "@/components/i18n/locale-context";

export function ContactPanel() {
  const { t } = useLocale();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 40 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      className="relative overflow-visible border border-foreground"
      onMouseMove={handleMouseMove}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden opacity-20">
        <AnimatedWave />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.15), transparent 40%)`,
        }}
      />

      <div className="relative z-10 overflow-visible px-8 py-12 lg:px-16 lg:py-16">
        <a href="/" className="mb-12 inline-flex">
          <TalkerWordmark className="text-[30px]" />
        </a>

        <div className="grid items-start gap-12 overflow-visible lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="font-display text-4xl leading-[0.95] tracking-tight lg:text-7xl">
              {t.contact.title}
              <br />
              <span className="text-foreground/30">{t.contact.titleMuted}</span>
            </h1>
            <p className="mt-10 text-xl leading-relaxed text-foreground">
              {t.contact.lead1}
            </p>
            <p className="mt-3 text-xl leading-relaxed text-foreground">
              {t.contact.lead2}
            </p>
            <p className="mt-10 font-mono text-sm text-muted-foreground">
              — hello@talker.now
            </p>
          </div>
          <ContactForm />
        </div>
      </div>

      <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 border-b border-l border-foreground/10" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 border-t border-r border-foreground/10" />
    </div>
  );
}
