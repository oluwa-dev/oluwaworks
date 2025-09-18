/** @format */
import ProjectsTable from "@/modules/admin/projects/projecttable";
import Link from "next/link";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authHandler } from "@/lib/auth/authhandler";
import { redirect } from "next/navigation";

type Item = {
  id: number;
  title: string;
  blurb: string;
  imageUrl?: string | null;
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

type ApiList = {
  success: boolean;
  data: Item[];
  count: number;
  nextCursor?: string | null;
};

async function getProjects(params: {
  featured?: string;
  tags?: string;
  search?: string;
  cursor?: string;
}): Promise<ApiList> {
  const session = await getServerSession(authHandler);
  if (!session) {
    redirect("/login"); 
  }

  try {
    const { featured, tags, search, cursor } = params;
    const limit = 30;

    const where: any = {};
    const conditions: any[] = [];

    if (featured === "true") {
      conditions.push({ featured: true });
    } else if (featured === "false") {
      conditions.push({ featured: false });
    }

    if (search) {
      conditions.push({
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { blurb: { contains: search, mode: "insensitive" } },
        ],
      });
    }

    // Handle tags filter
    if (tags) {
      const tagArray = tags.split(",").filter(Boolean);
      if (tagArray.length > 0) {
        conditions.push({
          tags: {
            hasSome: tagArray,
          },
        });
      }
    }

    if (conditions.length > 0) {
      where.AND = conditions;
    }

    const rawItems = await prisma.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      ...(cursor ? { skip: 1, cursor: { id: Number(cursor) } } : {}),
      select: {
        id: true,
        title: true,
        blurb: true,
        imageUrl: true,
        tags: true,
        featured: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const items: Item[] = rawItems.map((item) => ({
      id: item.id,
      title: item.title,
      blurb: item.blurb,
      imageUrl: item.imageUrl,
      tags: item.tags,
      featured: item.featured,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    const nextCursor =
      items.length === limit ? String(items[items.length - 1].id) : null;

    return {
      success: true,
      data: items,
      count: items.length,
      nextCursor,
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      success: false,
      data: [],
      count: 0,
      nextCursor: null,
    };
  }
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const params = await searchParams;
  const data = await getProjects({
    featured: params?.featured,
    tags: params?.tags,
    search: params?.q,
  });

  const tags = ["custom", "shopify", "nocode", "wordpress"];

  return (
    <section className="mx-auto max-w-7xl px-4 py-5 text-white">
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl">Projects</h1>
          <p className="mt-1 text-slate-300">Manage projects</p>
        </div>

        <div>
          <Link
            className="text-[14px] bg-main-blue rounded-lg px-2 py-2"
            href="/dashboard/projects/new"
          >
            Add New
          </Link>
        </div>
      </header>

      <Suspense>
        <ProjectsTable initial={data} knownTags={tags} />
      </Suspense>
    </section>
  );
}
