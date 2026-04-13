import type { MetadataRoute } from "next";

import {
  collections,
  featuredDna,
  promptArchive,
  styleCategories
} from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: absoluteUrl("/archive"),
      lastModified,
      changeFrequency: "daily",
      priority: 0.95
    },
    {
      url: absoluteUrl("/preview"),
      lastModified,
      changeFrequency: "daily",
      priority: 0.94
    },
    {
      url: absoluteUrl("/builder"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: absoluteUrl("/dna"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85
    },
    {
      url: absoluteUrl("/styles"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: absoluteUrl("/analysis"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: absoluteUrl("/r3f-motion-lab"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.78
    },
    {
      url: absoluteUrl("/collections"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.75
    }
  ];

  const archiveRoutes = promptArchive.map((entry) => ({
    url: absoluteUrl(`/archive/${entry.slug}`),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.82
  }));

  const dnaRoutes = featuredDna.map((category) => ({
    url: absoluteUrl(`/dna/${category.slug}`),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.72
  }));

  const styleRoutes = styleCategories.map((category) => ({
    url: absoluteUrl(`/styles/${category.slug}`),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.68
  }));

  const collectionRoutes = collections.map((collection) => ({
    url: absoluteUrl(`/collections/${collection.slug}`),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.66
  }));

  return [
    ...staticRoutes,
    ...archiveRoutes,
    ...dnaRoutes,
    ...styleRoutes,
    ...collectionRoutes
  ];
}
