import Link from "next/link";

import { PreviewSurface } from "@/components/ui/preview-surface";
import {
  brandDnaGalleryExamples,
  featuredDna,
  getCategoryHref,
  styleCategories
} from "@/data/site";

export function BrandDnaExamples() {
  return (
    <section className="content-section builder-presets-shell">
      <div className="builder-presets-grid">
        {brandDnaGalleryExamples.map((example) => {
          const presetDna =
            featuredDna.find((entry) => entry.slug === example.dnaSlug) ??
            featuredDna[0];
          const presetStyle =
            styleCategories.find((entry) => entry.slug === example.styleSlug) ??
            styleCategories[0];
          const builderHref = `/builder?dna=${encodeURIComponent(example.dnaSlug)}&style=${encodeURIComponent(example.styleSlug)}&pageType=${encodeURIComponent(example.pageType)}&tone=${encodeURIComponent(example.tone)}&medium=${encodeURIComponent(example.medium)}&motionLevel=${encodeURIComponent(example.motionLevel)}&colorDirection=${encodeURIComponent(example.colorDirection)}`;

          return (
            <article className="builder-preset-card brand-dna-example-card" key={example.slug}>
              <div className="micro-row">
                <span>{example.pageType}</span>
                <span>{example.tone}</span>
              </div>
              <h3>{example.title}</h3>
              <p>{example.summary}</p>
              <PreviewSurface
                image={example.captureImage}
                label={example.pageType}
                meta={example.captureMeta ?? `${example.brandName} / ${presetStyle.facet}`}
                size="card"
                tone={presetStyle.previewTone}
              />
              <div className="brand-example-strip">
                <span>
                  {example.brandName} / {presetStyle.title}
                </span>
                <strong>{example.templateHint}</strong>
              </div>
              <div className="card-actions">
                <Link className="primary-button" href={getCategoryHref(presetDna)}>
                  View Brand DNA
                </Link>
                <Link className="ghost-button" href={builderHref}>
                  Use in Builder
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
