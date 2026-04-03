import type { SemanticPreviewSpec } from "@/lib/prompt-semantic-preview";

type SemanticPreviewBoardProps = {
  spec: SemanticPreviewSpec;
};

export function SemanticPreviewBoard({ spec }: SemanticPreviewBoardProps) {
  return (
    <div className={`semantic-preview-board preview-${spec.tone}`} aria-hidden="true">
      <div className="semantic-preview-chrome">
        <span>{spec.brand}</span>
        <span>{spec.pageType}</span>
        <span>free preview</span>
      </div>
      <div className="semantic-preview-header">
        <div className="semantic-preview-wordmark">
          <span>{spec.headline}</span>
          <strong>{spec.vibe}</strong>
        </div>
        <p>{spec.summary}</p>
      </div>
      <div className="semantic-preview-scene-list">
        {spec.scenes.map((scene) => (
          <article className="semantic-preview-scene" key={scene.title}>
            <div className="semantic-preview-scene-top">
              <span>{scene.meta}</span>
              <span>{spec.pageType}</span>
            </div>
            <strong>{scene.title}</strong>
            <p>{scene.caption}</p>
          </article>
        ))}
      </div>
      <div className="semantic-preview-footer">
        <span>{spec.layout}</span>
        <span>{spec.density}</span>
        <span>{spec.colorCue}</span>
        <span>{spec.motionCue}</span>
      </div>
    </div>
  );
}
