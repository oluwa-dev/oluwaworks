/** @format */

import { prisma } from "@/lib/prisma";
import ProjectListClient from "@/modules/work";
import { Metadata } from "next";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Work & case studies — BuildwithAyo",
  description:
    "Selected projects across no-code, low-code, and custom builds. Results that load fast and convert.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work & case studies — BuildwithAyo",
    description:
      "Selected projects across no-code, low-code, and custom builds. Results that load fast and convert.",
    url: "https://buildwithayo.com/work",
    siteName: "BuildwithAyo",
    images: [{ url: "/og/about.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default async function WorkPage({
  searchParams,
}: {
  searchParams?: { tag?: string; q?: string };
}) {
  const tag = searchParams?.tag?.trim();
  const q = searchParams?.q?.trim();

  const where: any = {};
  if (tag) where.tags = { has: tag };
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { blurb: { contains: q, mode: "insensitive" } },
    ];
  }

  const limit = 10;

  const items = await prisma.project.findMany({
    where,
    orderBy: { id: "desc" },
    take: limit,
    select: {
      id: true,
      title: true,
      blurb: true,
      imageUrl: true,
      href: true,
      featured: true,
      tags: true,
      createdAt: true,
    },
  });

  const nextCursor =
    items.length === limit ? String(items[items.length - 1].id) : null;

  return (
    <section id="work" className="bg-brand-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <header className="mb-5 flex items-end justify-between gap-6">
          <div>
            <h2 className="mb-2 text-3xl font-semibold md:text-4xl">
              My works
            </h2>
            <p className="mt-2 max-w-prose text-[14px] text-slate-300">
              A mix of no-code, low-code, and custom builds — always
              conversion-first.
            </p>
          </div>
        </header>

        <ProjectListClient
          initial={{ items, nextCursor }}
          knownTags={["wordpress", "custom", "shopify", "react", "nextjs" ]}
        />
      </div>
    </section>
  );
}
