export type CategoryKind = "dna" | "style";
export type PreviewTone =
  | "calm"
  | "warm"
  | "grid"
  | "creator"
  | "spatial"
  | "editorial"
  | "motion"
  | "mono"
  | "gradient"
  | "brutalist";

export type VisualTraits = {
  layout: string;
  typography: string;
  color: string;
  motion: string;
  imagery: string;
  density: string;
};

export type PromptVariationAngle = {
  slug: string;
  label: string;
  note: string;
  append: string;
};

export type CategoryCard = {
  slug: string;
  title: string;
  summary: string;
  mood: string;
  referenceBrand?: string;
  templateExample?: string;
  promptTip?: string;
  previewTone: PreviewTone;
  kind: CategoryKind;
  facet: string;
  medium: string;
  tags: string[];
  traits: string[];
  useCases: string[];
  prompt: string;
  doList: string[];
  avoidList: string[];
  visualTraits: VisualTraits;
  relatedSlugs: string[];
  variationAngles?: PromptVariationAngle[];
};

export type CollectionCard = {
  slug: string;
  title: string;
  description: string;
  includes: string[];
  artDirection: string;
  microNote: string;
  previewTone: PreviewTone;
  resultMood: string;
};

export type ResultWallItem = {
  id: string;
  title: string;
  caption: string;
  tone: PreviewTone;
  size: "wide" | "tall" | "square";
  meta: string;
  image?: ArchiveImageAsset;
};

export type ArchiveImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type PromptArchiveEntry = {
  slug: string;
  title: string;
  summary: string;
  brief: string;
  useCase: string;
  portfolioCategory: string;
  previewTone: PreviewTone;
  coverImage: ArchiveImageAsset;
  collectionSlug?: string;
  categorySlugs: string[];
  stitchExampleSlugs: string[];
  prompt: string;
  remixPrompt: string;
  curatorNote: string;
  outputFocus: string[];
  outputs: Array<{
    title: string;
    caption: string;
    meta: string;
    size: "wide" | "tall" | "square";
    image?: ArchiveImageAsset;
  }>;
};

export type BuilderPreset = {
  slug: string;
  title: string;
  summary: string;
  pageType: string;
  tone: string;
  medium: string;
  motionLevel: string;
  colorDirection: string;
  dnaSlug: string;
  styleSlug: string;
};

export type BuilderTheme = {
  slug: string;
  title: string;
  summary: string;
  cue: string;
  pageType: string;
  tone: string;
  medium: string;
  motionLevel: string;
  colorDirection: string;
  dnaSlug: string;
  styleSlug: string;
  previewTone: PreviewTone;
  captureImage?: ArchiveImageAsset;
};

export type BrandDnaGalleryEntry = {
  slug: string;
  title: string;
  summary: string;
  pageType: string;
  tone: string;
  medium: string;
  motionLevel: string;
  colorDirection: string;
  brandName: string;
  templateHint: string;
  dnaSlug: string;
  styleSlug: string;
  stitchPrompt: string;
  captureImage?: ArchiveImageAsset;
  captureMeta?: string;
};

export type StitchExamplePage = {
  slug: string;
  title: string;
  useCase: string;
  summary: string;
  styleSlug: string;
  pageType: string;
  tone: string;
  medium: string;
  motionLevel: string;
  colorDirection: string;
  stitchPrompt: string;
  outputNotes: string[];
  captureImage?: ArchiveImageAsset;
  captureMeta?: string;
};

const defaultAngles: PromptVariationAngle[] = [
  {
    slug: "sharper-hierarchy",
    label: "Sharper hierarchy",
    note: "Push scan clarity harder while keeping the same DNA.",
    append:
      "Increase the hierarchy contrast, make the headline-to-body scale more assertive, and tighten the scanning path without changing the core direction."
  },
  {
    slug: "softer-tone",
    label: "Softer tone",
    note: "Make the same direction more welcoming and approachable.",
    append:
      "Soften the overall tone slightly, reduce visual hardness, and make the composition feel more approachable while preserving structure."
  },
  {
    slug: "mobile-first",
    label: "Mobile-first",
    note: "Compress the composition for phone-sized scanning.",
    append:
      "Optimize the composition for mobile-first scanning with tighter sections, shorter copy blocks, and stronger first-screen clarity."
  }
];

const motionAngles: PromptVariationAngle[] = [
  {
    slug: "reduced-motion",
    label: "Reduced motion",
    note: "Keep rhythm while stripping out non-essential movement.",
    append:
      "Reduce non-essential motion, keep transitions purposeful, and make the page feel crisp and readable even without animation."
  },
  {
    slug: "more-energy",
    label: "More energy",
    note: "Push tempo and scene contrast harder.",
    append:
      "Increase directional movement, punch up scene changes, and make the rhythm feel faster and more immediate."
  },
  {
    slug: "mobile-first",
    label: "Mobile-first",
    note: "Translate the same motion language into a tighter mobile flow.",
    append:
      "Translate the same direction into a mobile-first composition with fewer on-screen elements and clearer scroll sequencing."
  }
];

function createStitchCaptureAsset(srcSlug: string, alt: string): ArchiveImageAsset {
  return {
    src: `/stitch-exports/real/${srcSlug}.png`,
    alt,
    width: 2880,
    height: 7200
  };
}

export const stitchCaptureAssets = {
  "apple-ai-launch": createStitchCaptureAsset(
    "apple-ai-launch",
    "Apple-inspired Stitch export for the quiet AI launch board"
  ),
  "apple-feature-story": createStitchCaptureAsset(
    "apple-feature-story",
    "Apple-inspired Stitch export for the product feature story page"
  ),
  "apple-pricing-proof": createStitchCaptureAsset(
    "apple-pricing-proof",
    "Apple-inspired Stitch export for the pricing and proof layout"
  ),
  "apple-ambient-device-launch": createStitchCaptureAsset(
    "apple-ambient-device-launch",
    "Apple-inspired Stitch export for the ambient device launch"
  ),
  "apple-creative-suite-story": createStitchCaptureAsset(
    "apple-creative-suite-story",
    "Apple-inspired Stitch export for the creative suite story"
  ),
  "apple-assistant-os-preview": createStitchCaptureAsset(
    "apple-assistant-os-preview",
    "Apple-inspired Stitch export for the assistant OS preview"
  ),
  "figma-workspace-home": createStitchCaptureAsset(
    "figma-workspace-home",
    "Figma-inspired Stitch export for the collaborative workspace home"
  ),
  "figma-community-marketplace": createStitchCaptureAsset(
    "figma-community-marketplace",
    "Figma-inspired Stitch export for the community file marketplace"
  ),
  "figma-multiplayer-tour": createStitchCaptureAsset(
    "figma-multiplayer-tour",
    "Figma-inspired Stitch export for the multiplayer product tour"
  ),
  "figma-plugin-directory": createStitchCaptureAsset(
    "figma-plugin-directory",
    "Figma-inspired Stitch export for the plugin directory"
  ),
  "figma-design-system-docs": createStitchCaptureAsset(
    "figma-design-system-docs",
    "Figma-inspired Stitch export for the design system docs"
  ),
  "figma-figjam-session": createStitchCaptureAsset(
    "figma-figjam-session",
    "Figma-inspired Stitch export for the FigJam session page"
  ),
  "airbnb-discovery-landing": createStitchCaptureAsset(
    "airbnb-discovery-landing",
    "Airbnb-inspired Stitch export for the stay discovery landing page"
  ),
  "airbnb-host-onboarding": createStitchCaptureAsset(
    "airbnb-host-onboarding",
    "Airbnb-inspired Stitch export for the host onboarding flow"
  ),
  "airbnb-experience-marketplace": createStitchCaptureAsset(
    "airbnb-experience-marketplace",
    "Airbnb-inspired Stitch export for the local experience marketplace"
  ),
  "airbnb-neighborhood-guide": createStitchCaptureAsset(
    "airbnb-neighborhood-guide",
    "Airbnb-inspired Stitch export for the neighborhood guide landing"
  ),
  "airbnb-group-trip-planner": createStitchCaptureAsset(
    "airbnb-group-trip-planner",
    "Airbnb-inspired Stitch export for the group trip planner"
  ),
  "airbnb-host-trust-center": createStitchCaptureAsset(
    "airbnb-host-trust-center",
    "Airbnb-inspired Stitch export for the host trust center"
  ),
  "ibm-solution-page": createStitchCaptureAsset(
    "ibm-solution-page",
    "IBM-inspired Stitch export for the enterprise solution overview"
  ),
  "ibm-architecture-explainer": createStitchCaptureAsset(
    "ibm-architecture-explainer",
    "IBM-inspired Stitch export for the architecture explainer"
  ),
  "ibm-docs-marketing-hybrid": createStitchCaptureAsset(
    "ibm-docs-marketing-hybrid",
    "IBM-inspired Stitch export for the docs and marketing hybrid page"
  ),
  "ibm-cloud-ops-console": createStitchCaptureAsset(
    "ibm-cloud-ops-console",
    "IBM-inspired Stitch export for the cloud ops console"
  ),
  "ibm-compliance-blueprint": createStitchCaptureAsset(
    "ibm-compliance-blueprint",
    "IBM-inspired Stitch export for the compliance blueprint"
  ),
  "ibm-automation-briefing": createStitchCaptureAsset(
    "ibm-automation-briefing",
    "IBM-inspired Stitch export for the executive automation briefing"
  ),
  "tiktok-campaign-drop": createStitchCaptureAsset(
    "tiktok-campaign-drop",
    "TikTok-inspired Stitch export for the creator campaign drop"
  ),
  "tiktok-live-commerce": createStitchCaptureAsset(
    "tiktok-live-commerce",
    "TikTok-inspired Stitch export for the live commerce launch"
  ),
  "tiktok-trend-challenge": createStitchCaptureAsset(
    "tiktok-trend-challenge",
    "TikTok-inspired Stitch export for the trend challenge hub"
  ),
  "tiktok-music-countdown": createStitchCaptureAsset(
    "tiktok-music-countdown",
    "TikTok-inspired Stitch export for the music release countdown"
  ),
  "tiktok-fandom-arena": createStitchCaptureAsset(
    "tiktok-fandom-arena",
    "TikTok-inspired Stitch export for the fandom arena"
  ),
  "tiktok-shop-sprint": createStitchCaptureAsset(
    "tiktok-shop-sprint",
    "TikTok-inspired Stitch export for the shop sprint event"
  ),
  "google-ai-lab-microsite": createStitchCaptureAsset(
    "google-ai-lab-microsite",
    "Google-inspired Stitch export for the AI lab microsite"
  ),
  "google-model-showcase": createStitchCaptureAsset(
    "google-model-showcase",
    "Google-inspired Stitch export for the AI model showcase"
  ),
  "google-toolkit-directory": createStitchCaptureAsset(
    "google-toolkit-directory",
    "Google-inspired Stitch export for the experimental toolkit directory"
  ),
  "instagram-creator-portfolio": createStitchCaptureAsset(
    "instagram-creator-portfolio",
    "Instagram-inspired Stitch export for the creator portfolio archive"
  ),
  "meta-spatial-launch": createStitchCaptureAsset(
    "meta-spatial-launch",
    "Meta-inspired Stitch export for the spatial product launch"
  ),
  "cargo-graphic-design-index": createStitchCaptureAsset(
    "cargo-graphic-design-index",
    "Cargo-inspired Stitch export for the graphic design portfolio index"
  ),
  "cargo-photography-journal": createStitchCaptureAsset(
    "cargo-photography-journal",
    "Cargo-inspired Stitch export for the photography journal portfolio"
  ),
  "cargo-architecture-monograph": createStitchCaptureAsset(
    "cargo-architecture-monograph",
    "Cargo-inspired Stitch export for the architecture monograph portfolio"
  ),
  "cargo-fashion-lookbook": createStitchCaptureAsset(
    "cargo-fashion-lookbook",
    "Cargo-inspired Stitch export for the fashion lookbook portfolio"
  ),
  "cargo-luxury-runway-house": createStitchCaptureAsset(
    "cargo-luxury-runway-house",
    "Cargo-inspired Stitch export for the luxury runway house portfolio"
  ),
  "cargo-streetwear-drop-journal": createStitchCaptureAsset(
    "cargo-streetwear-drop-journal",
    "Cargo-inspired Stitch export for the streetwear drop journal portfolio"
  ),
  "cargo-art-direction-moodboard": createStitchCaptureAsset(
    "cargo-art-direction-moodboard",
    "Cargo-inspired Stitch export for the art direction moodboard portfolio"
  ),
  "cargo-type-specimen-archive": createStitchCaptureAsset(
    "cargo-type-specimen-archive",
    "Cargo-inspired Stitch export for the type specimen archive portfolio"
  ),
  "cargo-studio-directory": createStitchCaptureAsset(
    "cargo-studio-directory",
    "Cargo-inspired Stitch export for the studio directory portfolio"
  ),
  "sokoglam-editorial-commerce": createStitchCaptureAsset(
    "sokoglam-editorial-commerce",
    "Soko Glam-inspired Stitch export for the editorial K-beauty commerce homepage"
  ),
  "goka-social-commerce": createStitchCaptureAsset(
    "goka-social-commerce",
    "Goka-inspired Stitch export for the Latin America K-beauty social-commerce homepage"
  ),
  "miin-omnichannel-routine": createStitchCaptureAsset(
    "miin-omnichannel-routine",
    "MiiN-inspired Stitch export for the European omnichannel K-beauty routine homepage"
  ),
  "innisfree-ingredient-merchandising": createStitchCaptureAsset(
    "innisfree-ingredient-merchandising",
    "Innisfree-inspired Stitch export for the Southeast Asia ingredient-led merchandising homepage"
  ),
  "aesop-editorial-commerce": createStitchCaptureAsset(
    "aesop-editorial-commerce",
    "Aesop-inspired Stitch export for the editorial skincare commerce homepage"
  ),
  "allbirds-friendly-dtc": createStitchCaptureAsset(
    "allbirds-friendly-dtc",
    "Allbirds-inspired Stitch export for the friendly direct-to-consumer ecommerce homepage"
  ),
  "gymshark-launch-commerce": createStitchCaptureAsset(
    "gymshark-launch-commerce",
    "Gymshark-inspired Stitch export for the high-energy launch commerce homepage"
  ),
  "latam-kbeauty-clubfront": createStitchCaptureAsset(
    "latam-kbeauty-clubfront",
    "Hori-inspired Stitch export for the ritual-led K-beauty clubfront homepage"
  ),
  "natura-botanical-ritual-shop": createStitchCaptureAsset(
    "natura-botanical-ritual-shop",
    "Natura-inspired Stitch export for the botanical ritual commerce homepage"
  ),
  "boticario-gift-fragrance-grid": createStitchCaptureAsset(
    "boticario-gift-fragrance-grid",
    "O Boticario-inspired Stitch export for the fragrance gift commerce homepage"
  ),
  "yanbal-consultant-beauty-club": createStitchCaptureAsset(
    "yanbal-consultant-beauty-club",
    "Karita Koreana-inspired Stitch export for the conversion-led K-beauty storefront"
  ),
  "neo-tokyo-night-drive-portfolio": createStitchCaptureAsset(
    "neo-tokyo-night-drive-portfolio",
    "Neo Tokyo-inspired Stitch export for the cinematic art direction portfolio"
  ),
  "shibuya-replicant-archive": createStitchCaptureAsset(
    "shibuya-replicant-archive",
    "Blade Runner and Shibuya-inspired Stitch export for the noir art direction archive"
  ),
  "readymag-book-promo-editorial": createStitchCaptureAsset(
    "readymag-book-promo-editorial",
    "Readymag-inspired Stitch export for the editorial book promo microsite"
  ),
  "readymag-cultural-brand-studio": createStitchCaptureAsset(
    "readymag-cultural-brand-studio",
    "Readymag-inspired Stitch export for the cultural branding studio website"
  ),
  "readymag-bookmaker-index-portfolio": createStitchCaptureAsset(
    "readymag-bookmaker-index-portfolio",
    "Readymag-inspired Stitch export for the bookmaker index portfolio"
  ),
  "readymag-minimal-designer-grid": createStitchCaptureAsset(
    "readymag-minimal-designer-grid",
    "Readymag-inspired Stitch export for the minimal designer portfolio grid"
  ),
  "readymag-relief-gallery-space": createStitchCaptureAsset(
    "readymag-relief-gallery-space",
    "Readymag-inspired Stitch export for the cultural gallery website"
  ),
  "readymag-web3-creator-broadcast": createStitchCaptureAsset(
    "readymag-web3-creator-broadcast",
    "Readymag-inspired Stitch export for the web3 creator broadcast site"
  )
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/dna", label: "Brand DNA" },
  { href: "/preview", label: "Preview" },
  { href: "/analysis", label: "Template Analysis" },
  { href: "/builder", label: "Prompt Builder" }
] as const;

