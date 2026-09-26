import type { Metadata } from "next";
import { FaqListV2 } from "@/components/v2/faq-list";
import { faqFr } from "@/lib/content/faq";
import { V2Frame } from "../v2-frame";

export const metadata: Metadata = {
  title: "Questions fréquentes — chatbot WordPress Talker",
  description:
    "Talker pose un agent conversationnel IA sur votre site WordPress. Gratuit pour démarrer, prompt métier dédié, Google Gemini 2.5 Flash.",
};

function answerText(item: (typeof faqFr.items)[number]) {
  const short = Array.isArray(item.a) ? item.a.join(" ") : item.a;
  return item.c ? `${short} ${item.c}` : short;
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqFr.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: answerText(item),
    },
  })),
};

export default function FaqV2Page() {
  return (
    <V2Frame>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <FaqListV2 />
    </V2Frame>
  );
}
