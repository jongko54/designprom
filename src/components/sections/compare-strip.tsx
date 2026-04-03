import { ReferenceBoard } from "@/components/sections/reference-board";
import { CopyButton } from "@/components/ui/copy-button";
import { compareColumns } from "@/data/site";

export function CompareStrip() {
  const comparePrompt =
    "Design a SaaS landing page for an AI productivity tool with a dominant hero, one clear product proof zone, a conversion CTA, and enough typographic hierarchy to feel intentional rather than generic.";

  return (
    <section className="content-section">
      <div className="section-heading">
        <div className="eyebrow">Compare lab</div>
        <h2>One prompt brief, multiple design languages</h2>
        <p>
          Comparison works best when the brief stays fixed. The prompt below is
          held constant so users can see what actually changes between each
          visual direction.
        </p>
      </div>
      <article className="compare-brief-card">
        <div className="micro-row">
          <span>Shared brief</span>
          <span>SaaS landing / archive compare</span>
        </div>
        <div className="archive-prompt">
          <span>Compare prompt</span>
          <p>{comparePrompt}</p>
        </div>
        <div className="card-actions">
          <CopyButton
            className="primary-button button-reset"
            copiedLabel="Prompt copied"
            value={comparePrompt}
          />
        </div>
      </article>
      <div className="compare-grid">
        {compareColumns.map((column) => (
          <ReferenceBoard
            asciiLabel={column.label}
            eyebrow="compare direction"
            key={column.title}
            note={column.change}
            tags={column.title.split(" ").slice(0, 3)}
            title={column.title}
            tone={column.previewTone}
          />
        ))}
      </div>
    </section>
  );
}
