/** @format */

"use client";

import React from "react";
import Link from "next/link";

export default function Footer({ brandWord = "" }: { brandWord?: string }) {
  const year = new Date().getFullYear();

  const links: { label: string; href: string }[] = [
    { label: "Work", href: "/work" },
    // { label: "Services", href: "/services" },
    { label: "Leave a Feedback", href: "/submit-feedback" },
    { label: "Blog", href: "/blog" },
    // { label: "Press kit", href: "/press" },
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

        <div className="mt-6 border-t border-white/10 py-6 text-center text-xs text-slate-400">
          © {year} Ayokunumi Toluwani. All rights reserved.
        </div>
      </div>

      {brandWord && (
        <div
          className="relative -mt-10 h-32 sm:h-40 md:h-60 w-full overflow-hidden"
          aria-hidden="true"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center leading-none">
            <div className="text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[340px] font-extrabold bg-gradient-to-b from-gray-200 to-gray-100/30 bg-clip-text text-transparent select-none whitespace-nowrap">
              {brandWord}
            </div>
            <div className="pointer-events-none absolute inset-0 text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[340px] font-extrabold text-transparent bg-gray-300/70 bg-clip-text mix-blend-darken [text-shadow:0_1px_0_#fff] select-none whitespace-nowrap">
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
