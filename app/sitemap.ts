/** @format */

import type { MetadataRoute } from "next";

async function getProjectPaths() {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/projects?limit=1000`,
    {
      cache: "no-store",
    }
  );
  const json = await res.json();
  const items = Array.isArray(json?.data) ? json.data : [];
  return items
    .filter((p: any) => p.href) 
    .map((p: any) => ({
        url: p.href,
        imageUrl: p.imageUrl,
        title: p.title,
        blurb: p.blurb,
      lastModified: p.updatedAt || p.createdAt,
    }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://buildwithayo.com";
  const staticPages = ["/", "/work", "/services", "/about", "/contact"].map(
    (p) => ({ url: `${base}${p}` }) 
  );
  const projects = await getProjectPaths();

  return [...staticPages, ...projects];
}
