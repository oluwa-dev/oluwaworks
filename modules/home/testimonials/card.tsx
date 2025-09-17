/** @format */

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  avatar?: string;
  businessName?: string;
};

export default function TestimonialCard({ t }: { t: Testimonial }) {
  const subtitle = [t.role, t.businessName].filter(Boolean).join(" • ");

  return (
    <figure className="min-w-[320px] max-w-sm shrink-0 rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
      <blockquote className="text-slate-200">"{t.quote}"</blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        {t.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={t.avatar}
            alt=""
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <div className="h-9 w-9 rounded-full bg-blue-500/30" />
        )}
        <div>
          <div className="text-sm font-medium text-white">{t.name}</div>
          {subtitle && <div className="text-xs text-slate-400">{subtitle}</div>}
        </div>
      </figcaption>
    </figure>
  );
}