import type { Metadata } from "next";
import { MethodeArticle } from "@/components/v2/methode-article";
import { buildMethodeJsonLd, METHODE_META } from "@/lib/content/methode";
import { site } from "@/lib/site";
import { V2Frame } from "../v2-frame";

export const metadata: Metadata = {
  title: METHODE_META.title,
  description: METHODE_META.description,
};

export default function MethodeV2Page() {
  const jsonLd = buildMethodeJsonLd(site.url, site.product, "/v2/methode");

  return (
    <V2Frame>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <MethodeArticle />
    </V2Frame>
  );
}
