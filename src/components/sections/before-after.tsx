import { GeneratedPreviewMock } from "@/components/ui/generated-preview-mock";
import { CopyButton } from "@/components/ui/copy-button";

export function BeforeAfter() {
  const caseFiles = [
    {
      id: "archive-01",
      label: "Case file 01",
      title: "Editorial AI SaaS launch",
      description:
        "A calm launch page for technical products that need trust without default AI gradients.",
      prompt:
        "Design an AI SaaS launch page with a rigid editorial grid, hard-edged monochrome sections, oversized Space Grotesk headlines, restrained cobalt glass overlays, and disciplined CTA placement.",
      note:
        "Expected result: a sharp launch page with one dominant hero, a proof block, and quiet tonal depth instead of floating cards.",
      tone: "calm" as const,
      tags: ["Launch", "Monochrome", "Quiet premium"]
    },
    {
      id: "archive-02",
      label: "Case file 02",
      title: "Creative portfolio archive",
      description:
        "A portfolio homepage that feels catalogued and authored rather than template-based.",
      prompt:
        "Create a portfolio homepage with a 60/40 asymmetrical grid, paper-like tonal sections, oversized headline typography, strict metadata labels, and image placements that feel archival rather than decorative.",
      note:
        "Expected result: a portfolio with strong type entry points, cropped image blocks, and a visible curatorial rhythm.",
      tone: "editorial" as const,
      tags: ["Portfolio", "Archive", "Editorial"]
    },
    {
      id: "archive-03",
      label: "Case file 03",
      title: "Campaign page with typographic tension",
      description:
        "A culture-led page that uses typography and contrast as the primary visual material.",
      prompt:
        "Build a campaign microsite with hard-edged black sections, repeated typographic cues, micrographic labels, strict negative space, and one featured rust status marker for emphasis.",
      note:
        "Expected result: a stark campaign board where type leads the pace and accents feel rare, controlled, and deliberate.",
      tone: "brutalist" as const,
      tags: ["Campaign", "Type-led", "Contrast"]
    }
  ];

  return (
    <section className="content-section casefiles-shell">
      <div className="section-heading">
        <div className="eyebrow">Prompt case files</div>
        <h2>See the prompt language and the kind of work it should generate</h2>
        <p>
          The core job of this product is simple: show the wording, show the
          intended output, and make the visual consequence legible before the
          user generates anything.
        </p>
      </div>
      <div className="casefiles-grid">
        {caseFiles.map((caseFile, index) => (
          <article
            className={`casefile-card ${index === 0 ? "lead" : ""}`}
            key={caseFile.id}
          >
            <div className="micro-row">
              <span>{caseFile.label}</span>
              <span>{caseFile.tags.join(" / ")}</span>
            </div>
            <div className="casefile-layout">
              <div className="casefile-copy">
                <h3>{caseFile.title}</h3>
                <p>{caseFile.description}</p>
                <div className="casefile-prompt">
                  <span>Stitch prompt</span>
                  <p>{caseFile.prompt}</p>
                </div>
                <div className="casefile-tags">
                  {caseFile.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <CopyButton value={caseFile.prompt} className="primary-button" />
              </div>
              <div className="casefile-output">
                <GeneratedPreviewMock
                  label={caseFile.title.split(" ")[0]}
                  meta={caseFile.label}
                  size="board"
                  tone={caseFile.tone}
                />
                <p className="casefile-note">{caseFile.note}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
