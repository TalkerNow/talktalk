import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/site-frame";
import { InfoBody } from "@/components/pages/info-body";

export const metadata: Metadata = {
  title: "Mentions légales — Talker",
  description:
    "Éditeur talker.now. Immatriculation non publiée. Contact : hello@talker.now.",
};

export default function MentionsLegalesPage() {
  return (
    <SiteFrame>
      <InfoBody kind="mentions" />
    </SiteFrame>
  );
}
