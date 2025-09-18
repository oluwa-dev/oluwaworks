/** @format */

import { Suspense } from "react";
import ContactsTable from "@/modules/admin/submissions/table";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authHandler } from "@/lib/auth/authhandler";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Contacts — Dashboard",
};

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

async function getSubmissions(searchParams: {
  status?: string;
  q?: string;
  cursor?: string;
}): Promise<{ items: Item[]; nextCursor?: string | null }> {
  const session = await getServerSession(authHandler);
  if (!session) {
    redirect("/login"); 
  }

  try {
    const query = searchParams.q || "";
    const status = searchParams.status;
    const limit = 30;
    const cursor = searchParams.cursor;

    const where: any = {};
    const conditions: any[] = [];

    if (status) {
      conditions.push({ status });
    }

    if (query) {
      conditions.push({
        OR: [
          { email: { contains: query, mode: "insensitive" } },
          { name: { contains: query, mode: "insensitive" } },
          { company: { contains: query, mode: "insensitive" } },
          { message: { contains: query, mode: "insensitive" } },
        ],
      });
    }

    if (conditions.length > 0) {
      where.AND = conditions;
    }

    const rawItems = await prisma.submission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      ...(cursor ? { skip: 1, cursor: { id: Number(cursor) } } : {}),
      select: {
        id: true,
        email: true,
        name: true,
        company: true,
        message: true,
        status: true,
        createdAt: true,
        readAt: true,
      },
    });

    const items: Item[] = rawItems.map((item) => ({
      id: item.id,
      email: item.email,
      name: item.name,
      company: item.company,
      message: item.message,
      status: item.status as "NEW" | "REPLIED" | "ARCHIVED", // Convert enum to exact union type
      createdAt: item.createdAt.toISOString(), // Convert Date to ISO string
      readAt: item.readAt ? item.readAt.toISOString() : null, // Convert Date to ISO string
    }));

    const nextCursor =
      items.length === limit ? String(items[items.length - 1].id) : null;

    return { items, nextCursor };
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return { items: [], nextCursor: null };
  }
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
