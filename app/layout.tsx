import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { LocaleProvider } from "@/components/i18n/locale-context";
import { TalkerProvider } from "@/components/talker/provider";
import { TalkerLauncherBubble } from "@/components/landing/talker-launcher-bubble";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Talker — L'agent qui vend à votre place",
  description:
    "Les IA aspirent le trafic de votre site. Talker le récupère. Un chatbot IA qui connaît votre métier, capte le numéro ou l'email de vos prospects, et s'installe en 10 minutes, sans code.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <LocaleProvider>
          <TalkerProvider>
            {children}
            <TalkerLauncherBubble />
          </TalkerProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
