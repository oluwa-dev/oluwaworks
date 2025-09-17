/** @format */

import React from "react";

export default function Faq() {
  return (
    <section aria-labelledby="faq" className="">
      <h2
        id="faq"
        className="text-2xl text-slate-300 font-semibold md:text-3xl"
      >
        FAQs
      </h2>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
       
        <QandAs q="What happens if I need changes after the project is done?">
          All projects include 2 weeks of free revisions and bug fixes. After
          that, I offer ongoing maintenance packages or hourly support. Minor
          tweaks are usually quick and affordable.
        </QandAs>
        <QandAs q="How do you handle project communication and updates?">
          I provide weekly progress updates with screenshots/demos, maintain a
          shared project board (Trello/Asana), and am available for quick calls
          when needed. You'll always know where your project stands.
        </QandAs>
        <QandAs q="What if my project requirements change during development?">
          Small changes are normal and usually no problem. For major scope
          changes, I'll provide a clear estimate for the additional work and
          timeline impact before proceeding. Transparency is key.
        </QandAs>
        <QandAs q="Do you provide hosting and deployment?">
          Yes! I can deploy to platforms like Vercel, Netlify, AWS, or your
          preferred hosting service. I'll also set up domains, SSL certificates,
          and provide documentation for future deployments.
        </QandAs>
        {/* <QandAs q="What's your payment structure?">
          Typically 50% upfront to start, 50% on completion for smaller
          projects. Larger projects are broken into milestones with payments
          spread throughout. All pricing is discussed and agreed upon before
          work begins.
        </QandAs> */}
      </div>
    </section>
  );
}

function QandAs({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <summary className="cursor-pointer text-sm font-medium text-white marker:hidden [&::-webkit-details-marker]:hidden">
        {q}
      </summary>
      <div className="mt-2 text-sm text-slate-300">{children}</div>
    </details>
  );
}
