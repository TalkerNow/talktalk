import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "talker.now — La machine à convertir pour WordPress",
    template: "%s · talker.now",
  },
  description:
    "Talker est un plugin WordPress pour les TPE et PME de 5 à 30 personnes. Il installe, il colle l’adresse du site, et le bot fonctionne. Personne ne tient le chat.",
  applicationName: "Talker",
  keywords: [
    "Talker",
    "WordPress",
    "chatbot",
    "TPE",
    "PME",
    "plugin WordPress",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: "talker.now — La machine à convertir pour WordPress",
    description:
      "Un petit plugin WordPress. Le bot pose les questions et capture le contact. Personne ne tient le chat.",
  },
  twitter: {
    card: "summary_large_image",
    title: "talker.now — La machine à convertir pour WordPress",
    description:
      "Un petit plugin WordPress. Le bot pose les questions et capture le contact.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
