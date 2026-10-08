import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { CasClientAgenceBody } from "@/components/pages/cas-client-agence-body";
import { isGateEnabled } from "@/lib/gate/config";

export const metadata: Metadata = {
  title: "Modèle — cas client agence",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CasClientAgencePage() {
  await connection();
  if (!isGateEnabled()) {
    notFound();
  }

  return <CasClientAgenceBody />;
}
