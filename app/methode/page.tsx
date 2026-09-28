import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/site-frame";
import { InfoBody } from "@/components/pages/info-body";

export const metadata: Metadata = {
  title: "Talker — la méthode pour répondre aux visiteurs sur WordPress",
  description:
    "Moins de trafic venu des réponses IA, puis le chemin du zip à la conversation sur WordPress.",
};

export default function MethodePage() {
  return (
    <SiteFrame>
      <InfoBody kind="methode" />
    </SiteFrame>
  );
}
