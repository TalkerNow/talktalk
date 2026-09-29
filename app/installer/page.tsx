import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { InstallerPanel } from "@/components/landing/installer-panel";

export const metadata: Metadata = {
  title: "Installer Talker en ~3 minutes — chatbot WordPress (zip)",
  description:
    "Téléchargez le zip, uploadez-le dans Extensions WordPress, scan et questions, agent en ligne.",
};

export default function InstallerPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7F6F4] noise-overlay">
      <Navigation />
      <section className="relative overflow-visible pb-16 pt-32 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <InstallerPanel />
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
