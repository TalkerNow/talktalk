import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { twitterSiteFromEnv } from "@/lib/seo/twitter";
import { LocaleProvider } from "@/components/i18n/locale-context";
import { CookieBanner } from "@/components/consent/cookie-banner";
import { GoogleAnalytics } from "@/components/consent/google-analytics";
import { TalkerShell } from "@/components/talker/shell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const title = "Talker — Le chatbot IA qui vend à votre place";
const description =
  "Les IA aspirent le trafic de votre site. Talker le récupère. Un chatbot IA qui connaît votre métier, capte le numéro ou l'email de vos prospects, et s'installe en 10 minutes, sans code.";

const twitterSite = twitterSiteFromEnv();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
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
  openGraph: {
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    site: twitterSite,
    title,
    description,
    // images omitted on purpose: Next copies opengraph-image into twitter:image.
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <LocaleProvider>
          <TalkerShell>{children}</TalkerShell>
          <CookieBanner />
          <GoogleAnalytics />
        </LocaleProvider>
      </body>
    </html>
  );
}
