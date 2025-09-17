import { Skeleton } from "@/ui/custom/loader";

export default function CardSkeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={
        "overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-0 " +
        "hover:border-brand-blue/40 " +
        className
      }
    >
      {/* image area */}
      <Skeleton className="block h-48 w-full sm:h-56 lg:h-64" />
      <div className="p-5 md:p-6">
        {/* title line */}
        <Skeleton className="mb-2 h-5 w-2/3 rounded-md" />
        {/* blurb lines */}
        <Skeleton className="mb-2 h-4 w-full rounded-md" />
        <Skeleton className="mb-4 h-4 w-5/6 rounded-md" />
        {/* tags */}
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}