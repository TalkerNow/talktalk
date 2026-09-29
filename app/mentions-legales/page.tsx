import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/site-frame";
import { InfoBody } from "@/components/pages/info-body";

export const metadata: Metadata = {
  title: "Mentions légales — Talker",
  description:
    "OÜ estonienne en cours de constitution. Directeur de la publication : Jean-François Chauffeté. Contact : hello@talker.now.",
};

export default function MentionsLegalesPage() {
  return (
    <SiteFrame>
      <InfoBody kind="mentions" />
    </SiteFrame>
  );
}
