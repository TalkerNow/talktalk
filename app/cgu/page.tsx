import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/site-frame";
import { InfoBody } from "@/components/pages/info-body";

export const metadata: Metadata = {
  title: "CGU / CGV — Talker",
  description:
    "Brouillon des conditions du site talker.now. Contact : hello@talker.now.",
};

export default function CguPage() {
  return (
    <SiteFrame>
      <InfoBody kind="terms" />
    </SiteFrame>
  );
}
