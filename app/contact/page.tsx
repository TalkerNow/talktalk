import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ContactForm } from "@/components/landing/contact-form";

export const metadata: Metadata = {
  title: "Contact — Talker",
  description: "Dites-nous où vous en êtes. On vous répond.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7F6F4] noise-overlay">
      <Navigation />
      <section className="mx-auto max-w-[1400px] overflow-visible px-6 pb-16 pt-32 lg:px-12 lg:pb-24 lg:pt-40">
        <h1 className="mb-6 font-display text-4xl font-semibold tracking-tight lg:text-6xl">
          Contact
        </h1>
        <p className="mb-12 max-w-xl text-xl leading-relaxed text-muted-foreground">
          Dites-nous où vous en êtes. On vous répond.
        </p>
        <ContactForm />
      </section>
      <FooterSection />
    </main>
  );
}
