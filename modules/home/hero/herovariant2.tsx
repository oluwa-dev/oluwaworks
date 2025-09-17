import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Chip from "./chip";

export default function HeroTerminal() {
  const phrases = useMemo(
    () => [
      "I craft blazing‑fast Next.js apps",
      "I turn Figma into revenue",
      "I ship DX your team will love",
    ],
    []
  );

  const [i, setI] = useState(0); // phrase index
  const [k, setK] = useState(0); // char count
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[i];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (k < current.length) setK(k + 1);
          else setDeleting(true);
        } else {
          if (k > 0) setK(k - 1);
          else {
            setDeleting(false);
            setI((i + 1) % phrases.length);
          }
        }
      },
      deleting ? 35 : 55
    );
    return () => clearTimeout(timeout);
  }, [k, deleting, i, phrases]);

  return (
    <section className="relative isolate overflow-hidden bg-[#0B0F14] text-white">
      {/* Soft grid + glow */}
      <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(60%_60%_at_50%_0%,rgba(96,165,250,0.22),transparent_60%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-15 [background-size:32px_32px] [background-image:linear-gradient(to_right,rgba(96,165,250,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(96,165,250,0.2)_1px,transparent_1px)]"
      />

      <div className="mx-auto max-w-4xl px-6 py-28 md:py-36">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur">
          <div className="mb-3 flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
          </div>
          <div className="font-mono text-sm">
            <p className="text-slate-300">upwork@portfolio ~ %</p>
            <p className="mt-1 text-blue-300">
              npx create‑impact{" "}
              <span className="text-slate-300">--with-next --perf</span>
            </p>
            <p className="mt-6 text-slate-200">
              <span className="mr-2 text-blue-400">▌</span>
              {phrases[i].slice(0, k)}
              <span className="ml-1 inline-block animate-pulse">_</span>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#work"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
            >
              See my work
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white/90 transition hover:border-blue-400/40 hover:text-white"
            >
              Book a call
            </Link>
          </div>
        </div>

        {/* Command chips */}
        <div className="mt-6 flex flex-wrap gap-3 text-xs text-blue-200/80">
          {["nextjs", "performance", "react", "node", "shopify", "vercel"].map(
            (tag) => (
              <Chip key={tag} label={tag} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
