import type { Metadata } from "next";
import { FaqList } from "@/components/landing/faq-list";
import { V2Frame } from "../v2-frame";

export const metadata: Metadata = {
  title: "Questions fréquentes — Talker",
  description:
    "Talker est un plugin WordPress. Il pose les questions à vos visiteurs et vous envoie les conversations.",
};

export default function FaqV2Page() {
  return (
    <V2Frame>
      <FaqList />
    </V2Frame>
  );
}
