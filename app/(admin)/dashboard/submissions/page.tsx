/** @format */

import { Suspense } from "react";
import ContactsTable from "@/modules/admin/submissions/table";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { absoluteUrl } from "@/lib/absoluteUrlHandler";

export const metadata: Metadata = {
  title: "Contacts — Dashboard",
};



async function getSubmissions(searchParams: {
  status?: string;
  q?: string;
  cursor?: string;
}) {
  const qs = new URLSearchParams({
    ...(searchParams.status ? { status: searchParams.status } : {}),
    ...(searchParams.q ? { query: searchParams.q } : {}),
    ...(searchParams.cursor ? { cursor: searchParams.cursor } : {}),
    limit: "30",
  });
  const url = await absoluteUrl(`/api/admin/submissions?${qs.toString()}`);

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Projects API failed:", res.status, text);
    throw new Error("Failed to load projects");
  }  return res.json();
}

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const params = await searchParams;

  const data = await getSubmissions({
    status: params?.status,
    q: params?.q,
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-5 text-white">
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl">Submissions</h1>
          <p className="mt-1 text-slate-300">Leads </p>
        </div>
      </header>

      <Suspense>
        <ContactsTable initial={data} />
      </Suspense>
    </section>
  );
}
