import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/layout/site-header";
import { CategoryDetail } from "@/components/sections/category-detail";
import { getCategoryBySlug, styleCategories } from "@/data/site";

type StyleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return styleCategories.map((category) => ({ slug: category.slug }));
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
