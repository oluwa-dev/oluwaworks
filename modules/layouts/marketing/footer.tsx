/** @format */

"use client";

import React from "react";
import Link from "next/link";

export default function Footer({ brandWord = "" }: { brandWord?: string }) {
  const year = new Date().getFullYear();

  const links: { label: string; href: string }[] = [
    { label: "Work", href: "/work" },
    { label: "Leave a Feedback", href: "/submit-feedback" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative bg-brand-black text-white">
      <div className="mx-auto max-w-7xl px-6 pt-16">
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-slate-300 hover:text-white transition"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 text-center">
          <a
            href="dev@buildwithayo.com"
            className="inline-block text-sm text-slate-300 hover:text-white transition-colors"
          >
            Contact: dev@buildwithayo.com{" "}
          </a>
        </div>

        <div className="mt-4 border-t border-white/10 py-6 text-center text-xs text-slate-400">
          © {year} Ayokunumi Toluwani. All rights reserved.
        </div>
      </div>

      {brandWord && (
        <div
          className="relative -mt-3 h-32 sm:h-40 md:h-60 w-full overflow-hidden"
          aria-hidden="true"
        >
          <div className="pointer-events-none absolute left-1/2 top-3/4 -translate-x-1/2 -translate-y-1/2 text-center leading-none opacity-20">
            <div className="text-[16vw] sm:text-[12vw] md:text-[14vw] lg:text-[240px] font-extrabold bg-gradient-to-b from-gray-600 to-gray-500/20 bg-clip-text text-transparent select-none whitespace-nowrap">
              {brandWord}
            </div>
            <div className="absolute inset-0 text-[16vw] sm:text-[14vw] md:text-[14vw] lg:text-[240px] font-extrabold text-transparent bg-gray-600/30 bg-clip-text mix-blend-darken select-none whitespace-nowrap">
              {brandWord}
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3">
            <div className="h-32 w-32 sm:h-40 sm:w-40 md:h-56 md:w-56 rounded-full border-[12px] sm:border-[16px] md:border-[20px] border-brand-blue-deep blur-[40px] sm:blur-[60px] md:blur-[80px]" />
          </div>
        </div>
      )}
    </footer>
  );
}
