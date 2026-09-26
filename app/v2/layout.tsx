import type { Metadata } from "next";
import { t1VarStyle } from "@/lib/theme/territoire-1";
import { T1Scope } from "./t1-scope";
import "./t1.css";

export const metadata: Metadata = {
  title: "V2 — charte T1 (brouillon) — Talker",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function V2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: t1VarStyle }} />
      <script
        dangerouslySetInnerHTML={{
          __html: "document.documentElement.classList.add('t1')",
        }}
      />
      <T1Scope />
      {children}
    </>
  );
}
