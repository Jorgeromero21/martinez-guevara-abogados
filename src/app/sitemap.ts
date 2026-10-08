import type { MetadataRoute } from "next";
import { practiceAreas } from "@/content/practice-areas";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...practiceAreas.map((area) => ({
      url: `${site.url}/areas/${area.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
