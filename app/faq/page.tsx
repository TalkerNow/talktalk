import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { FaqList } from "@/components/landing/faq-list";
import { fr } from "@/lib/i18n/fr";

export const metadata: Metadata = {
  title: "Questions fréquentes — chatbot WordPress Talker",
  description:
    "Talker est un chatbot WordPress. Il pose les questions à vos visiteurs et vous envoie les conversations.",
};

function answerText(answer: string | string[]) {
  return Array.isArray(answer) ? answer.join(" ") : answer;
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: fr.faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: answerText(item.a),
    },
  })),
};

export default function FaqPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7F6F4] noise-overlay">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navigation />
      <FaqList />
      <FooterSection />
    </main>
  );
}
