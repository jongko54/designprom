import Link from "next/link";

import { ArchiveEntryCard } from "@/components/cards/archive-entry-card";
import { promptArchive } from "@/data/site";

export function PromptArchivePreview() {
  const featuredEntries = promptArchive.slice(0, 3);

  return (
    <section className="content-section archive-preview-shell">
      <div className="section-heading">
        <div className="eyebrow">Prompt gallery</div>
        <h2>See the image first, then study the prompt that creates it</h2>
        <p>
          This section works like a resource gallery. Each card shows the target
          visual result, the style direction, and the prompt recipe behind it.
        </p>
      </div>
      <div className="archive-preview-filters" aria-hidden="true">
        <span>Website</span>
        <span>Portfolio</span>
        <span>3D</span>
        <span>Editorial</span>
        <span>AI product</span>
        <span>Campaign</span>
      </div>
      <div className="archive-preview-grid">
        {featuredEntries.map((entry) => (
          <ArchiveEntryCard compact entry={entry} key={entry.slug} />
        ))}
      </div>
      <div className="card-actions">
        <Link className="primary-button" href="/archive">
          Open resource archive
        </Link>
      </div>
    </section>
  );
}
