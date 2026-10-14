import { siteUrl } from "./site-url.mjs";

export const site = {
  name: "talker.now",
  product: "Talker",
  homepage: "https://talker.now",
  url: siteUrl(),
  locale: "fr_FR",
  rust: "#C43F17",
  poweredByLabel: "Powered by Talker · Créez le vôtre",
} as const;
