import {
  type BrandDnaGalleryEntry,
  type PromptArchiveEntry,
  type StitchExamplePage,
  getCategoryHref,
  getStitchExampleOwner
} from "@/data/site";
import { getArchiveStitchExports } from "@/data/stitch-exports";

export type PublishAsset =
  | {
      content: string;
      filename: string;
      kind: "text";
    }
  | {
      filename: string;
      kind: "json";
      value: unknown;
    }
  | {
      filename: string;
      kind: "url";
      url: string;
    };

function imageExtension(src: string) {
  return src.endsWith(".svg") ? ".svg" : ".png";
}

function buildStitchArtifactAssets(slugs: string[]): PublishAsset[] {
  return slugs.flatMap((slug) => [
    {
      filename: `${slug}.html`,
      kind: "url" as const,
      url: `/stitch-exports/html/${slug}.html`
    },
    {
      filename: `${slug}.json`,
      kind: "url" as const,
      url: `/stitch-exports/meta/${slug}.json`
    }
  ]);
}

export function buildArchivePublishAssets(entry: PromptArchiveEntry): PublishAsset[] {
  const stitchCaptures = getArchiveStitchExports(entry);
  const publishImageAssets = Array.from(
    new Map(
      [
        {
          filename: `${entry.slug}-cover${imageExtension(entry.coverImage.src)}`,
          kind: "url" as const,
          url: entry.coverImage.src
        },
        ...entry.outputs
          .filter((output) => output.image)
          .map((output, index) => ({
            filename: `${entry.slug}-output-${index + 1}${imageExtension(output.image!.src)}`,
            kind: "url" as const,
            url: output.image!.src
          })),
        ...stitchCaptures.map((screen, index) => ({
          filename: `${entry.slug}-stitch-${index + 1}${imageExtension(screen.image.src)}`,
          kind: "url" as const,
          url: screen.image.src
        }))
      ].map((asset) => [asset.url, asset])
    ).values()
  );

  return [
    {
      content: `${entry.prompt}\n`,
      filename: "prompt.txt",
      kind: "text"
    },
    {
      content: `${entry.remixPrompt}\n`,
      filename: "remix-prompt.txt",
      kind: "text"
    },
    {
      filename: "manifest.json",
      kind: "json",
      value: {
        categories: entry.categorySlugs,
        outputFocus: entry.outputFocus,
        slug: entry.slug,
        stitchExampleSlugs: entry.stitchExampleSlugs,
        summary: entry.summary,
        title: entry.title,
        useCase: entry.useCase
      }
    },
    ...publishImageAssets,
    ...buildStitchArtifactAssets(entry.stitchExampleSlugs)
  ];
}

export function buildStitchExamplePublishAssets(
  example: StitchExamplePage
): PublishAsset[] {
  const owner = getStitchExampleOwner(example.slug);
  const ownerHref = owner ? getCategoryHref(owner) : undefined;
  const assets: PublishAsset[] = [
    {
      content: `${example.stitchPrompt}\n`,
      filename: "stitch-prompt.txt",
      kind: "text" as const
    },
    {
      content: `${example.outputNotes.join("\n")}\n`,
      filename: "output-notes.txt",
      kind: "text" as const
    },
    {
      filename: "manifest.json",
      kind: "json" as const,
      value: {
        brandDnaHref: ownerHref,
        pageType: example.pageType,
        slug: example.slug,
        styleSlug: example.styleSlug,
        summary: example.summary,
        title: example.title,
        tone: example.tone,
        useCase: example.useCase
      }
    },
    ...(example.captureImage
      ? [
          {
            filename: `${example.slug}${imageExtension(example.captureImage.src)}`,
            kind: "url" as const,
            url: example.captureImage.src
          }
        ]
      : [])
  ];

  return [...assets, ...buildStitchArtifactAssets([example.slug])];
}

export function buildBrandGalleryPublishAssets(
  example: BrandDnaGalleryEntry
): PublishAsset[] {
  const assets: PublishAsset[] = [
    {
      content: `${example.stitchPrompt}\n`,
      filename: "stitch-prompt.txt",
      kind: "text" as const
    },
    {
      content: `${example.summary}\n${example.templateHint}\n`,
      filename: "notes.txt",
      kind: "text" as const
    },
    {
      filename: "manifest.json",
      kind: "json" as const,
      value: {
        brandName: example.brandName,
        colorDirection: example.colorDirection,
        dnaSlug: example.dnaSlug,
        medium: example.medium,
        motionLevel: example.motionLevel,
        pageType: example.pageType,
        slug: example.slug,
        styleSlug: example.styleSlug,
        summary: example.summary,
        templateHint: example.templateHint,
        title: example.title,
        tone: example.tone
      }
    },
    ...(example.captureImage
      ? [
          {
            filename: `${example.slug}${imageExtension(example.captureImage.src)}`,
            kind: "url" as const,
            url: example.captureImage.src
          }
        ]
      : [])
  ];

  return [...assets, ...buildStitchArtifactAssets([example.slug])];
}
