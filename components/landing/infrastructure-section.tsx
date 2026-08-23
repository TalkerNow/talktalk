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

const inboxDummies = [
  { from: "Agenda", subject: "Rappel : 10h", time: "06:44" },
  { from: "Documents", subject: "Facture août", time: "Hier" },
  { from: "Notification", subject: "Confirmation de lecture", time: "Hier" },
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
            <div
              aria-hidden="true"
              className="overflow-hidden rounded-xl border border-foreground/12 bg-[#EDECEA] shadow-[0_16px_40px_rgba(0,0,0,0.10)]"
            >
              <div className="relative flex items-center border-b border-foreground/10 bg-[#E4E2DE] px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                </div>
                <span className="pointer-events-none absolute inset-x-0 text-center text-[11px] font-medium text-foreground/70">
                  Boîte de réception
                </span>
              </div>

              <div className="grid h-[22.5rem] grid-cols-[4.75rem_7.25rem_minmax(0,1fr)] bg-[#F7F6F4] sm:h-[24rem] sm:grid-cols-[5.25rem_8.25rem_minmax(0,1fr)]">
                <aside className="border-r border-foreground/10 bg-[#E8E6E3] px-2 py-2.5">
                  <p className="px-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/40">
                    Favoris
                  </p>
                  <div className="mt-1.5 rounded-md bg-[#111111] px-1.5 py-1 text-[10px] font-medium leading-tight text-white">
                    Boîte de réception
                  </div>
                  <ul className="mt-3 space-y-1 px-1.5 text-[10px] leading-tight text-foreground/50">
                    <li>Réception</li>
                    <li>Envoyés</li>
                    <li>Brouillons</li>
                  </ul>
                </aside>

                <div className="border-r border-foreground/10 bg-[#F3F1EE]">
                  <div className="bg-[#D8E3F0] px-2 py-2">
                    <div className="flex items-start justify-between gap-1">
                      <p className="text-[11px] font-semibold leading-tight text-foreground">Talker</p>
                      <span className="shrink-0 font-mono text-[9px] text-foreground/55">07:18</span>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-[10px] font-medium leading-snug text-foreground/80">
                      Rapport Talker — Fuite week-end
                    </p>
                    <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-[#C43F17]" />
                  </div>
                  {inboxDummies.map((row) => (
                    <div
                      key={row.subject}
                      className="border-t border-foreground/8 px-2 py-2 opacity-45"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <p className="truncate text-[11px] leading-tight text-foreground">{row.from}</p>
                        <span className="shrink-0 font-mono text-[9px] text-foreground/50">{row.time}</span>
                      </div>
                      <p className="mt-0.5 truncate text-[10px] text-foreground/60">{row.subject}</p>
                    </div>
                  ))}
                </div>

                <div className="min-w-0 overflow-hidden bg-[#F7F6F4]">
                  <div className="border-b border-foreground/8 px-3 py-2">
                    <p className="text-[11px] font-medium text-foreground">Talker</p>
                    <p className="truncate text-[12px] font-semibold leading-tight text-foreground">
                      Rapport Talker — Fuite week-end
                    </p>
                    <p className="mt-0.5 font-mono text-[9px] text-muted-foreground">
                      À vous · 23 août 2026 à 07:18
                    </p>
                  </div>

                  <div className="h-full overflow-hidden px-2.5 pb-2.5 pt-2">
                    <div className="overflow-hidden rounded-md border border-foreground/8 bg-white">
                      <div className="bg-[#111111] px-3 py-3 text-white">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 text-[12px] leading-none">
                            <TalkerMark filled className="h-3 w-3" />
                            <span>
                              <span className="font-bold">talker</span>
                              <span className="font-normal text-white/55">.now</span>
                            </span>
                          </span>
                          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-white/85">
                            Transcription de l&apos;échange
                          </span>
                        </div>
                        <p className="mt-2 text-sm font-display font-semibold tracking-tight">
                          Rapport Talker
                        </p>
                        <p className="mt-0.5 text-[10px] font-mono text-white/45">
                          23 août 2026 · 07:18 — 07:19
                        </p>
                      </div>

                      <div className="space-y-2.5 bg-white px-3 py-3">
                        <p className="text-[11px] font-medium">Conversation</p>
                        {transcript.map((line, index) => {
                          const isTalker = line.who === "talker";
                          return (
                            <div
                              key={`${line.who}-${index}`}
                              className={`flex items-end gap-1.5 ${isTalker ? "flex-row-reverse" : ""}`}
                            >
                              <span
                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[8px] font-mono tracking-wider ${
                                  isTalker
                                    ? "bg-[#111111] text-white"
                                    : "bg-foreground/10 text-foreground/70"
                                }`}
                              >
                                {isTalker ? "TK" : "CL"}
                              </span>
                              <div className="max-w-[84%]">
                                <p
                                  className={`mb-0.5 text-[9px] font-mono text-muted-foreground ${
                                    isTalker ? "text-right" : ""
                                  }`}
                                >
                                  {isTalker ? "Talker" : "Client"} · {line.time}
                                </p>
                                <div
                                  className={`rounded-lg px-2.5 py-1.5 text-[11px] leading-relaxed ${
                                    isTalker
                                      ? "rounded-br-sm bg-[#111111] text-white"
                                      : "rounded-bl-sm bg-foreground/[0.05] text-foreground"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
