/** @format */
"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/ui/input";

type Item = {
  id: number;
  email: string;
  name?: string | null;
  company?: string | null;
  message: string;
  status: "NEW" | "REPLIED" | "ARCHIVED";
  createdAt: string;
  readAt?: string | null;
};

export default function ContactsTable({
  initial,
}: {
  initial: { items: Item[]; nextCursor?: string | null };
}) {
  const [items, setItems] = React.useState<Item[]>(initial.items);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const sp = useSearchParams();

  const q = sp.get("q") ?? "";
  const status = (sp.get("status") as Item["status"]) || "NEW";

  async function refresh() {
    setLoading(true);
    const qs = new URLSearchParams({ limit: "30", status, query: q });
    const res = await fetch(`/api/admin/submissions?${qs}`, {
      cache: "no-store",
    });
    const data = await res.json();
    setItems(data.items);
    setLoading(false);
  }

  async function act(
    id: number,
    patch: Partial<Pick<Item, "status" | "readAt">> & { read?: boolean }
  ) {
    const optimistic = items.map((it) =>
      it.id === id
        ? {
            ...it,
            ...(patch.status ? { status: patch.status as Item["status"] } : {}),
            ...(typeof patch.read === "boolean"
              ? { readAt: patch.read ? new Date().toISOString() : null }
              : {}),
          }
        : it
    );
    setItems(optimistic);
    await fetch(`/api/admin/submissions/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(patch),
    });
  }

  async function remove(id: number) {
    const prev = items;
    setItems((l) => l.filter((i) => i.id !== id));
    const res = await fetch(`/api/admin/submissions/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) setItems(prev);
  }

  function setQuery(next: string) {
    const url = new URL(window.location.href);
    if (next) url.searchParams.set("q", next);
    else url.searchParams.delete("q");
    window.history.replaceState({}, "", url.toString());
    refresh();
  }
    
  function setStatus(next: Item["status"] | "all") {
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("status");
    else url.searchParams.set("status", next);
    window.history.replaceState({}, "", url.toString());
    refresh();
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {(["NEW", "REPLIED", "ARCHIVED", "all"] as const).map((s) => {
            const active = (s === "all" && !status) || s === status;
            return (
              <button
                key={s}
                onClick={() => setStatus(s as any)}
                className={`rounded-full border px-3 py-1 text-xs capitalize transition ${
                  active
                    ? "border-brand-blue/50 bg-brand-blue/15 text-brand-blue-light"
                    : "border-white/10 bg-white/5 text-blue-100/80 hover:border-brand-blue/40"
                }`}
              >
                {s.toString().toLowerCase()}
              </button>
            );
          })}
        </div>

        <Input
          defaultValue={q}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, company, message…"
          className="h-10 w-full max-w-md rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-blue-100/60 focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
        />
      </div>

      <div className="mt-4 divide-y divide-white/10">
        {items.length === 0 && (
          <div className="grid h-32 place-items-center text-sm text-slate-300">
            {loading ? "Loading…" : "No submissions"}
          </div>
        )}
        {items.map((s) => (
          <article
            key={s.id}
            className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white/90">
                  {s.name || "—"}
                </span>
                <span className="text-xs text-blue-100/80">·</span>
                <span className="text-xs text-blue-100/80">{s.email}</span>
                {s.company && (
                  <span className="text-xs text-blue-100/80">
                    · {s.company}
                  </span>
                )}
                
              </div>
              <p className="mt-1 line-clamp-3 max-w-3xl text-sm text-slate-300">
                {s.message}
              </p>
             
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={() => act(s.id, { read: !!!s.readAt })}
                className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-blue-100/85 hover:border-brand-blue/40"
                title={s.readAt ? "Mark unread" : "Mark read"}
              >
                {s.readAt ? "Unread" : "Read"}
              </button>
              {s.status !== "REPLIED" && (
                <button
                  onClick={() => act(s.id, { status: "REPLIED" })}
                  className="rounded-lg bg-brand-blue px-2 py-1 text-xs text-white bg-brand-blue-deep hover:bg-brand-blue-light"
                  title="Mark replied"
                >
                  Replied
                </button>
              )}
              {s.status !== "ARCHIVED" ? (
                <button
                  onClick={() => act(s.id, { status: "ARCHIVED" })}
                  className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-blue-100/85 hover:border-brand-blue/40"
                  title="Archive"
                >
                  Archive
                </button>
              ) : (
                <button
                  onClick={() => remove(s.id)}
                  className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-2 py-1 text-xs text-rose-200 hover:border-rose-400/50"
                  title="Delete"
                >
                  Delete
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
