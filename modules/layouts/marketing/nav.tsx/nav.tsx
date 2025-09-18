/** @format */

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

import logo from "../../../../public/logo.svg"
import { log } from "console";
type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Works", href: "/work" },
  { label: "About", href: "/about" },
];

export default function Navbar({ brand = "BuildwithAyo" }: { brand?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const {data: session} =  useSession()


 useEffect(() => {
   document.body.style.overflow = open ? "hidden" : "";
   return () => {
     document.body.style.overflow = "";
   };
 }, [open]);

 useEffect(() => {
   const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
   if (open) window.addEventListener("keydown", onKey);
   return () => window.removeEventListener("keydown", onKey);
 }, [open]);


const items = session
  ? [...NAV, { href: "/dashboard", label: "Dashboard" }]
  : NAV;





  return (
    <header className="sticky top-0 z-50 bg-off-black border-b border-b-white/10 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-white"
          aria-label={brand}
        >
          <Image src={logo} className="" width={50} height={50} alt={brand} />
          {/* {brand} */}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {items.map((item) => {
            
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

       
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition  ${
                  active
                    ? "text-brand-blue-light"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="rounded-lg bg-main-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-blue-deep"
          >
            Contact
          </Link>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:text-white md:hidden focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-panel"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            {open ? (
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </svg>
        </button>
      </div>
      {/* ===== Mobile Off-Canvas (slides from right) ===== */}
      <div className="md:hidden">
     
        <button
          aria-hidden={!open}
          onClick={() => setOpen(false)}
          className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300
      ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
        />

        {/* panel (note: only one translate class at a time) */}
        <aside
          id="mobile-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`fixed right-0 top-0 bg-off-black z-[60] h-[100dvh] w-[100%] max-w-sm border-l border-white/10
                bg-brand-black/95 transition-transform duration-300 ease-out
                ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex h-14 items-center justify-between border-b border-white/10 px-6">
            <span className="text-sm text-slate-300">Menu</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="rounded-lg p-2 text-slate-200 hover:bg-white/5"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav className="px-4 py-4 space-y-1">
            {NAV.map((item, i) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block transform rounded-lg px-3 py-3 text-sm transition-all duration-300
              ${open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}
              ${
                active
                  ? "bg-white/10 text-brand-blue-light"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
                  style={{ transitionDelay: open ? `${i * 45}ms` : "0ms" }}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={`mt-3 block transform rounded-lg bg-main-blue px-3 py-3 text-center text-sm font-medium text-white
          transition-all duration-300 hover:bg-brand-blue-deep
          ${open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`}
              style={{ transitionDelay: open ? `${NAV.length * 45}ms` : "0ms" }}
            >
              Contact
            </Link>
          </nav>

        </aside>
      </div>
    </header>
  );
}
