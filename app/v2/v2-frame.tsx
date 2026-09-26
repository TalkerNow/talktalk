import type { ReactNode } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { V2Banner } from "./v2-banner";

export function V2Frame({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay pb-16">
      <Navigation />
      {children}
      <FooterSection />
      <V2Banner />
    </main>
  );
}
