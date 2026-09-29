import type { Metadata } from "next";
import { ContactPanel } from "@/components/landing/contact-panel";
import { V2Frame } from "../v2-frame";

export const metadata: Metadata = {
  title: "Contact — Talker",
  description: "Dites-nous où vous en êtes. On vous répond.",
};

export default function ContactV2Page() {
  return (
    <V2Frame>
      <section className="relative overflow-visible pb-16 pt-32 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <ContactPanel />
        </div>
      </section>
    </V2Frame>
  );
}
