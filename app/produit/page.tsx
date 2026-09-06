import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { FeaturesSection } from "@/components/landing/features-section";

export const metadata: Metadata = {
  title: "Fonctionnalités — Talker",
  description: "Ce qu'il faut. Rien de plus.",
};

export default function ProduitPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7F6F4] noise-overlay">
      <Navigation />
      <FeaturesSection variant="page" />
      <FooterSection />
    </main>
  );
}
