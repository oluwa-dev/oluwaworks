/** @format */

"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

export default function ShowcasePanel() {
  const [mode, setMode] = useState<"nocode" | "lowcode" | "custom">("nocode");

  return (
    <div className="relative w-full max-w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6">
      <div
        className="
          mb-4 flex w-full min-w-0 items-center gap-2 overflow-x-auto
          sm:flex-wrap sm:overflow-visible
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        "
        role="tablist"
        aria-label="Showcase modes"
      >
        <ModePill
          label="No-code"
          active={mode === "nocode"}
          onClick={() => setMode("nocode")}
        />
        {/* <ModePill
          label="Low-code"
          active={mode === "lowcode"}
          onClick={() => setMode("lowcode")}
        /> */}
        <ModePill
          label="Custom dev"
          active={mode === "custom"}
          onClick={() => setMode("custom")}
        />
      </div>

      {/* Panels */}
      {mode === "nocode" && (
        <div>
          <LogoMarquee
            items={[
              "Wordpress",
              "Shopify",
              "Framer",
              "Airtable",
              "Zapier",
              "Webflow",
            ]}
          />

          <div className="mt-5 grid gap-3 sm:gap-4 sm:grid-cols-2">
            <Card title="Landing page (Wordpress)" note="Ship in 7–10 days">
              Reusable CMS collections, SEO-ready, brand-tight.
            </Card>
            <Card title="Storefront (Shopify)" note="From idea → live fast">
              Conversion-first theme, checkout apps, analytics.
            </Card>
          </div>
        </div>
      )}

      {mode === "lowcode" && (
        <div>
          <BeforeAfter />
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-blue-200/90">
            {[
              "forms → Airtable",
              "sales → HubSpot",
              "CMS → Notion",
              "automation → Zapier",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {mode === "custom" && (
        <div>
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
            <StatBadge title="LCP" value="~1.2s" note="Core Web Vitals" />
            <StatBadge title="+38%" value="conversion" note="after redesign" />
          </div>
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-blue-200/90">
            {["React.js", "PHP", "Node.js", "Postgres", "tRPC", "CSS"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                >
                  {t}
                </span>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ModePill({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      role="tab"
      aria-selected={!!active}
      className={
        "whitespace-nowrap rounded-full border px-3 py-1 text-xs transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 " +
        (active
          ? "border-blue-400/50 bg-blue-500/15 text-blue-100"
          : "border-white/10 bg-white/5 text-blue-200/80 hover:border-blue-400/40")
      }
    >
      {label}
    </button>
  );
}

function Card({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-gradient-to-b from-blue-500/10 to-transparent p-4">
      <h4 className="text-base font-semibold text-blue-200">{title}</h4>
      <p className="mt-1 text-sm text-slate-300">{children}</p>
      {note && <div className="mt-3 text-xs text-blue-300">{note}</div>}
    </div>
  );
}

function StatBadge({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="text-slate-300">{title}</div>
      <div className="mt-1 text-xl sm:text-2xl font-semibold text-blue-200">
        {value}
      </div>
      {note && <div className="mt-1 text-xs text-slate-400">{note}</div>}
    </div>
  );
}

function LogoMarquee({ items }: { items: string[] }) {
  return (
    <div
      className="
        relative overflow-hidden rounded-xl border border-white/10 bg-black/30 p-2 sm:p-3
        [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]
      "
    >
      <motion.div
        aria-hidden
        className="inline-flex gap-4 sm:gap-6 whitespace-nowrap will-change-transform"
        animate={{ x: ["0%", "-50%", "0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] sm:text-xs text-blue-100/90"
          >
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function BeforeAfter() {
  const [v, setV] = useState(55);
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10">
      <div className="aspect-[4/3] sm:aspect-[16/10]">
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-slate-800 to-slate-900 text-slate-200">
          <div className="rounded-md bg-black/40 px-2 py-1 text-xs">BEFORE</div>
        </div>
        <div
          className="absolute inset-0 grid place-items-center bg-gradient-to-br from-blue-800 to-blue-600 text-blue-50"
          style={{ clipPath: `inset(0 ${(100 - v).toFixed(2)}% 0 0)` }}
        >
          <div className="rounded-md bg-blue-900/40 px-2 py-1 text-xs">
            AFTER
          </div>
        </div>
      </div>
      <div className="relative p-3 sm:p-4">
        <input
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => setV(Number(e.target.value))}
          className="h-9 w-full bg-transparent accent-blue-400"
          aria-label="Reveal after image"
        />
        <div className="pointer-events-none absolute inset-x-0 -top-5 grid place-items-center text-[11px] sm:text-xs text-slate-300">
          Drag to compare results
        </div>
      </div>
    </div>
  );
}
