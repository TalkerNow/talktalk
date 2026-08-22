import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BetaSection } from "@/components/sections/beta";
import { ContactSection } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { HowSection } from "@/components/sections/how";
import { Reasons } from "@/components/sections/reasons";
import { Situations } from "@/components/sections/situations";
import { TalkerLauncher } from "@/components/talker/launcher";
import { TalkerProvider } from "@/components/talker/provider";
import { loadLandingContent } from "@/lib/content/load";
import { site } from "@/lib/site";

export const revalidate = 3600;

export default async function Home() {
  const content = await loadLandingContent();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Talker",
    applicationCategory: "BusinessApplication",
    operatingSystem: "WordPress",
    url: site.url,
    description: content.heroBody,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      description: "Beta gratuite, 1 000 conversations incluses",
    },
  };

  return (
    <TalkerProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader content={content} />
      <main>
        <Hero content={content} />
        <HowSection content={content} />
        <Reasons content={content} />
        <Situations content={content} />
        <BetaSection content={content} />
        <ContactSection content={content} />
      </main>
      <SiteFooter content={content} />
      <TalkerLauncher />
    </TalkerProvider>
  );
}
