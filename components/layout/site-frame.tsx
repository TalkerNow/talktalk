import type { ReactNode } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7F6F4] noise-overlay">
      <Navigation />
      <div className="pb-24 pt-32 lg:pb-32 lg:pt-40">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">{children}</div>
      </div>
      <FooterSection />
    </main>
  );
}
