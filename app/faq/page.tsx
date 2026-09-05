import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { FaqList } from "@/components/landing/faq-list";
import { metadataForPage } from "@/lib/i18n/metadata";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  return metadataForPage(searchParams, "faq");
}

export default function FaqPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7F6F4] noise-overlay">
      <Navigation />
      <FaqList />
      <FooterSection />
    </main>
  );
}
