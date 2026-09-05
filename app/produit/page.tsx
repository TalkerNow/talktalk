import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { metadataForPage } from "@/lib/i18n/metadata";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  return metadataForPage(searchParams, "produit");
}

export default function ProduitPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F7F6F4] noise-overlay">
      <Navigation />
      <FeaturesSection variant="page" />
      <FooterSection />
    </main>
  );
}
