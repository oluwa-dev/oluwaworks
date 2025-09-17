/** @format */
"use client";

import { Input } from "@/ui/input";
import * as React from "react";

type Item = {
  id: number;
  title: string;
  blurb: string;
  imageUrl?: string | null;
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

type ApiList = {
  success: boolean;
  data: Item[]; 
  count: number;
  nextCursor?: string | null; 
};

export default function ProjectsTable({
  initial,
  knownTags,
}: {
  initial: ApiList;
  knownTags: string[];
}) {
  const [items, setItems] = React.useState<Item[]>(initial?.data ?? []);
  const [q, setQ] = React.useState("");
  const [onlyFeatured, setOnlyFeatured] = React.useState<null | boolean>(null);
  const [tagSet, setTagSet] = React.useState<Set<string>>(new Set());

  async function refresh(cursor?: string) {
    const params = new URLSearchParams({ limit: "10" });
    if (q) params.set("search", q);
    if (onlyFeatured !== null) params.set("featured", String(onlyFeatured));
    if (tagSet.size) params.set("tags", [...tagSet].join(","));
    if (cursor) params.set("cursor", cursor);

    const res = await fetch(`/api/projects?${params}`, {
      cache: "no-store",
    });
    const data: ApiList = await res.json();

    if (cursor) setItems((prev) => [...prev, ...(data.data ?? [])]);
    else setItems(data.data ?? []);
  }

  function toggleTag(t: string) {
    const copy = new Set(tagSet);
    copy.has(t) ? copy.delete(t) : copy.add(t);
    setTagSet(copy);
    clearTimeout((toggleTag as any)._t);
    (toggleTag as any)._t = setTimeout(() => refresh(), 150);
  }

  function setFeaturedFilter(v: null | boolean) {
    setOnlyFeatured(v);
    refresh();
  }

  async function patch(id: number, data: Partial<Item>) {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, ...data } : it))
    );
    const res = await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) await refresh();
  }

  async function remove(id: number) {
    const prev = items;
    setItems((l) => l.filter((i) => i.id !== id));
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) setItems(prev);
  }

  React.useEffect(() => {
    const t = setTimeout(() => refresh(), 250);
    return () => clearTimeout(t);
  }, [q, onlyFeatured, tagSet]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFeaturedFilter(null)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              onlyFeatured === null
                ? "border-brand-blue/50 bg-brand-blue/15 text-brand-blue-light"
                : "border-white/10 bg-white/5 text-blue-100/80 hover:border-brand-blue/40"
            }`}
          >
            all
          </button>
          <button
            onClick={() => setFeaturedFilter(true)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              onlyFeatured === true
                ? "border-brand-blue/50 bg-brand-blue/15 text-brand-blue-light"
                : "border-white/10 bg-white/5 text-blue-100/80 hover:border-brand-blue/40"
            }`}
          >
            featured
          </button>
          <button
            onClick={() => setFeaturedFilter(false)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              onlyFeatured === false
                ? "border-brand-blue/50 bg-brand-blue/15 text-brand-blue-light"
                : "border-white/10 bg-white/5 text-blue-100/80 hover:border-brand-blue/40"
            }`}
          >
            not featured
          </button>

          <div className="ml-2 flex flex-wrap gap-2">
            {knownTags.map((t) => {
              const active = tagSet.has(t);
              return (
                <button
                  key={t}
                  onClick={() => toggleTag(t)}
                  className={`rounded-full border px-3 py-1 text-xs capitalize transition ${
                    active
                      ? "border-brand-blue/50 bg-brand-blue/15 text-brand-blue-light"
                      : "border-white/10 bg-white/5 text-blue-100/80 hover:border-brand-blue/40"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search title or blurb…"
          className="h-10 w-full max-w-md rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-blue-100/60 focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
        />
      </div>

      <div className="mt-4 divide-y divide-white/10">
        {(!items || items.length === 0) && (
          <div className="grid h-32 place-items-center text-sm text-slate-300">
            No projects
          </div>
        )}

        {items?.map((p) => (
          <article
            key={p.id}
            className="grid gap-3 py-4 sm:grid-cols-[128px_1fr_auto] sm:items-start"
          >
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:h-24 sm:w-32">
              <div className="h-full w-full aspect-[16/10]">
                {p.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.imageUrl}
                    alt={`${p.title} cover`}
                    className="h-full w-full object-cover transition will-change-transform hover:scale-[1.02]"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-[11px] text-blue-100/70">
                    No image
                  </div>
                )}
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-base font-semibold text-white/90">
                  {p.title}
                </h3>
                {p.featured && (
                  <span className="rounded-full bg-brand-blue/20 px-2 py-0.5 text-[10px] text-brand-blue-light">
                    featured
                  </span>
                )}
              </div>

              <p className="mt-1 line-clamp-2 max-w-3xl text-sm text-slate-300">
                {p.blurb}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-blue-100/70">
                <span>{new Date(p.createdAt).toLocaleString()}</span>
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-white/5 px-1.5 py-0.5 capitalize"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={() => patch(p.id, { featured: !p.featured })}
                className="rounded-lg border cursor-pointer border-white/10 bg-white/5 px-2 py-1 text-xs text-blue-100/85 hover:border-brand-blue/40"
              >
                {p.featured ? "Unfeature" : "Feature"}
              </button>
              <button
                onClick={() => remove(p.id)}
                className="rounded-lg border cursor-pointer border-rose-400/30 bg-rose-500/10 px-2 py-1 text-xs text-rose-200 hover:border-rose-400/50"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
