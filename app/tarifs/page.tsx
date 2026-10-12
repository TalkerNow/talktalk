import type { Metadata } from "next";
import { TarifsBody } from "@/components/pages/tarifs-body";
import { TARIFS_META } from "@/lib/content/tarifs";

export const metadata: Metadata = {
  title: TARIFS_META.title,
  description: TARIFS_META.description,
  openGraph: {
    title: TARIFS_META.title,
    description: TARIFS_META.description,
  },
  twitter: {
    title: TARIFS_META.title,
    description: TARIFS_META.description,
  },
};

export default function TarifsPage() {
  return <TarifsBody />;
}
