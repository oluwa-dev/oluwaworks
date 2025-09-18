/** @format */

import AboutClient from "@/modules/about";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "About Ayo — Full-stack developer in Nigeria",
  description:
    "I help teams ship faster. Background in SEO and web development since 2019.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Ayo — Full-stack developer in Nigeria",
    description:
      "I help teams ship faster. Background in SEO and web development since 2019.",
    url: "https://buildwithayo.com/about",
    siteName: "BuildwithAyo",
    images: [{ url: "/og/about.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function AboutPage({
}) {
  return (
   <AboutClient />
  );
}

