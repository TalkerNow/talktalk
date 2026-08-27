import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ContactPanel } from "@/components/landing/contact-panel";

export const metadata: Metadata = {
  title: "Contact — Talker",
  description: "Dites-nous où vous en êtes. On vous répond.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7F6F4] noise-overlay">
      <Navigation />
      <section className="relative overflow-visible pb-16 pt-32 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <ContactPanel />
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
