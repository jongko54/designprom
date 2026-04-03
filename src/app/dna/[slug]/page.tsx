import { notFound } from "next/navigation";

import { CategoryDetail } from "@/components/sections/category-detail";
import { SiteHeader } from "@/components/layout/site-header";
import { featuredDna, getCategoryBySlug } from "@/data/site";

type DnaDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return featuredDna.map((category) => ({ slug: category.slug }));
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
