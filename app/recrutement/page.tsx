import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/site-frame";
import { InfoBody } from "@/components/pages/info-body";

export const metadata: Metadata = {
  title: "Recrutement — Talker",
  description:
    "Aucun poste ouvert. Candidature spontanée : cinq lignes, un CV et un lien, à hello@talker.now.",
};

export default function RecrutementPage() {
  return (
    <SiteFrame>
      <InfoBody kind="recrutement" />
    </SiteFrame>
  );
}
