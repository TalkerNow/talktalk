import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { ContextSection } from "@/components/landing/context-section";
import { ContextOrbitVariant } from "@/components/landing/context-orbit-variant";
import { AuroraVariant } from "@/components/landing/aurora-variant";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { InfraBeamVariant } from "@/components/landing/infra-beam-variant";
import { MetricsSection } from "@/components/landing/metrics-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { PricingShineVariant } from "@/components/landing/pricing-shine-variant";
import { CtaSection } from "@/components/landing/cta-section";
import { CtaVelocityVariant } from "@/components/landing/cta-velocity-variant";
import { FooterSection } from "@/components/landing/footer-section";
import { TalkerLauncherBubble } from "@/components/landing/talker-launcher-bubble";
import { TalkerProvider } from "@/components/talker/provider";

export default function Home() {
  return (
    <TalkerProvider>
      <main className="relative min-h-screen overflow-x-hidden noise-overlay">
        <Navigation />
        <HeroSection />
        <ContextSection />
        <ContextOrbitVariant />
        <AuroraVariant />
        <FeaturesSection />
        <HowItWorksSection />
        <InfrastructureSection />
        <InfraBeamVariant />
        <MetricsSection />
        <IntegrationsSection />
        <PricingSection />
        <PricingShineVariant />
        <CtaSection />
        <CtaVelocityVariant />
        <FooterSection />
      </main>
      <TalkerLauncherBubble />
    </TalkerProvider>
  );
}
