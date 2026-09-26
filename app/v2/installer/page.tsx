import type { Metadata } from "next";
import { InstallerPanel } from "@/components/landing/installer-panel";
import { V2Frame } from "../v2-frame";

export const metadata: Metadata = {
  title: "Télécharger Talker — talker.now",
  description:
    "Zip WordPress Talker, sans carte bancaire. Téléversez-le dans WP-Admin.",
};

export default function InstallerV2Page() {
  return (
    <V2Frame>
      <section className="relative overflow-visible pb-16 pt-32 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <InstallerPanel />
        </div>
      </section>
    </V2Frame>
  );
}
