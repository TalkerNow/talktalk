/** Public Sanity project. Dataset `production` is public-read. No token required. */
export const sanityEnv = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "0l81z2o2",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-08-22",
} as const;
