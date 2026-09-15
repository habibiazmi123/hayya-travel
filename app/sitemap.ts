import type { MetadataRoute } from "next";
import { articleSlugs, tourSlugs } from "@/lib/content";
import { packageSlugs } from "@/lib/packages";

const BASE_URL = "https://hayyatourtravel.co.id";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/paket", "/wisata", "/berita", "/tentang", "/faq", "/testimoni", "/galeri", "/kontak"];
  return [
    ...staticRoutes.map((path) => ({ url: `${BASE_URL}${path}`, changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.7 })),
    ...packageSlugs().map((slug) => ({ url: `${BASE_URL}/paket/${slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...tourSlugs().map((slug) => ({ url: `${BASE_URL}/wisata/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...articleSlugs().map((slug) => ({ url: `${BASE_URL}/berita/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
