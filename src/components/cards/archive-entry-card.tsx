import Link from "next/link";

import { CopyButton } from "@/components/ui/copy-button";
import { PreviewSurface } from "@/components/ui/preview-surface";
import { getArchiveStitchExports } from "@/data/stitch-exports";
import {
  PromptArchiveEntry,
  getArchiveCategories
} from "@/data/site";

type ArchiveEntryCardProps = {
  entry: PromptArchiveEntry;
  compact?: boolean;
};

export function ArchiveEntryCard({
  entry,
  compact = false
}: ArchiveEntryCardProps) {
  const categories = getArchiveCategories(entry);
  const stitchCaptures = getArchiveStitchExports(entry);
  const primaryCapture = stitchCaptures[0];

  if (compact) {
    return (
      <article className="archive-entry-card compact resource-card archive-catalog-card">
        <div className="micro-row">
          <span>{entry.portfolioCategory}</span>
          <span>{stitchCaptures.length} stitch captures</span>
        </div>
        <div className="archive-entry-preview">
          <PreviewSurface
            image={primaryCapture?.image ?? entry.coverImage}
            label={entry.title.split(" ")[0]}
            meta={primaryCapture?.runLabel ?? entry.useCase}
            objectPosition={primaryCapture?.objectPosition}
            size="card"
            tone={entry.previewTone}
          />
        </div>
        <div className="card-heading">
          <h3>{entry.title}</h3>
          <p>{entry.summary}</p>
        </div>
        <div className="archive-entry-prompt compact-prompt">
          <span>{entry.useCase}</span>
          <p>{entry.prompt}</p>
        </div>
        <div className="archive-entry-tags">
          <span>{entry.portfolioCategory}</span>
          {stitchCaptures.length ? <span>{stitchCaptures.length} captures</span> : null}
          {categories.map((category) => (
            <span key={category.slug}>{category.title}</span>
          ))}
        </div>
        <div className="card-actions">
          <Link className="primary-button" href={`/archive/${entry.slug}`}>
            Open template
          </Link>
          <CopyButton
            className="ghost-button button-reset"
            copiedLabel="Prompt copied"
            value={entry.prompt}
          />
        </div>
      </article>
    );
  }

  return (
    <article className="archive-entry-card">
      <div className="micro-row">
        <span>{entry.useCase}</span>
        <span>{stitchCaptures.length} stitch captures</span>
      </div>
      <div className="archive-entry-grid">
        <div className="archive-entry-copy">
          <div className="card-heading">
            <h3>{entry.title}</h3>
            <p>{entry.summary}</p>
          </div>
          <div className="archive-entry-brief">
            <span>Brief</span>
            <p>{entry.brief}</p>
          </div>
          <div className="archive-entry-prompt">
            <span>Prompt</span>
            <p>{entry.prompt}</p>
          </div>
          <div className="archive-entry-tags">
            {stitchCaptures.length ? <span>{stitchCaptures.length} captures linked</span> : null}
            {categories.map((category) => (
              <span key={category.slug}>{category.title}</span>
            ))}
          </div>
          <div className="card-actions">
            <Link className="primary-button" href={`/archive/${entry.slug}`}>
              Open case file
            </Link>
            <CopyButton
              className="ghost-button button-reset"
              copiedLabel="Prompt copied"
              value={entry.prompt}
            />
          </div>
        </div>
        <div className="archive-entry-preview">
          <PreviewSurface
            image={primaryCapture?.image ?? entry.coverImage}
            label={entry.title.split(" ")[0]}
            meta={primaryCapture?.runLabel ?? entry.useCase}
            objectPosition={primaryCapture?.objectPosition}
            size="board"
            tone={entry.previewTone}
          />
          <p className="archive-entry-note">{entry.curatorNote}</p>
        </div>
      </div>
    </article>
  );
}
