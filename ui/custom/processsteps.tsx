/** @format */

export function Step({
  n,
  title,
  body,
}: {
  n: number;
  title: string;
  body: string;
}) {
  return (
    <li
      className="rounded-2xl border border-white/10 bg-white/5 p-5"
      aria-label={`Step ${n}: ${title}`}
    >
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-blue-deep/20 text-xl font-semibold text-main-blue">
          {n}
        </span>
        <h3 className="text-base font-semibold text-white">
          {title}
        </h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{body}</p>
    </li>
  );
}

export default function ProcessSteps() {
  return (
    <section aria-labelledby="process" className="text-white">
      <h2 id="process" className="text-2xl font-semibold md:text-3xl">
        How we’ll work together
      </h2>

      <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
        <Step
          n={1}
          title="Hop on a Call"
          body="Quick call to understand your business, then create plan on what we’ll build, price timeline—clear and agreed.."
        />
       
        <Step
          n={2}
          title="Build"
          body="I design and build. You get live previews and give feedback along the way."
        />
        <Step
          n={3}
          title="Launch & Grow"
          body="We launch, set up SEO, and improve over time so you get real results."
        />
      </ol>

      <div className="mt-6">
        <a
          href="/services"
          className="inline-flex items-center gap-2 text-brand-blue-light rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium  transition hover:underline"
        >
          Check my services
          <svg
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" />
          </svg>
        </a>
      </div>
    </section>
  );
}
