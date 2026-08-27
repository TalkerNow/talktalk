import { sanityClient } from "@/lib/sanity/client";
import { isLandingContent, landingPageQuery } from "@/lib/sanity/query";
import { landingContent } from "./landing";
import type { LandingContent } from "./types";

/**
 * Public-read Sanity first. If the dataset has no `landingPage` yet,
 * or the request fails, use the in-code dossier copy. Never block the page.
 */
export async function loadLandingContent(): Promise<LandingContent> {
  try {
    const remote = await sanityClient.fetch<unknown>(landingPageQuery);
    if (isLandingContent(remote)) {
      return remote;
    }
  } catch {
    // Public read only — no token. Fall back silently.
  }
  return landingContent;
}
