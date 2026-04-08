import {
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
    ...publishImageAssets
  ];
}

export function buildStitchExamplePublishAssets(
  example: StitchExamplePage
): PublishAsset[] {
  const owner = getStitchExampleOwner(example.slug);
  const ownerHref = owner ? getCategoryHref(owner) : undefined;

  return [
    {
      content: `${example.stitchPrompt}\n`,
      filename: "stitch-prompt.txt",
      kind: "text"
    },
    {
      content: `${example.outputNotes.join("\n")}\n`,
      filename: "output-notes.txt",
      kind: "text"
    },
    {
      filename: "manifest.json",
      kind: "json",
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
}
