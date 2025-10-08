/** @format */
/**
 * Fun Hero Pack
 * - Variant "grid": Glowing blueprint grid + floating badges + magnetic CTA
 * - Variant "terminal": Typewriter terminal intro + command chips
 *
 * Usage:
 * <HeroFun variant="grid" />
 * or
 * <HeroFun variant="terminal" />
 *
 */
"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import ShowcasePanel  from "./showpanel";


export default function HeroFun({ variant = "grid" as "grid" | "terminal" }) {
 
  return <HeroGrid />;
}


function HeroGrid() {
  const btnRef = useRef<HTMLDivElement>(null);

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = btnRef.current;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    target.style.setProperty("--tx", `${x * 0.06}px`);
    target.style.setProperty("--ty", `${y * 0.06}px`);
  };
  const onMouseLeave = () => {
    const target = btnRef.current;
    if (!target) return;
    target.style.setProperty("--tx", `0px`);
    target.style.setProperty("--ty", `0px`);
  };

  const float = {
    animate: {
      y: [0, -8, 0],
      transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <section
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative isolate overflow-hidden bg-[#0B0F14] text-white"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(60%_60%_at_50%_10%,rgba(96,165,250,0.25),transparent_60%)]" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20 [background-size:32px_32px] [background-image:linear-gradient(to_right,rgba(96,165,250,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(96,165,250,0.15)_1px,transparent_1px)]"
      />

      <div className="mx-auto max-w-7xl px-6 py-16 md:py-36">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-blue-200">
              <span className="h-2 w-2 rounded-full bg-green-400" /> Available
              for projects
            </div>

            <h1 className="mt-6 text-5xl font-semibold leading-tight font-heading tracking-tight md:text-6xl">
              I build <span className="text-blue-400">websites</span>,
              <br />
              <span className="text-blue-300 ">that grow</span> revenue.
            </h1>
            <p className="mt-4 max-w-xl text-[14px] text-slate-300">
               I design and ship marketing-driven sites that load fast, rank higher, and turn visitors into customers. From quick no-code launches to custom apps, I pair CRO, SEO, and analytics with clean engineering.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div
                ref={btnRef}
                style={{ transform: "translate(var(--tx,0px), var(--ty,0px))" }}
                className="will-change-transform"
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl bg-main-blue px-5 py-3 font-medium text-white shadow-[0_0_0_0_rgba(0,0,0,0.0)] transition hover:bg-brand-blue-deep focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                >
                  Start a project
                  <svg
                    className="h-4 w-4 transition group-hover:translate-x-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" />
                  </svg>
                </Link>
              </div>

              <Link
                href="#work"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white/90 hover:border-blue-400/40 hover:text-white transition"
              >
                See my work
              </Link>
            </div>

            {/* <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 opacity-80">
              {["Acme Co.", "Globex", "Umbrella", "Soylent", "Initech"].map(
                (name) => (
                  <span key={name} className="text-sm text-slate-400">
                    {name}
                  </span>
                )
              )}
            </div> */}
          </div>

          <div className="relative isolate overflow-x-hidden bg-[#0B0F14] text-white">
            <ShowcasePanel />
          </div>
        </div>
      </div>
    </section>
  );
}



