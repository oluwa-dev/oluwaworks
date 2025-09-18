/** @format */
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Manrope,
  Plus_Jakarta_Sans,
  Space_Grotesk,
  Outfit,
} from "next/font/google";
import "./globals.css";
import { LayoutContextProvider } from "@/context/layoutcontext";
import NextAuthProvider from "@/ui/custom/NextAuthProvider";
import { Toaster } from "@/ui/toaster";
import {
  OrganizationJsonLd,
  PersonJsonLd,
  WebSiteSearchJsonLd,
} from "@/modules/seojsonld";

const outfit = Outfit({
  variable: "--font-outfit",

  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata = {
  metadataBase: new URL("https://buildwithayo.com"),
  title: { default: "BuildwithAyo", template: "%s — BuildwithAyo" },
  description:
    "I build fast, beautiful web apps and websites. No-code, low-code, or custom — focused on speed, conversion, and SEO.",
  openGraph: { type: "website", siteName: "BuildwithAyo" },
  twitter: { card: "summary_large_image", creator: "@_Ayodev01" },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    // apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <LayoutContextProvider>
      <NextAuthProvider>
        <html lang="en" className="bg-brand-black text-white">
          <head>
            <OrganizationJsonLd />
            <WebSiteSearchJsonLd />
            <PersonJsonLd />
          </head>
          <body
            className={` ${outfit.variable} ${manrope.variable} antialiased min-h-dvh flex flex-col`}
          >
            <main className="flex-1">{children}</main>
            <Toaster />
          </body>
        </html>
      </NextAuthProvider>
    </LayoutContextProvider>
  );
}
