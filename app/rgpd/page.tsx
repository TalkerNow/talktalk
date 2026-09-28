import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/site-frame";
import { InfoBody } from "@/components/pages/info-body";

export const metadata: Metadata = {
  title: "RGPD — Talker",
  description:
    "Droits d’accès, de rectification et d’effacement. Contact : hello@talker.now.",
};

export default function RgpdPage() {
  return (
    <SiteFrame>
      <InfoBody kind="gdpr" />
    </SiteFrame>
  );
}
