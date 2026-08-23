"use client";

import { useEffect, useRef, useState } from "react";
import { TalkerMark } from "@/components/brand/mark";

const transcript = [
  { who: "client" as const, time: "07:18", text: "Vous intervenez le week-end ?" },
  {
    who: "talker" as const,
    time: "07:18",
    text: "Oui, majoration de 25% le samedi. Quel est votre besoin ?",
  },
  { who: "client" as const, time: "07:19", text: "Fuite d'eau urgente." },
  { who: "talker" as const, time: "07:19", text: "Je vous mets en contact. Votre numéro ?" },
];

export function InfrastructureSection() {
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
              Chaque matin
            </span>
            <h2 className="text-5xl lg:text-7xl font-display font-semibold tracking-tight mb-8 leading-[0.95]">
              Les conversations
              <br />
              de vos visiteurs
              <br />
              <span className="text-foreground/30">chaque matin dans votre boîte mail</span>
            </h2>
            <div className="space-y-4 text-xl text-muted-foreground leading-relaxed">
              <p>Que disent vos visiteurs ? Qu&apos;est-ce qu&apos;ils demandent ?</p>
              <p>Faites évoluer votre offre selon les remontées des visiteurs.</p>
              <p>
                Collez à la demande et à l&apos;évolution des demandes, à l&apos;heure de la
                révolution IA.
              </p>
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="rounded-2xl border border-foreground/10 bg-[#F7F6F4] shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="px-5 py-2.5 flex items-center justify-between gap-3 border-b border-foreground/10 bg-white">
                <div className="min-w-0 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111] shrink-0" />
                  <span className="text-sm font-medium truncate">Talker</span>
                  <span className="text-sm text-muted-foreground truncate">
                    Rapport Talker — Fuite week-end
                  </span>
                </div>
                <span className="text-xs font-mono text-muted-foreground shrink-0">07:18</span>
              </div>

              <div className="bg-[#111111] px-5 py-4 text-white">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-[13px] leading-none">
                    <TalkerMark filled className="h-3.5 w-3.5" />
                    <span>
                      <span className="font-bold">talker</span>
                      <span className="font-normal text-white/55">.now</span>
                    </span>
                  </span>
                  <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white/85">
                    Transcription de l&apos;échange
                  </span>
                </div>
                <p className="mt-3 text-base font-display font-semibold tracking-tight">
                  Rapport Talker
                </p>
                <p className="mt-1 text-xs font-mono text-white/45">
                  23 août 2026 · 07:18 — 07:19
                </p>
              </div>

              <div className="bg-white px-5 py-5 space-y-4">
                <p className="text-sm font-medium">Conversation</p>
                {transcript.map((line, index) => {
                  const isTalker = line.who === "talker";
                  return (
                    <div
                      key={`${line.who}-${index}`}
                      className={`flex items-end gap-2 ${isTalker ? "flex-row-reverse" : ""}`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-mono tracking-wider ${
                          isTalker
                            ? "bg-[#111111] text-white"
                            : "bg-foreground/10 text-foreground/70"
                        }`}
                      >
                        {isTalker ? "TK" : "CL"}
                      </span>
                      <div className={`max-w-[82%] ${isTalker ? "items-end" : ""}`}>
                        <p
                          className={`mb-1 text-[10px] font-mono text-muted-foreground ${
                            isTalker ? "text-right" : ""
                          }`}
                        >
                          {isTalker ? "Talker" : "Client"} · {line.time}
                        </p>
                        <div
                          className={`px-3.5 py-2.5 text-sm leading-relaxed rounded-xl ${
                            isTalker
                              ? "bg-[#111111] text-white rounded-br-md"
                              : "bg-foreground/[0.05] text-foreground rounded-bl-md"
                          }`}
                        >
                          {line.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
