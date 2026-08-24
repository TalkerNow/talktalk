import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { ContextSection } from "@/components/landing/context-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import { InfraBeamVariant } from "@/components/landing/infra-beam-variant";
import { TalkerLauncherBubble } from "@/components/landing/talker-launcher-bubble";
import { TalkerProvider } from "@/components/talker/provider";

export default function Home() {
  return (
    <TalkerProvider>
      <main className="relative min-h-screen overflow-x-hidden noise-overlay">
        <Navigation />
        <HeroSection />
        <ContextSection />
        <FeaturesSection />
        <HowItWorksSection />
        <InfrastructureSection />
        <MetricsSection />
        <IntegrationsSection />
        <PricingSection />
        <CtaSection />
        <FooterSection />
        <InfraBeamVariant />
      </main>
      <TalkerLauncherBubble />
    </TalkerProvider>
  );
}