export const featuredDna: CategoryCard[] = [
  {
    slug: "calm-precision-ui",
    title: "Calm Precision UI",
    summary:
      "Quiet premium structure with high clarity, generous spacing, and crisp hierarchy.",
    mood: "System calm",
    referenceBrand: "Apple",
    templateExample: "Product launch hero / keynote-style product story",
    promptTip:
      "Name the restrained palette, measured spacing, soft depth, and precise CTA placement directly in the prompt.",
    previewTone: "calm",
    kind: "dna",
    facet: "Quiet premium",
    medium: "2D",
    tags: ["Quiet premium", "Minimal", "Clarity", "Premium"],
    traits: ["Clean layout", "Soft depth", "Quiet premium", "Readable"],
    useCases: ["Landing", "Product story", "Launch"],
    prompt:
      "Design a calm precision product landing page with generous spacing, restrained colors, crisp typography, subtle depth, and refined call-to-action placement.",
    doList: [
      "Use strong spacing rhythm and clear hierarchy.",
      "Keep surfaces light and intentional rather than decorative.",
      "Separate CTA zones cleanly from descriptive content."
    ],
    avoidList: [
      "Do not overload the page with glowing effects or badge clutter.",
      "Avoid noisy gradients and unnecessary panel chrome.",
      "Do not let secondary content compete with the hero."
    ],
    visualTraits: {
      layout: "Centered hero with measured section rhythm and obvious scanning path.",
      typography: "Crisp sans-serif hierarchy with large contrast between display and body copy.",
      color: "Restrained neutrals with one or two disciplined accents.",
      motion: "Subtle depth and gentle transitions, never hyperactive movement.",
      imagery: "Minimal product visuals or polished product renders.",
      density: "Airy and selective. Every section must have room to breathe."
    },
    relatedSlugs: [
      "premium-gradient-atmosphere",
      "minimal-monochrome",
      "enterprise-grid-system"
    ]
  },
  {
    slug: "warm-global-hospitality",
    title: "Warm Global Hospitality",
    summary:
      "Friendly geometry, warm neutrals, and practical trust-building rhythm.",
    mood: "Human warmth",
    referenceBrand: "Airbnb",
    templateExample: "Stay discovery page / booking landing",
    promptTip:
      "Call out rounded modules, human photography, approachable copy, and a booking-flow structure instead of just saying friendly.",
    previewTone: "warm",
    kind: "dna",
    facet: "Human warmth",
    medium: "2D",
    tags: ["Friendly", "Hospitality", "Trust", "Rounded"],
    traits: ["Rounded geometry", "Warm palette", "Friendly photos", "Inclusive"],
    useCases: ["Booking", "Marketplace", "Service"],
    prompt:
      "Create a warm hospitality-style homepage with rounded geometry, warm neutral colors, approachable typography, and a welcoming booking-flow structure.",
    doList: [
      "Use rounded modules and practical trust cues.",
      "Keep copy approachable and human-centered.",
      "Show friendly imagery or lived-in product context."
    ],
    avoidList: [
      "Avoid cold enterprise stiffness and harsh contrast blocks.",
      "Do not make the page feel too sterile or sparse.",
      "Avoid overly technical product framing."
    ],
    visualTraits: {
      layout: "Comfortable card rhythm with obvious path from discovery to trust to action.",
      typography: "Readable sans-serif with gentle tone rather than hard precision.",
      color: "Warm neutrals, soft accents, and low-friction contrast.",
      motion: "Subtle delight, mild transitions, no aggressive movement.",
      imagery: "Human-led photography, environments, and social proof.",
      density: "Balanced. Enough content to reassure without feeling corporate."
    },
    relatedSlugs: [
      "editorial-grid-2d",
      "calm-precision-ui",
      "premium-gradient-atmosphere"
    ]
  },
  {
    slug: "enterprise-grid-system",
    title: "Enterprise Grid System",
    summary:
      "Structured B2B design language built on alignment, modularity, and precision.",
    mood: "Operational trust",
    referenceBrand: "IBM",
    templateExample: "Enterprise product marketing page / system-led solution page",
    promptTip:
      "Specify modular proof sections, exact grid alignment, restrained accents, and systematic type hierarchy for a more IBM-like result.",
    previewTone: "grid",
    kind: "dna",
    facet: "B2B systems",
    medium: "2D",
    tags: ["Systematic", "B2B", "Grid", "Enterprise"],
    traits: ["Strict grid", "Modular sections", "Precise scale", "System-first"],
    useCases: ["Landing", "Dashboard", "Docs"],
    prompt:
      "Design a structured enterprise product page with rigorous grid alignment, modular sections, restrained colors, and confident information hierarchy.",
    doList: [
      "Use modular section logic and explicit content grouping.",
      "Make information hierarchy legible in one fast scan.",
      "Keep spacing and type scale mathematically consistent."
    ],
    avoidList: [
      "Avoid playful drift or decorative asymmetry.",
      "Do not rely on visual gimmicks to create authority.",
      "Avoid weak hierarchy between section types."
    ],
    visualTraits: {
      layout: "Grid-led structure with predictable module widths and confident section sequencing.",
      typography: "Systematic scale with clear labels, subheads, and data emphasis.",
      color: "Restrained palette with accents used for signal rather than atmosphere.",
      motion: "Purposeful and limited. Movement should support information scanning.",
      imagery: "Product UI, diagrams, or technical visuals rather than lifestyle scenes.",
      density: "Moderate to high, but carefully ordered."
    },
    relatedSlugs: [
      "minimal-monochrome",
      "motion-first-canvas",
      "calm-precision-ui"
    ]
  },
  {
    slug: "creator-velocity",
    title: "Creator Velocity",
    summary:
      "Fast, punchy, creator-native composition built for immediacy and social energy.",
    mood: "High momentum",
    referenceBrand: "TikTok",
    templateExample: "Campaign drop page / creator-first launch microsite",
    promptTip:
      "Describe high-immediacy hooks, creator-native overlays, vertical-video pacing, and social scan hierarchy in the prompt.",
    previewTone: "creator",
    kind: "dna",
    facet: "Creator energy",
    medium: "Animation",
    tags: ["Creator", "Social", "Motion", "Youthful"],
    traits: ["Bold hooks", "Overlay text", "Fast scan", "Playful motion"],
    useCases: ["Campaign", "Drop", "Launch"],
    prompt:
      "Create a creator-first campaign page with punchy contrast, social-native composition, bold hooks, playful overlays, and a high-immediacy tone.",
    doList: [
      "Lead with an immediate hook and obvious visual energy.",
      "Use fast-scanning content blocks and punchy overlays.",
      "Keep the tone authentic rather than over-produced."
    ],
    avoidList: [
      "Avoid static luxury pacing or long copy-heavy sections.",
      "Do not polish the interface until it loses native energy.",
      "Avoid muted hierarchy and low-contrast calls to action."
    ],
    visualTraits: {
      layout: "Hook-led composition with fast transitions between scenes and content blocks.",
      typography: "High-contrast headlines, compact supporting copy, and overlay text moments.",
      color: "Punchy contrast and expressive accent use.",
      motion: "Fast, social-native, and purposeful. Energy matters.",
      imagery: "Creator-led media, vertical framing, bold crop logic.",
      density: "Dense enough to feel alive, but still scannable."
    },
    relatedSlugs: [
      "motion-first-canvas",
      "brutalist-contrast",
      "immersive-3d"
    ],
    variationAngles: motionAngles
  },
  {
    slug: "collaborative-canvas-system",
    title: "Collaborative Canvas System",
    summary:
      "Dense pane layout, shared-workspace cues, and crisp tool-like hierarchy for collaborative products.",
    mood: "Tool fluency",
    referenceBrand: "Figma",
    templateExample: "Collaborative canvas workspace / community file landing",
    promptTip:
      "Mention layered panes, utility rails, collaboration cues, and canvas framing so the result feels like a product tool, not a marketing site.",
    previewTone: "spatial",
    kind: "dna",
    facet: "Collaborative tooling",
    medium: "2D",
    tags: ["Figma", "Workspace", "Tooling", "Collaboration"],
    traits: ["Pane layout", "Utility rails", "Shared cursors", "System clarity"],
    useCases: ["Workspace", "Dashboard", "Product"],
    prompt:
      "Design a collaborative product page with canvas framing, layered utility panes, crisp rails, live-collaboration cues, and a strong sense of tool fluency. Keep the layout dense but legible and avoid decorative marketing fluff.",
    doList: [
      "Use panes, rails, and modular tool surfaces to create structure.",
      "Let collaboration cues feel active but not chaotic.",
      "Keep labels and controls sharp enough to imply a real product system."
    ],
    avoidList: [
      "Avoid empty luxury spacing that removes the tool feeling.",
      "Do not overload the page with random floating UI chips.",
      "Avoid burying the collaborative aspect under generic SaaS copy."
    ],
    visualTraits: {
      layout: "Canvas-led composition with side rails, pane stacking, and a visible working surface.",
      typography: "Utility-first hierarchy with crisp labels, sharp subheads, and compact supporting copy.",
      color: "Mostly neutral with small functional accents and selected highlight states.",
      motion: "Cursor drift, pane reveals, and subtle spatial transitions that imply live collaboration.",
      imagery: "Workspace captures, interface panes, and collaborative boards.",
      density: "Moderate to high, but ordered enough to remain readable."
    },
    relatedSlugs: [
      "enterprise-grid-system",
      "motion-first-canvas",
      "minimal-monochrome"
    ]
  },
  {
    slug: "modular-research-surface",
    title: "Modular Research Surface",
    summary:
      "Primary-color geometry, modular demo shelves, and research clarity shaped into a usable product story.",
    mood: "Research utility",
    referenceBrand: "Google",
    templateExample: "AI lab microsite / experimental model showcase",
    promptTip:
      "Call out primary-color geometry, modular storytelling, demo shelves, and research-tool clarity so the result feels exploratory without losing usability.",
    previewTone: "gradient",
    kind: "dna",
    facet: "Research systems",
    medium: "3D",
    tags: ["Google", "Research", "Modular", "Experimental"],
    traits: ["Primary geometry", "Demo shelves", "Research clarity", "Playful depth"],
    useCases: ["Microsite", "Lab", "Product demo"],
    prompt:
      "Design a Google-inspired AI product page with primary-color geometry, modular demo sections, crisp research storytelling, playful 3D forms, and a clear usable hierarchy.",
    doList: [
      "Use modular sections that feel open, experimental, and easy to scan.",
      "Let primary-color geometry add character without overwhelming the interface.",
      "Keep demo surfaces clear enough to feel like usable research tools."
    ],
    avoidList: [
      "Avoid turning the page into a generic corporate docs layout.",
      "Do not use so many colors that the hierarchy collapses.",
      "Avoid abstract experimentation that removes product clarity."
    ],
    visualTraits: {
      layout: "Open modular storytelling with research shelves, demo bands, and clear product entry points.",
      typography: "Friendly but precise sans-serif hierarchy with strong explanatory subheads.",
      color: "Primary-color accents and selective geometry over calm neutral surfaces.",
      motion: "Light, helpful movement that implies experimentation rather than spectacle.",
      imagery: "Playful 3D objects, model demos, and modular experiment previews.",
      density: "Balanced. Open enough to explore, structured enough to understand quickly."
    },
    relatedSlugs: [
      "collaborative-canvas-system",
      "immersive-3d",
      "editorial-grid-2d"
    ]
  }
];

export const styleCategories: CategoryCard[] = [
  {
    slug: "immersive-3d",
    title: "Immersive 3D",
    summary: "Cinematic hero objects, layered depth, and atmospheric lighting.",
    mood: "Spatial drama",
    previewTone: "spatial",
    kind: "style",
    facet: "3D",
    medium: "3D",
    tags: ["3D", "Launch", "Cinematic", "Spatial"],
    traits: ["3D hero", "Lighting hierarchy", "Depth", "Sparse UI"],
    useCases: ["Landing", "Launch", "Product story"],
    prompt:
      "Design an immersive 3D landing page with a cinematic hero object, layered depth, atmospheric lighting, and clear CTA separation.",
    doList: [
      "Choose one focal object and build the scene around it.",
      "Use lighting to organize depth and hierarchy.",
      "Keep surrounding UI sparse so the object carries the moment."
    ],
    avoidList: [
      "Do not stack multiple hero objects without hierarchy.",
      "Avoid noisy supporting UI around the 3D moment.",
      "Do not bury the CTA in visual spectacle."
    ],
    visualTraits: {
      layout: "Hero-first, spatial framing, and strong negative space around the focal object.",
      typography: "Minimal typography with premium scale and strong restraint.",
      color: "Atmospheric color fields and lighting-led contrast.",
      motion: "Camera drift, object rotation, or scroll-linked reveal used sparingly.",
      imagery: "Rendered objects and cinematic staging.",
      density: "Sparse around the hero, more informative below the fold."
    },
    relatedSlugs: [
      "premium-gradient-atmosphere",
      "creator-velocity",
      "calm-precision-ui"
    ]
  },
  {
    slug: "editorial-grid-2d",
    title: "Editorial Grid 2D",
    summary:
      "Magazine pacing translated into web layout rhythm and type contrast.",
    mood: "Cultural polish",
    previewTone: "editorial",
    kind: "style",
    facet: "Editorial",
    medium: "2D",
    tags: ["Editorial", "Portfolio", "Culture", "Typography"],
    traits: ["Asymmetric grid", "Serif contrast", "Captions", "Whitespace"],
    useCases: ["Portfolio", "Publication", "Studio"],
    prompt:
      "Create a 2D editorial website with asymmetric grid composition, serif and sans pairing, strong image-text rhythm, and magazine-inspired pacing.",
    doList: [
      "Let crop scale and margin logic create hierarchy.",
      "Use captions, labels, and subheads to support rhythm.",
      "Pair expressive display type with practical body copy."
    ],
    avoidList: [
      "Avoid repeating identical card modules for every section.",
      "Do not flatten the page into generic startup symmetry.",
      "Avoid weak art direction or inconsistent image treatment."
    ],
    visualTraits: {
      layout: "Asymmetric, crop-driven, with rhythm between text and imagery.",
      typography: "Serif and sans pairing with strong display contrast.",
      color: "Controlled palette, often restrained, allowing art direction to lead.",
      motion: "Subtle page pacing, mostly driven by layout rather than animation.",
      imagery: "Curated stills, photography, or portfolio imagery.",
      density: "Selective and high taste rather than information-heavy."
    },
    relatedSlugs: [
      "minimal-monochrome",
      "warm-global-hospitality",
      "calm-precision-ui"
    ]
  },
  {
    slug: "motion-first-canvas",
    title: "Motion-first Canvas",
    summary:
      "Scroll choreography and staged reveals with readable fallback structure.",
    mood: "Choreographed energy",
    previewTone: "motion",
    kind: "style",
    facet: "Motion",
    medium: "Animation",
    tags: ["Motion", "Interactive", "Scroll", "Launch"],
    traits: ["Staggered reveals", "Directional flow", "Tempo", "Transitions"],
    useCases: ["Campaign", "Launch", "Product story"],
    prompt:
      "Design a motion-first landing page with choreographed reveals, directional transitions, layered scene changes, and clear readable sections.",
    doList: [
      "Define motion hierarchy before adding decorative transitions.",
      "Make each section feel like a distinct scene with clear intent.",
      "Ensure the page remains readable when motion is reduced."
    ],
    avoidList: [
      "Avoid constant animation across every surface.",
      "Do not let motion obscure hierarchy or reading order.",
      "Avoid decorative loops without narrative value."
    ],
    visualTraits: {
      layout: "Scene-based flow with transition moments built into section order.",
      typography: "Supports movement with directional emphasis and compact scanning.",
      color: "Can be neutral or expressive, but motion does the heavy lifting.",
      motion: "Primary design material. Rhythm is central.",
      imagery: "Can combine UI, media, or abstract surfaces as motion anchors.",
      density: "Moderate, with pacing used to separate content clusters."
    },
    relatedSlugs: [
      "creator-velocity",
      "immersive-3d",
      "premium-gradient-atmosphere"
    ],
    variationAngles: motionAngles
  },
  {
    slug: "minimal-monochrome",
    title: "Minimal Monochrome",
    summary:
      "Strict neutral palette with tension created by spacing and typography.",
    mood: "Design discipline",
    previewTone: "mono",
    kind: "style",
    facet: "Minimal",
    medium: "2D",
    tags: ["Minimal", "Monochrome", "Agency", "Structure"],
    traits: ["High contrast neutrals", "Bold type", "Few colors", "Precision"],
    useCases: ["Portfolio", "Landing", "Agency"],
    prompt:
      "Create a minimal monochrome website with disciplined spacing, bold typography, limited accents, and a design-forward composition.",
    doList: [
      "Use contrast and spacing as the main source of tension.",
      "Limit accents and let typography carry weight.",
      "Keep the section rhythm deliberate and sparse."
    ],
    avoidList: [
      "Avoid muddy mid-tones and half-committed accents.",
      "Do not introduce random colorful chips or stickers.",
      "Avoid weak type hierarchy hidden inside minimalism."
    ],
    visualTraits: {
      layout: "Grid discipline with strong use of white or negative space.",
      typography: "High-impact typography becomes the main visual system.",
      color: "Black, white, gray, and one restrained accent at most.",
      motion: "Minimal and precise.",
      imagery: "Selective, often stark, sometimes absent.",
      density: "Low to moderate, but never empty by accident."
    },
    relatedSlugs: [
      "editorial-grid-2d",
      "enterprise-grid-system",
      "calm-precision-ui"
    ]
  },
  {
    slug: "premium-gradient-atmosphere",
    title: "Premium Gradient Atmosphere",
    summary:
      "Soft light fields and premium color transitions instead of flat backgrounds.",
    mood: "Atmospheric digital luxury",
    previewTone: "gradient",
    kind: "style",
    facet: "Gradient",
    medium: "2D",
    tags: ["Gradient", "AI", "Premium", "Launch"],
    traits: ["Glow layers", "Soft blends", "Color transitions", "Elegant contrast"],
    useCases: ["Landing", "Launch", "AI SaaS"],
    prompt:
      "Design a premium atmospheric landing page using controlled gradients, soft glow layers, elegant color transitions, and restrained UI overlays.",
    doList: [
      "Treat gradients as structured lighting, not decoration.",
      "Use glow to frame the hero or key product surface.",
      "Keep text contrast strong against the atmosphere."
    ],
    avoidList: [
      "Avoid rainbow overload and muddy blended fields.",
      "Do not place dense copy over weak gradient contrast.",
      "Avoid too many luminous surfaces at the same time."
    ],
    visualTraits: {
      layout: "Hero-first or section-led, with atmosphere used to frame key moments.",
      typography: "Premium sans or serif pairing with strong contrast against soft backgrounds.",
      color: "Gradient-led, but tightly controlled.",
      motion: "Soft drift and light movement are more effective than aggressive transitions.",
      imagery: "Can be abstract, rendered, or product-led.",
      density: "Moderate, allowing the atmosphere room to breathe."
    },
    relatedSlugs: [
      "immersive-3d",
      "calm-precision-ui",
      "motion-first-canvas"
    ]
  },
  {
    slug: "bauhaus-color-block-3d",
    title: "Bauhaus Color Block 3D",
    summary:
      "Primary color geometry, sculptural depth, and disciplined playful interaction.",
    mood: "Playful rigor",
    previewTone: "spatial",
    kind: "style",
    facet: "Bauhaus",
    medium: "3D",
    tags: ["Bauhaus", "3D", "Color", "Interactive"],
    traits: ["Primary shapes", "Color planes", "3D blocks", "Grid order"],
    useCases: ["Landing", "Exhibition", "Portfolio"],
    prompt:
      "Design a Bauhaus-inspired 3D website with primary color geometry, sculptural blocks, disciplined grid alignment, playful interaction, and strong spatial hierarchy.",
    doList: [
      "Use circles, bars, and planes as structural composition tools.",
      "Balance vivid colors with a disciplined grid so the result still feels designed.",
      "Let one sculptural object lead each section."
    ],
    avoidList: [
      "Avoid random rainbow treatment without composition logic.",
      "Do not let every section compete with the hero object.",
      "Avoid soft luxury gradients that weaken the Bauhaus character."
    ],
    visualTraits: {
      layout: "Grid-based composition with sculptural interruptions and bold negative space.",
      typography: "Clean geometric type paired with assertive scale shifts.",
      color: "Primary and secondary color fields used with deliberate contrast.",
      motion: "Rotations, parallax planes, and object reveals used with restraint.",
      imagery: "Abstract forms, rendered blocks, and graphic geometry.",
      density: "Open, but energized by color and spatial tension."
    },
    relatedSlugs: [
      "immersive-3d",
      "modern-art-modular",
      "motion-first-canvas"
    ]
  },
  {
    slug: "modern-art-modular",
    title: "Modern Art Modular",
    summary:
      "Gallery-like modular framing with bold color placement and exhibition pacing.",
    mood: "Curated vibrancy",
    previewTone: "gradient",
    kind: "style",
    facet: "Modern Art",
    medium: "2D",
    tags: ["Modern art", "Gallery", "Color", "Editorial"],
    traits: ["Modular frames", "Color accents", "Gallery captions", "Exhibition rhythm"],
    useCases: ["Portfolio", "Culture", "Studio"],
    prompt:
      "Create a modern-art inspired website with modular framed sections, exhibition-style captions, bold but selective color fields, and curated pacing that feels like a digital gallery.",
    doList: [
      "Use color blocks as curatorial emphasis, not constant decoration.",
      "Let captions and labels feel like gallery metadata.",
      "Keep the rhythm paced like an exhibition walk-through."
    ],
    avoidList: [
      "Avoid overcrowding the page with too many accent colors at once.",
      "Do not flatten the layout into identical cards.",
      "Avoid generic startup copy structure."
    ],
    visualTraits: {
      layout: "Modular sections that feel framed and intentionally sequenced.",
      typography: "Mixes strong display type with smaller metadata-like labels.",
      color: "Selective saturated color fields against neutral backgrounds.",
      motion: "Gallery-like transitions and object emphasis rather than constant movement.",
      imagery: "Art direction, posters, stills, or graphic compositions.",
      density: "Moderate, with room for curation and visual pauses."
    },
    relatedSlugs: [
      "editorial-grid-2d",
      "bauhaus-color-block-3d",
      "premium-gradient-atmosphere"
    ]
  },
  {
    slug: "glass-lens-interface",
    title: "Glass Lens Interface",
    summary:
      "Frosted layers, sharp color lenses, and premium translucency used as focus points.",
    mood: "Lens depth",
    previewTone: "gradient",
    kind: "style",
    facet: "Glass",
    medium: "2D",
    tags: ["Glass", "Lens", "Premium", "UI"],
    traits: ["Frosted panels", "Lens blur", "Layered depth", "Highlight states"],
    useCases: ["Landing", "Dashboard", "Product"],
    prompt:
      "Design a glass-lens interface with frosted panels, selective blur, layered translucent surfaces, and crisp text contrast. Keep the glass effect controlled and use it to frame focus areas rather than every panel.",
    doList: [
      "Use glass only where focus or depth needs emphasis.",
      "Keep text contrast sharp and readable on top of the lens surfaces.",
      "Let the underlying grid stay visible through the effect."
    ],
    avoidList: [
      "Avoid making every panel translucent.",
      "Do not use blur where hierarchy would be clearer without it.",
      "Avoid muddy color stacking and low-contrast text."
    ],
    visualTraits: {
      layout: "Layered panels that hover over a visible underlying structure.",
      typography: "Crisp sans-serif hierarchy with strong contrast against soft materials.",
      color: "Controlled luminous accents and restrained glass tints.",
      motion: "Subtle drift and transparency transitions rather than loud choreography.",
      imagery: "Product UI, floating panels, and lens-like overlays.",
      density: "Moderate with focus framed through material contrast."
    },
    relatedSlugs: [
      "premium-gradient-atmosphere",
      "calm-precision-ui",
      "bauhaus-color-block-3d"
    ]
  },
  {
    slug: "kinetic-type-signal",
    title: "Kinetic Type Signal",
    summary:
      "Typography-led motion, strong rhythm, and bold scan sequencing.",
    mood: "Type momentum",
    previewTone: "motion",
    kind: "style",
    facet: "Kinetic Type",
    medium: "Animation",
    tags: ["Kinetic", "Typography", "Motion", "Campaign"],
    traits: ["Animated type", "Tempo shifts", "Scan rhythm", "Directional motion"],
    useCases: ["Campaign", "Launch", "Culture"],
    prompt:
      "Create a kinetic typography web experience where motion is driven by large type, directional scene shifts, strong pacing cues, and crisp reading fallbacks.",
    doList: [
      "Use motion to reinforce the scan order of the typography.",
      "Make static fallback compositions readable without animation.",
      "Let one or two type moments dominate each scene."
    ],
    avoidList: [
      "Avoid animating every line at once.",
      "Do not let motion replace hierarchy.",
      "Avoid decorative loops that add no editorial value."
    ],
    visualTraits: {
      layout: "Scene-based composition led by type transitions and directional flow.",
      typography: "Large-scale type becomes the main compositional object.",
      color: "Neutral or expressive, but always subordinate to type rhythm.",
      motion: "High-tempo type choreography with clear pauses and resets.",
      imagery: "Optional. Type can carry the visual identity alone.",
      density: "Moderate, with motion separating clusters of content."
    },
    relatedSlugs: [
      "motion-first-canvas",
      "creator-velocity",
      "modern-art-modular"
    ],
    variationAngles: motionAngles
  },
  {
    slug: "brutalist-contrast",
    title: "Brutalist Contrast",
    summary:
      "Raw blocks, oversized typography, visible borders, and deliberate tension.",
    mood: "Experimental edge",
    previewTone: "brutalist",
    kind: "style",
    facet: "Brutalist",
    medium: "2D",
    tags: ["Brutalist", "Experimental", "Culture", "Contrast"],
    traits: ["Visible borders", "Oversized type", "Stark contrast", "Raw rhythm"],
    useCases: ["Campaign", "Portfolio", "Event"],
    prompt:
      "Create a brutalist-inspired website with oversized typography, visible borders, stark contrast blocks, and intentional raw composition.",
    doList: [
      "Make the tension deliberate and typographically anchored.",
      "Use visible section cuts and obvious utility.",
      "Let contrast create attitude instead of decorative polish."
    ],
    avoidList: [
      "Avoid turning rawness into accidental mess.",
      "Do not combine too many conflicting fonts or motifs.",
      "Avoid low-contrast failures in the name of experimentation."
    ],
    visualTraits: {
      layout: "Abrupt sectional rhythm with obvious breaks and strong borders.",
      typography: "Oversized and assertive. Type is the main weapon.",
      color: "Sharp contrast and disciplined bold accents.",
      motion: "Optional. The style can remain powerful even while mostly static.",
      imagery: "Can be raw, documentary, or absent.",
      density: "Medium to high, but confrontation is intentional."
    },
    relatedSlugs: [
      "creator-velocity",
      "motion-first-canvas",
      "editorial-grid-2d"
    ]
  }
];

