import ContactClient from '@/modules/contact'
import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Start your project",
  description:
    "Tell me about your goals. I’ll recommend the fastest path to launch.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Start your project",
    description:
      "Tell me about your goals. I’ll recommend the fastest path to launch.",
    url: "https://buildwithayo.com/contact",
    siteName: "BuildwithAyo",
    images: [{ url: "/og/about.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function ContactPage() {
  return (
<ContactClient />  )
}
