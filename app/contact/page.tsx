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
      <section className="relative overflow-visible pb-16 pt-32 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="relative overflow-visible border border-foreground">
            <div className="relative z-10 grid items-start gap-12 overflow-visible px-8 py-12 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-16">
              <div>
                <h1 className="font-display text-4xl leading-[0.95] tracking-tight lg:text-7xl">
                  Contact
                  <br />
                  <span className="text-foreground/30">On vous répond.</span>
                </h1>
                <p className="mt-10 text-xl leading-relaxed text-foreground">
                  Vous installez. Talker parle. Les demandes arrivent.
                </p>
                <p className="mt-3 text-xl leading-relaxed text-foreground">
                  Pas un ticket. Une conversation.
                </p>
                <p className="mt-10 font-mono text-sm text-muted-foreground">
                  hello@talker.now
                </p>
              </div>
              <ContactForm />
            </div>
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 border-b border-l border-foreground/10" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 border-t border-r border-foreground/10" />
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
