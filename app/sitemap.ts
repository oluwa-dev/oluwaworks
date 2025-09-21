/** @format */

import type { MetadataRoute } from "next";



export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://buildwithayo.com";
  const staticPages = ["/", "/work", "/services", "/about", "/contact"].map(
    (p) => ({ url: `${base}${p}` }) 
  );

  return staticPages
}
