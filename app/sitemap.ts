import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { SITE_URL } from "@/utils/seo";

export const dynamic = "force-dynamic"; // new products appear without a redeploy

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({ select: { id: true } });

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/products`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    ...products.map((p) => ({
      url: `${SITE_URL}/products/${p.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}