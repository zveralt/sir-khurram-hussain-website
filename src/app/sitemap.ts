import type { MetadataRoute } from "next";
import { getAllCatalogProducts } from "@/lib/catalog/fixtures";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl.replace(/\/$/, "");
  const products = getAllCatalogProducts();
  const staticPaths = [
    "",
    "/about",
    "/philosophy",
    "/syllabus-map",
    "/faq",
    "/expertise",
    "/resources",
    "/contact",
    "/store",
    "/portal/login",
    "/portal/dashboard",
  ];
  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  for (const p of products) {
    entries.push({
      url: `${base}/store/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }
  return entries;
}
