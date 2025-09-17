/** @format */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <header className="sticky top-0 z-50  bg-off-black backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-white"
          aria-label={brand}
        >
          {/* <span className="rounded-full bg-brand-blue/20 px-2 py-0.5 text-xs text-brand-blue-light">
            v2
          </span> */}
          {brand}
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition ${
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
            className="rounded-xl bg-main-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-blue-deep"
          >
            Contact
          </Link>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:text-white md:hidden focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
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

      {/* Mobile Navigation with Slide Animation */}
      <div
        id="mobile-nav"
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <nav
          className="border-t border-white/10 bg-brand-black/95 backdrop-blur"
          aria-label="Mobile"
        >
          <div className="px-6 py-4 space-y-1">
            {NAV.map((item, index) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    block rounded-lg px-3 py-3 text-sm transition-all duration-200
                    transform ${
                      open
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-0"
                    }
                    ${
                      active
                        ? "bg-white/10 text-brand-blue-light border-l-2 border-brand-blue-light"
                        : "text-slate-300 hover:bg-white/5 hover:text-white hover:translate-x-1"
                    }
                  `}
                  style={{ transitionDelay: open ? `${index * 50}ms` : "0ms" }}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className={`
                mt-4 block rounded-lg bg-main-blue px-3 py-3 text-center text-sm font-medium text-white 
                hover:bg-brand-blue-deep transition-all duration-200
                transform ${
                  open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                }
              `}
              style={{ transitionDelay: open ? `${NAV.length * 50}ms` : "0ms" }}
              onClick={() => setOpen(false)}
            >
            Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
