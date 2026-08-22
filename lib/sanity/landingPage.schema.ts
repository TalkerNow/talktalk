/**
 * Reference schema for a future Sanity Studio.
 * Not deployed from this repo. Fields match `lib/content/types.ts`
 * and `lib/content/landing.ts`.
 *
 * When you add a Studio:
 * 1. Copy this type into the Studio schema
 * 2. Publish a singleton `landingPage`
 * 3. `loadLandingContent()` will pick it up over the in-code fallback
 */
export const landingPageSchemaReference = {
  name: "landingPage",
  title: "Page d’accueil",
  type: "document",
  fields: [
    { name: "banner", type: "string" },
    { name: "heroTitle", type: "string" },
    { name: "heroBody", type: "text" },
    { name: "primaryCta", type: "string" },
    { name: "secondaryCta", type: "string" },
    {
      name: "nav",
      type: "object",
      fields: [
        { name: "produit", type: "string" },
        { name: "prix", type: "string" },
        { name: "beta", type: "string" },
        { name: "contact", type: "string" },
      ],
    },
    {
      name: "productMenu",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "subtitle", type: "string" },
            { name: "href", type: "string" },
          ],
        },
      ],
    },
    { name: "whoTitle", type: "string" },
    { name: "whoBody", type: "text" },
    { name: "howTitle", type: "string" },
    { name: "howBody", type: "text" },
    {
      name: "howSteps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "body", type: "text" },
          ],
        },
      ],
    },
    { name: "reasonsEyebrow", type: "string" },
    {
      name: "reasons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            { name: "number", type: "string" },
            { name: "title", type: "string" },
            { name: "body", type: "text" },
          ],
        },
      ],
    },
    { name: "situationsTitle", type: "string" },
    { name: "situationsBody", type: "text" },
    {
      name: "situations",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            { name: "label", type: "string" },
            { name: "title", type: "string" },
            { name: "siteName", type: "string" },
            { name: "siteKind", type: "string" },
            { name: "botLine", type: "string" },
            { name: "chips", type: "array", of: [{ type: "string" }] },
          ],
        },
      ],
    },
    { name: "betaTitle", type: "string" },
    { name: "betaBody", type: "text" },
    {
      name: "betaPoints",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "body", type: "text" },
          ],
        },
      ],
    },
    { name: "priceTitle", type: "string" },
    { name: "priceBody", type: "text" },
    { name: "contactTitle", type: "string" },
    { name: "contactBody", type: "text" },
    { name: "contactNote", type: "text" },
    { name: "footerLine", type: "string" },
  ],
} as const;
