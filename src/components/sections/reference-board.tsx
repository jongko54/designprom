import { GeneratedPreviewMock } from "@/components/ui/generated-preview-mock";
import { PreviewTone } from "@/data/site";

type ReferenceBoardProps = {
  eyebrow: string;
  title: string;
  note: string;
  tags: string[];
  asciiLabel?: string;
  tone?: PreviewTone;
};

export function ReferenceBoard({
  eyebrow,
  title,
  note,
  tags,
  asciiLabel = "prompt field",
  tone = "calm"
}: ReferenceBoardProps) {
  return (
    <article className="reference-board">
      <div className="micro-row">
        <span>{eyebrow}</span>
        <span>{asciiLabel}</span>
      </div>
      <div className="reference-mixed">
        <span>{title}</span>
        <em>design</em>
        <strong>signal</strong>
      </div>
      <GeneratedPreviewMock
        label={title.split(" ")[0]}
        meta={asciiLabel}
        size="board"
        tone={tone}
      />
      <div className="reference-artboard" aria-hidden="true">
        <div className="reference-column">
          <span className="reference-pill">scan</span>
          <span className="reference-line long" />
          <span className="reference-line short" />
        </div>
        <div className="reference-column accent">
          <span className="reference-pill">type</span>
          <span className="reference-line long" />
          <span className="reference-line long" />
          <span className="reference-line short" />
        </div>
        <div className="reference-column sculpture">
          <span>FORM</span>
          <span>DNA</span>
        </div>
      </div>
      <div className="reference-tags">
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <p>{note}</p>
    </article>
  );
}
