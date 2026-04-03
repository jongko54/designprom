import Link from "next/link";

import { PreviewSurface } from "@/components/ui/preview-surface";
import { getArchiveStitchExports } from "@/data/stitch-exports";
import { promptArchive } from "@/data/site";

export function ArchiveStitchOverview() {
  const cards = promptArchive
    .map((entry) => ({
      entry,
      capture: getArchiveStitchExports(entry)[0]
    }))
    .filter((item) => item.capture)
    .slice(0, 4);

  return (
    <section className="content-section archive-preview-shell">
      <div className="section-heading">
        <div className="eyebrow">Stitch captures</div>
        <h2>Browse case files through linked output screens</h2>
        <p>
          Each archive entry can now point to brand-level Stitch outputs, so the
          library reads like a prompt archive with visual proof.
        </p>
      </div>
      <div className="archive-stitch-overview-grid">
        {cards.map(({ entry, capture }) =>
          capture ? (
            <article className="archive-stitch-overview-card" key={entry.slug}>
              <PreviewSurface
                image={capture.image}
                label={capture.label}
                meta={capture.runLabel}
                objectPosition={capture.objectPosition}
                size="card"
                tone={entry.previewTone}
              />
              <div className="stitch-screen-copy">
                <strong>{entry.title}</strong>
                <p>{capture.note}</p>
                <div className="stitch-screen-meta">
                  <span>{entry.useCase}</span>
                  <span>{capture.tool}</span>
                  <span>{capture.generatedAt}</span>
                </div>
              </div>
              <div className="card-actions">
                <Link className="ghost-button" href={`/archive/${entry.slug}`}>
                  Open case file
                </Link>
              </div>
            </article>
          ) : null
        )}
      </div>
    </section>
  );
}
