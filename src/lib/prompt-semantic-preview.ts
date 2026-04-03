import type {
  CategoryCard,
  PreviewTone,
  PromptArchiveEntry
} from "@/data/site";
import { promptArchive } from "@/data/site";

export type SemanticPreviewScene = {
  caption: string;
  meta: string;
  title: string;
};

export type SemanticPreviewNote = {
  label: string;
  value: string;
};

export type SemanticPreviewSpec = {
  archiveMatchSlug?: string;
  brand: string;
  colorCue: string;
  density: string;
  headline: string;
  layout: string;
  motionCue: string;
  notes: SemanticPreviewNote[];
  pageType: string;
  scenes: SemanticPreviewScene[];
  summary: string;
  tone: PreviewTone;
  vibe: string;
};

type DirectionRule = {
  brand: string;
  headline: string;
  keywords: string[];
  summary: string;
  tone: PreviewTone;
  vibe: string;
};

type BuilderSemanticPreviewInput = {
  colorDirection: string;
  dna: CategoryCard;
  medium: string;
  motionLevel: string;
  pageType: string;
  prompt: string;
  style: CategoryCard;
  tone: string;
};

const directionRules: DirectionRule[] = [
  {
    brand: "Apple",
    headline: "Quiet premium structure",
    keywords: ["apple", "ios", "vision pro", "glass"],
    summary: "Wide negative space, restrained depth, and a single high-trust CTA anchor the page.",
    tone: "calm",
    vibe: "quiet premium"
  },
  {
    brand: "Figma",
    headline: "Collaborative product system",
    keywords: ["figma", "workspace", "collaboration", "canvas"],
    summary: "Pane logic, live-tool cues, and a working canvas make the page feel active and precise.",
    tone: "spatial",
    vibe: "tool fluency"
  },
  {
    brand: "Airbnb",
    headline: "Warm discovery flow",
    keywords: ["airbnb", "stay", "booking", "hospitality"],
    summary: "Search-led rhythm, warm proof blocks, and soft trust cues shape the browsing path.",
    tone: "warm",
    vibe: "warm hospitality"
  },
  {
    brand: "IBM",
    headline: "Enterprise proof layout",
    keywords: ["ibm", "enterprise", "system", "architecture"],
    summary: "Structured hierarchy, proof modules, and diagram-ready spacing keep the screen controlled.",
    tone: "grid",
    vibe: "enterprise system"
  },
  {
    brand: "TikTok",
    headline: "Creator velocity sequence",
    keywords: ["tiktok", "creator", "drop", "social"],
    summary: "Fast pacing, high-contrast hooks, and social-native framing drive the first impression.",
    tone: "creator",
    vibe: "creator velocity"
  },
  {
    brand: "Bauhaus 3D",
    headline: "Sculptural stage composition",
    keywords: ["bauhaus", "3d", "sculptural", "geometry"],
    summary: "Primary geometry, open staging, and object-led rhythm turn the page into an exhibit.",
    tone: "spatial",
    vibe: "sculptural color"
  },
  {
    brand: "Editorial",
    headline: "Gallery-paced composition",
    keywords: ["editorial", "modern art", "portfolio", "gallery"],
    summary: "Large type, selective color framing, and paced captions make the layout feel curated.",
    tone: "editorial",
    vibe: "gallery pacing"
  },
  {
    brand: "Motion",
    headline: "Type-driven motion path",
    keywords: ["motion", "kinetic", "campaign", "sequence"],
    summary: "Rhythmic reveals and moving type turn the page into a controlled campaign sequence.",
    tone: "motion",
    vibe: "type choreography"
  },
  {
    brand: "Google",
    headline: "Modular research surface",
    keywords: ["google", "research", "lab", "ai lab"],
    summary: "Open modules, bright navigation, and helpful product cues keep the interface legible.",
    tone: "gradient",
    vibe: "modular utility"
  },
  {
    brand: "Meta",
    headline: "Spatial product launch",
    keywords: ["meta", "spatial", "horizon", "immersive"],
    summary: "Large spatial surfaces, product framing, and future-facing contrast define the hero.",
    tone: "gradient",
    vibe: "spatial launch"
  },
  {
    brand: "Instagram",
    headline: "Creator showcase grid",
    keywords: ["instagram", "reels", "creator portfolio", "social gallery"],
    summary: "Visual-first cards, creator proof, and colorful grid rhythm make the page instantly browseable.",
    tone: "creator",
    vibe: "social gallery"
  }
];

