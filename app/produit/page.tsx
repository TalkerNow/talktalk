import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ProductDetailsIntro } from "@/components/landing/product-details-intro";
import { FeaturesSection } from "@/components/landing/features-section";

export const metadata: Metadata = {
  title: "Talker s’installe en zip sur WordPress — Talker",
  description:
    "Pour les TPE qui ont déjà un site. Pas de live chat. Pas de paramétrage pour démarrer.",
};

export default function ProduitPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7F6F4] noise-overlay">
      <Navigation />
      <ProductDetailsIntro />
      <FeaturesSection />
      <FooterSection />
    </main>
  );
}
