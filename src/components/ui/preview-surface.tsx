import { ArchiveImageAsset, PreviewTone } from "@/data/site";

import { GeneratedPreviewMock } from "@/components/ui/generated-preview-mock";
import { ImageLightbox } from "@/components/ui/image-lightbox";

type PreviewSurfaceProps = {
  tone: PreviewTone;
  label: string;
  meta?: string;
  size?: "card" | "board";
  image?: ArchiveImageAsset;
  objectPosition?: string;
};

export function PreviewSurface({
  tone,
  label,
  meta,
  size = "card",
  image,
  objectPosition
}: PreviewSurfaceProps) {
  if (!image) {
    return (
      <GeneratedPreviewMock
        label={label}
        meta={meta}
        size={size}
        tone={tone}
      />
    );
  }

  return (
    <figure className={`preview-image-shell ${size} preview-${tone}`}>
      <div className="preview-chrome">
        <div className="preview-dots">
          <span />
          <span />
          <span />
        </div>
        <span>{meta ?? "sample output"}</span>
      </div>
      <div className="preview-image-stage">
        <ImageLightbox
          alt={image.alt}
          className="preview-image"
          height={image.height}
          src={image.src}
          style={objectPosition ? { objectPosition } : undefined}
          width={image.width}
        />
      </div>
    </figure>
  );
}
