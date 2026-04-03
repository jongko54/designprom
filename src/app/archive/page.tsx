import { SiteHeader } from "@/components/layout/site-header";
import { ArchiveLibraryBrowser } from "@/components/sections/archive-library-browser";
import { SavedRoughDrafts } from "@/components/sections/saved-rough-drafts";
import { promptArchive } from "@/data/site";

export default function ArchivePage() {
  return (
    <main className="page-frame">
      <SiteHeader />
      <SavedRoughDrafts />
      <ArchiveLibraryBrowser items={promptArchive} />
    </main>
  );
}
