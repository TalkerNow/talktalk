import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { ContextSection } from "@/components/landing/context-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FaqList } from "@/components/landing/faq-list";
import { FooterSection } from "@/components/landing/footer-section";
import { V2Banner } from "./v2-banner";

export default function HomeV2() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay pb-16">
      <Navigation />
      <HeroSection />
      <ContextSection />
      <HowItWorksSection />
      <InfrastructureSection />
      <MetricsSection />
      <IntegrationsSection />
      <PricingSection />
      <CtaSection />
      <FaqList variant="section" />
      <FooterSection />
      <V2Banner />
    </main>
  );
}
