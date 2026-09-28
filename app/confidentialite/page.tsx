import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/site-frame";
import { InfoBody } from "@/components/pages/info-body";

export const metadata: Metadata = {
  title: "Confidentialité — Talker",
  description:
    "Cookies nécessaires, mesure d’audience seulement après accord, contact hello@talker.now.",
};

export default function ConfidentialitePage() {
  return (
    <SiteFrame>
      <InfoBody kind="privacy" />
    </SiteFrame>
  );
}
