/** @format */

import Link from "next/link";
import React from "react";

export default function CTA() {
  return (
    <section className="  px-8 sm:px-24">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="text-2xl font-semibold md:text-3xl">
              Ready to build something impressive?
            </h3>
            <p className="mt-2 max-w-prose text-[14px] text-slate-300">
              Tell me your goal—no-code, low-code, or custom—and I’ll propose
              the fastest, cleanest path.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl bg-main-blue px-5 py-3 font-medium text-white transition hover:bg-brand-blue-deep"
            >
              Book a call
            </Link>
            <Link
              href="mailto:dev@builwithayo.com"
              className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white/90 hover:border-brand-blue/40 hover:text-white"
            >
              Email me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
