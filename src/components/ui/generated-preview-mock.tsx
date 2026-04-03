import { PreviewTone } from "@/data/site";

type GeneratedPreviewMockProps = {
  tone: PreviewTone;
  label: string;
  meta?: string;
  size?: "card" | "board";
};

export function GeneratedPreviewMock({
  tone,
  label,
  meta,
  size = "card"
}: GeneratedPreviewMockProps) {
  return (
    <div className={`preview-mock ${size} preview-${tone}`} aria-hidden="true">
      <div className="preview-chrome">
        <div className="preview-dots">
          <span />
          <span />
          <span />
        </div>
        <span>{meta ?? "generated preview"}</span>
      </div>
      <div className="preview-canvas">
        <div className="preview-wordmark">
          <span>{label}</span>
          <strong>signal</strong>
        </div>
        <div className="preview-layout">
          <span className="preview-block hero" />
          <span className="preview-block tall" />
          <span className="preview-block wide" />
          <span className="preview-block short" />
          <span className="preview-block short" />
        </div>
        <div className="preview-footer">
          <span>type</span>
          <span>motion</span>
          <span>tone</span>
        </div>
      </div>
    </div>
  );
}