const stopWords = new Set([
  "a",
  "an",
  "and",
  "build",
  "create",
  "design",
  "for",
  "in",
  "make",
  "of",
  "page",
  "site",
  "the",
  "to",
  "with"
]);

function normalizePrompt(prompt: string) {
  return prompt.toLowerCase().replace(/\s+/g, " ").trim();
}

function inferPageType(prompt: string) {
  if (prompt.includes("dashboard") || prompt.includes("workspace")) {
    return "Dashboard";
  }

  if (prompt.includes("docs") || prompt.includes("documentation")) {
    return "Docs";
  }

  if (prompt.includes("portfolio") || prompt.includes("gallery")) {
    return "Portfolio";
  }

  if (prompt.includes("campaign") || prompt.includes("drop")) {
    return "Campaign";
  }

  if (prompt.includes("microsite")) {
    return "Microsite";
  }

  return "Landing";
}

function matchDirectionRule(prompt: string) {
  return directionRules.find((rule) =>
    rule.keywords.some((keyword) => prompt.includes(keyword))
  );
}

function inferLayout(pageType: string) {
  switch (pageType) {
    case "Dashboard":
      return "Pane grid with persistent rails";
    case "Docs":
      return "Stacked proof modules with side navigation";
    case "Portfolio":
      return "Curated gallery spread with paced captions";
    case "Campaign":
      return "Hook-led sequence with staged CTA rhythm";
    case "Microsite":
      return "Hero object stage with sectional reveal";
    default:
      return "Hero stack with feature proof and CTA close";
  }
}

function inferDensity(pageType: string) {
  switch (pageType) {
    case "Dashboard":
      return "Dense";
    case "Docs":
      return "Structured";
    case "Portfolio":
      return "Curated";
    case "Campaign":
      return "Charged";
    case "Microsite":
      return "Airy";
    default:
      return "Balanced";
  }
}

function extractPromptCue(prompt: string) {
  const words = prompt
    .replace(/[^a-z0-9\s-]/gi, " ")
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean)
    .filter((word) => !stopWords.has(word.toLowerCase()));

  if (words.length === 0) {
    return "Prompt cue";
  }

  return words.slice(0, 6).join(" ");
}

function summarizePromptSignal(prompt: string, pageType: string) {
  const matchedKeywords = directionRules
    .flatMap((rule) => rule.keywords)
    .filter((keyword, index, array) => array.indexOf(keyword) === index)
    .filter((keyword) => prompt.includes(keyword))
    .slice(0, 3);

  if (matchedKeywords.length > 0) {
    return `${pageType} / ${matchedKeywords.join(" / ")}`;
  }

  return `${pageType} / free semantic preview`;
}

