import Link from "next/link";

import { CopyButton } from "@/components/ui/copy-button";
import { GeneratedPreviewMock } from "@/components/ui/generated-preview-mock";
import { PreviewSurface } from "@/components/ui/preview-surface";
import { getStitchExports } from "@/data/stitch-exports";
import {
  CategoryCard as CategoryCardType,
  getCategoryHref,
  getCategoryStitchExamples
} from "@/data/site";

type CategoryCardProps = {
  item: CategoryCardType;
  showPrompt?: boolean;
};

export function CategoryCard({
  item,
  showPrompt = true
}: CategoryCardProps) {
  const stitchExamples = getCategoryStitchExamples(item);
  const stitchCaptures = stitchExamples.slice(0, 3).map((example) => {
    const primaryScreen = getStitchExports(example.slug)[0];

    return {
      example,
      image: primaryScreen?.image ?? example.captureImage,
      label: primaryScreen?.label ?? example.title,
      meta: primaryScreen?.runLabel ?? example.pageType,
      objectPosition: primaryScreen?.objectPosition
    };
  });
  const heroCapture = stitchCaptures[0];

  return (
    <article className="library-card">
      {heroCapture?.image ? (
        <PreviewSurface
          image={heroCapture.image}
          label={heroCapture.label}
          meta={heroCapture.meta}
          objectPosition={heroCapture.objectPosition}
          size="card"
          tone={item.previewTone}
        />
      ) : (
        <GeneratedPreviewMock
          label={item.title.split(" ")[0]}
          meta={item.medium}
          size="card"
          tone={item.previewTone}
        />
      )}
      <div className="card-topline">
        <span>{item.referenceBrand ?? item.mood}</span>
        <span>{item.facet}</span>
      </div>
      <div className="card-heading">
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
      </div>
      {item.referenceBrand && item.templateExample && item.promptTip ? (
        <div className="brand-dna-note">
          <span>{item.referenceBrand} template cue</span>
          <strong>{item.templateExample}</strong>
          <p>{item.promptTip}</p>
        </div>
      ) : null}
      {stitchExamples.length ? (
        <div className="brand-example-strip">
          <span>{stitchExamples.length} Stitch-ready examples</span>
          <strong>{stitchExamples[0]?.title}</strong>
        </div>
      ) : null}
      {stitchCaptures.length ? (
        <div className="brand-example-gallery">
          {stitchCaptures.map(({ example, image, label, meta, objectPosition }) => (
            <div className="brand-example-card" key={example.slug}>
              <PreviewSurface
                image={image}
                label={label}
                meta={meta}
                objectPosition={objectPosition}
                size="card"
                tone={item.previewTone}
              />
              <div className="brand-example-caption">
                <strong>{example.title}</strong>
                <span>{example.useCase}</span>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <ul className="trait-list" aria-label={`${item.title} traits`}>
        {item.traits.map((trait) => (
          <li key={trait}>{trait}</li>
        ))}
      </ul>
      {showPrompt ? (
        <div className="prompt-panel">
          <span>Stitch prompt</span>
          <p>{item.prompt}</p>
        </div>
      ) : null}
      <div className="card-actions">
        <Link className="primary-button" href={getCategoryHref(item)}>
          View details
        </Link>
        <CopyButton value={item.prompt} />
      </div>
    </article>
  );
}
