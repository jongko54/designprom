import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
import { PreviewLibraryBrowser } from "@/components/sections/preview-library-browser";
import { promptArchive } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Live preview gallery for AI design prompt examples",
  description:
    "Browse full-screen previews of fashion, portfolio, beauty, ecommerce, and product website outputs generated from designprom prompt examples.",
  keywords: [
    "website preview gallery",
    "ai design prompt examples",
    "portfolio website previews",
    "fashion website prompt previews"
  ],
  path: "/preview"
});

export default function PreviewPage() {
  return (
    <main className="page-frame">
      <SiteHeader />
      <PreviewLibraryBrowser items={promptArchive} />
    </main>
  );
}