function buildScenes(
  pageType: string,
  brand: string,
  vibe: string,
  summary: string
): SemanticPreviewScene[] {
  switch (pageType) {
    case "Dashboard":
      return [
        {
          title: "Workspace entry",
          caption: `${brand} lands through rails, panes, and one working surface with ${vibe} pacing.`,
          meta: "signal"
        },
        {
          title: "System panel",
          caption: "Middle sections compress proof, controls, and state changes into a denser frame.",
          meta: "type"
        },
        {
          title: "Shared action",
          caption: "The final screen closes on collaboration or task completion instead of a generic CTA.",
          meta: "tone"
        }
      ];
    case "Docs":
      return [
        {
          title: "System hero",
          caption: `${brand} opens with a value claim, operational context, and immediate proof.`,
          meta: "signal"
        },
        {
          title: "Evidence block",
          caption: "The middle screen uses modules, diagrams, and layered labels to explain structure.",
          meta: "type"
        },
        {
          title: "Decision close",
          caption: "The last frame narrows to one enterprise action with measured trust cues.",
          meta: "tone"
        }
      ];
    case "Portfolio":
      return [
        {
          title: "Archive opener",
          caption: `${brand} introduces the work through pace, spacing, and image hierarchy instead of product UI.`,
          meta: "signal"
        },
        {
          title: "Curated spread",
          caption: "The middle screen turns into a gallery wall with captions and careful rhythm.",
          meta: "type"
        },
        {
          title: "Index close",
          caption: "The page resolves as an archive or contact surface rather than a conversion-heavy footer.",
          meta: "tone"
        }
      ];
    case "Campaign":
      return [
        {
          title: "Hook frame",
          caption: `${brand} starts with a fast first screen, compressed contrast, and a clear emotional hook.`,
          meta: "signal"
        },
        {
          title: "Momentum sequence",
          caption: "The middle frames tighten the tempo with motion-led transitions and stacked proof.",
          meta: "motion"
        },
        {
          title: "Drop close",
          caption: "The final frame lands on one immediate action that stays inside the content rhythm.",
          meta: "tone"
        }
      ];
    case "Microsite":
      return [
        {
          title: "Object stage",
          caption: `${brand} uses a single central object or spatial cue to make the first screen legible.`,
          meta: "signal"
        },
        {
          title: "Spatial reveal",
          caption: "The middle frame rotates through structure, color, or motion without losing hierarchy.",
          meta: "motion"
        },
        {
          title: "Exhibit close",
          caption: "The page closes like an installation exit with one final statement and action.",
          meta: "tone"
        }
      ];
    default:
      return [
        {
          title: "Hero screen",
          caption: `${brand} focuses the first screen around the strongest claim in the prompt.`,
          meta: "signal"
        },
        {
          title: "Feature screen",
          caption: summary,
          meta: "type"
        },
        {
          title: "CTA screen",
          caption: "The closing frame compresses the story into one action surface with controlled emphasis.",
          meta: "tone"
        }
      ];
  }
}

function scoreArchiveEntry(
  entry: PromptArchiveEntry,
  {
    brand,
    pageType,
    prompt,
    styleSlug,
    dnaSlug
  }: {
    brand?: string;
    pageType: string;
    prompt: string;
    styleSlug?: string;
    dnaSlug?: string;
  }
) {
  const haystack = [
    entry.title,
    entry.summary,
    entry.brief,
    entry.useCase,
    entry.portfolioCategory,
    ...entry.outputFocus
  ]
    .join(" ")
    .toLowerCase();

  let score = 0;

  if (dnaSlug && entry.categorySlugs.includes(dnaSlug)) {
    score += 10;
  }

  if (styleSlug && entry.categorySlugs.includes(styleSlug)) {
    score += 8;
  }

  if (haystack.includes(pageType.toLowerCase())) {
    score += 6;
  }

  if (brand) {
    const brandTokens = brand
      .toLowerCase()
      .split(/\s+/)
      .filter((token) => token.length > 2);

    for (const token of brandTokens) {
      if (haystack.includes(token)) {
        score += 4;
      }
    }
  }

  const promptTokens = prompt
    .split(/\s+/)
    .map((token) => token.replace(/[^a-z0-9-]/g, ""))
    .filter((token) => token.length > 3);

  for (const token of promptTokens) {
    if (haystack.includes(token)) {
      score += 1;
    }
  }

  return score;
}

function findArchiveMatch({
  brand,
  pageType,
  prompt,
  styleSlug,
  dnaSlug
}: {
  brand?: string;
  pageType: string;
  prompt: string;
  styleSlug?: string;
  dnaSlug?: string;
}) {
  const ranked = promptArchive
    .map((entry) => ({
      entry,
      score: scoreArchiveEntry(entry, {
        brand,
        pageType,
        prompt,
        styleSlug,
        dnaSlug
      })
    }))
    .sort((left, right) => right.score - left.score);

  return ranked[0]?.score && ranked[0].score > 0 ? ranked[0].entry : undefined;
}