export const allCategories = [...featuredDna, ...styleCategories];

export const dnaStitchExamples: Record<string, StitchExamplePage[]> = {
  "calm-precision-ui": [
    {
      slug: "apple-ambient-device-launch",
      title: "Ambient Device Launch",
      useCase: "Apple-style hardware landing",
      summary:
        "A sparse product reveal built around one floating desk device, one measured CTA, and a black-to-silver premium stage.",
      styleSlug: "premium-gradient-atmosphere",
      pageType: "Landing page",
      tone: "Ambient premium",
      medium: "3D",
      motionLevel: "Low",
      colorDirection: "Black, silver, and one disciplined light accent",
      captureImage: stitchCaptureAssets["apple-ambient-device-launch"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Design an Apple-inspired landing page for a desk AI device. Use a black-to-silver hero stage, floating hardware render, a huge restrained headline, minimal navigation, and one section showing ecosystem pairing across phone, desktop, and audio. Keep the layout sparse, glossy, and expensive.",
      outputNotes: [
        "The first screen should feel like a keynote product reveal, not a marketing page",
        "One hardware render should dominate the composition with disciplined supporting copy",
        "Ecosystem proof should stay quiet and architectural"
      ]
    },
    {
      slug: "apple-creative-suite-story",
      title: "Creative Suite Story",
      useCase: "Apple-style editorial feature story",
      summary:
        "A chapter-led product story for a creative tool, using large product stills and restrained editorial pacing.",
      styleSlug: "minimal-monochrome",
      pageType: "Feature story",
      tone: "Editorial and polished",
      medium: "2D",
      motionLevel: "Subtle",
      colorDirection: "Muted neutrals with one luminous ribbon",
      captureImage: stitchCaptureAssets["apple-creative-suite-story"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Create an Apple-like feature story page for a creative software suite. Use giant product stills, split editorial chapters, muted neutral surfaces, one luminous gradient ribbon, and a workflow story that moves from capture to edit to publish. Remove all marketing clutter.",
      outputNotes: [
        "Large chapters should feel curated and cinematic without becoming noisy",
        "Workflow storytelling should move clearly from section to section",
        "The product should stay central while the UI chrome remains minimal"
      ]
    },
    {
      slug: "apple-assistant-os-preview",
      title: "Assistant OS Preview",
      useCase: "Apple-style OS reveal",
      summary:
        "A keynote-like operating system preview with frosted device framing, stacked feature bands, and calm comparison moments.",
      styleSlug: "glass-lens-interface",
      pageType: "Product overview",
      tone: "Keynote clarity",
      medium: "2D",
      motionLevel: "Minimal",
      colorDirection: "Monochrome with soft frosted overlays",
      captureImage: stitchCaptureAssets["apple-assistant-os-preview"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Design an Apple-inspired OS preview page for an AI assistant. Use soft frosted device frames, stacked feature bands, one comparison strip, and calm monochrome depth. The page should feel like a keynote product reveal, not a SaaS dashboard.",
      outputNotes: [
        "Feature bands should feel precise and controlled instead of sales-led",
        "The device frame needs to act as the main proof surface",
        "Comparison sections should stay calm and readable"
      ]
    },
    {
      slug: "apple-ai-launch",
      title: "Quiet AI Launch Hero",
      useCase: "Apple-style launch page",
      summary:
        "A restrained product hero for AI tools that need premium clarity, soft depth, and one obvious call to action.",
      styleSlug: "minimal-monochrome",
      pageType: "Landing page",
      tone: "Calm premium",
      medium: "2D",
      motionLevel: "Subtle",
      colorDirection: "Soft monochrome with cobalt signal",
      captureImage: stitchCaptureAssets["apple-ai-launch"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Design a premium AI product landing page in an Apple-inspired direction with generous white space, quiet monochrome surfaces, crisp product typography, subtle depth, and one disciplined cobalt highlight. Keep the hero centered, reduce chrome, and make the CTA feel precise and expensive rather than loud.",
      outputNotes: [
        "One dominant product statement with a short trust-building subhead",
        "Clean product media framed by generous negative space",
        "Minimal section rhythm with one proof surface and one primary CTA"
      ]
    },
    {
      slug: "apple-feature-story",
      title: "Product Feature Story",
      useCase: "Apple-style feature narrative",
      summary:
        "A scroll-led feature page with oversized product framing, clean section transitions, and no decorative noise.",
      styleSlug: "premium-gradient-atmosphere",
      pageType: "Feature story page",
      tone: "Polished and focused",
      medium: "2D",
      motionLevel: "Low",
      colorDirection: "Neutral base with premium atmospheric lighting",
      captureImage: stitchCaptureAssets["apple-feature-story"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Create an Apple-like feature story page for a software product. Use oversized product framing, restrained neutral backgrounds, premium light gradients, concise copy blocks, and highly controlled transitions. Keep every section product-led and remove unnecessary badges, icons, and promotional clutter.",
      outputNotes: [
        "Large product moments separated by clear white-space breaks",
        "A premium gradient layer that supports the product instead of dominating it",
        "Tight copy hierarchy with calm transitions between sections"
      ]
    },
    {
      slug: "apple-pricing-proof",
      title: "Pricing and Proof Layout",
      useCase: "Apple-style pricing page",
      summary:
        "A minimal pricing composition where hierarchy and spacing make the offer feel premium instead of aggressive.",
      styleSlug: "glass-lens-interface",
      pageType: "Pricing page",
      tone: "Clear and premium",
      medium: "2D",
      motionLevel: "Minimal",
      colorDirection: "Monochrome with glass focal lens",
      captureImage: stitchCaptureAssets["apple-pricing-proof"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Design a pricing and proof page in an Apple-like direction. Use a sharp monochrome grid, generous spacing, very few accent colors, and one glass-like feature comparison lens to highlight the main plan. The result should feel premium, calm, and easy to scan.",
      outputNotes: [
        "Plan comparison should feel architectural, not salesy",
        "One highlighted plan with quiet emphasis rather than bright promo treatment",
        "Trust and proof modules must sit in the same visual system as pricing"
      ]
    }
  ],
  "warm-global-hospitality": [
    {
      slug: "airbnb-neighborhood-guide",
      title: "Neighborhood Guide Landing",
      useCase: "Airbnb-style local guide page",
      summary:
        "An editorial discovery landing for neighborhoods and local stays, mixing warm photography, guide cards, and map-led rhythm.",
      styleSlug: "editorial-grid-2d",
      pageType: "Guide landing",
      tone: "Warm and curious",
      medium: "Photo-led",
      motionLevel: "Low",
      colorDirection: "Warm neutrals with local color accents",
      captureImage: stitchCaptureAssets["airbnb-neighborhood-guide"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Create an Airbnb-inspired neighborhood guide landing page with warm photography, local guide cards, map cues, gentle rounded modules, and a browsable editorial travel rhythm. Keep it welcoming and discovery-first.",
      outputNotes: [
        "The page should open with a local discovery mood rather than a hard booking push",
        "Guide cards and map cues need to feel practical and friendly together",
        "Photography must carry the sense of place"
      ]
    },
    {
      slug: "airbnb-group-trip-planner",
      title: "Group Trip Planner",
      useCase: "Airbnb-style trip planning workspace",
      summary:
        "A planning page for shared stays that blends itinerary modules, wishlists, and booking cards into one warm workflow.",
      styleSlug: "glass-lens-interface",
      pageType: "Planner page",
      tone: "Helpful and collaborative",
      medium: "2D",
      motionLevel: "Subtle",
      colorDirection: "Warm white with coral and sand accents",
      captureImage: stitchCaptureAssets["airbnb-group-trip-planner"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Design an Airbnb-like group trip planner page with itinerary panels, shared wishlists, booking cards, and reassuring collaboration cues. Use warm neutrals, approachable typography, and a clear action flow.",
      outputNotes: [
        "Planning modules should feel social and easy to scan",
        "The page needs to balance itinerary structure with warmth",
        "Action moments should stay obvious without becoming pushy"
      ]
    },
    {
      slug: "airbnb-host-trust-center",
      title: "Host Trust Center",
      useCase: "Airbnb-style trust and safety page",
      summary:
        "A host confidence page that organizes safety, earnings, and support into practical rounded modules with human proof.",
      styleSlug: "modern-art-modular",
      pageType: "Trust page",
      tone: "Reassuring and practical",
      medium: "2D",
      motionLevel: "Low",
      colorDirection: "Warm whites with soft rose signal",
      captureImage: stitchCaptureAssets["airbnb-host-trust-center"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Design a host trust center page in an Airbnb-inspired language with safety modules, earnings proof, testimonial moments, soft rounded panels, and human photography. Make the page feel practical, calm, and trustworthy.",
      outputNotes: [
        "Trust modules need to feel useful rather than corporate",
        "Support and earnings proof should sit inside the same friendly visual language",
        "The page should reduce anxiety in the first screen"
      ]
    },
    {
      slug: "airbnb-discovery-landing",
      title: "Stay Discovery Landing",
      useCase: "Airbnb-style discovery page",
      summary:
        "A friendly booking homepage with warm surfaces, search-led hierarchy, and obvious trust cues.",
      styleSlug: "editorial-grid-2d",
      pageType: "Marketplace landing",
      tone: "Warm and welcoming",
      medium: "2D",
      motionLevel: "Low",
      colorDirection: "Warm neutrals with soft accent color",
      captureImage: stitchCaptureAssets["airbnb-discovery-landing"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Create a travel marketplace landing page in an Airbnb-inspired direction with warm neutral backgrounds, rounded modules, approachable sans-serif typography, welcoming photography, and a search-first booking flow. Make the page feel human, trustworthy, and easy to browse.",
      outputNotes: [
        "Search area should anchor the first screen immediately",
        "Listings and trust sections should feel soft, warm, and legible",
        "Photography must feel lived-in and welcoming rather than editorial-cold"
      ]
    },
    {
      slug: "airbnb-host-onboarding",
      title: "Host Onboarding Flow",
      useCase: "Airbnb-style onboarding page",
      summary:
        "A service page that balances practical explanation with warmth and low-friction action paths.",
      styleSlug: "glass-lens-interface",
      pageType: "Onboarding page",
      tone: "Approachable and helpful",
      medium: "2D",
      motionLevel: "Subtle",
      colorDirection: "Warm white with coral and soft rose accents",
      captureImage: stitchCaptureAssets["airbnb-host-onboarding"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Design a host onboarding page in an Airbnb-like design language with friendly rounded cards, practical step-by-step guidance, soft glassy focus panels, warm photography, and reassuring typography. Keep the page helpful, human, and conversion-friendly.",
      outputNotes: [
        "Onboarding steps should feel calm and easy to complete",
        "Small proof cues should support trust without feeling enterprise-heavy",
        "The CTA path should stay obvious inside a warm layout rhythm"
      ]
    },
    {
      slug: "airbnb-experience-marketplace",
      title: "Local Experience Marketplace",
      useCase: "Airbnb-style experiences page",
      summary:
        "A category page for local experiences with friendly discovery cards, map-like rhythm, and strong social proof.",
      styleSlug: "modern-art-modular",
      pageType: "Category page",
      tone: "Friendly discovery",
      medium: "2D",
      motionLevel: "Low",
      colorDirection: "Warm neutrals with selective lifestyle accents",
      captureImage: stitchCaptureAssets["airbnb-experience-marketplace"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Create an Airbnb-inspired local experiences marketplace page with modular discovery cards, soft rounded geometry, warm neutral backgrounds, human-led photography, and clear social proof. Make the layout feel browsable, welcoming, and highly practical.",
      outputNotes: [
        "Category modules should feel easy to compare at a glance",
        "Warm card rhythm matters more than visual spectacle",
        "Community and review cues should be woven into the browsing flow"
      ]
    }
  ],
  "enterprise-grid-system": [
    {
      slug: "ibm-cloud-ops-console",
      title: "Cloud Ops Console",
      useCase: "IBM-style operations landing",
      summary:
        "A control-room style enterprise page with status modules, precise labels, and a rigid systems-led hierarchy.",
      styleSlug: "minimal-monochrome",
      pageType: "Operations landing",
      tone: "Operational and exact",
      medium: "2D",
      motionLevel: "Reduced",
      colorDirection: "Monochrome with one cobalt signal",
      captureImage: stitchCaptureAssets["ibm-cloud-ops-console"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Design an IBM-inspired cloud operations landing page with a rigid enterprise grid, data-rich status modules, precise labels, restrained monochrome surfaces, and one exact cobalt accent. It should feel operational, stable, and technical.",
      outputNotes: [
        "Status modules must feel credible and data-first",
        "Hierarchy should read like an operations console more than a brochure",
        "Color is for signal only"
      ]
    },
    {
      slug: "ibm-compliance-blueprint",
      title: "Compliance Blueprint",
      useCase: "IBM-style governance page",
      summary:
        "A regulated-systems page built around policy rails, proof sections, audit tables, and architecture blocks.",
      styleSlug: "glass-lens-interface",
      pageType: "Blueprint page",
      tone: "Disciplined and literate",
      medium: "2D",
      motionLevel: "Low",
      colorDirection: "Neutral structure with transparent signal overlays",
      captureImage: stitchCaptureAssets["ibm-compliance-blueprint"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Create an IBM-like compliance blueprint page for a regulated AI platform. Use diagram blocks, policy rails, audit tables, and structured proof sections. Keep the page disciplined, literate, and documentation-clear.",
      outputNotes: [
        "Policy and proof need to feel like structured evidence, not marketing claims",
        "Tables and diagrams must remain readable at a glance",
        "The page should project governance confidence immediately"
      ]
    },
    {
      slug: "ibm-automation-briefing",
      title: "Executive Automation Briefing",
      useCase: "IBM-style executive briefing page",
      summary:
        "A high-trust enterprise briefing that mixes process diagrams, evidence cards, and architecture summaries for executive readers.",
      styleSlug: "motion-first-canvas",
      pageType: "Briefing page",
      tone: "Measured and confident",
      medium: "2D",
      motionLevel: "Minimal",
      colorDirection: "Grayscale with selective blue emphasis",
      captureImage: stitchCaptureAssets["ibm-automation-briefing"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Design an IBM-inspired executive briefing page for enterprise automation. Use modular evidence cards, architecture summaries, process step diagrams, and confident typography. The result should feel measured and credible.",
      outputNotes: [
        "The executive summary should read clearly in one pass",
        "Architecture and workflow blocks should feel part of one exact system",
        "Evidence cards need to support the argument without decorative flourish"
      ]
    },
    {
      slug: "ibm-solution-page",
      title: "Enterprise Solution Overview",
      useCase: "IBM-style solution page",
      summary:
        "A high-trust B2B overview with rigid grid logic, modular proof blocks, and explicit architecture framing.",
      styleSlug: "minimal-monochrome",
      pageType: "Solution page",
      tone: "Systematic and exact",
      medium: "2D",
      motionLevel: "Minimal",
      colorDirection: "Monochrome with one technical accent",
      captureImage: stitchCaptureAssets["ibm-solution-page"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Design an IBM-inspired enterprise solution page with rigorous grid alignment, clear module boundaries, restrained monochrome surfaces, concise technical copy, and one disciplined blue accent. The page should feel exact, literate, and credible to an enterprise buyer.",
      outputNotes: [
        "The first screen should state the system value in one precise move",
        "Proof modules should read like evidence, not decoration",
        "Architecture and workflow sections must be visually ordered and scannable"
      ]
    },
    {
      slug: "ibm-architecture-explainer",
      title: "Architecture Explainer",
      useCase: "IBM-style technical explainer",
      summary:
        "A product architecture page where diagrams, labels, and hierarchy carry most of the persuasion.",
      styleSlug: "glass-lens-interface",
      pageType: "Architecture page",
      tone: "Controlled and technical",
      medium: "2D",
      motionLevel: "Low",
      colorDirection: "Neutral structure with selective cobalt overlays",
      captureImage: stitchCaptureAssets["ibm-architecture-explainer"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Create an IBM-like architecture explainer page for a data platform. Use strict columns, diagram-friendly modules, precise labels, and controlled translucent overlays that highlight system pathways without adding decorative noise. Keep the tone technical, stable, and executive-readable.",
      outputNotes: [
        "Architecture visuals must feel systematic and easy to parse",
        "Labels and microcopy should support the diagram rather than clutter it",
        "Use color only for signal, not atmosphere"
      ]
    },
    {
      slug: "ibm-docs-marketing-hybrid",
      title: "Docs and Marketing Hybrid",
      useCase: "IBM-style docs landing",
      summary:
        "A hybrid page that blends product marketing with documentation-like clarity and density.",
      styleSlug: "motion-first-canvas",
      pageType: "Docs landing",
      tone: "Structured and informative",
      medium: "2D",
      motionLevel: "Reduced",
      colorDirection: "Grayscale with controlled signal blue",
      captureImage: stitchCaptureAssets["ibm-docs-marketing-hybrid"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Design a docs-meets-marketing page in an IBM-inspired enterprise system. Use a strict grid, clear information density, exact headings, modular content rails, and minimal motion. The page should bridge solution marketing and technical documentation without losing structure.",
      outputNotes: [
        "Content density should increase without becoming visually chaotic",
        "Navigation blocks must feel like part of the same system",
        "Docs clarity should carry more weight than promotional flourish"
      ]
    }
  ],
  "creator-velocity": [
    {
      slug: "tiktok-music-countdown",
      title: "Music Release Countdown",
      useCase: "TikTok-style music drop microsite",
      summary:
        "A release page built around countdown pressure, creator clips, overlay type, and a mobile-native launch rhythm.",
      styleSlug: "kinetic-type-signal",
      pageType: "Release microsite",
      tone: "Urgent and loud",
      medium: "Animation",
      motionLevel: "High",
      colorDirection: "Neon accents over a dark stage",
      captureImage: stitchCaptureAssets["tiktok-music-countdown"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Create a TikTok-inspired music release microsite with a giant countdown hero, bold overlay typography, creator clips, neon accents, and fast vertical pacing. The page should feel like a drop, not a traditional marketing site.",
      outputNotes: [
        "The countdown needs to dominate the first screen immediately",
        "Creator media and typography should feel fused together",
        "Every section should feel like part of a release event"
      ]
    },
    {
      slug: "tiktok-fandom-arena",
      title: "Fandom Arena",
      useCase: "TikTok-style fandom hub",
      summary:
        "A community page for reactions, mashups, and creator challenges with fast scan hierarchy and obvious participation hooks.",
      styleSlug: "bauhaus-color-block-3d",
      pageType: "Community hub",
      tone: "Playful and social",
      medium: "3D",
      motionLevel: "High",
      colorDirection: "Electric primaries with black contrast",
      captureImage: stitchCaptureAssets["tiktok-fandom-arena"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Design a TikTok-like fandom hub page with live reaction cards, creator mashups, challenge modules, rapid scan hierarchy, and playful participation prompts. Keep the energy high and social-native.",
      outputNotes: [
        "Community activity should be visible on the first screen",
        "The composition must feel like social energy rather than a neat landing page",
        "Participation prompts should stay obvious and playful"
      ]
    },
    {
      slug: "tiktok-shop-sprint",
      title: "Shop Sprint Event",
      useCase: "TikTok-style commerce event page",
      summary:
        "A shop-event landing where creator media, pricing flashes, and product cards live inside one fast commerce rhythm.",
      styleSlug: "motion-first-canvas",
      pageType: "Commerce event",
      tone: "Fast and transactional",
      medium: "Animation",
      motionLevel: "High",
      colorDirection: "Dark base with hot commerce signal colors",
      captureImage: stitchCaptureAssets["tiktok-shop-sprint"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Create a TikTok-inspired shop event landing page with product cards mixed into creator media, strong price flashes, overlay badges, kinetic transitions, and a mobile-first commerce rhythm.",
      outputNotes: [
        "Prices and offers should be readable instantly without slowing the page down",
        "Creator content must lead the composition even in commerce mode",
        "The landing should feel like a live event, not a static catalog"
      ]
    },
    {
      slug: "tiktok-campaign-drop",
      title: "Creator Campaign Drop",
      useCase: "TikTok-style launch microsite",
      summary:
        "A fast campaign page with social-native pacing, bold overlay hooks, and creator-first energy.",
      styleSlug: "kinetic-type-signal",
      pageType: "Campaign page",
      tone: "Fast and punchy",
      medium: "Animation",
      motionLevel: "High",
      colorDirection: "High-contrast black with neon accents",
      captureImage: stitchCaptureAssets["tiktok-campaign-drop"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Create a TikTok-inspired campaign microsite with punchy overlay typography, creator-native pacing, vertical-video composition cues, high-contrast sections, and kinetic type transitions. The page should feel immediate, social, and impossible to ignore on first scroll.",
      outputNotes: [
        "The hook has to land in the first second visually",
        "Motion should feel native to social content, not polished corporate animation",
        "CTA blocks should feel part of the content rhythm"
      ]
    },
    {
      slug: "tiktok-live-commerce",
      title: "Live Commerce Launch",
      useCase: "TikTok-style commerce page",
      summary:
        "A product drop page that mixes live-social urgency with high-contrast commerce cues.",
      styleSlug: "motion-first-canvas",
      pageType: "Commerce landing",
      tone: "Energetic and direct",
      medium: "Animation",
      motionLevel: "High",
      colorDirection: "Dark base with vivid creator accents",
      captureImage: stitchCaptureAssets["tiktok-live-commerce"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Design a TikTok-like live commerce landing page with creator overlays, rapid scene changes, strong pricing callouts, vertical-media framing, and social-proof moments that feel native to creator content. Keep the pace fast and the hierarchy obvious.",
      outputNotes: [
        "Commerce data should read quickly without slowing the page down",
        "Media frames and creator overlays need to lead the composition",
        "Visual energy must stay high without becoming messy"
      ]
    },
    {
      slug: "tiktok-trend-challenge",
      title: "Trend Challenge Hub",
      useCase: "TikTok-style trend hub",
      summary:
        "A challenge page built around rapid scan hierarchy, trend visuals, and interactive momentum.",
      styleSlug: "bauhaus-color-block-3d",
      pageType: "Challenge page",
      tone: "Playful and high-energy",
      medium: "3D",
      motionLevel: "High",
      colorDirection: "Bold primaries with black contrast",
      captureImage: stitchCaptureAssets["tiktok-trend-challenge"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Create a TikTok-inspired trend challenge page with high-immediacy hooks, bold 3D color blocks, creator-native overlays, rapid scan hierarchy, and playful interaction cues. Make the page feel energetic, social-first, and participation-ready.",
      outputNotes: [
        "Color and motion should create momentum immediately",
        "Participation cues should feel as important as the visual hook",
        "The page should feel creator-made rather than agency-polished"
      ]
    }
  ],
  "collaborative-canvas-system": [
    {
      slug: "figma-plugin-directory",
      title: "Plugin Directory",
      useCase: "Figma-style plugin marketplace",
      summary:
        "A product-native plugin library with dense cards, install moments, colorful accents, and a strong tool-like frame.",
      styleSlug: "glass-lens-interface",
      pageType: "Marketplace page",
      tone: "Useful and crisp",
      medium: "2D",
      motionLevel: "Low",
      colorDirection: "Neutral tool UI with vibrant plugin accents",
      captureImage: stitchCaptureAssets["figma-plugin-directory"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Design a Figma-inspired plugin directory with a left tool rail, dense plugin cards, category chips, install panels, and active workspace framing. Make the page feel like a working product surface with colorful plugin accents.",
      outputNotes: [
        "Plugin cards should feel real and installable rather than promotional",
        "The rail and filters need to anchor the page like a product UI",
        "Color should support browsing and categorization"
      ]
    },
    {
      slug: "figma-design-system-docs",
      title: "Design System Docs",
      useCase: "Figma-style design system docs",
      summary:
        "A dense but readable design system library with token tables, component previews, annotations, and side rails.",
      styleSlug: "minimal-monochrome",
      pageType: "Docs landing",
      tone: "Systematic and collaborative",
      medium: "2D",
      motionLevel: "Minimal",
      colorDirection: "Neutral interface with precise component accents",
      captureImage: stitchCaptureAssets["figma-design-system-docs"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Create a Figma-like design system docs landing page with token tables, component previews, side navigation rails, collaborative annotations, and a readable but dense product rhythm. It should feel like a real system library, not a blog.",
      outputNotes: [
        "Docs density should feel fluent and inspectable",
        "Tables, previews, and side rails must stay inside one clean tool system",
        "Annotations should imply a shared working surface"
      ]
    },
    {
      slug: "figma-figjam-session",
      title: "FigJam Session",
      useCase: "Figma-style workshop page",
      summary:
        "A facilitation page centered on sticky-note clusters, breakout templates, cursor presence, and a large workshop canvas.",
      styleSlug: "motion-first-canvas",
      pageType: "Workshop page",
      tone: "Lively and collaborative",
      medium: "Animation",
      motionLevel: "Medium",
      colorDirection: "Neutral canvas with bright workshop markers",
      captureImage: stitchCaptureAssets["figma-figjam-session"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Design a Figma-inspired FigJam workshop page with sticky-note clusters, cursor presence, breakout templates, and facilitation controls around a large canvas. The page should feel lively, collaborative, and tool-native.",
      outputNotes: [
        "The large canvas should lead the page immediately",
        "Workshop markers and cursor cues need to feel active but controlled",
        "The layout should stay useful even with high visual activity"
      ]
    },
    {
      slug: "figma-workspace-home",
      title: "Collaborative Workspace Home",
      useCase: "Figma-style product home",
      summary:
        "A landing page that feels like a real design tool, with panes, rails, canvas framing, and live-collaboration cues.",
      styleSlug: "glass-lens-interface",
      pageType: "Workspace landing",
      tone: "Tool-like and fluent",
      medium: "2D",
      motionLevel: "Subtle",
      colorDirection: "Neutral product UI with functional accents",
      captureImage: stitchCaptureAssets["figma-workspace-home"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Design a Figma-inspired collaborative workspace landing page with layered side rails, canvas framing, floating utility panes, live-collaboration cues, and crisp product hierarchy. Make the page feel like a real product surface rather than a generic SaaS marketing layout.",
      outputNotes: [
        "The working canvas should feel like the main character",
        "Panes and rails need to imply tool fluency without clutter",
        "Collaboration states should feel live but controlled"
      ]
    },
    {
      slug: "figma-community-marketplace",
      title: "Community File Marketplace",
      useCase: "Figma-style community page",
      summary:
        "A dense but readable library page for templates, files, and shared workspaces.",
      styleSlug: "modern-art-modular",
      pageType: "Marketplace page",
      tone: "Dense and useful",
      medium: "2D",
      motionLevel: "Low",
      colorDirection: "Neutral product surface with colorful file accents",
      captureImage: stitchCaptureAssets["figma-community-marketplace"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Create a Figma-inspired community marketplace page with dense but legible file cards, layered utility filters, a visible working-surface rhythm, and subtle colorful file accents. Keep the page product-native, browsable, and highly functional.",
      outputNotes: [
        "Template cards should feel like real artifacts, not marketing tiles",
        "Filtering and browsing cues must stay visible and product-like",
        "Density should feel fluent, not overwhelming"
      ]
    },
    {
      slug: "figma-multiplayer-tour",
      title: "Multiplayer Product Tour",
      useCase: "Figma-style product explainer",
      summary:
        "A walkthrough page that explains collaboration features through canvas scenes and cursor-driven UI moments.",
      styleSlug: "motion-first-canvas",
      pageType: "Product tour",
      tone: "Crisp and collaborative",
      medium: "Animation",
      motionLevel: "Medium",
      colorDirection: "Neutral interface with bright collaboration markers",
      captureImage: stitchCaptureAssets["figma-multiplayer-tour"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Design a Figma-like product tour page with collaborative cursor moments, pane reveals, canvas zoom framing, and clear workflow storytelling. Keep the interface crisp, tool-first, and readable while showing active multiplayer energy.",
      outputNotes: [
        "Motion should clarify workflow rather than perform decoration",
        "Cursor and presence cues need to imply live collaboration instantly",
        "Each section should feel like a step inside a working product"
      ]
    }
  ],
  "modular-research-surface": [
    {
      slug: "google-ai-lab-microsite",
      title: "AI Lab Microsite",
      useCase: "Google-style AI lab launch",
      summary:
        "A modular research microsite with primary-color geometry, demo shelves, and experimental clarity.",
      styleSlug: "bauhaus-color-block-3d",
      pageType: "Microsite",
      tone: "Experimental and clear",
      medium: "3D",
      motionLevel: "Low",
      colorDirection: "Primary colors on calm neutrals",
      captureImage: stitchCaptureAssets["google-ai-lab-microsite"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Design a Google-inspired AI lab microsite with primary-color geometry, modular storytelling, playful 3D forms, crisp product clarity, and an experimental research-demo tone that still feels usable.",
      outputNotes: [
        "The first screen should feel exploratory without losing product readability",
        "Primary-color geometry needs to support the demo shelves rather than dominate them",
        "The lab should read like a usable product surface, not a concept poster"
      ]
    },
    {
      slug: "google-model-showcase",
      title: "Model Showcase",
      useCase: "Google-style model demo page",
      summary:
        "A product-demo page for AI models that balances playful geometry with crisp modular explanation.",
      styleSlug: "glass-lens-interface",
      pageType: "Product demo",
      tone: "Helpful and exploratory",
      medium: "3D",
      motionLevel: "Subtle",
      colorDirection: "Bright modular accents with neutral structure",
      captureImage: stitchCaptureAssets["google-model-showcase"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Design a Google-inspired AI model showcase page with primary-color geometry, modular demo shelves, crisp explainer sections, playful but useful 3D forms, and a research-demo tone that feels clear and approachable.",
      outputNotes: [
        "The layout should open like a product demo instead of a marketing landing",
        "Model capabilities need to feel playful but still legible",
        "Demo modules should stay clean and approachable"
      ]
    },
    {
      slug: "google-toolkit-directory",
      title: "Toolkit Directory",
      useCase: "Google-style experimental tools directory",
      summary:
        "A browsable directory of AI tools with bright filter tabs, modular cards, and a calm lab rhythm.",
      styleSlug: "modern-art-modular",
      pageType: "Directory",
      tone: "Modular and open",
      medium: "2D",
      motionLevel: "Low",
      colorDirection: "Primary-color tabs with restrained neutral surfaces",
      captureImage: stitchCaptureAssets["google-toolkit-directory"],
      captureMeta: "stitch export",
      stitchPrompt:
        "Create a Google-inspired experimental tools directory with modular cards, bright filter tabs, primary-color object accents, calm documentation clarity, and an open lab feeling. Keep the interface exploratory but highly usable.",
      outputNotes: [
        "Directory cards should feel product-useful rather than decorative",
        "Filter tabs need to add brightness without noise",
        "The page should feel like a real toolkit shelf in a research lab"
      ]
    }
  ]
};

export const collections: CollectionCard[] = [
  {
    slug: "ai-saas-launch",
    title: "AI SaaS Launch",
    description:
      "A polished launch set for AI tools that need trust, clarity, and a distinct product character.",
    includes: [
      "calm-precision-ui",
      "premium-gradient-atmosphere",
      "enterprise-grid-system"
    ],
    artDirection:
      "Quiet premium grids with atmospheric gradients and confident product proof.",
    microNote: "signal: trust / clarity / launch",
    previewTone: "gradient",
    resultMood: "Investor-ready clarity with premium technical atmosphere."
  },
  {
    slug: "creative-portfolio-starter",
    title: "Creative Portfolio Starter",
    description:
      "A curated set for designers, photographers, and studios that need strong art direction without noise.",
    includes: ["editorial-grid-2d", "minimal-monochrome", "warm-global-hospitality"],
    artDirection:
      "Editorial pacing, selective monochrome tension, and warm presentation where needed.",
    microNote: "signal: crop / type / authorship",
    previewTone: "editorial",
    resultMood: "Art-directed but readable portfolio presence."
  },
  {
    slug: "creator-campaign-drop",
    title: "Creator Campaign Drop",
    description:
      "A fast, social-native mix for launches, drops, and culture-first campaigns.",
    includes: ["creator-velocity", "motion-first-canvas", "brutalist-contrast"],
    artDirection:
      "Punchy hooks, fast rhythm, deliberate contrast, and campaign-native motion.",
    microNote: "signal: hook / pulse / social pace",
    previewTone: "creator",
    resultMood: "High-energy launch language with visible momentum."
  },
  {
    slug: "enterprise-product-marketing",
    title: "Enterprise Product Marketing",
    description:
      "A high-signal set for B2B platforms, analytics tools, and technical products.",
    includes: ["enterprise-grid-system", "calm-precision-ui", "minimal-monochrome"],
    artDirection:
      "Structured modules, disciplined monochrome foundations, and calm authority.",
    microNote: "signal: system / trust / precision",
    previewTone: "grid",
    resultMood: "Operational credibility with strong information hierarchy."
  }
];

export const promptArchive: PromptArchiveEntry[] = [
  {
    slug: "quiet-ai-launch-board",
    title: "Quiet AI Launch Board",
    summary:
      "A prompt case for AI products that need premium restraint instead of default futuristic noise.",
    brief:
      "Build a landing page for an AI workspace product that needs trust, clarity, and a calm premium tone for early customers.",
    useCase: "AI SaaS launch",
    portfolioCategory: "Product Design",
    previewTone: "calm",
    coverImage: {
      src: "/archive/quiet-ai-launch-cover.svg",
      alt: "Quiet AI launch landing page sample board with rigid monochrome layout and cobalt proof panel.",
      width: 1440,
      height: 960
    },
    collectionSlug: "ai-saas-launch",
    categorySlugs: [
      "calm-precision-ui",
      "premium-gradient-atmosphere",
      "enterprise-grid-system"
    ],
    stitchExampleSlugs: [
      "apple-ai-launch",
      "apple-feature-story",
      "ibm-solution-page"
    ],
    prompt:
      "Design an AI workspace landing page using a rigid editorial grid, hard-edged monochrome sections, oversized Space Grotesk headlines, restrained cobalt glass overlays, and one clear proof block. Keep the page calm, premium, and conversion-ready without decorative AI tropes.",
    remixPrompt:
      "Take the same AI workspace landing page and tighten the hierarchy for mobile-first scanning. Keep the monochrome structure, preserve the cobalt proof lens, reduce secondary copy, and make the CTA path more direct.",
    curatorNote:
      "This prompt works when the product needs to look expensive and technical at the same time. The key is letting type and spacing do most of the work.",
    outputFocus: [
      "A dominant hero line with one concise subhead",
      "A proof section that feels architectural, not glassy",
      "A CTA system that stays visible without extra badges"
    ],
    outputs: [
      {
        title: "Launch Hero",
        caption: "A sharp hero composition with one product claim, one proof line, and a black CTA bar.",
        meta: "hero",
        size: "wide",
        image: {
          src: "/archive/quiet-ai-launch-cover.svg",
          alt: "AI launch hero sample with oversized headline, monochrome sections, and black CTA.",
          width: 1440,
          height: 960
        }
      },
      {
        title: "Proof Block",
        caption: "A calm product proof section with rigid columns and one cobalt-tinted focal surface.",
        meta: "proof",
        size: "tall",
        image: {
          src: "/archive/quiet-ai-launch-proof.svg",
          alt: "AI product proof sample board with structured columns and blue lens-like panel.",
          width: 1040,
          height: 1320
        }
      },
      {
        title: "Conversion Footer",
        caption: "A restrained closeout section that preserves authority instead of turning promotional.",
        meta: "cta",
        size: "square"
      }
    ]
  },
  {
    slug: "editorial-portfolio-casefile",
    title: "Editorial Portfolio Casefile",
    summary:
      "A portfolio prompt for designers and studios who want the site to feel curated, authored, and readable.",
    brief:
      "Create a portfolio site for a multidisciplinary designer with strong image work, selective writing, and a need for gallery-like pacing.",
    useCase: "Portfolio launch",
    portfolioCategory: "Graphic Design",
    previewTone: "editorial",
    coverImage: {
      src: "/archive/editorial-portfolio-cover.svg",
      alt: "Editorial portfolio homepage sample with asymmetrical grid and archive-style typography.",
      width: 1440,
      height: 960
    },
    collectionSlug: "creative-portfolio-starter",
    categorySlugs: [
      "editorial-grid-2d",
      "minimal-monochrome",
      "warm-global-hospitality"
    ],
    stitchExampleSlugs: [
      "airbnb-discovery-landing",
      "airbnb-experience-marketplace"
    ],
    prompt:
      "Create a portfolio homepage with a 60/40 asymmetrical grid, paper-like tonal sections, oversized Space Grotesk headline typography, strict metadata labels, and image placements that feel archival rather than decorative. Keep the page sparse but not cold.",
    remixPrompt:
      "Rebuild the same portfolio for a studio rather than an individual. Add more project indexing, tighter module widths, and a slightly more systematic metadata rhythm while preserving the editorial pacing.",
    curatorNote:
      "This case should feel like a designer's archive, not a template portfolio. The asymmetrical grid matters more than the color palette.",
    outputFocus: [
      "A title treatment that acts like the entry point to the whole page",
      "Image cropping that feels intentional and catalogued",
      "Metadata that reads as quiet structure, not UI chrome"
    ],
    outputs: [
      {
        title: "Index Header",
        caption: "A portfolio opener with a large title block and secondary metadata aligned to the grid.",
        meta: "index",
        size: "wide",
        image: {
          src: "/archive/editorial-portfolio-cover.svg",
          alt: "Portfolio index sample with asymmetrical image blocks and strong headline typography.",
          width: 1440,
          height: 960
        }
      },
      {
        title: "Project Grid",
        caption: "A staggered image and text composition that feels edited instead of uniform.",
        meta: "projects",
        size: "square"
      },
      {
        title: "Archive Detail",
        caption: "A project detail view with wide margins, strong captions, and a deliberate reading rhythm.",
        meta: "detail",
        size: "tall",
        image: {
          src: "/archive/editorial-portfolio-detail.svg",
          alt: "Portfolio project detail sample with image rail, captions, and archive metadata.",
          width: 1040,
          height: 1320
        }
      }
    ]
  },
  {
    slug: "enterprise-proof-stack",
    title: "Enterprise Proof Stack",
    summary:
      "A case for technical products that need operational credibility and obvious information hierarchy.",
    brief:
      "Design a marketing page for a B2B analytics platform where buyers need to understand proof, architecture, and workflow quickly.",
    useCase: "B2B product marketing",
    portfolioCategory: "Studio",
    previewTone: "grid",
    coverImage: {
      src: "/archive/enterprise-proof-cover.svg",
      alt: "Enterprise analytics marketing page sample with modular proof sections and monochrome grid.",
      width: 1440,
      height: 960
    },
    collectionSlug: "enterprise-product-marketing",
    categorySlugs: [
      "enterprise-grid-system",
      "calm-precision-ui",
      "minimal-monochrome"
    ],
    stitchExampleSlugs: [
      "ibm-solution-page",
      "ibm-architecture-explainer",
      "ibm-docs-marketing-hybrid"
    ],
    prompt:
      "Design an enterprise analytics marketing page with rigorous grid alignment, modular proof sections, high-contrast monochrome surfaces, and a prominent architecture narrative. Keep the composition clean, systematic, and free from decorative SaaS gradients.",
    remixPrompt:
      "Adapt the same enterprise analytics page for a CIO audience. Increase information density slightly, make the proof modules more explicit, and sharpen the type hierarchy for faster technical scanning.",
    curatorNote:
      "The job here is not to impress with atmosphere. The page should feel controlled, literate, and exact.",
    outputFocus: [
      "A hero that states the system value in one move",
      "Proof modules that behave like product evidence",
      "A structural rhythm that can scale into docs or solution pages"
    ],
    outputs: [
      {
        title: "System Hero",
        caption: "A wide enterprise hero with direct value framing and disciplined supporting copy.",
        meta: "hero",
        size: "wide",
        image: {
          src: "/archive/enterprise-proof-cover.svg",
          alt: "Enterprise product hero sample with strict modules and operational hierarchy.",
          width: 1440,
          height: 960
        }
      },
      {
        title: "Proof Modules",
        caption: "A stacked proof board using strict columns and modular information blocks.",
        meta: "proof",
        size: "tall"
      },
      {
        title: "Architecture Panel",
        caption: "A technical explainer surface with clear labels and almost no decorative noise.",
        meta: "architecture",
        size: "square",
        image: {
          src: "/archive/enterprise-proof-architecture.svg",
          alt: "Architecture explainer sample with grid-aligned labels and structured sections.",
          width: 1200,
          height: 960
        }
      }
    ]
  },
  {
    slug: "creator-drop-sequence",
    title: "Creator Drop Sequence",
    summary:
      "A campaign case where the prompt is tuned for speed, typographic tension, and social-native momentum.",
    brief:
      "Build a campaign page for a creator-led product drop that has to feel immediate, sharp, and visually distinct on first scroll.",
    useCase: "Campaign drop",
    portfolioCategory: "Art Direction",
    previewTone: "creator",
    coverImage: {
      src: "/archive/creator-drop-cover.svg",
      alt: "Creator campaign landing page sample with strong typographic hooks and hard black panels.",
      width: 1440,
      height: 960
    },
    collectionSlug: "creator-campaign-drop",
    categorySlugs: [
      "creator-velocity",
      "motion-first-canvas",
      "brutalist-contrast"
    ],
    stitchExampleSlugs: [
      "tiktok-campaign-drop",
      "tiktok-live-commerce",
      "tiktok-trend-challenge"
    ],
    prompt:
      "Create a creator campaign page with bold typographic hooks, hard-edged black panels, fast social-native pacing, and one repeated accent color used only for emphasis. The page should feel live, direct, and culture-aware without falling into random visual chaos.",
    remixPrompt:
      "Rework the same creator campaign page for a more premium product drop. Keep the typographic pace, reduce visual clutter, and replace the loudest motion with fewer, more deliberate scene changes.",
    curatorNote:
      "This entry is useful when the page needs pulse, but the rhythm still has to feel designed rather than messy.",
    outputFocus: [
      "An opener that hooks in one glance",
      "Typographic motion cues that drive the scroll pace",
      "A closeout section that still converts after the energy spike"
    ],
    outputs: [
      {
        title: "Drop Opener",
        caption: "A high-contrast first screen with a typographic hook and a direct CTA line.",
        meta: "hook",
        size: "wide",
        image: {
          src: "/archive/creator-drop-cover.svg",
          alt: "Creator drop opener sample with bold type and direct call to action.",
          width: 1440,
          height: 960
        }
      },
      {
        title: "Motion Block",
        caption: "A campaign sequence where captions and panels do the pacing work together.",
        meta: "motion",
        size: "square",
        image: {
          src: "/archive/creator-drop-motion.svg",
          alt: "Campaign motion sequence sample with bold text rails and high contrast sections.",
          width: 1200,
          height: 960
        }
      },
      {
        title: "Drop Close",
        caption: "A final sales block that stays intense without turning visually sloppy.",
        meta: "closeout",
        size: "tall"
      }
    ]
  },
  {
    slug: "creative-tech-portfolio-grid",
    title: "Creative Tech Portfolio Grid",
    summary:
      "A portfolio prompt for creative technologists who need research, product experiments, and visual systems to coexist cleanly.",
    brief:
      "Create a portfolio site for a creative technologist or AI lab where experiments, prototypes, and essays need to feel structured but still exploratory.",
    useCase: "Creative tech portfolio",
    portfolioCategory: "Creative Tech",
    previewTone: "spatial",
    coverImage: stitchCaptureAssets["google-ai-lab-microsite"],
    categorySlugs: [
      "collaborative-canvas-system",
      "immersive-3d",
      "bauhaus-color-block-3d"
    ],
    stitchExampleSlugs: ["google-ai-lab-microsite", "meta-spatial-launch"],
    prompt:
      "Design a creative tech portfolio with modular research sections, crisp experimental typography, 3D hero depth, and a system that can hold prototypes, essays, and live demos without losing clarity.",
    remixPrompt:
      "Adapt the same creative tech portfolio for a solo practitioner. Reduce enterprise framing, make the work thumbnails more editorial, and let one immersive hero section lead the whole index.",
    curatorNote:
      "This category works when the portfolio should feel like a lab archive rather than a client-services site.",
    outputFocus: [
      "A hero that frames the portfolio as a living lab",
      "Modular cards for experiments, tools, and essays",
      "Enough structure to hold dense work without flattening it"
    ],
    outputs: [
      {
        title: "Lab Index",
        caption: "A bright research-led opener with one immersive visual anchor and a clean navigation band.",
        meta: "index",
        size: "wide",
        image: stitchCaptureAssets["google-ai-lab-microsite"]
      },
      {
        title: "Experiment Shelf",
        caption: "A modular shelf for prototypes, explorations, and technical notes.",
        meta: "experiments",
        size: "square"
      },
      {
        title: "Spatial Case Study",
        caption: "A cinematic deep-dive view for one flagship prototype or mixed-reality project.",
        meta: "case study",
        size: "tall",
        image: stitchCaptureAssets["meta-spatial-launch"]
      }
    ]
  },
  {
    slug: "creator-portfolio-archive",
    title: "Creator Portfolio Archive",
    summary:
      "A portfolio prompt for image-led creators who need a strong visual index with social-native pacing.",
    brief:
      "Build a portfolio archive for a creator whose site should feel curated, current, and image-first without turning into a feed clone.",
    useCase: "Creator portfolio",
    portfolioCategory: "Photography",
    previewTone: "creator",
    coverImage: stitchCaptureAssets["instagram-creator-portfolio"],
    categorySlugs: [
      "creator-velocity",
      "modern-art-modular",
      "kinetic-type-signal"
    ],
    stitchExampleSlugs: ["instagram-creator-portfolio", "tiktok-campaign-drop"],
    prompt:
      "Create a creator portfolio archive with gallery pacing, selective gradients, profile-led modules, strong image crops, and a direct path into collaborations, campaigns, and selected works.",
    remixPrompt:
      "Rework the same creator archive for a photographer. Slow the rhythm slightly, reduce social cues, and give captions and project metadata more space.",
    curatorNote:
      "The key is to feel contemporary and creator-native without collapsing into a social feed.",
    outputFocus: [
      "A visual index that feels authored rather than algorithmic",
      "Strong project covers with clean creator metadata",
      "A direct route from selected work to contact or collaboration"
    ],
    outputs: [
      {
        title: "Selected Works",
        caption: "A large visual index for campaigns, experiments, and personal work.",
        meta: "selected works",
        size: "wide",
        image: stitchCaptureAssets["instagram-creator-portfolio"]
      },
      {
        title: "Campaign Shelf",
        caption: "An energetic campaign row that keeps motion and creator energy visible.",
        meta: "campaigns",
        size: "square",
        image: stitchCaptureAssets["tiktok-campaign-drop"]
      },
      {
        title: "Profile Detail",
        caption: "A creator profile section with bio, services, and a curated project trail.",
        meta: "profile",
        size: "tall"
      }
    ]
  },
  {
    slug: "studio-showcase-system",
    title: "Studio Showcase System",
    summary:
      "A studio portfolio prompt for teams who need to present case studies, capabilities, and systems in one coherent frame.",
    brief:
      "Design a studio site that balances selected projects, methodology, and system thinking while still feeling like a portfolio rather than a corporate brochure.",
    useCase: "Studio portfolio",
    portfolioCategory: "Studio",
    previewTone: "gradient",
    coverImage: stitchCaptureAssets["figma-community-marketplace"],
    categorySlugs: [
      "collaborative-canvas-system",
      "calm-precision-ui",
      "modern-art-modular"
    ],
    stitchExampleSlugs: ["figma-community-marketplace", "apple-feature-story"],
    prompt:
      "Create a studio portfolio with a modular case-study index, visible capability filters, restrained premium typography, and selected experimental surfaces that keep the site feeling authored.",
    remixPrompt:
      "Reframe the same studio portfolio for a smaller design practice. Reduce the service density, emphasize selected projects, and let the homepage breathe more like an exhibition index.",
    curatorNote:
      "A strong studio portfolio should feel like a system, but the work still has to remain the main event.",
    outputFocus: [
      "A modular case-study index with clear filtering",
      "A capability layer that supports the work instead of leading it",
      "A premium rhythm that avoids agency-template repetition"
    ],
    outputs: [
      {
        title: "Studio Index",
        caption: "A modular homepage where selected work and categories live in the same system.",
        meta: "index",
        size: "wide",
        image: stitchCaptureAssets["figma-community-marketplace"]
      },
      {
        title: "Case Study Entry",
        caption: "A premium project opener with one strong product image and controlled narrative pacing.",
        meta: "case study",
        size: "tall",
        image: stitchCaptureAssets["apple-feature-story"]
      },
      {
        title: "Capability Rail",
        caption: "A dense but elegant block for services, methods, and selected outcomes.",
        meta: "capabilities",
        size: "square"
      }
    ]
  },
  {
    slug: "graphic-design-template-index",
    title: "Graphic Design Template Index",
    summary:
      "A Cargo-inspired graphic design portfolio prompt built around posters, projects, and strong list rhythm.",
    brief:
      "Design a graphic design portfolio where posters, identity systems, and visual experiments can be browsed quickly through a structured but highly visual index.",
    useCase: "Graphic design portfolio",
    portfolioCategory: "Graphic Design",
    previewTone: "editorial",
    coverImage: stitchCaptureAssets["cargo-graphic-design-index"],
    categorySlugs: ["editorial-grid-2d", "minimal-monochrome", "modern-art-modular"],
    stitchExampleSlugs: ["cargo-graphic-design-index"],
    prompt:
      "Create a graphic design portfolio index with a clear project list, poster-led covers, quiet metadata, and a layout that feels like a curated template shelf instead of a generic card grid.",
    remixPrompt:
      "Adapt the same graphic design portfolio for a smaller independent designer. Increase whitespace, make captions more visible, and let one hero project dominate the first screen.",
    curatorNote:
      "This is useful when the site should feel like a clean index of design artifacts rather than a personal blog.",
    outputFocus: [
      "A strong first screen with project filtering and one leading poster",
      "Quiet labels that support browsing instead of decorating it",
      "A graphic rhythm that can hold many project covers without becoming noisy"
    ],
    outputs: [
      {
        title: "Poster Index",
        caption: "A broad project shelf with one lead poster and supporting project tiles.",
        meta: "index",
        size: "wide",
        image: stitchCaptureAssets["cargo-graphic-design-index"]
      },
      {
        title: "Project Rail",
        caption: "A quiet grid of identities, posters, and covers that reads like a template catalog.",
        meta: "projects",
        size: "square"
      },
      {
        title: "Detail Card",
        caption: "A focused project card with room for project year, discipline, and short context.",
        meta: "detail",
        size: "tall"
      }
    ]
  },
  {
    slug: "photography-journal-template",
    title: "Photography Journal Template",
    summary:
      "A portfolio prompt for photographers who need image-led pacing, large covers, and quiet captions.",
    brief:
      "Build a photography portfolio that treats images as the primary navigation system while preserving a calm editorial structure and readable project captions.",
    useCase: "Photography portfolio",
    portfolioCategory: "Photography",
    previewTone: "warm",
    coverImage: stitchCaptureAssets["cargo-photography-journal"],
    categorySlugs: ["warm-global-hospitality", "editorial-grid-2d", "minimal-monochrome"],
    stitchExampleSlugs: ["cargo-photography-journal"],
    prompt:
      "Create a photography portfolio with large image-led modules, quiet captions, warm whitespace, and a journal-like project sequence that feels curated rather than infinite.",
    remixPrompt:
      "Rework the same photography portfolio for a documentary photographer. Increase caption visibility, simplify filters, and let the image sequence feel slower and more archival.",
    curatorNote:
      "The image should lead, but the site still needs a quiet framework that makes the work feel intentional.",
    outputFocus: [
      "Large image covers with clean breathing room",
      "Caption treatment that never competes with the photos",
      "A sequence rhythm that feels authored and calm"
    ],
    outputs: [
      {
        title: "Image Index",
        caption: "A full-width image-led project opener with one calm text rail.",
        meta: "index",
        size: "wide",
        image: stitchCaptureAssets["cargo-photography-journal"]
      },
      {
        title: "Series Shelf",
        caption: "A staggered sequence of photo projects with compact captions.",
        meta: "series",
        size: "tall"
      },
      {
        title: "Caption Detail",
        caption: "A project view where one image and one caption system carry the whole pace.",
        meta: "detail",
        size: "square"
      }
    ]
  },
  {
    slug: "architecture-monograph-template",
    title: "Architecture Monograph Template",
    summary:
      "A portfolio prompt for architecture and spatial practices built around split layouts, plans, and measured type.",
    brief:
      "Create an architecture portfolio where drawings, plans, and project photography need to feel technical, calm, and monographic rather than glossy.",
    useCase: "Architecture portfolio",
    portfolioCategory: "Architecture",
    previewTone: "mono",
    coverImage: stitchCaptureAssets["cargo-architecture-monograph"],
    categorySlugs: ["minimal-monochrome", "enterprise-grid-system", "editorial-grid-2d"],
    stitchExampleSlugs: ["cargo-architecture-monograph"],
    prompt:
      "Design an architecture portfolio with split columns, quiet technical labels, monographic typography, and large project images that leave room for plans, dimensions, and process notes.",
    remixPrompt:
      "Adapt the same architecture portfolio for a smaller studio. Reduce the technical density slightly, keep the split layout, and give the lead project photography more emphasis on the homepage.",
    curatorNote:
      "Architecture portfolios need restraint. The credibility comes from spacing, alignment, and drawing-friendly structure.",
    outputFocus: [
      "A split first screen with project image and project data in balance",
      "Room for plans, sections, and technical labels",
      "A layout that feels exact without becoming sterile"
    ],
    outputs: [
      {
        title: "Monograph Cover",
        caption: "A disciplined architecture opener with one large project frame and measured data.",
        meta: "cover",
        size: "wide",
        image: stitchCaptureAssets["cargo-architecture-monograph"]
      },
      {
        title: "Plan Module",
        caption: "A project block that can hold plan views, captions, and material notes.",
        meta: "plans",
        size: "square"
      },
      {
        title: "Project Detail",
        caption: "A split page for project photography, credits, and concise process explanation.",
        meta: "detail",
        size: "tall"
      }
    ]
  },
  {
    slug: "fashion-lookbook-template",
    title: "Fashion Lookbook Template",
    summary:
      "A fashion portfolio prompt with runway pacing, editorial captions, and large vertical image rhythm.",
    brief:
      "Design a fashion portfolio or label site that needs to feel like a lookbook: image-led, paced, and lightly captioned rather than product-heavy.",
    useCase: "Fashion portfolio",
    portfolioCategory: "Fashion",
    previewTone: "gradient",
    coverImage: stitchCaptureAssets["cargo-fashion-lookbook"],
    categorySlugs: ["modern-art-modular", "editorial-grid-2d", "kinetic-type-signal"],
    stitchExampleSlugs: ["cargo-fashion-lookbook"],
    prompt:
      "Create a fashion lookbook portfolio with large vertical covers, sparse editorial captions, strong image pacing, and a polished first-screen sequence that feels like a digital runway book.",
    remixPrompt:
      "Reframe the same fashion portfolio for a smaller independent label. Reduce the editorial drama slightly, make collection names more legible, and keep the product detail pages clean.",
    curatorNote:
      "The right version feels paced and cinematic without turning into a noisy campaign site.",
    outputFocus: [
      "A runway-like first screen with vertical image pull",
      "Collection grouping that feels elegant and easy to skim",
      "Enough structure to add credits and season labels cleanly"
    ],
    outputs: [
      {
        title: "Lookbook Cover",
        caption: "A tall visual opener that introduces one collection with immediate image weight.",
        meta: "cover",
        size: "wide",
        image: stitchCaptureAssets["cargo-fashion-lookbook"]
      },
      {
        title: "Collection Rail",
        caption: "A sequence of looks, seasons, and supporting editorial captions.",
        meta: "collections",
        size: "tall"
      },
      {
        title: "Editorial Detail",
        caption: "A project view for one look or collection with image-first pacing.",
        meta: "detail",
        size: "square"
      }
    ]
  },
  {
    slug: "luxury-runway-house-template",
    title: "Luxury Runway House Template",
    summary:
      "A couture-facing fashion prompt with quiet runway image pull, serif chapter pacing, and premium backstage detail.",
    brief:
      "Design a fashion house portfolio that feels like a runway dossier: image-first, chapter-led, and premium enough for couture collections, atelier notes, and seasonal drops.",
    useCase: "Fashion portfolio",
    portfolioCategory: "Fashion",
    previewTone: "mono",
    coverImage: stitchCaptureAssets["cargo-luxury-runway-house"],
    categorySlugs: ["calm-precision-ui", "editorial-grid-2d", "premium-gradient-atmosphere"],
    stitchExampleSlugs: ["cargo-luxury-runway-house"],
    prompt:
      "Create a luxury fashion house portfolio with full-bleed runway stills, black-and-ivory surfaces, serif chapter headings, elegant collection rails, backstage credits, and quiet editorial pacing. The site should feel like a premium runway dossier rather than a store.",
    remixPrompt:
      "Rework the same fashion house portfolio for a more seasonal campaign focus. Keep the couture restraint, but make the chapter labels, collection navigation, and hero transitions slightly more dramatic.",
    curatorNote:
      "This only works when the image scale feels expensive and the text is treated like chapter furniture, not interface chrome.",
    outputFocus: [
      "A couture hero with immediate runway image pull",
      "Collection chapters that pace the scroll like a show sequence",
      "Backstage notes and credits that feel elegant instead of dense"
    ],
    outputs: [
      {
        title: "Runway Hero",
        caption: "A large first frame where one runway still, one collection name, and one precise seasonal cue do the work.",
        meta: "hero",
        size: "wide",
        image: stitchCaptureAssets["cargo-luxury-runway-house"]
      },
      {
        title: "Collection Chapter",
        caption: "A mid-scroll chapter layout with collection rails, quiet season labels, and editorial spacing.",
        meta: "chapter",
        size: "tall"
      },
      {
        title: "Atelier Close",
        caption: "A concluding screen where atelier notes, credits, and contact remain premium and sparse.",
        meta: "close",
        size: "square"
      }
    ]
  },
  {
    slug: "streetwear-drop-journal-template",
    title: "Streetwear Drop Journal Template",
    summary:
      "A fashion drop prompt with poster stacks, release cues, and a fast editorial rhythm for campaigns and capsules.",
    brief:
      "Build a streetwear campaign microsite that stages drop moments, collection imagery, and release information without collapsing into generic storefront UI.",
    useCase: "Fashion campaign microsite",
    portfolioCategory: "Fashion",
    previewTone: "creator",
    coverImage: stitchCaptureAssets["cargo-streetwear-drop-journal"],
    categorySlugs: ["creator-velocity", "kinetic-type-signal", "modern-art-modular"],
    stitchExampleSlugs: ["cargo-streetwear-drop-journal"],
    prompt:
      "Create a fashion drop microsite for a streetwear label with bold sans headlines, stacked campaign posters, release countdown cues, oversized look stills, editorial product captions, and sharp black-and-signal-orange pacing. Keep it image-led, urgent, and premium without turning into raw ecommerce.",
    remixPrompt:
      "Adapt the same streetwear microsite for a more collectible archive mood. Keep the drop urgency, but add more project indexing, edition labels, and quieter product framing.",
    curatorNote:
      "The energy needs to feel immediate, but the typography and image stack still have to stay controlled enough to feel designed rather than loud.",
    outputFocus: [
      "A launch hero with immediate drop tension",
      "Poster and look still sequencing that scans fast",
      "Release information that feels premium instead of merch-heavy"
    ],
    outputs: [
      {
        title: "Drop Hero",
        caption: "A first frame where countdown logic, campaign stills, and a sharp collection title all land at once.",
        meta: "hero",
        size: "wide",
        image: stitchCaptureAssets["cargo-streetwear-drop-journal"]
      },
      {
        title: "Poster Stack",
        caption: "A poster-led module where release chapters, look stills, and editorial product notes stay readable.",
        meta: "posters",
        size: "square"
      },
      {
        title: "Release Close",
        caption: "A lower section that combines capsule metadata, availability, and contact without drifting into store chrome.",
        meta: "close",
        size: "tall"
      }
    ]
  },
  {
    slug: "art-direction-moodboard-template",
    title: "Art Direction Moodboard Template",
    summary:
      "A portfolio prompt for art directors who need a visual board of campaigns, stills, and references to feel composed rather than random.",
    brief:
      "Build an art direction portfolio that can hold mixed media, references, campaign stills, and image-led case studies in one controlled but expressive index.",
    useCase: "Art direction portfolio",
    portfolioCategory: "Art Direction",
    previewTone: "gradient",
    coverImage: stitchCaptureAssets["cargo-art-direction-moodboard"],
    categorySlugs: ["modern-art-modular", "bauhaus-color-block-3d", "creator-velocity"],
    stitchExampleSlugs: ["cargo-art-direction-moodboard"],
    prompt:
      "Create an art direction portfolio with a moodboard-like homepage, selective color fields, strong project covers, and mixed-media modules that still feel curated and intentional.",
    remixPrompt:
      "Adapt the same art direction portfolio for a commercial director. Increase project hierarchy, reduce collage density, and make campaign names more prominent.",
    curatorNote:
      "The structure matters because art direction portfolios can become messy very quickly if every image shouts at once.",
    outputFocus: [
      "A visual board that still has clear hierarchy",
      "Strong project covers and campaign grouping",
      "Mixed media modules that feel curated instead of improvised"
    ],
    outputs: [
      {
        title: "Moodboard Index",
        caption: "A lead board with campaign frames, stills, and edited image tension.",
        meta: "index",
        size: "wide",
        image: stitchCaptureAssets["cargo-art-direction-moodboard"]
      },
      {
        title: "Campaign Wall",
        caption: "A tighter project wall for series, references, and image-led case studies.",
        meta: "campaigns",
        size: "square"
      },
      {
        title: "Project Detail",
        caption: "A focused project entry that gives one campaign enough room to breathe.",
        meta: "detail",
        size: "tall"
      }
    ]
  },
  {
    slug: "type-specimen-archive-template",
    title: "Type Specimen Archive Template",
    summary:
      "A typography-first portfolio prompt for foundries, lettering studios, and type-led practices.",
    brief:
      "Create a type-focused portfolio site where specimens, glyph systems, editorial notes, and release information all need room without losing visual rigor.",
    useCase: "Typography portfolio",
    portfolioCategory: "Typography",
    previewTone: "mono",
    coverImage: stitchCaptureAssets["cargo-type-specimen-archive"],
    categorySlugs: ["minimal-monochrome", "editorial-grid-2d", "kinetic-type-signal"],
    stitchExampleSlugs: ["cargo-type-specimen-archive"],
    prompt:
      "Design a type specimen archive with oversized typography, specimen sheets, release metadata, and a quiet editorial frame that keeps the focus on the letterforms.",
    remixPrompt:
      "Reframe the same type archive for a foundry launch. Add a stronger release hierarchy, pricing hooks, and a clearer CTA path while preserving specimen rigor.",
    curatorNote:
      "Typography portfolios work when the page itself behaves like a specimen, not a generic startup landing page.",
    outputFocus: [
      "Oversized type-led first impression",
      "Specimen sheets and metadata that feel exact and readable",
      "A system that can scale from archive browsing to release detail"
    ],
    outputs: [
      {
        title: "Specimen Cover",
        caption: "A large type-led opener with release metadata and one commanding face.",
        meta: "cover",
        size: "wide",
        image: stitchCaptureAssets["cargo-type-specimen-archive"]
      },
      {
        title: "Glyph Sheet",
        caption: "A modular specimen zone for character sets, weights, and notes.",
        meta: "glyphs",
        size: "square"
      },
      {
        title: "Release Detail",
        caption: "A precise release page for one type family with examples and supporting copy.",
        meta: "release",
        size: "tall"
      }
    ]
  },
  {
    slug: "studio-directory-template",
    title: "Studio Directory Template",
    summary:
      "A studio portfolio prompt built around project lists, service rails, and selected work directories.",
    brief:
      "Design a studio website where selected projects, sectors, and service descriptions need to coexist in a directory-like structure without becoming corporate and dull.",
    useCase: "Studio directory portfolio",
    portfolioCategory: "Studio",
    previewTone: "grid",
    coverImage: stitchCaptureAssets["cargo-studio-directory"],
    categorySlugs: ["collaborative-canvas-system", "calm-precision-ui", "minimal-monochrome"],
    stitchExampleSlugs: ["cargo-studio-directory"],
    prompt:
      "Create a studio directory-style portfolio with a project list, sector filters, selected case studies, and a structured service rail. Keep it precise, calm, and unmistakably portfolio-led.",
    remixPrompt:
      "Adapt the same studio directory for a larger agency. Increase filter depth, add client sectors more explicitly, and give the selected case studies a slightly stronger premium finish.",
    curatorNote:
      "The structure should feel like a working project directory, not a bloated agency homepage.",
    outputFocus: [
      "A project list that remains attractive and easy to scan",
      "Services and sectors that support the work rather than dominate it",
      "One strong case-study path that keeps the studio feeling premium"
    ],
    outputs: [
      {
        title: "Directory Index",
        caption: "A clean listing surface for projects, sectors, and services.",
        meta: "index",
        size: "wide",
        image: stitchCaptureAssets["cargo-studio-directory"]
      },
      {
        title: "Sector Filters",
        caption: "A rail of sectors, capabilities, and project groupings that stays visually quiet.",
        meta: "filters",
        size: "square"
      },
      {
        title: "Case Study Linkout",
        caption: "A selected project entry that transitions into a fuller case-study system.",
        meta: "case study",
        size: "tall"
      }
    ]
  },
  {
    slug: "sokoglam-editorial-commerce-case",
    title: "Soko Glam Editorial Commerce",
    summary:
      "A U.S.-market K-beauty homepage prompt that mixes routine education, curation, and trust-led conversion.",
    brief:
      "Design a K-beauty ecommerce homepage for U.S. shoppers who need expert curation, clear product education, and confidence-building proof before checkout.",
    useCase: "K-beauty ecommerce",
    portfolioCategory: "K-Beauty",
    previewTone: "warm",
    coverImage: stitchCaptureAssets["sokoglam-editorial-commerce"],
    categorySlugs: [
      "warm-global-hospitality",
      "editorial-grid-2d",
      "calm-precision-ui"
    ],
    stitchExampleSlugs: ["sokoglam-editorial-commerce"],
    prompt:
      "Design a U.S.-market K-beauty ecommerce homepage with editorial curation, warm but premium product photography, expert-picked trust language, routine education blocks, review-led proof, and a soft conversion rhythm. Keep the layout clean, helpful, and community-driven rather than discount-marketplace heavy.",
    remixPrompt:
      "Rework the same K-beauty homepage for a more routine-led onboarding flow. Keep the editorial curation, but make skincare steps, education cards, and customer-proof modules more prominent on the first two screens.",
    curatorNote:
      "This works when beauty commerce needs to feel guided and expert-led, not promotional and crowded.",
    outputFocus: [
      "An editorial hero that introduces curation before discounting",
      "Routine education blocks with obvious trust language",
      "Product rails that feel premium and community-backed"
    ],
    outputs: [
      {
        title: "Editorial Hero",
        caption: "A curation-led opener that balances skincare authority, community warmth, and clear navigation.",
        meta: "hero",
        size: "wide",
        image: stitchCaptureAssets["sokoglam-editorial-commerce"]
      },
      {
        title: "Routine Education",
        caption: "A sequence of expert routine blocks with concise copy and product pairings.",
        meta: "education",
        size: "square"
      },
      {
        title: "Proof Rail",
        caption: "A purchase-close shelf where reviews, benefits, and product trust stay visually calm.",
        meta: "proof",
        size: "tall"
      }
    ]
  },
  {
    slug: "goka-social-commerce-case",
    title: "Goka Social Commerce Beauty",
    summary:
      "A Latin America K-beauty homepage prompt tuned for Spanish-first copy, WhatsApp trust, and mobile-native shopping rhythm.",
    brief:
      "Create a K-beauty homepage for Latin America that feels bright, social, and community-first while still building confidence around authenticity and shipping.",
    useCase: "K-beauty ecommerce",
    portfolioCategory: "K-Beauty",
    previewTone: "creator",
    coverImage: stitchCaptureAssets["goka-social-commerce"],
    categorySlugs: [
      "warm-global-hospitality",
      "creator-velocity",
      "premium-gradient-atmosphere"
    ],
    stitchExampleSlugs: ["goka-social-commerce"],
    prompt:
      "Create a Latin America K-beauty ecommerce homepage with Spanish-first copy, WhatsApp trust cues, social-native campaign modules, authentic-product reassurance, free-shipping emphasis, and a club-like membership tone. Keep the page bright, friendly, mobile-first, and community-oriented.",
    remixPrompt:
      "Adapt the same homepage for a campaign-heavy launch period. Keep WhatsApp trust and Spanish-first structure, but increase product bundles, urgency modules, and social proof above the fold.",
    curatorNote:
      "The key is balancing vibrant social energy with practical reassurance around authenticity, delivery, and payment.",
    outputFocus: [
      "A bright mobile-first hero with immediate trust cues",
      "Social campaign modules that still convert cleanly",
      "Shipping and authenticity proof woven into the first scroll"
    ],
    outputs: [
      {
        title: "Community Hero",
        caption: "A lively opener where social proof and trust cues sit beside the main sale path.",
        meta: "hero",
        size: "wide",
        image: stitchCaptureAssets["goka-social-commerce"]
      },
      {
        title: "Campaign Modules",
        caption: "A club-like merchandising row mixing bundles, creator-led imagery, and free-shipping cues.",
        meta: "campaign",
        size: "square"
      },
      {
        title: "Trust Close",
        caption: "A lower section that keeps authenticity, WhatsApp support, and conversion in the same rhythm.",
        meta: "trust",
        size: "tall"
      }
    ]
  },
  {
    slug: "miin-omnichannel-routine-case",
    title: "MiiN Omnichannel Routine Shop",
    summary:
      "A European K-beauty commerce prompt built around curated discovery, compliance trust, and routine education.",
    brief:
      "Design a K-beauty homepage for European shoppers that needs to feel polished, credible, and conversion-ready without losing warmth.",
    useCase: "K-beauty ecommerce",
    portfolioCategory: "K-Beauty",
    previewTone: "editorial",
    coverImage: stitchCaptureAssets["miin-omnichannel-routine"],
    categorySlugs: [
      "warm-global-hospitality",
      "editorial-grid-2d",
      "minimal-monochrome"
    ],
    stitchExampleSlugs: ["miin-omnichannel-routine"],
    prompt:
      "Design a European K-beauty ecommerce homepage with curated product discovery, visible EU-compliance trust blocks, structured routine education, workshop and glossary entry points, and a polished omnichannel retail feel. Keep the layout informative, credible, and conversion-ready without losing warmth.",
    remixPrompt:
      "Rework the same homepage for a denser retail moment. Preserve the curated discovery tone, but give workshops, glossary content, and best-seller shelves stronger first-screen visibility.",
    curatorNote:
      "This direction succeeds when compliance and education feel like premium service, not legal clutter.",
    outputFocus: [
      "A polished opener with curated discovery and compliance trust",
      "Routine education and glossary entry points that feel native",
      "Retail modules that stay warm rather than corporate"
    ],
    outputs: [
      {
        title: "Curated Discovery",
        caption: "A retail-led opener with soft merchandising and visible trust structure for EU shoppers.",
        meta: "hero",
        size: "wide",
        image: stitchCaptureAssets["miin-omnichannel-routine"]
      },
      {
        title: "Routine Shelf",
        caption: "An educational middle section where routines, workshops, and products sit in the same system.",
        meta: "routine",
        size: "tall"
      },
      {
        title: "Retail Detail",
        caption: "A lower conversion surface that keeps glossary, support, and shop pathways clearly grouped.",
        meta: "detail",
        size: "square"
      }
    ]
  },
  {
    slug: "innisfree-ingredient-merchandising-case",
    title: "Innisfree Ingredient Merchandising",
    summary:
      "A Southeast Asia K-beauty prompt built for dense offers, ingredient-led discovery, and fast-scanning ecommerce rhythm.",
    brief:
      "Build a K-beauty homepage for Southeast Asia where shoppers expect promotion density, localized shipping cues, and strong product organization.",
    useCase: "K-beauty ecommerce",
    portfolioCategory: "K-Beauty",
    previewTone: "gradient",
    coverImage: stitchCaptureAssets["innisfree-ingredient-merchandising"],
    categorySlugs: [
      "warm-global-hospitality",
      "collaborative-canvas-system",
      "modern-art-modular"
    ],
    stitchExampleSlugs: ["innisfree-ingredient-merchandising"],
    prompt:
      "Create a Southeast Asia K-beauty homepage with ingredient-led navigation, dense promotional merchandising, bundle-first product sections, online-exclusive rails, and localized shipping and membership cues. Keep the layout fast-scanning, commerce-forward, and highly organized.",
    remixPrompt:
      "Adapt the same homepage for a product launch week. Keep the dense merchandising and ingredient-led organization, but push online exclusives, bundles, and member-only modules harder in the first scroll.",
    curatorNote:
      "Dense merchandising works here only if the ingredient and offer hierarchy stays extremely clear.",
    outputFocus: [
      "A fast-scanning opener with immediate promotion logic",
      "Ingredient-led rails that keep discovery organized",
      "Membership, bundle, and shipping cues integrated into commerce"
    ],
    outputs: [
      {
        title: "Promo Hero",
        caption: "A bright merchandising opener that prioritizes ingredients, bundles, and local shipping cues.",
        meta: "hero",
        size: "wide",
        image: stitchCaptureAssets["innisfree-ingredient-merchandising"]
      },
      {
        title: "Ingredient Rail",
        caption: "A structured product shelf grouped by ingredients, offers, and exclusives.",
        meta: "ingredients",
        size: "square"
      },
      {
        title: "Bundle Close",
        caption: "A lower section where online-only sets and loyalty prompts stay readable despite density.",
        meta: "bundle",
        size: "tall"
      }
    ]
  },
  {
    slug: "aesop-editorial-commerce-case",
    title: "Aesop Editorial Commerce Study",
    summary:
      "An ecommerce homepage prompt for premium beauty or lifestyle brands that need commerce to feel literary and restrained.",
    brief:
      "Design a premium ecommerce homepage where products, storytelling, and cultural framing need to coexist without feeling like a standard sales layout.",
    useCase: "Ecommerce homepage",
    portfolioCategory: "Ecommerce",
    previewTone: "calm",
    coverImage: stitchCaptureAssets["aesop-editorial-commerce"],
    categorySlugs: [
      "calm-precision-ui",
      "editorial-grid-2d",
      "minimal-monochrome"
    ],
    stitchExampleSlugs: ["aesop-editorial-commerce"],
    prompt:
      "Design a premium skincare ecommerce homepage with an editorial hero, muted neutral surfaces, literary section titles, sensory product metadata, and calm shoppable modules. Blend commerce with cultural navigation and keep the page sparse, precise, and high-trust.",
    remixPrompt:
      "Reframe the same ecommerce homepage for a broader wellness brand. Preserve the literary pacing, but make category navigation and best-seller shelves slightly more visible in the first screen.",
    curatorNote:
      "The goal is not to hide commerce, but to stage it with editorial restraint and premium confidence.",
    outputFocus: [
      "An editorial hero with clear but quiet shopping entry points",
      "Product modules that feel literary rather than promotional",
      "A high-trust close that preserves premium pacing"
    ],
    outputs: [
      {
        title: "Editorial Commerce",
        caption: "A restrained opener where product, copy, and atmosphere feel composed instead of sales-led.",
        meta: "hero",
        size: "wide",
        image: stitchCaptureAssets["aesop-editorial-commerce"]
      },
      {
        title: "Product Shelf",
        caption: "A calm module where sensory metadata and shoppable cards stay elegant.",
        meta: "products",
        size: "square"
      },
      {
        title: "Story Close",
        caption: "A lower section that keeps product, culture, and conversion in the same quiet rhythm.",
        meta: "story",
        size: "tall"
      }
    ]
  },
  {
    slug: "allbirds-friendly-dtc-case",
    title: "Allbirds Friendly DTC Launch",
    summary:
      "A DTC ecommerce prompt built for bright navigation, comfort-led copy, and collection-first shopping clarity.",
    brief:
      "Create a direct-to-consumer ecommerce homepage that needs to feel easy, bright, and instantly shoppable without losing brand coherence.",
    useCase: "Ecommerce homepage",
    portfolioCategory: "Ecommerce",
    previewTone: "warm",
    coverImage: stitchCaptureAssets["allbirds-friendly-dtc"],
    categorySlugs: [
      "warm-global-hospitality",
      "calm-precision-ui",
      "modern-art-modular"
    ],
    stitchExampleSlugs: ["allbirds-friendly-dtc"],
    prompt:
      "Create a direct-to-consumer footwear ecommerce homepage with a friendly hero, split audience CTAs, named collection modules, best-seller shelves, and short benefit-led copy blocks about comfort and sustainability. Keep the layout bright, easy to browse, and conversion-ready.",
    remixPrompt:
      "Adapt the same homepage for a seasonal campaign. Keep the easy browsing rhythm, but add more collection emphasis, launch color cues, and product benefits in the first two sections.",
    curatorNote:
      "This works when conversion should feel effortless and brand-friendly rather than luxury or hype-driven.",
    outputFocus: [
      "A welcoming hero with clean audience split",
      "Collection modules and best-seller rails that are easy to scan",
      "Benefit-led copy that stays short and readable"
    ],
    outputs: [
      {
        title: "Friendly Hero",
        caption: "A bright DTC opener with audience paths, comfort claims, and direct collection entry points.",
        meta: "hero",
        size: "wide",
        image: stitchCaptureAssets["allbirds-friendly-dtc"]
      },
      {
        title: "Collection Shelf",
        caption: "A simple product rail where named collections and best sellers stay front and center.",
        meta: "collection",
        size: "square"
      },
      {
        title: "Benefit Close",
        caption: "A lower module where sustainability, product comfort, and CTA stay conversion-friendly.",
        meta: "benefits",
        size: "tall"
      }
    ]
  },
  {
    slug: "gymshark-launch-commerce-case",
    title: "Gymshark Launch Commerce Sprint",
    summary:
      "A high-energy ecommerce prompt where campaign rhythm and product merchandising need to hit immediately.",
    brief:
      "Build a launch-driven ecommerce homepage for a fast-moving apparel brand where campaigns, new drops, and product grids need to merge into one aggressive conversion system.",
    useCase: "Ecommerce homepage",
    portfolioCategory: "Ecommerce",
    previewTone: "creator",
    coverImage: stitchCaptureAssets["gymshark-launch-commerce"],
    categorySlugs: [
      "creator-velocity",
      "kinetic-type-signal",
      "premium-gradient-atmosphere"
    ],
    stitchExampleSlugs: ["gymshark-launch-commerce"],
    prompt:
      "Design a high-energy activewear ecommerce homepage with a campaign-led hero, launch collection callouts, rapid new-in product grids, fit and color metadata, and strong repeated shop CTAs. Make it feel like a release event with commerce built directly into the first scroll.",
    remixPrompt:
      "Rework the same homepage for mobile-first launch traffic. Keep the campaign pressure, but make sizing, price, and shop actions visible faster with fewer visual detours.",
    curatorNote:
      "This is useful when the homepage needs drop-event momentum without turning into an unreadable campaign collage.",
    outputFocus: [
      "A campaign hero that immediately feels like a launch event",
      "Fast product rails with obvious price and fit metadata",
      "Repeated shop actions that stay clear under heavy energy"
    ],
    outputs: [
      {
        title: "Launch Hero",
        caption: "A hard-driving opener where campaign type and product urgency land in the same screen.",
        meta: "hero",
        size: "wide",
        image: stitchCaptureAssets["gymshark-launch-commerce"]
      },
      {
        title: "New-In Grid",
        caption: "A quick product field that surfaces launches, fits, and colorways without killing pace.",
        meta: "grid",
        size: "square"
      },
      {
        title: "Commerce Close",
        caption: "A lower conversion section where CTA repetition and product proof stay controlled.",
        meta: "close",
        size: "tall"
      }
    ]
  },
  {
    slug: "latam-kbeauty-clubfront-case",
    title: "Hori Ritual K-Beauty Clubfront",
    summary:
      "A ritual-led Latin K-beauty homepage prompt built around a skin quiz, step-by-step routines, and soft clinical education.",
    brief:
      "Create a Spanish-language K-beauty homepage where ritual education, personalized routines, and calm trust cues need to guide shoppers into curated conversion.",
    useCase: "K-beauty ecommerce",
    portfolioCategory: "Beauty Commerce",
    previewTone: "warm",
    coverImage: stitchCaptureAssets["latam-kbeauty-clubfront"],
    categorySlugs: [
      "warm-global-hospitality",
      "creator-velocity",
      "premium-gradient-atmosphere"
    ],
    stitchExampleSlugs: ["latam-kbeauty-clubfront"],
    prompt:
      "Design a polished Spanish-language K-beauty storefront with a ritual-led hero, integrated skin quiz, tiered routine builder, soft clinical education, calm before-and-after proof, and curated Korean beauty merchandising. Keep the page guided, premium, and easy to trust.",
    remixPrompt:
      "Rework the same homepage for a faster conversion path. Keep the ritual hero and skin quiz, but bring the routine builder, bundle add-all modules, and proof rails earlier in the first two sections.",
    curatorNote:
      "This direction works when K-beauty needs to feel expert-guided and ritual-driven instead of loud marketplace-heavy.",
    outputFocus: [
      "A ritual hero with one clear quiz or guided-entry path",
      "Step-based routine modules that feel curated rather than crowded",
      "Calm proof surfaces with before-after or customer trust cues"
    ],
    outputs: [
      {
        title: "Ritual Hero",
        caption: "A guided opener where skin quiz, routine language, and K-beauty trust feel calm and premium.",
        meta: "hero",
        size: "wide",
        image: stitchCaptureAssets["latam-kbeauty-clubfront"]
      },
      {
        title: "Routine Builder",
        caption: "A structured middle layer for 5-step, 7-step, or 9-step routines with add-all logic.",
        meta: "quiz",
        size: "square"
      },
      {
        title: "Proof Close",
        caption: "A closing section that brings before-after trust, quotes, and shoppable routines together.",
        meta: "close",
        size: "tall"
      }
    ]
  },
  {
    slug: "natura-botanical-ritual-shop-case",
    title: "Natura Botanical Ritual Shop",
    summary:
      "A Brazilian beauty commerce prompt built around botanical storytelling, ritual-led navigation, and refill-aware gifting.",
    brief:
      "Design a beauty homepage inspired by Natura where ritual categories, gifting, and sustainability cues need to feel warm, premium, and immediately shoppable.",
    useCase: "Beauty commerce",
    portfolioCategory: "Beauty Commerce",
    previewTone: "warm",
    coverImage: stitchCaptureAssets["natura-botanical-ritual-shop"],
    categorySlugs: [
      "warm-global-hospitality",
      "editorial-grid-2d",
      "premium-gradient-atmosphere"
    ],
    stitchExampleSlugs: ["natura-botanical-ritual-shop"],
    prompt:
      "Create a Brazilian beauty ecommerce homepage inspired by Natura with botanical ritual storytelling, refill and sustainability cues, gift-focused merchandising, earthy color fields, and category rails that move from perfumery to body care to skincare. Keep the page warm, editorial, and ritual-led.",
    remixPrompt:
      "Adapt the same homepage for a seasonal gifting moment. Keep the botanical warmth, but push gift kits, category highlights, and refill logic higher in the first two sections.",
    curatorNote:
      "The page should feel like a ritual and gifting ecosystem, not just a beauty catalog with sustainability badges tacked on.",
    outputFocus: [
      "A ritual-led hero with earthy warmth and gift intent",
      "Category rails that feel botanical and shoppable",
      "Refill and sustainability cues integrated into the merchandising logic"
    ],
    outputs: [
      {
        title: "Ritual Hero",
        caption: "A warm Brazilian beauty opener with gift kits, fragrance storytelling, and botanical framing.",
        meta: "hero",
        size: "wide",
        image: stitchCaptureAssets["natura-botanical-ritual-shop"]
      },
      {
        title: "Category Rituals",
        caption: "A middle section where body care, perfume, and skincare move through a clear ritual order.",
        meta: "ritual",
        size: "square"
      },
      {
        title: "Refill Close",
        caption: "A closing zone where refills, gifts, and brand trust stay premium and helpful.",
        meta: "close",
        size: "tall"
      }
    ]
  },
  {
    slug: "boticario-gift-fragrance-grid-case",
    title: "Boticario Gift Fragrance Grid",
    summary:
      "A fragrance-first Brazilian beauty homepage prompt that mixes gifting urgency, loyalty cues, and clean shoppable density.",
    brief:
      "Create a beauty commerce homepage inspired by O Boticario where gift kits, fragrance campaigns, and fast add-to-bag modules need to feel premium but highly commercial.",
    useCase: "Beauty commerce",
    portfolioCategory: "Beauty Commerce",
    previewTone: "gradient",
    coverImage: stitchCaptureAssets["boticario-gift-fragrance-grid"],
    categorySlugs: [
      "warm-global-hospitality",
      "premium-gradient-atmosphere",
      "modern-art-modular"
    ],
    stitchExampleSlugs: ["boticario-gift-fragrance-grid"],
    prompt:
      "Design a Brazilian beauty homepage inspired by O Boticário with fragrance-first gifting modules, campaign gift kits, loyalty club cues, bright merchandising, and rapid add-to-bag product tiles. Balance premium fragrance mood with high-conversion retail structure.",
    remixPrompt:
      "Reframe the same homepage for Mother's Day or gifting season. Keep the fragrance-led mood, but increase kit visibility, occasion labels, and repeated shop actions through the first scroll.",
    curatorNote:
      "The right version feels giftable and high-conversion at the same time, with fragrance mood carrying the premium layer.",
    outputFocus: [
      "A gift-led fragrance hero with immediate occasion cues",
      "Product tiles that convert quickly without looking cheap",
      "Loyalty and pickup cues embedded into the merchandising flow"
    ],
    outputs: [
      {
        title: "Gift Hero",
        caption: "A fragrance and gifting opener where occasion, campaign, and conversion line up in one screen.",
        meta: "hero",
        size: "wide",
        image: stitchCaptureAssets["boticario-gift-fragrance-grid"]
      },
      {
        title: "Gift Kit Grid",
        caption: "A dense commerce field for kits, perfumes, and flash add-to-bag actions.",
        meta: "grid",
        size: "square"
      },
      {
        title: "Loyalty Close",
        caption: "A lower module where loyalty, pickup, and product proof stay readable under gifting pressure.",
        meta: "close",
        size: "tall"
      }
    ]
  },
  {
    slug: "yanbal-consultant-beauty-club-case",
    title: "Karita Koreana Conversion Storefront",
    summary:
      "A direct-conversion K-beauty homepage prompt built around routine-sequence navigation, local trust signals, and WhatsApp guidance.",
    brief:
      "Design a Mexican K-beauty storefront where payment trust, shipping speed, reviews, and skin-test guidance must all appear early in the shopping flow.",
    useCase: "Beauty commerce",
    portfolioCategory: "Beauty Commerce",
    previewTone: "creator",
    coverImage: stitchCaptureAssets["yanbal-consultant-beauty-club"],
    categorySlugs: [
      "warm-global-hospitality",
      "creator-velocity",
      "premium-gradient-atmosphere"
    ],
    stitchExampleSlugs: ["yanbal-consultant-beauty-club"],
    prompt:
      "Create a high-conversion Mexican K-beauty shop with a step-by-step routine menu, strong review proof, local payment and shipping trust, WhatsApp-led personalized guidance, and product rails for new arrivals, skin-type browsing, and daily essentials. Keep the page bright, fast, and mobile-native.",
    remixPrompt:
      "Adapt the same homepage for a bigger campaign month. Keep the routine menu and local trust stack, but increase product urgency, review visibility, and skin-test entry points above the fold.",
    curatorNote:
      "The strength here is local trust. The page should feel unmistakably built for Mexican conversion habits, not just imported K-beauty aesthetics.",
    outputFocus: [
      "A first screen that makes local trust markers impossible to miss",
      "Routine-sequence navigation that behaves like the shopping backbone",
      "WhatsApp and review proof integrated into the conversion path"
    ],
    outputs: [
      {
        title: "Trust Hero",
        caption: "A bright first screen where shipping speed, payment trust, and K-beauty guidance appear immediately.",
        meta: "hero",
        size: "wide",
        image: stitchCaptureAssets["yanbal-consultant-beauty-club"]
      },
      {
        title: "Routine Menu",
        caption: "A clear step-by-step navigation rail for routine shopping, essentials, and new arrivals.",
        meta: "catalog",
        size: "square"
      },
      {
        title: "WhatsApp Close",
        caption: "A lower section where reviews, skin tests, and WhatsApp support close the gap to purchase.",
        meta: "close",
        size: "tall"
      }
    ]
  },
  {
    slug: "neo-tokyo-night-drive-portfolio-case",
    title: "Neo Tokyo Night Drive Portfolio",
    summary:
      "A cinematic art direction portfolio prompt that mixes Neo Tokyo signage, rain-soaked light, and high-contrast nightlife pacing.",
    brief:
      "Create an art direction portfolio that feels like a futuristic Tokyo night drive: neon signage, reflective black surfaces, bilingual wayfinding, and cinematic project reveals.",
    useCase: "Art direction portfolio",
    portfolioCategory: "Art Direction",
    previewTone: "motion",
    coverImage: stitchCaptureAssets["neo-tokyo-night-drive-portfolio"],
    categorySlugs: [
      "immersive-3d",
      "kinetic-type-signal",
      "brutalist-contrast"
    ],
    stitchExampleSlugs: ["neo-tokyo-night-drive-portfolio"],
    prompt:
      "Design a cinematic art direction portfolio with Neo Tokyo and Blade Runner energy: rain-soaked black surfaces, cyan and magenta neon haze, bilingual transit-inspired typography, reflective chrome cues, animated project billboards, and a high-contrast scroll rhythm. Make the page feel like a premium midnight city drive rather than a generic cyberpunk collage.",
    remixPrompt:
      "Rework the same portfolio for a more minimal fashion-image direction. Keep the Neo Tokyo night mood and bilingual signage, but reduce the number of neon accents and give the project imagery more dominance.",
    curatorNote:
      "The mood should feel cinematic and transportive, but the portfolio still needs a clean project hierarchy and legible navigation.",
    outputFocus: [
      "A neon city-drive hero with cinematic restraint",
      "Project billboards and signage that guide the scroll rhythm",
      "Reflective black surfaces that support, not overwhelm, the work"
    ],
    outputs: [
      {
        title: "Night Drive Hero",
        caption: "A hero scene with neon billboards, transit-like labels, and a strong cinematic project opener.",
        meta: "hero",
        size: "wide",
        image: stitchCaptureAssets["neo-tokyo-night-drive-portfolio"]
      },
      {
        title: "Project Signage",
        caption: "A mid-scroll project rail where animated titles behave like city signage and wayfinding.",
        meta: "signage",
        size: "square"
      },
      {
        title: "Midnight Close",
        caption: "A lower section where contact, credits, and portfolio detail stay sharp inside the neon atmosphere.",
        meta: "close",
        size: "tall"
      }
    ]
  },
  {
    slug: "shibuya-replicant-archive-case",
    title: "Shibuya Replicant Archive",
    summary:
      "A darker Neo Tokyo art direction page tuned toward Blade Runner fog, holographic overlays, and noir archive pacing.",
    brief:
      "Build an art direction archive that feels like a late-night Shibuya control room with layered glass, holographic labels, and cinematic portfolio sequencing.",
    useCase: "Art direction portfolio",
    portfolioCategory: "Art Direction",
    previewTone: "spatial",
    coverImage: stitchCaptureAssets["shibuya-replicant-archive"],
    categorySlugs: [
      "motion-first-canvas",
      "premium-gradient-atmosphere",
      "brutalist-contrast"
    ],
    stitchExampleSlugs: ["shibuya-replicant-archive"],
    prompt:
      "Create a noir art direction archive with Blade Runner and Shibuya station energy: smoked-glass panels, holographic labels, amber and cyan signal lights, dense but readable metadata, and cinematic scroll reveals over a rain-dark interface. Keep the composition luxurious and legible, not noisy or game-like.",
    remixPrompt:
      "Adapt the same archive for a music or title-sequence portfolio. Keep the smoked-glass noir system, but make motion cues and chapter markers more aggressive while preserving legibility.",
    curatorNote:
      "This page should feel like a future-noir archive system, with atmosphere doing real compositional work instead of just adding neon.",
    outputFocus: [
      "A noir archive opener with holographic wayfinding",
      "Dense metadata that still reads clearly through glass layers",
      "Signal-light accents and cinematic reveals that hold a premium mood"
    ],
    outputs: [
      {
        title: "Replicant Opener",
        caption: "A dark first screen where fog, signal lights, and glass labels establish the archive logic immediately.",
        meta: "hero",
        size: "wide",
        image: stitchCaptureAssets["shibuya-replicant-archive"]
      },
      {
        title: "Signal Grid",
        caption: "A dense archival wall of projects, labels, and motion chapters under a neon-noir system.",
        meta: "grid",
        size: "square"
      },
      {
        title: "Archive Close",
        caption: "A final section where credits, contact, and project lineage remain luxurious and exact.",
        meta: "close",
        size: "tall"
      }
    ]
  },
  {
    slug: "book-promo-editorial-showcase-case",
    title: "Book Promo Editorial Showcase",
    summary:
      "A Readymag-inspired microsite prompt for books and essay launches where one cover, a few quotes, and cinematic whitespace do most of the work.",
    brief:
      "Create a promo page for a book release where the cover art, chapter excerpts, author bio, and one strong pre-order path need to feel collectible and editorial rather than ecommerce-heavy.",
    useCase: "Book launch microsite",
    portfolioCategory: "Editorial",
    previewTone: "editorial",
    coverImage: stitchCaptureAssets["readymag-book-promo-editorial"],
    categorySlugs: [
      "editorial-grid-2d",
      "minimal-monochrome",
      "modern-art-modular"
    ],
    stitchExampleSlugs: ["readymag-book-promo-editorial"],
    prompt:
      "Design an editorial book launch microsite with one dominant cover stage, oversized literary typography, chapter excerpt bands, author notes, pre-order cues, and gallery-like whitespace. Keep the page collectible, sparse, and cinematic instead of turning it into a generic shop page.",
    remixPrompt:
      "Rework the same book microsite for a design or photography monograph. Preserve the quiet literary pacing, but give the cover image more scale, make chapter labels slightly stricter, and let the excerpt modules feel more exhibition-like.",
    curatorNote:
      "This direction works when the release should feel authored and tactile. The strongest version uses very little interface chrome and lets the cover art do real compositional work.",
    outputFocus: [
      "A cover-led first screen with one clear pre-order action",
      "Excerpt modules that feel like chapter cards, not marketing blocks",
      "Author and release details that stay elegant and collectible"
    ],
    outputs: [
      {
        title: "Cover Opener",
        caption: "A book-led opener with one dominant cover image, one headline, and a restrained release cue.",
        meta: "hero",
        size: "wide",
        image: stitchCaptureAssets["readymag-book-promo-editorial"]
      },
      {
        title: "Excerpt Rail",
        caption: "A quiet sequence of chapter extracts and editorial metadata arranged like gallery captions.",
        meta: "chapters",
        size: "square"
      },
      {
        title: "Author Close",
        caption: "A closing band for author note, credits, and pre-order without breaking the literary rhythm.",
        meta: "close",
        size: "tall"
      }
    ]
  },
  {
    slug: "cultural-branding-studio-case",
    title: "Cultural Branding Studio Portal",
    summary:
      "A Readymag-inspired studio website prompt for boutique branding teams that need cultural positioning, selected work, and narrative authority in the same frame.",
    brief:
      "Build a studio site for a small branding agency where strategy, cultural insight, selected projects, and writing need to feel authored and premium instead of agency-template generic.",
    useCase: "Studio website",
    portfolioCategory: "Studio",
    previewTone: "gradient",
    coverImage: stitchCaptureAssets["readymag-cultural-brand-studio"],
    categorySlugs: [
      "modern-art-modular",
      "calm-precision-ui",
      "editorial-grid-2d"
    ],
    stitchExampleSlugs: ["readymag-cultural-brand-studio"],
    prompt:
      "Design a boutique branding studio website with a statement-led hero, cultural insight modules, selected work tiles, quiet serif and sans contrast, and a premium rhythm that balances strategy writing with image-led project cards. Keep it polished, narrative, and highly curated.",
    remixPrompt:
      "Adapt the same studio site for a smaller independent strategist. Keep the cultural narrative and selected work structure, but reduce service complexity, enlarge the writing modules, and make the first project card more dominant.",
    curatorNote:
      "The site should behave like a strategic portfolio, not a service grid. The best version lets language and selected work reinforce each other instead of competing.",
    outputFocus: [
      "A strong opening thesis about the studio point of view",
      "Selected work modules that feel premium and sparse",
      "Strategy writing blocks that support the work rather than slowing it down"
    ],
    outputs: [
      {
        title: "Studio Thesis",
        caption: "A statement-led opener where positioning and selected work share the first screen cleanly.",
        meta: "hero",
        size: "wide",
        image: stitchCaptureAssets["readymag-cultural-brand-studio"]
      },
      {
        title: "Narrative Grid",
        caption: "A mid-page arrangement of insight modules, short essays, and selected brand case studies.",
        meta: "strategy",
        size: "square"
      },
      {
        title: "Contact Close",
        caption: "A final section where studio details, writing, and inquiry stay premium and understated.",
        meta: "close",
        size: "tall"
      }
    ]
  },
  {
    slug: "bookmaker-index-portfolio-case",
    title: "Bookmaker Index Portfolio",
    summary:
      "A Readymag-inspired portfolio prompt for book designers and makers who need numbered project indexing, quiet metadata, and monographic pacing.",
    brief:
      "Create a portfolio for a book designer or maker where many projects need to be browsed through a restrained index, with numbered navigation, project titles, and quiet contact details.",
    useCase: "Book design portfolio",
    portfolioCategory: "Graphic Design",
    previewTone: "mono",
    coverImage: stitchCaptureAssets["readymag-bookmaker-index-portfolio"],
    categorySlugs: [
      "minimal-monochrome",
      "editorial-grid-2d",
      "modern-art-modular"
    ],
    stitchExampleSlugs: ["readymag-bookmaker-index-portfolio"],
    prompt:
      "Design a book designer portfolio with a numbered project index, calm monochrome typography, image-led project entries, quiet biography details, and a restrained archival structure that feels like a monograph rather than a startup site.",
    remixPrompt:
      "Rework the same portfolio for a foundry or editorial studio. Preserve the numbered index and monographic calm, but make specimen imagery more visible and give the information rail a slightly more systematic pace.",
    curatorNote:
      "This category depends on restraint. The numbered index is the spine of the interface, and everything else should support that reading rhythm.",
    outputFocus: [
      "A numeric index that clearly sequences many projects",
      "Quiet contact and bio details that do not break the portfolio rhythm",
      "Project cards that feel archival and bookish, not card-template based"
    ],
    outputs: [
      {
        title: "Indexed Opener",
        caption: "A calm index page where numbered projects and one biography rail set the tone immediately.",
        meta: "index",
        size: "wide",
        image: stitchCaptureAssets["readymag-bookmaker-index-portfolio"]
      },
      {
        title: "Project Sequence",
        caption: "A slow sequence of book projects with quiet metadata and curated cover pacing.",
        meta: "projects",
        size: "square"
      },
      {
        title: "Book Detail",
        caption: "A detail page where project images, captions, and credits hold together like a printed spread.",
        meta: "detail",
        size: "tall"
      }
    ]
  },
  {
    slug: "minimal-designer-grid-case",
    title: "Minimal Designer Grid",
    summary:
      "A Readymag-inspired personal portfolio prompt for minimal designers who need a clean project field and very little interface noise.",
    brief:
      "Build a personal design portfolio where selected projects, short labels, and a small amount of personal positioning need to feel immediate, modern, and extremely clean.",
    useCase: "Design portfolio",
    portfolioCategory: "Graphic Design",
    previewTone: "calm",
    coverImage: stitchCaptureAssets["readymag-minimal-designer-grid"],
    categorySlugs: [
      "minimal-monochrome",
      "calm-precision-ui",
      "editorial-grid-2d"
    ],
    stitchExampleSlugs: ["readymag-minimal-designer-grid"],
    prompt:
      "Create a minimal design portfolio with a crisp project grid, oversized but restrained typography, black-and-ivory surfaces, selective captions, and almost no decorative interface chrome. The page should feel precise, contemporary, and easy to browse.",
    remixPrompt:
      "Adapt the same portfolio for a motion or brand designer. Keep the minimal grid and monochrome precision, but allow one stronger project thumbnail in the first screen and make category tags more legible.",
    curatorNote:
      "The strength here is elimination. If the layout starts adding too many rails, badges, or tricks, it stops feeling sharp.",
    outputFocus: [
      "A clean first-screen project field with one strong entry point",
      "Typography that feels deliberate without becoming expressive clutter",
      "Captions and labels that support browsing without visual weight"
    ],
    outputs: [
      {
        title: "Grid Opener",
        caption: "A sharp portfolio opener where the project grid and headline share one disciplined frame.",
        meta: "hero",
        size: "wide",
        image: stitchCaptureAssets["readymag-minimal-designer-grid"]
      },
      {
        title: "Selected Work",
        caption: "A minimal field of selected work that stays airy and exact even with several projects visible.",
        meta: "grid",
        size: "square"
      },
      {
        title: "Case Detail",
        caption: "A detail page where one project gets more scale without losing the calm system.",
        meta: "detail",
        size: "tall"
      }
    ]
  },
  {
    slug: "relief-gallery-cultural-space-case",
    title: "Relief Gallery Cultural Space",
    summary:
      "A Readymag-inspired culture website prompt for galleries and creative communities that need event framing, mission language, and a premium visual field.",
    brief:
      "Design a cultural platform website where exhibitions, collaborations, mission language, and community participation need to feel elevated, international, and visually serious.",
    useCase: "Culture website",
    portfolioCategory: "Culture",
    previewTone: "editorial",
    coverImage: stitchCaptureAssets["readymag-relief-gallery-space"],
    categorySlugs: [
      "modern-art-modular",
      "editorial-grid-2d",
      "warm-global-hospitality"
    ],
    stitchExampleSlugs: ["readymag-relief-gallery-space"],
    prompt:
      "Create a cultural gallery website with an exhibition-led hero, manifesto text, event modules, partner rails, and a premium visual rhythm that mixes art-world seriousness with community access. Keep the page spacious, international, and image-led without becoming chaotic.",
    remixPrompt:
      "Rework the same cultural site for a program-heavy season. Preserve the exhibition-led hero and premium pacing, but make event dates, visiting information, and partner modules slightly more visible in the first scroll.",
    curatorNote:
      "The page should feel cultural first, functional second. The mission language is part of the design hierarchy, not just a block of copy.",
    outputFocus: [
      "An exhibition-led opener that feels premium and public-facing at once",
      "Event and partner modules that are readable without losing atmosphere",
      "Mission language that reinforces the institution's role in culture"
    ],
    outputs: [
      {
        title: "Exhibition Hero",
        caption: "A cultural opener where one event image and the mission statement establish the tone immediately.",
        meta: "hero",
        size: "wide",
        image: stitchCaptureAssets["readymag-relief-gallery-space"]
      },
      {
        title: "Program Shelf",
        caption: "A structured field of events, collaborations, and visiting details under one calm system.",
        meta: "program",
        size: "square"
      },
      {
        title: "Community Close",
        caption: "A final section where participation, partner signals, and contact stay elegant and public-facing.",
        meta: "close",
        size: "tall"
      }
    ]
  },
  {
    slug: "web3-creator-broadcast-case",
    title: "Web3 Creator Broadcast Site",
    summary:
      "A Readymag-inspired portfolio prompt for futuristic creator-builders who need a bold personal site without losing structure.",
    brief:
      "Build a personal studio site for a website creator working with brands and artists, where broadcast-style hero messaging, immersive motion cues, and project credibility all need to land quickly.",
    useCase: "Creative studio website",
    portfolioCategory: "Creative Tech",
    previewTone: "motion",
    coverImage: stitchCaptureAssets["readymag-web3-creator-broadcast"],
    categorySlugs: [
      "motion-first-canvas",
      "immersive-3d",
      "brutalist-contrast"
    ],
    stitchExampleSlugs: ["readymag-web3-creator-broadcast"],
    prompt:
      "Design a futuristic creator studio website with a broadcast-style opener, bold headline pacing, dark high-contrast surfaces, web3-era depth cues, kinetic type moments, and premium project modules for brands and artists. Keep it dramatic, but still legible and portfolio-led.",
    remixPrompt:
      "Adapt the same creator studio site for a more client-facing presentation. Preserve the broadcast hero and dark motion system, but make project proof, service clarity, and inquiry entry points slightly calmer and more obvious.",
    curatorNote:
      "This direction needs tension, not chaos. The site should feel like a strong creator signal rather than an effects demo.",
    outputFocus: [
      "A broadcast-like first screen with personal positioning and project authority",
      "Dark motion surfaces that support, not obscure, the work",
      "Selected projects and inquiry paths that remain legible under high contrast"
    ],
    outputs: [
      {
        title: "Broadcast Hero",
        caption: "A dramatic opener where creator positioning, dark motion, and premium type land in one frame.",
        meta: "hero",
        size: "wide",
        image: stitchCaptureAssets["readymag-web3-creator-broadcast"]
      },
      {
        title: "Project Signal",
        caption: "A strong project rail that keeps selected work visible inside a high-contrast motion system.",
        meta: "projects",
        size: "square"
      },
      {
        title: "Inquiry Close",
        caption: "A closing section where contact and collaboration stay clear without flattening the drama.",
        meta: "close",
        size: "tall"
      }
    ]
  }
];

export const compareColumns = [
  {
    label: "SaaS landing",
    title: "Calm Precision UI",
    previewTone: "calm" as const,
    change: "More breathing room, less noise, stronger clarity at first scan."
  },
  {
    label: "SaaS landing",
    title: "Enterprise Grid System",
    previewTone: "grid" as const,
    change:
      "Tighter modular rhythm, more explicit structure, stronger B2B trust cues."
  },
  {
    label: "SaaS landing",
    title: "Creator Velocity",
    previewTone: "creator" as const,
    change:
      "Faster hooks, bolder contrast, social-native momentum, higher energy."
  }
];

export const builderOptions = {
  pageTypes: [
    "Landing",
    "Portfolio",
    "Dashboard",
    "Ecommerce",
    "Docs",
    "Campaign",
    "Studio",
    "Microsite"
  ],
  tones: [
    "Quiet premium",
    "Friendly",
    "Systematic",
    "Playful",
    "Experimental",
    "Cultural",
    "Gallery-like",
    "Technical"
  ],
  mediums: ["2D", "3D", "Animation", "Photo-led", "Illustration-led", "Mixed media"],
  motionLevels: ["Still", "Subtle", "Moderate", "Expressive", "Cinematic"],
  colorDirections: [
    "Neutral",
    "Warm",
    "Cool",
    "Gradient",
    "Monochrome",
    "Primary colors",
    "Gallery contrast"
  ],
  hordeModels: [
    "AlbedoBase XL (SDXL)",
    "AbsoluteReality",
    "Abyss OrangeMix"
  ],
  hordeSizes: ["832x512", "1024x576", "1024x1024"]
};

export const builderPresets: BuilderPreset[] = [
  {
    slug: "apple-launch",
    title: "Apple-like product launch",
    summary: "Quiet premium launch page with measured spacing and soft proof depth.",
    pageType: "Landing",
    tone: "Quiet premium",
    medium: "2D",
    motionLevel: "Subtle",
    colorDirection: "Monochrome",
    dnaSlug: "calm-precision-ui",
    styleSlug: "glass-lens-interface"
  },
  {
    slug: "figma-workspace",
    title: "Figma-style collaborative workspace",
    summary: "Dense pane layout, rails, canvas cues, and collaborative system feeling.",
    pageType: "Dashboard",
    tone: "Technical",
    medium: "2D",
    motionLevel: "Moderate",
    colorDirection: "Cool",
    dnaSlug: "collaborative-canvas-system",
    styleSlug: "glass-lens-interface"
  },
  {
    slug: "airbnb-booking",
    title: "Airbnb-style booking landing",
    summary: "Warm hospitality, rounded trust cues, and inviting discovery flow.",
    pageType: "Landing",
    tone: "Friendly",
    medium: "Photo-led",
    motionLevel: "Subtle",
    colorDirection: "Warm",
    dnaSlug: "warm-global-hospitality",
    styleSlug: "modern-art-modular"
  },
  {
    slug: "ibm-solution-page",
    title: "IBM-style enterprise solution page",
    summary: "Modular proof sections, rigorous hierarchy, and operational trust.",
    pageType: "Docs",
    tone: "Systematic",
    medium: "2D",
    motionLevel: "Still",
    colorDirection: "Monochrome",
    dnaSlug: "enterprise-grid-system",
    styleSlug: "minimal-monochrome"
  },
  {
    slug: "tiktok-drop",
    title: "TikTok-style creator drop",
    summary: "Punchy hooks, kinetic type, and fast social-native pacing.",
    pageType: "Campaign",
    tone: "Playful",
    medium: "Animation",
    motionLevel: "Expressive",
    colorDirection: "Gallery contrast",
    dnaSlug: "creator-velocity",
    styleSlug: "kinetic-type-signal"
  },
  {
    slug: "bauhaus-3d-showcase",
    title: "Bauhaus 3D modern-art showcase",
    summary: "Primary colors, 3D geometry, and sculptural interaction for an artful landing.",
    pageType: "Microsite",
    tone: "Experimental",
    medium: "3D",
    motionLevel: "Cinematic",
    colorDirection: "Primary colors",
    dnaSlug: "collaborative-canvas-system",
    styleSlug: "bauhaus-color-block-3d"
  },
  {
    slug: "gallery-portfolio",
    title: "Modern art portfolio archive",
    summary: "Gallery pacing, exhibition captions, and curated modern-art color framing.",
    pageType: "Portfolio",
    tone: "Gallery-like",
    medium: "Mixed media",
    motionLevel: "Subtle",
    colorDirection: "Gallery contrast",
    dnaSlug: "warm-global-hospitality",
    styleSlug: "modern-art-modular"
  },
  {
    slug: "kinetic-launch",
    title: "Kinetic type launch microsite",
    summary: "Type-led motion system for culture, product drops, or expressive launches.",
    pageType: "Microsite",
    tone: "Cultural",
    medium: "Animation",
    motionLevel: "Cinematic",
    colorDirection: "Primary colors",
    dnaSlug: "creator-velocity",
    styleSlug: "kinetic-type-signal"
  }
];

export const builderThemes: BuilderTheme[] = [
  {
    slug: "frosted-keynote",
    title: "Frosted Keynote",
    summary: "Quiet product reveal with glass depth, calm type, and premium restraint.",
    cue: "Alembic-style theme card for keynote-grade product storytelling.",
    pageType: "Landing",
    tone: "Quiet premium",
    medium: "2D",
    motionLevel: "Subtle",
    colorDirection: "Monochrome",
    dnaSlug: "calm-precision-ui",
    styleSlug: "glass-lens-interface",
    previewTone: "calm",
    captureImage: stitchCaptureAssets["apple-assistant-os-preview"]
  },
  {
    slug: "terminal-editorial",
    title: "Terminal Editorial",
    summary: "Hard-edged mono layout for docs, product notes, and system writing.",
    cue: "Turns Alembic's text-first discipline into a docs-led web surface.",
    pageType: "Docs",
    tone: "Technical",
    medium: "2D",
    motionLevel: "Still",
    colorDirection: "Monochrome",
    dnaSlug: "enterprise-grid-system",
    styleSlug: "minimal-monochrome",
    previewTone: "mono",
    captureImage: stitchCaptureAssets["ibm-docs-marketing-hybrid"]
  },
  {
    slug: "community-canvas",
    title: "Community Canvas",
    summary: "Utility rails, pane density, and collaborative visual fluency.",
    cue: "A theme card for product-tool interfaces with live workspace energy.",
    pageType: "Dashboard",
    tone: "Technical",
    medium: "2D",
    motionLevel: "Moderate",
    colorDirection: "Cool",
    dnaSlug: "collaborative-canvas-system",
    styleSlug: "glass-lens-interface",
    previewTone: "grid",
    captureImage: stitchCaptureAssets["figma-plugin-directory"]
  },
  {
    slug: "warm-stay-story",
    title: "Warm Stay Story",
    summary: "Hospitality-led discovery flow with practical trust modules.",
    cue: "A friendly visual system that starts from atmosphere before conversion.",
    pageType: "Landing",
    tone: "Friendly",
    medium: "Photo-led",
    motionLevel: "Subtle",
    colorDirection: "Warm",
    dnaSlug: "warm-global-hospitality",
    styleSlug: "modern-art-modular",
    previewTone: "warm",
    captureImage: stitchCaptureAssets["airbnb-neighborhood-guide"]
  },
  {
    slug: "runway-house",
    title: "Runway House",
    summary: "Luxury runway pacing with quiet serif chapters and image-led couture structure.",
    cue: "Use when the page should feel like a fashion house dossier, not a retail homepage.",
    pageType: "Portfolio",
    tone: "Gallery-like",
    medium: "Photo-led",
    motionLevel: "Subtle",
    colorDirection: "Monochrome",
    dnaSlug: "calm-precision-ui",
    styleSlug: "editorial-grid-2d",
    previewTone: "mono",
    captureImage: stitchCaptureAssets["cargo-luxury-runway-house"]
  },
  {
    slug: "streetwear-journal",
    title: "Streetwear Journal",
    summary: "Drop-led campaign pacing with poster stacks, countdowns, and premium urgency.",
    cue: "Use when the page needs fashion energy with campaign motion, not generic ecommerce chrome.",
    pageType: "Microsite",
    tone: "Playful",
    medium: "Photo-led",
    motionLevel: "Expressive",
    colorDirection: "Gallery contrast",
    dnaSlug: "creator-velocity",
    styleSlug: "kinetic-type-signal",
    previewTone: "creator",
    captureImage: stitchCaptureAssets["cargo-streetwear-drop-journal"]
  },
  {
    slug: "kinetic-drop",
    title: "Kinetic Drop",
    summary: "High-immediacy campaign layout with bold text and social pacing.",
    cue: "Use when the page should feel like a launch, not a brochure.",
    pageType: "Campaign",
    tone: "Playful",
    medium: "Animation",
    motionLevel: "Expressive",
    colorDirection: "Gallery contrast",
    dnaSlug: "creator-velocity",
    styleSlug: "kinetic-type-signal",
    previewTone: "creator",
    captureImage: stitchCaptureAssets["tiktok-music-countdown"]
  },
  {
    slug: "bauhaus-lab",
    title: "Bauhaus Lab",
    summary: "Primary colors, sculptural blocks, and exhibition-scale 3D pacing.",
    cue: "A more experimental theme card for art-tech and modern archive pages.",
    pageType: "Microsite",
    tone: "Experimental",
    medium: "3D",
    motionLevel: "Cinematic",
    colorDirection: "Primary colors",
    dnaSlug: "collaborative-canvas-system",
    styleSlug: "bauhaus-color-block-3d",
    previewTone: "spatial",
    captureImage: stitchCaptureAssets["google-ai-lab-microsite"]
  }
];

export const brandDnaGalleryExamples: BrandDnaGalleryEntry[] = [
  {
    slug: "apple-launch",
    title: "Apple-style ambient device launch",
    summary: "Floating hardware reveal, sparse hero staging, and a precise premium CTA rhythm.",
    pageType: "Landing",
    tone: "Ambient premium",
    medium: "3D",
    motionLevel: "Subtle",
    colorDirection: "Monochrome",
    brandName: "Apple",
    templateHint: "Ambient hardware launch / keynote hero stage",
    dnaSlug: "calm-precision-ui",
    styleSlug: "premium-gradient-atmosphere",
    stitchPrompt:
      "Design an Apple-inspired landing page for a desk AI device. Use a black-to-silver hero stage, floating hardware render, a huge restrained headline, minimal navigation, and one section showing ecosystem pairing across phone, desktop, and audio. Keep the layout sparse, glossy, and expensive.",
    captureImage: stitchCaptureAssets["apple-ambient-device-launch"],
    captureMeta: "stitch export"
  },
  {
    slug: "figma-workspace",
    title: "Figma-style plugin directory",
    summary: "Dense plugin cards, install moments, utility rails, and a strong tool-native frame.",
    pageType: "Dashboard",
    tone: "Technical",
    medium: "2D",
    motionLevel: "Moderate",
    colorDirection: "Cool",
    brandName: "Figma",
    templateHint: "Plugin directory / tool-native marketplace landing",
    dnaSlug: "collaborative-canvas-system",
    styleSlug: "glass-lens-interface",
    stitchPrompt:
      "Design a Figma-inspired plugin directory with a left tool rail, dense plugin cards, category chips, install panels, and active workspace framing. Make the page feel like a working product surface with colorful plugin accents.",
    captureImage: stitchCaptureAssets["figma-plugin-directory"],
    captureMeta: "stitch export"
  },
  {
    slug: "airbnb-booking",
    title: "Airbnb-style neighborhood guide",
    summary: "Warm local photography, guide cards, and map-led discovery pacing for stays and places.",
    pageType: "Landing",
    tone: "Friendly",
    medium: "Photo-led",
    motionLevel: "Subtle",
    colorDirection: "Warm",
    brandName: "Airbnb",
    templateHint: "Neighborhood guide / local stay discovery landing",
    dnaSlug: "warm-global-hospitality",
    styleSlug: "modern-art-modular",
    stitchPrompt:
      "Create an Airbnb-inspired neighborhood guide landing page with warm photography, local guide cards, map cues, gentle rounded modules, and a browsable editorial travel rhythm. Keep it welcoming and discovery-first.",
    captureImage: stitchCaptureAssets["airbnb-neighborhood-guide"],
    captureMeta: "stitch export"
  },
  {
    slug: "ibm-solution-page",
    title: "IBM-style cloud ops console",
    summary: "Data-rich status modules, rigid systems logic, and exact enterprise scanning rhythm.",
    pageType: "Docs",
    tone: "Systematic",
    medium: "2D",
    motionLevel: "Still",
    colorDirection: "Monochrome",
    brandName: "IBM",
    templateHint: "Operations landing / cloud control console",
    dnaSlug: "enterprise-grid-system",
    styleSlug: "minimal-monochrome",
    stitchPrompt:
      "Design an IBM-inspired cloud operations landing page with a rigid enterprise grid, data-rich status modules, precise labels, restrained monochrome surfaces, and one exact cobalt accent. It should feel operational, stable, and technical.",
    captureImage: stitchCaptureAssets["ibm-cloud-ops-console"],
    captureMeta: "stitch export"
  },
  {
    slug: "tiktok-drop",
    title: "TikTok-style music countdown",
    summary: "Countdown pressure, creator clips, and neon overlay type for a release-event microsite.",
    pageType: "Campaign",
    tone: "Playful",
    medium: "Animation",
    motionLevel: "Expressive",
    colorDirection: "Gallery contrast",
    brandName: "TikTok",
    templateHint: "Music release drop / countdown event microsite",
    dnaSlug: "creator-velocity",
    styleSlug: "kinetic-type-signal",
    stitchPrompt:
      "Create a TikTok-inspired music release microsite with a giant countdown hero, bold overlay typography, creator clips, neon accents, and fast vertical pacing. The page should feel like a drop, not a traditional marketing site.",
    captureImage: stitchCaptureAssets["tiktok-music-countdown"],
    captureMeta: "stitch export"
  },
  {
    slug: "google-ai-lab",
    title: "Google-style AI lab microsite",
    summary:
      "Primary colors, modular storytelling, and experimental product clarity for an AI lab launch.",
    pageType: "Microsite",
    tone: "Experimental",
    medium: "3D",
    motionLevel: "Cinematic",
    colorDirection: "Primary colors",
    brandName: "Google",
    templateHint: "AI experiment microsite / research demo landing",
    dnaSlug: "modular-research-surface",
    styleSlug: "bauhaus-color-block-3d",
    stitchPrompt:
      "Design a Google-inspired AI lab microsite with primary-color geometry, modular product storytelling, playful 3D forms, and crisp experimental clarity.",
    captureImage: stitchCaptureAssets["google-ai-lab-microsite"],
    captureMeta: "stitch export"
  },
  {
    slug: "instagram-portfolio",
    title: "Instagram-style creator portfolio archive",
    summary:
      "Gallery pacing, creator-first image rhythm, and polished visual framing for a portfolio archive.",
    pageType: "Portfolio",
    tone: "Gallery-like",
    medium: "Mixed media",
    motionLevel: "Subtle",
    colorDirection: "Gallery contrast",
    brandName: "Instagram",
    templateHint: "Creator portfolio / visual archive landing",
    dnaSlug: "creator-velocity",
    styleSlug: "modern-art-modular",
    stitchPrompt:
      "Create an Instagram-inspired creator portfolio archive with gallery pacing, image-first composition, selective gradients, profile modules, and mobile-native visual rhythm.",
    captureImage: stitchCaptureAssets["instagram-creator-portfolio"],
    captureMeta: "stitch export"
  },
  {
    slug: "meta-spatial-launch",
    title: "Meta-style spatial product launch",
    summary:
      "Immersive 3D depth, blue-led product narrative, and spatial computing presentation for a launch microsite.",
    pageType: "Microsite",
    tone: "Cultural",
    medium: "3D",
    motionLevel: "Cinematic",
    colorDirection: "Cool",
    brandName: "Meta",
    templateHint: "Spatial computing launch / immersive product narrative",
    dnaSlug: "collaborative-canvas-system",
    styleSlug: "immersive-3d",
    stitchPrompt:
      "Design a Meta-inspired spatial product launch microsite with immersive 3D hero objects, luminous blue depth, mixed-reality product framing, and cinematic narrative sections.",
    captureImage: stitchCaptureAssets["meta-spatial-launch"],
    captureMeta: "stitch export"
  }
];

export function getCategoryHref(category: CategoryCard) {
  return category.kind === "dna"
    ? `/dna/${category.slug}`
    : `/styles/${category.slug}`;
}

export function getCategoryBySlug(kind: CategoryKind, slug: string) {
  const source = kind === "dna" ? featuredDna : styleCategories;
  return source.find((category) => category.slug === slug);
}

export function getCategoryTitle(slug: string) {
  return allCategories.find((category) => category.slug === slug)?.title ?? slug;
}

export function getRelatedCategories(category: CategoryCard) {
  return category.relatedSlugs
    .map((slug) => allCategories.find((entry) => entry.slug === slug))
    .filter((entry): entry is CategoryCard => Boolean(entry));
}

export function getCategoryStitchExamples(category: CategoryCard) {
  if (category.kind !== "dna") {
    return [];
  }

  return dnaStitchExamples[category.slug] ?? [];
}

export function getStitchExampleBySlug(slug: string) {
  return Object.values(dnaStitchExamples)
    .flat()
    .find((example) => example.slug === slug);
}

export function getStitchExampleOwner(slug: string) {
  return featuredDna.find((category) =>
    (dnaStitchExamples[category.slug] ?? []).some((example) => example.slug === slug)
  );
}

export function buildPromptVariations(category: CategoryCard) {
  const angles = category.variationAngles ?? defaultAngles;

  return angles.map((angle) => ({
    slug: angle.slug,
    label: angle.label,
    note: angle.note,
    prompt: `${category.prompt} ${angle.append}`
  }));
}

export function getCollectionEntries(collection: CollectionCard) {
  return collection.includes
    .map((slug) => allCategories.find((category) => category.slug === slug))
    .filter((entry): entry is CategoryCard => Boolean(entry));
}

export function getCollectionBySlug(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getArchiveBySlug(slug: string) {
  return promptArchive.find((entry) => entry.slug === slug);
}

export function getArchiveEntries() {
  return promptArchive;
}

export function getArchiveCategories(entry: PromptArchiveEntry) {
  return entry.categorySlugs
    .map((slug) => allCategories.find((category) => category.slug === slug))
    .filter((category): category is CategoryCard => Boolean(category));
}

export function getArchiveCollection(entry: PromptArchiveEntry) {
  if (!entry.collectionSlug) {
    return undefined;
  }

  return getCollectionBySlug(entry.collectionSlug);
}

export function getFacetFilters(items: CategoryCard[]) {
  return Array.from(new Set(items.map((item) => item.facet)));
}

export function buildCategoryResultWall(category: CategoryCard): ResultWallItem[] {
  return [
    {
      id: `${category.slug}-hero`,
      title: `${category.title} Hero`,
      caption: category.visualTraits.layout,
      tone: category.previewTone,
      size: "wide",
      meta: category.useCases[0] ?? category.medium
    },
    {
      id: `${category.slug}-type`,
      title: `${category.title} Type`,
      caption: category.visualTraits.typography,
      tone: category.previewTone,
      size: "tall",
      meta: "type system"
    },
    {
      id: `${category.slug}-motion`,
      title: `${category.title} Flow`,
      caption: category.visualTraits.motion,
      tone: category.previewTone,
      size: "square",
      meta: "motion"
    }
  ];
}

export function buildCollectionResultWall(collection: CollectionCard): ResultWallItem[] {
  return getCollectionEntries(collection).map((entry, index) => ({
    id: `${collection.slug}-${entry.slug}`,
    title: entry.title,
    caption: entry.summary,
    tone: entry.previewTone,
    size: index === 0 ? "wide" : index === 1 ? "tall" : "square",
    meta: entry.facet
  }));
}

export function buildCompareResultWall(): ResultWallItem[] {
  return compareColumns.map((column, index) => ({
    id: `${column.title}-${index}`,
    title: column.title,
    caption: column.change,
    tone: column.previewTone,
    size: index === 0 ? "wide" : index === 1 ? "tall" : "square",
    meta: column.label
  }));
}

export function buildArchiveResultWall(entry: PromptArchiveEntry): ResultWallItem[] {
  return entry.outputs.map((output, index) => ({
    id: `${entry.slug}-${index}`,
    title: output.title,
    caption: output.caption,
    tone: entry.previewTone,
    size: output.size,
    meta: output.meta,
    image: output.image
  }));
}
