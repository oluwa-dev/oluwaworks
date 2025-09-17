/** @format */
import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LayoutContextProvider } from "@/context/layoutcontext";
import NextAuthProvider from "@/ui/custom/NextAuthProvider";
import { Toaster } from "@/ui/toaster";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


 const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });


export const metadata: Metadata = {
  title: "BuildWithAyo — Full-stack & No-code",
  description:
    "I build fast, beautiful sites and apps: no-code, low-code, or custom — whatever ships results fastest.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <LayoutContextProvider>
      <NextAuthProvider>
        <html lang="en" className="bg-brand-black text-white">
          <body
            className={` ${geistMono.variable} ${manrope.variable} antialiased min-h-dvh flex flex-col`}
          >
            <main className="flex-1">{children}</main>
            <Toaster />
          </body>
        </html>
      </NextAuthProvider>
    </LayoutContextProvider>
  );
}
