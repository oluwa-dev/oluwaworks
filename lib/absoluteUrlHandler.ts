import { headers } from "next/headers";

 


export async function absoluteUrl(path: string) {
  const h = await headers();
  const host = h?.get("host")!;
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}${path}`;
}