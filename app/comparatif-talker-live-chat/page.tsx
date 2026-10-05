import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/site-frame";
import { ComparatifBody } from "@/components/pages/comparatif-body";
import { COMPARATIF_META } from "@/lib/content/comparatif";

export const metadata: Metadata = {
  title: COMPARATIF_META.title,
  description: COMPARATIF_META.description,
  openGraph: {
    title: COMPARATIF_META.title,
    description: COMPARATIF_META.description,
  },
  twitter: {
    title: COMPARATIF_META.title,
    description: COMPARATIF_META.description,
  },
};

export default function ComparatifTalkerLiveChatPage() {
  return (
    <SiteFrame>
      <ComparatifBody />
    </SiteFrame>
  );
}