export function resolvePromptSemanticPreview(prompt: string): SemanticPreviewSpec {
  const normalizedPrompt = normalizePrompt(prompt);
  const pageType = inferPageType(normalizedPrompt);
  const matchedRule = matchDirectionRule(normalizedPrompt);
  const brand = matchedRule?.brand ?? "Builder";
  const tone = matchedRule?.tone ?? "gradient";
  const vibe = matchedRule?.vibe ?? "prompt preview";
  const summary =
    matchedRule?.summary ??
    "The prompt is translated into a likely structure, rhythm, and hierarchy without calling an image model.";
  const archiveMatch = findArchiveMatch({
    brand,
    pageType,
    prompt: normalizedPrompt
  });

  return {
    archiveMatchSlug: archiveMatch?.slug,
    brand,
    colorCue: matchedRule ? `${matchedRule.brand} direction detected` : "No brand keyword detected",
    density: inferDensity(pageType),
    headline: extractPromptCue(normalizedPrompt),
    layout: inferLayout(pageType),
    motionCue:
      pageType === "Campaign" || normalizedPrompt.includes("motion")
        ? "Motion-first sequencing"
        : "Static structure with staged emphasis",
    notes: [
      {
        label: "Mode",
        value: "Free local preview generated from prompt semantics."
      },
      {
        label: "Prompt signal",
        value: summarizePromptSignal(normalizedPrompt, pageType)
      },
      {
        label: "Layout",
        value: inferLayout(pageType)
      },
      {
        label: "Reading",
        value: `${inferDensity(pageType)} pacing with ${vibe} cues.`
      }
    ],
    pageType,
    scenes: buildScenes(pageType, brand, vibe, summary),
    summary,
    tone,
    vibe
  };
}

export function resolveBuilderSemanticPreview({
  colorDirection,
  dna,
  medium,
  motionLevel,
  pageType,
  prompt,
  style,
  tone
}: BuilderSemanticPreviewInput): SemanticPreviewSpec {
  const base = resolvePromptSemanticPreview(prompt);
  const brand = dna.referenceBrand ?? dna.title;
  const summary = `${brand}-leaning ${pageType.toLowerCase()} structure with ${style.title.toLowerCase()} styling, ${colorDirection.toLowerCase()} color direction, and ${motionLevel.toLowerCase()} motion.`;
  const archiveMatch = findArchiveMatch({
    brand,
    dnaSlug: dna.slug,
    pageType,
    prompt: normalizePrompt(prompt),
    styleSlug: style.slug
  });

  return {
    ...base,
    archiveMatchSlug: archiveMatch?.slug ?? base.archiveMatchSlug,
    brand,
    colorCue: style.visualTraits.color,
    density: style.visualTraits.density,
    headline: `${pageType} preview`,
    layout: dna.visualTraits.layout,
    motionCue: style.visualTraits.motion,
    notes: [
      {
        label: "Mode",
        value: "Free local preview. No Stitch or image model call is required."
      },
      {
        label: "Prompt signal",
        value: `${tone} / ${pageType} / ${medium}`
      },
      {
        label: "Brand DNA cue",
        value: dna.referenceBrand
          ? `${dna.referenceBrand}: ${dna.templateExample ?? dna.visualTraits.layout}`
          : dna.visualTraits.layout
      },
      {
        label: "Surface system",
        value: `${style.visualTraits.typography} ${style.visualTraits.color}`
      }
    ],
    scenes: buildScenes(pageType, brand, tone.toLowerCase(), summary),
    summary,
    tone: style.previewTone ?? dna.previewTone,
    vibe: `${tone.toLowerCase()} ${style.facet.toLowerCase()}`
  };
}
