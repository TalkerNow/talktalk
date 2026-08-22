import type { LandingContent } from "@/lib/content/types";

/**
 * Same fields as `lib/content/landing.ts`.
 * Publish a `landingPage` singleton in Sanity to override the in-code copy.
 */
export const landingPageQuery = `*[_type == "landingPage"][0]{
  banner,
  heroTitle,
  heroBody,
  primaryCta,
  secondaryCta,
  nav,
  productMenu[]{ title, subtitle, href },
  whoTitle,
  whoBody,
  howTitle,
  howBody,
  howSteps[]{ title, body },
  reasonsEyebrow,
  reasons[]{ id, number, title, body },
  situationsTitle,
  situationsBody,
  situations[]{ id, label, title, siteName, siteKind, botLine, chips },
  betaTitle,
  betaBody,
  betaPoints[]{ title, body },
  priceTitle,
  priceBody,
  contactTitle,
  contactBody,
  contactNote,
  footerLine
}`;

export function isLandingContent(value: unknown): value is LandingContent {
  if (!value || typeof value !== "object") return false;
  const doc = value as Partial<LandingContent>;
  return (
    typeof doc.heroTitle === "string" &&
    typeof doc.heroBody === "string" &&
    Array.isArray(doc.reasons) &&
    doc.reasons.length >= 6
  );
}
