import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/layout/site-header";
import { CategoryDetail } from "@/components/sections/category-detail";
import { getCategoryBySlug, styleCategories } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

type StyleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return styleCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params
}: StyleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug("style", slug);

  if (!category) {
    return buildMetadata({
      title: "Style prompts",
      description: "Style-system prompts for AI website design.",
      path: "/styles"
    });
  }

  return buildMetadata({
    title: `${category.title} style prompt`,
    description: `${category.summary} Visual traits: ${category.traits.slice(0, 3).join(", ")}.`,
    keywords: [category.title, ...category.tags, ...category.useCases],
    path: `/styles/${category.slug}`
  });
}

export default async function StyleDetailPage({
  params
}: StyleDetailPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug("style", slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="page-frame">
      <SiteHeader />
      <CategoryDetail category={category} />
    </main>
  );
}
