/** @format */
"use client";

import { Skeleton } from "@/ui/custom/loader";
import Link from "next/link";
import { useEffect, useState } from "react";
import CardSkeleton from "./skeletoncard";

export type Project = {
  id: number | string;
  title: string;
  blurb: string;
  imageUrl?: string | null;
  href?: string | null;
  featured: boolean;
  tags: string[];
};



export default function FeaturedWork({ maxShown = 2 }: { maxShown?: 2 | 3 }) {
  const [items, setItems] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/projects?featured=true&limit=${maxShown}`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const projects: Project[] = Array.isArray(json?.data) ? json.data : [];
        if (!cancelled) {
          if (projects.length) {
            setItems(projects.slice(0, maxShown));
          } 
        }
      } catch (e) {
        console.error("Featured fetch failed:", e);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [maxShown]);

  const skeletonCount = maxShown; // 2 or 3

  return (
    <section
      id="work"
      className="bg-brand-black text-white"
      aria-busy={isLoading}
    >
      <div className="mx-auto max-w-7xl px-6 py-7 md:py-14">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row md:items-center">
          <div>
            <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
              Recent Work
            </h2>
            <p className="mt-2 max-w-prose text-slate-300">
              A mix of no-code, low-code, and custom builds — always
              conversion-first.
            </p>
          </div>
          <Link
            href="/work"
            className="mb-3 rounded-xl border border-white/10 bg-main-blue px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-brand-blue-deep hover:text-white"
          >
            View all work
          </Link>
        </div>

        {isLoading ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <CardSkeleton
                key={i}
                className={
                  i === 0 && maxShown >= 2 ? "sm:col-span-2 lg:col-span-2" : ""
                }
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, i) => (
              <FeaturedCard
                key={p.id}
                p={p}
                className={
                  i === 0 && maxShown >= 2 ? "sm:col-span-2 lg:col-span-2" : ""
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}



function FeaturedCard({
  p,
  className = "",
}: {
  p: Project;
  className?: string;
}) {
  return (
    <Link
      href={p.href || "#"}
      className={
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-0 transition hover:border-brand-blue/40 hover:shadow-[0_0_60px_rgba(96,165,250,0.25)] " +
        className
      }
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {p.imageUrl ? (
          <img
            src={p.imageUrl}
            alt={p.title}
            className="h-full w-full object-cover opacity-50 transition duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="grid h-full place-items-center text-sm text-slate-300">
            No image yet
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <h3 className="text-xl font-semibold text-white md:text-3xl">
            {p.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-200">{p.blurb}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.tags?.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] capitalize text-blue-100/90"
              >
                {t}
              </span>
            ))}
          </div>

          <span className="mt-4 inline-flex items-center gap-1 text-sm text-white">
            See live
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" />
            </svg>
          </span>
        </div>

        <div className="pointer-events-none absolute -bottom-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full border-[18px] border-brand-blue opacity-40 blur-[70px]" />
      </div>
    </Link>
  );
}
