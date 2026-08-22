import { createClient } from "@sanity/client";
import { sanityEnv } from "./env";

export const sanityClient = createClient({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  apiVersion: sanityEnv.apiVersion,
  useCdn: true,
  perspective: "published",
  stega: false,
});
