"use client";

import { ArrowUpRight } from "lucide-react";
import { TalkerWordmark } from "@/components/brand/mark";
import { AnimatedWave } from "./animated-wave";

const footerLinks = {
  Produit: [
    { name: "Fonctionnalités", href: "#features" },
    { name: "Comment ça marche", href: "#how-it-works" },
    { name: "Tarifs", href: "#pricing" },
    { name: "Intégrations", href: "#integrations" },
    { name: "Cas d'usage", href: "#cas-usage" },
  ],
  Ressources: [
    { name: "Centre d'aide", href: "#" },
    { name: "Guide d'installation", href: "#" },
    { name: "Modèles de scripts", href: "#" },
    { name: "Statut du service", href: "#" },
  ],
  Entreprise: [
    { name: "À propos", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Recrutement", href: "#" },
    { name: "Contact", href: "/contact" },
    { name: "Devenir partenaire", href: "#" },
  ],
  Légal: [
    { name: "Confidentialité", href: "#" },
    { name: "CGU/CGV", href: "#" },
    { name: "Mentions légales", href: "#" },
    { name: "RGPD", href: "#" },
  ],
};

const socialLinks = [
  { name: "Twitter", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Instagram", href: "#" },
];

export function FooterSection() {
  return (
    <footer className="relative border-t border-foreground/10">
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            <div className="col-span-2">
              <a href="/" className="inline-flex items-center gap-2 mb-6">
                <TalkerWordmark className="text-[28px]" />
                <span className="text-xs text-muted-foreground font-mono">TM</span>
              </a>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
                L&apos;agent conversationnel qui répond, capte et vend à la place de votre standard. Installé en 5 minutes, actif 24h/24.
              </p>

              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-6 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Talker. Tous droits réservés.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Tous les systèmes opérationnels
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
