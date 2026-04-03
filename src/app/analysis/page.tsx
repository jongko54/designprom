import { SiteHeader } from "@/components/layout/site-header";
import { TemplateAnalysisGallery } from "@/components/sections/template-analysis-gallery";

export default function AnalysisPage() {
  return (
    <main className="page-frame">
      <SiteHeader />
      <TemplateAnalysisGallery />
    </main>
  );
}
