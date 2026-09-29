import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/site-frame";
import { InfoBody } from "@/components/pages/info-body";

export const metadata: Metadata = {
  title: "À propos — Talker",
  description:
    "Agent conversationnel WordPress, en zip. Éditeur : hello@talker.now. Identité légale sur les mentions légales.",
};

export default function AProposPage() {
  return (
    <SiteFrame>
      <InfoBody kind="apropos" />
    </SiteFrame>
  );
};
