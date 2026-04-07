import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
import { ArchiveLibraryBrowser } from "@/components/sections/archive-library-browser";
import { SavedRoughDrafts } from "@/components/sections/saved-rough-drafts";
import { promptArchive } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Prompt example archive for AI design and portfolio websites",
  description:
    "Explore prompt case files for fashion portfolios, K-beauty ecommerce, product launches, art direction archives, and AI website inspiration.",
  keywords: [
    "prompt archive",
    "ai website prompts",
    "fashion portfolio prompts",
    "ecommerce prompt examples"
  ],
  path: "/archive"
});

export default function ArchivePage() {
  return (
    <main className="page-frame">
      <SiteHeader />
      <SavedRoughDrafts />
      <ArchiveLibraryBrowser items={promptArchive} />
    </main>
  );
}
