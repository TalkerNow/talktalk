import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { MethodeArticle } from "@/components/landing/methode-article";
import { buildMethodeJsonLd, METHODE_META } from "@/lib/content/methode";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: METHODE_META.title,
  description: METHODE_META.description,
  openGraph: {
    title: METHODE_META.title,
    description: METHODE_META.description,
  },
  twitter: {
    title: METHODE_META.title,
    description: METHODE_META.description,
  },
};

export default function MethodePage() {
  const jsonLd = buildMethodeJsonLd(site.url, site.product);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7F6F4] noise-overlay">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navigation />
      <MethodeArticle />
      <FooterSection />
    </main>
  );
}
