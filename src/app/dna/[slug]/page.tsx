import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryDetail } from "@/components/sections/category-detail";
import { SiteHeader } from "@/components/layout/site-header";
import { featuredDna, getCategoryBySlug } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

type DnaDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return featuredDna.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params
}: DnaDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug("dna", slug);

  if (!category) {
    return buildMetadata({
      title: "Brand DNA prompts",
      description: "Brand-inspired prompt directions for AI website design.",
      path: "/dna"
    });
  }

  return buildMetadata({
    title: `${category.title} prompt direction`,
    description: `${category.summary} Use this direction for ${category.useCases.join(", ")}.`,
    keywords: [
      category.title,
      ...(category.referenceBrand ? [`${category.referenceBrand} style prompt`] : []),
      ...category.tags,
      ...category.useCases
    ],
    path: `/dna/${category.slug}`
  });
}

export default async function DnaDetailPage({ params }: DnaDetailPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug("dna", slug);

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
