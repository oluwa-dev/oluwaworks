/** @format */

"use client";

import Link from "next/link";
import * as React from "react";

type Project = {
  id: number | string;
  title: string;
  blurb: string;
  imageUrl?: string | null;
  href?: string | null;
  featured?: boolean;
  tags: string[];
  createdAt?: string | Date;
};

export default function ProjectListClient({
  initial,
  knownTags,
}: {
  initial: { items: Project[]; nextCursor: string | null };
  knownTags: string[];
}) {
  const [items, setItems] = React.useState<Project[]>(initial.items);
  const [nextCursor, setNextCursor] = React.useState<string | null>(
    initial.nextCursor
  );
  const [loading, setLoading] = React.useState(false);
  const [filter, setFilter] = React.useState<string>("all");

  const filtered = React.useMemo(() => {
    if (filter === "all") return items;
    return items.filter((p) => p.tags?.includes(filter));
  }, [items, filter]);

  async function loadMore() {
    if (!nextCursor || loading) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "10", cursor: nextCursor });
      const res = await fetch(`/api/projects?${params}`, { cache: "no-store" });
      const json = await res.json();
      const newItems: Project[] = json?.data ?? [];
      setItems((prev) => [...prev, ...newItems]);
      setNextCursor(json?.nextCursor ?? null);
    } catch (e) {
      console.error("Load more failed:", e);
    } finally {
      setLoading(false);
    }
  }

  const cats = ["all", ...knownTags];

  return (
    <div className="mt-3">
      <div className="mb-6 flex gap-2 overflow-x-auto md:hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={
              "shrink-0 rounded-full border px-3 py-1 text-xs capitalize transition " +
              (filter === c
                ? "border-brand-blue/50 bg-brand-blue/15 text-brand-blue-light"
                : "border-white/10 bg-white/5 text-blue-100/80 hover:border-brand-blue/40")
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <aside className="md:col-span-3">
          <div className="sticky top-20 hidden md:block">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-400">
                Filter
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {cats.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={
                      "rounded-full border px-3 py-1 text-xs capitalize transition " +
                      (filter === c
                        ? "border-brand-blue/50 bg-brand-blue/15 text-brand-blue-light"
                        : "border-white/10 bg-white/5 text-blue-100/80 hover:border-brand-blue/40")
                    }
                  >
                    {c}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Showing{" "}
                <span className="text-slate-200">{filtered.length}</span>{" "}
                projects
              </p>
            </div>
          </div>
        </aside>

        <div className="space-y-8 md:col-span-9">
          {filtered.map((p, i) => (
            <ProjectRow key={p.id} p={p} flip={i % 2 === 1} />
          ))}

          {nextCursor && (
            <div className="mt-2 flex justify-center">
              <button
                onClick={loadMore}
                disabled={loading}
                className="h-11 cursor-pointer rounded-xl border border-white/10 bg-white/5 px-5 text-sm text-white/90 hover:border-brand-blue/40 disabled:opacity-60"
              >
                {loading ? "Loading…" : "Load more"}
              </button>
            </div>
          )}

          {!nextCursor && items.length > 0 && (
            <div className="mt-2 text-center text-sm text-slate-400">
              You’ve reached the end.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ p, flip = false }: { p: Project; flip?: boolean }) {
  return (
    <Link
      href={p.href || "#"}
      target="_blank"
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-brand-blue/40"
    >
      <div
        className={
          "grid items-stretch gap-0 md:grid-cols-12 " +
          (flip ? "md:[&_.media]:order-2" : "")
        }
      >
        <div className="media md:col-span-5">
          <div className="relative aspect-[16/10] w-full overflow-hidden md:h-full md:aspect-auto">
            {p.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.imageUrl}
                alt={p.title}
                className="h-full w-full object-cover opacity-95 transition duration-300 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="grid h-full place-items-center text-sm text-slate-300">
                No image yet
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="flex h-full flex-col justify-between p-5 md:p-6">
            <div>
              <div className="text-xs uppercase tracking-wide text-blue-200/80">
                {p.tags?.join(" · ")}
              </div>
              <h3 className="mt-2 text-xl font-semibold md:text-2xl">
                {p.title}
              </h3>
              <p className="mt-2 text-slate-300">{p.blurb}</p>
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
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-sm text-blue-200">
View Live                <svg
                  className="h-4 w-4 transition group-hover:translate-x-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
