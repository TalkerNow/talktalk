import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { LocaleProvider } from "@/components/i18n/locale-context";
import {
  VERCEL_IP_COUNTRY_HEADER,
  localeFromCountry,
} from "@/lib/i18n";
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
    title,
    description,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const country = (await headers()).get(VERCEL_IP_COUNTRY_HEADER);
  const defaultLocale = localeFromCountry(country);

  return (
    <html lang={defaultLocale}>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <LocaleProvider defaultLocale={defaultLocale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
