import type { Metadata } from "next";
import { AlternativeBody } from "@/components/pages/alternative-body";
import { getAlternative } from "@/lib/content/alternatives";

const page = getAlternative("aiengine");

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
  },
  twitter: {
    title: page.metaTitle,
    description: page.metaDescription,
  },
};

export default function AlternativeAiEnginePage() {
  return <AlternativeBody id="aiengine" />;
}
