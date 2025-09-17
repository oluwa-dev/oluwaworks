/** @format */
import { absoluteUrl } from "@/lib/absoluteUrlHandler";
import ProjectsTable from "@/modules/admin/projects/projecttable";
import { Suspense } from "react";



async function getProjects(params: {
  featured?: string;
  tags?: string;
  search?: string;
  cursor?: string;
}) {
  const qs = new URLSearchParams({
    ...(params.featured ? { featured: params.featured } : {}),
    ...(params.tags ? { tags: params.tags } : {}),
    ...(params.search ? { search: params.search } : {}),
    ...(params.cursor ? { cursor: params.cursor } : {}),
    limit: "30",
  });
  const res = await fetch( await absoluteUrl(`/api/projects?${qs}`), {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load projects");
  return res.json();
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: any;
  }) {
  
  
  const params = await searchParams
  const data = await getProjects({
    featured: params?.featured,
    tags: params?.tags,
    search: params?.q,
  });
  // console.log(data, "server comp");
  

  const tags = ["custom", "shopify", "nocode", "wordpress"];

  return (
    <section className="mx-auto max-w-7xl px-4 py-5 text-white">
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl">Projects</h1>
          <p className="mt-1 text-slate-300">Manage projects</p>
        </div>
      </header>

      <Suspense>
        <ProjectsTable initial={data} knownTags={tags} />
      </Suspense>
    </section>
  );
}
