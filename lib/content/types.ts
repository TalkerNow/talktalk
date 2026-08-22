/**
 * Landing fields for v1 (in code) and the same shape to fetch from Sanity later.
 * Expected Sanity type: `landingPage` (singleton).
 */
export type NavProductItem = {
  title: string;
  subtitle: string;
  href: string;
};

export type Reason = {
  id: string;
  number: string;
  title: string;
  body: string;
};

export type Situation = {
  id: string;
  label: string;
  title: string;
  siteName: string;
  siteKind: "resto" | "plombier" | "cabinet";
  botLine: string;
  chips: string[];
};

export type LandingContent = {
  banner: string;
  heroTitle: string;
  heroBody: string;
  primaryCta: string;
  secondaryCta: string;
  nav: {
    produit: string;
    prix: string;
    beta: string;
    contact: string;
  };
  productMenu: NavProductItem[];
  whoTitle: string;
  whoBody: string;
  howTitle: string;
  howBody: string;
  howSteps: { title: string; body: string }[];
  reasonsEyebrow: string;
  reasons: Reason[];
  situationsTitle: string;
  situationsBody: string;
  situations: Situation[];
  betaTitle: string;
  betaBody: string;
  betaPoints: { title: string; body: string }[];
  priceTitle: string;
  priceBody: string;
  contactTitle: string;
  contactBody: string;
  contactNote: string;
  footerLine: string;
};
