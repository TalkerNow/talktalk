export const site = {
  name: "talker.now",
  product: "Talker",
  homepage: "https://talker.now",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://talker.now",
  locale: "fr_FR",
  rust: "#C43F17",
} as const;
