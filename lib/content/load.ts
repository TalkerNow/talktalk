import { sanityClient } from "@/lib/sanity/client";
import { isLandingContent, landingPageQuery } from "@/lib/sanity/query";
import { landingContent } from "./landing";
import type { LandingContent } from "./types";

export async function loadLandingContent(): Promise<LandingContent> {
  try {
    const remote = await sanityClient.fetch<unknown>(landingPageQuery);
    if (isLandingContent(remote)) {
      return remote;
    }
  } catch {
  }
  return landingContent;
}
