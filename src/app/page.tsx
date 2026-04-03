import { SiteHeader } from "@/components/layout/site-header";
import { PromptArchivePreview } from "@/components/sections/prompt-archive-preview";

export default function HomePage() {
  return (
    <main className="page-frame">
      <SiteHeader />
      <PromptArchivePreview />
    </main>
  );
}
