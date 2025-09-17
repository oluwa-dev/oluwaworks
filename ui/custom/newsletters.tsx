"use client"

import { Input } from "@/ui/input";
import { useState } from "react";

export default function NewsletterCard() {
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [email, setEmail] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "ok" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="bg-brand-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-2xl  font-semibold md:text-3xl">
                Get build‑notes in your inbox
              </h3>
              <p className="mt-2 max-w-prose text-slate-300">
                Behind‑the‑scenes of no‑code, low‑code, and custom projects —
                one short email, sometimes weekly.
              </p>
            </div>
            <form
              onSubmit={submit}
              className="flex flex-col gap-3 md:flex-row md:items-center"
            >
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <Input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
              />
              <button
                disabled={state === "loading"}
                className="h-11 shrink-0 rounded-xl bg-brand-blue px-5 font-medium text-white transition hover:bg-brand-blue-deep disabled:opacity-60"
              >
                {state === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
              {state === "ok" && (
                <div className="text-sm text-emerald-300">
                  Thanks! Check your inbox.
                </div>
              )}
              {state === "error" && (
                <div className="text-sm text-rose-300">
                  Something went wrong. Try again?
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
