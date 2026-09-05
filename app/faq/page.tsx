import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { FaqList } from "@/components/landing/faq-list";

export const metadata: Metadata = {
  title: "Questions fréquentes — Talker",
  description:
    "Talker est un plugin WordPress. Il pose les questions à vos visiteurs et vous envoie les conversations.",
};

export default function FaqPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7F6F4] noise-overlay">
      <Navigation />
      <FaqList />
      <FooterSection />
    </main>
  );
}
