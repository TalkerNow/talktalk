import type { Metadata } from "next";
import { FeaturesSection } from "@/components/landing/features-section";
import { V2Frame } from "../v2-frame";

export const metadata: Metadata = {
  title: "Fonctionnalités — Talker",
  description: "Ce qu'il faut. Rien de plus.",
};

export default function ProduitV2Page() {
  return (
    <V2Frame>
      <FeaturesSection variant="page" />
    </V2Frame>
  );
}
