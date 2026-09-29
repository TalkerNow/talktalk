import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/site-frame";
import { InfoBody } from "@/components/pages/info-body";

export const metadata: Metadata = {
  title: "À propos — Talker",
  description:
    "Agent conversationnel pour WordPress, propulsé par l’IA. Éditeur : OÜ estonienne en cours de constitution. Directeur de la publication : Jean-François Chauffeté.",
};

export default function AProposPage() {
  return (
    <SiteFrame>
      <InfoBody kind="apropos" />
    </SiteFrame>
  );
};
