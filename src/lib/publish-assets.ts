import {
  type BrandDnaGalleryEntry,
  type PromptArchiveEntry,
  type StitchExamplePage,
  getCategoryHref,
  getStitchExampleOwner
} from "@/data/site";
import { getArchiveStitchExports, getStitchExports } from "@/data/stitch-exports";

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

function buildSingleStitchArtifactAssets(slug: string): PublishAsset[] {
  return [
    {
      filename: "stitch-export/index.html",
      kind: "url" as const,
      url: `/stitch-exports/html/${slug}.html`
    },
    {
      filename: "stitch-export/stitch-export.json",
      kind: "url" as const,
      url: `/stitch-exports/meta/${slug}.json`
    }
  ];
}

function buildArchiveStitchArtifactAssets(slugs: string[]): PublishAsset[] {
  return slugs.flatMap((slug) => {
    const previewImage = getStitchExports(slug)[0]?.image;

    return [
      {
        filename: `archive-case/stitch-exports/${slug}/index.html`,
        kind: "url" as const,
        url: `/stitch-exports/html/${slug}.html`
      },
      {
        filename: `archive-case/stitch-exports/${slug}/stitch-export.json`,
        kind: "url" as const,
        url: `/stitch-exports/meta/${slug}.json`
      },
      ...(previewImage
        ? [
            {
              filename: `archive-case/stitch-exports/${slug}/preview${imageExtension(previewImage.src)}`,
              kind: "url" as const,
              url: previewImage.src
            }
          ]
        : [])
    ];
  });
}

export function buildArchivePublishAssets(entry: PromptArchiveEntry): PublishAsset[] {
  const stitchCaptures = getArchiveStitchExports(entry);
  const publishImageAssets = Array.from(
    new Map(
      [
        {
          filename: `archive-case/preview${imageExtension(entry.coverImage.src)}`,
          kind: "url" as const,
          url: entry.coverImage.src
        },
        ...entry.outputs
          .filter((output) => output.image)
          .map((output, index) => ({
            filename: `archive-case/outputs/output-${index + 1}${imageExtension(output.image!.src)}`,
            kind: "url" as const,
            url: output.image!.src
          })),
        ...stitchCaptures.map((screen, index) => ({
          filename: `archive-case/screens/screen-${index + 1}${imageExtension(screen.image.src)}`,
          kind: "url" as const,
          url: screen.image.src
        }))
      ].map((asset) => [asset.url, asset])
    ).values()
  );

  return [
    {
      content: `${entry.prompt}\n`,
      filename: "archive-case/prompt.txt",
      kind: "text"
    },
    {
      content: `${entry.remixPrompt}\n`,
      filename: "archive-case/remix-prompt.txt",
      kind: "text"
    },
    {
      filename: "archive-case/archive-case.json",
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
    ...buildArchiveStitchArtifactAssets(entry.stitchExampleSlugs)
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
      filename: "stitch-export/prompt.txt",
      kind: "text" as const
    },
    {
      content: `${example.outputNotes.join("\n")}\n`,
      filename: "stitch-export/output-notes.txt",
      kind: "text" as const
    },
    {
      filename: "stitch-export/designprom-notes.json",
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
            filename: `stitch-export/preview${imageExtension(example.captureImage.src)}`,
            kind: "url" as const,
            url: example.captureImage.src
          }
        ]
      : [])
  ];

  return [...assets, ...buildSingleStitchArtifactAssets(example.slug)];
}

export function buildBrandGalleryPublishAssets(
  example: BrandDnaGalleryEntry
): PublishAsset[] {
  const assets: PublishAsset[] = [
    {
      content: `${example.stitchPrompt}\n`,
      filename: "stitch-export/prompt.txt",
      kind: "text" as const
    },
    {
      content: `${example.summary}\n${example.templateHint}\n`,
      filename: "stitch-export/output-notes.txt",
      kind: "text" as const
    },
    {
      filename: "stitch-export/designprom-notes.json",
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
            filename: `stitch-export/preview${imageExtension(example.captureImage.src)}`,
            kind: "url" as const,
            url: example.captureImage.src
          }
        ]
      : [])
  ];

  return [...assets, ...buildSingleStitchArtifactAssets(example.slug)];
}
