import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
import { TemplateAnalysisGallery } from "@/components/sections/template-analysis-gallery";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Template analysis for portfolio, ecommerce, and brand websites",
  description:
    "Study template structures and prompt translations for portfolio sites, K-beauty commerce, ecommerce homepages, and brand-inspired layouts.",
  keywords: [
    "template analysis",
    "portfolio website examples",
    "ecommerce homepage inspiration",
    "k-beauty website examples"
  ],
  path: "/analysis"
});

export default function AnalysisPage() {
  return (
    <main className="page-frame">
      <SiteHeader />
      <TemplateAnalysisGallery />
    </main>
  );
}
