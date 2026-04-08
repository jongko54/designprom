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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function imageExtension(src: string) {
  return src.endsWith(".svg") ? ".svg" : ".png";
}

function buildSimpleExportHtml({
  title,
  intro,
  prompt,
  notes,
  imagePath
}: {
  imagePath?: string;
  intro: string;
  notes: string[];
  prompt: string;
  title: string;
}) {
  const noteMarkup = notes
    .map((note) => `<li>${escapeHtml(note)}</li>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 24px;
      background: #faf9f9;
      color: #101010;
      font-family: Inter, Arial, sans-serif;
    }
    main {
      display: grid;
      gap: 18px;
      max-width: 1100px;
      margin: 0 auto;
    }
    section {
      display: grid;
      gap: 12px;
      padding: 20px;
      background: #ffffff;
    }
    h1, h2 {
      margin: 0;
      font-family: "Space Grotesk", Inter, Arial, sans-serif;
      line-height: 0.96;
      letter-spacing: -0.04em;
    }
    h1 { font-size: 2.8rem; }
    h2 { font-size: 1.1rem; }
    p, li { margin: 0; line-height: 1.65; color: #5f5a5b; }
    pre {
      margin: 0;
      padding: 16px;
      background: #f5f3f3;
      white-space: pre-wrap;
      font: inherit;
      line-height: 1.7;
      color: #101010;
    }
    img {
      display: block;
      width: 100%;
      height: auto;
      background: #f5f3f3;
    }
    ul {
      display: grid;
      gap: 8px;
      padding-left: 18px;
      margin: 0;
    }
  </style>
</head>
<body>
  <main>
    <section>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(intro)}</p>
    </section>
    ${imagePath ? `<section><img src="${escapeHtml(imagePath)}" alt="${escapeHtml(title)} preview" /></section>` : ""}
    <section>
      <h2>Prompt</h2>
      <pre>${escapeHtml(prompt)}</pre>
    </section>
    ${notes.length ? `<section><h2>Notes</h2><ul>${noteMarkup}</ul></section>` : ""}
  </main>
</body>
</html>`;
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
  const previewFileName = `archive-case/preview${imageExtension(entry.coverImage.src)}`;
  const publishImageAssets = Array.from(
    new Map(
      [
        {
          filename: previewFileName,
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
      content: buildSimpleExportHtml({
        imagePath: previewFileName,
        intro: entry.summary,
        notes: entry.outputFocus,
        prompt: `${entry.prompt}\n\nRemix prompt:\n${entry.remixPrompt}`,
        title: entry.title
      }),
      filename: "index.html",
      kind: "text"
    },
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
  const previewFileName = example.captureImage
    ? `stitch-export/preview${imageExtension(example.captureImage.src)}`
    : undefined;
  const assets: PublishAsset[] = [
    {
      content: buildSimpleExportHtml({
        imagePath: previewFileName,
        intro: example.summary,
        notes: example.outputNotes,
        prompt: example.stitchPrompt,
        title: example.title
      }),
      filename: "index.html",
      kind: "text" as const
    },
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
            filename: previewFileName!,
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
  const previewFileName = example.captureImage
    ? `stitch-export/preview${imageExtension(example.captureImage.src)}`
    : undefined;
  const assets: PublishAsset[] = [
    {
      content: buildSimpleExportHtml({
        imagePath: previewFileName,
        intro: example.summary,
        notes: [example.templateHint, `${example.brandName} / ${example.pageType}`],
        prompt: example.stitchPrompt,
        title: example.title
      }),
      filename: "index.html",
      kind: "text" as const
    },
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
            filename: previewFileName!,
            kind: "url" as const,
            url: example.captureImage.src
          }
        ]
      : [])
  ];

  return [...assets, ...buildSingleStitchArtifactAssets(example.slug)];
}
