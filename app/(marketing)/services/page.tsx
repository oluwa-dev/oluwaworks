/** @format */

import CTA from "@/ui/custom/cta";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — Web development, Shopify, WordPress, SEO, Next.js, React",
  description:
    "From no-code/low-code builds to custom Next.js apps, Shopify stores, and technical SEO",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Web development, Shopify, WordPress, SEO, React",
    description:
      "From no-code/low-code builds to custom Next.js apps, Shopify stores, and technical SEO",
    url: "https://buildwithayo.com/services",
    siteName: "BuildwithAyo",
    images: [{ url: "/og/about.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function ServicesPage() {
  const nav = [
    { id: "fullstack", label: "Full-stack (Next.js/Node)" },
    { id: "shopify", label: "Shopify eCommerce" },
    { id: "shopify-custom", label: "Shopify Custom (API/Liquid)" },
    { id: "wordpress", label: "WordPress Sites" },
    { id: "wp-custom", label: "Custom WP + PHP (Sage)" },
    { id: "seo", label: "SEO & Performance" },
    { id: "ai", label: "AI & Automations" },
  ];

  return (
    <section className=" text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-blue-200">
            Services tailored to outcomes
          </span>
          <h1 className="mt-8 text-4xl font-semibold tracking-tight md:text-5xl">
            Build fast. Rank higher. Sell more.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[14px] text-slate-300">
            From <strong>full-stack apps</strong> (Next.js, React, Express,
            Node, databases, AI) to <strong>Shopify</strong> and{" "}
            <strong>WordPress</strong> sites including SEO that actually moves
            the needle.
          </p>

          <nav
            aria-label="Services"
            className="my-6 -mx-6 overflow-x-auto px-6 sm:overflow-visible"
          >
            <ul className="flex  items-center justify-center gap-2 flex-wrap md:gap-3">
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="inline-flex whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-blue-100/90 hover:border-brand-blue/40"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <ServiceCard
            id="fullstack"
            title="Custom Full-stack Development"
            points={[
              "Modern web apps with clean APIs (REST/GraphQL/tRPC).",
              "Postgres/MySQL/Mongo with migrations & backups.",
              "Auth, RBAC, file uploads, payments (Stripe/Paystack/etc).",
              "DX focused: tests, CI/CD, observability.",
            ]}
            badges={[
              "nextjs",
              "react",
              "node",
              "express",
              "postgres",
              "prisma",
            ]}
            cta={{ label: "See custom work", href: "/work?tag=custom" }}
          />

          <ServiceCard
            id="wordpress"
            title="WordPress Websites"
            points={[
              "Brand-tight CMS with custom post types/fields.",
              "Editor experience that’s actually simple.",
              "Speed, security hardening, backups, and staging.",
              "Migrations without SEO loss.",
            ]}
            badges={["wordpress", "acf", "cms", "security"]}
            cta={{ label: "See WP work", href: "/work?tag=wordpress" }}
          />

          <ServiceCard
            id="wp-custom"
            title="Custom WordPress Dev + PHP"
            points={[
              "Custom theme or Sage/Trellis/Bedrock or other modern starter stacks.",
              "Reusable components & plugin development.",
              "REST APIs, SSO, and 3rd-party integrations.",
              "Unit tests & CI for mission-critical sites.",
            ]}
            badges={["php", "sage", "rest api", "composer"]}
            cta={{ label: "Talk custom WP", href: "/contact" }}
          />

          <ServiceCard
            id="seo"
            title="SEO & Performance"
            eyebrow="Technical SEO · Content SEO · CWV"
            points={[
              "Technical SEO audit: crawlability, metadata, sitemaps.",
              "Core Web Vitals: LCP/CLS/INP improvements.",
              "Schema (JSON-LD) for rich results.",
              "Editorial playbook: briefs, internal links, topical clusters.",
            ]}
            badges={["seo", "performance", "lighthouse", "schema"]}
            cta={{ label: "Request an SEO audit", href: "/contact" }}
          />

          <ServiceCard
            id="ai"
            title="AI & Automations"
            eyebrow="AI assistants · Zapier/Make · Data pipelines"
            points={[
              "AI features inside your app (chat, search, summarize).",
              "Ops automations with Zapier/Make + webhooks.",
              "ETL/data syncs between CRM, CMS, warehouse.",
              "Safeguards: rate limits, logging, PII controls.",
            ]}
            badges={["ai", "zapier", "make", "webhooks"]}
            cta={{ label: "Plan an automation", href: "/contact" }}
          />
          <ServiceCard
            id="shopify"
            title="Shopify eCommerce"
            points={[
              "Theme setup or refactor for speed and UX.",
              "Conversion-first PDP/PLP, search & merchandising.",
              "App integrations, reviews, analytics, subscriptions.",
              "Checkout/flows with best-practice tracking.",
            ]}
            badges={["shopify", "theme", "apps", "analytics", "cRO"]}
            cta={{ label: "See Shopify work", href: "/work?tag=shopify" }}
          />

          <ServiceCard
            id="shopify-custom"
            title="Shopify Custom (Storefront API & Liquid)"
            points={[
              "Headless storefronts (Next.js) consuming Storefront API.",
              "Custom sections/blocks in Liquid for flexible content.",
              "Webhook-based ops & custom middleware.",
              "Performance budgets and Core Web Vitals on storefront.",
            ]}
            badges={["storefront api", "liquid", "headless", "nextjs"]}
            cta={{ label: "Talk custom Shopify", href: "/contact" }}
          />
        </div>
      </div>
      <CTA />
    </section>
  );
}


function ServiceCard({
  id,
  title,
  eyebrow,
  points,
  badges,
  cta,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  points: string[];
  badges?: string[];
  cta?: { label: string; href: string };
}) {
  return (
    <section
      id={id}
      className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6"
    >
      <div className="text-xs uppercase tracking-wide text-blue-200/80">
        {eyebrow}
      </div>
      <h3 className="mt-1 text-xl font-semibold md:text-2xl">{title}</h3>

      <ul className="mt-3 space-y-2 text-slate-300">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              aria-hidden
              className="mt-1 block h-1.5 w-1.5 rounded-full bg-brand-blue"
            />
            <span className="text-sm">{p}</span>
          </li>
        ))}
      </ul>

      {badges && badges.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {badges.map((b) => (
            <span
              key={b}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-blue-100/90"
            >
              {b}
            </span>
          ))}
        </div>
      )}

      {cta && (
        <div className="mt-5">
          <Link
            href={cta.href}
            className="inline-flex items-center gap-2 rounded-lg bg-main-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-blue-deep"
          >
            {cta.label}
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}
