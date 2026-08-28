import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { FeaturesSection } from "@/components/landing/features-section";

/** Parked homepage features block — not rendered on /. */
export const metadata: Metadata = {
  title: "Ce qu'il faut — Talker",
  description:
    "Un agent qui connaît votre métier. Capture les coordonnées, pas juste les questions. Un support avant votre support.",
};

export default function ProduitPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7F6F4] noise-overlay">
      <Navigation />
      <div className="pt-24 lg:pt-28">
        <FeaturesSection />
      </div>
      <FooterSection />
    </main>
  );
}
