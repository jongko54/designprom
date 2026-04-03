import {
  ArchiveImageAsset,
  PromptArchiveEntry,
  stitchCaptureAssets
} from "@/data/site";

export type StitchExportScreen = {
  label: string;
  note: string;
  image: ArchiveImageAsset;
  generatedAt: string;
  tool: string;
  promptVersion: string;
  runLabel: string;
  objectPosition?: string;
};

function buildExportScreens(
  image: ArchiveImageAsset,
  runLabel: string,
  labels: string[],
  notes: string[]
): StitchExportScreen[] {
  const objectPositions = ["top center", "center center", "bottom center"];

  return labels.map((label, index) => ({
    label,
    note: notes[index] ?? notes[notes.length - 1] ?? "",
    image,
    generatedAt: "2026-03-30",
    tool: "Stitch AI",
    promptVersion: "v1.0",
    runLabel,
    objectPosition: objectPositions[index]
  }));
}

const exportRegistry: Record<string, StitchExportScreen[]> = {
  "apple-ai-launch": buildExportScreens(
    stitchCaptureAssets["apple-ai-launch"],
    "Aether Intelligence Landing Page",
    ["Hero screen", "Feature proof", "CTA close"],
    [
      "First screen stays calm and product-led with one exact call to action.",
      "Middle section keeps the product large and the hierarchy quiet.",
      "Final close compresses trust, pricing, and action into one premium block."
    ]
  ),
  "apple-feature-story": buildExportScreens(
    stitchCaptureAssets["apple-feature-story"],
    "Aether Intelligence Feature Story",
    ["Hero frame", "Story chapter", "Product close"],
    [
      "The hero opens with oversized product framing and clean text rhythm.",
      "Feature storytelling keeps transitions sparse and image-led.",
      "The ending section resolves into one polished CTA surface."
    ]
  ),
  "apple-pricing-proof": buildExportScreens(
    stitchCaptureAssets["apple-pricing-proof"],
    "Aether Intelligence Pricing and Proof",
    ["Pricing hero", "Plan comparison", "Proof close"],
    [
      "Pricing hero uses premium spacing instead of promotional urgency.",
      "Plan comparison reads as architecture, not sales pressure.",
      "The proof close stays quiet and expensive-looking."
    ]
  ),
  "apple-ambient-device-launch": buildExportScreens(
    stitchCaptureAssets["apple-ambient-device-launch"],
    "Halo Desk Device Launch",
    ["Ambient hero", "Ecosystem pairing", "Launch close"],
    [
      "The first frame behaves like a premium hardware reveal with one dominant object.",
      "The middle crop shows ecosystem pairing without cluttering the hero language.",
      "The close keeps CTA and proof inside the same sparse product stage."
    ]
  ),
  "apple-creative-suite-story": buildExportScreens(
    stitchCaptureAssets["apple-creative-suite-story"],
    "Creative Suite Story",
    ["Editorial opener", "Workflow chapter", "Story close"],
    [
      "The opening frame lands through oversized product stills and editorial restraint.",
      "The middle crop turns workflow into a premium chapter sequence.",
      "The close keeps the suite story focused and product-led."
    ]
  ),
  "apple-assistant-os-preview": buildExportScreens(
    stitchCaptureAssets["apple-assistant-os-preview"],
    "Assistant OS Preview",
    ["Keynote opener", "Feature band", "Comparison close"],
    [
      "The opener should read like a keynote reveal rather than a feature list.",
      "The middle crop highlights feature bands and frosted device framing.",
      "The close resolves into a calm comparison strip and one precise action."
    ]
  ),
  "figma-workspace-home": buildExportScreens(
    stitchCaptureAssets["figma-workspace-home"],
    "Collaborative Workspace Landing Page",
    ["Canvas entry", "Pane system", "Flow handoff"],
    [
      "The first screen introduces the working canvas as the main character.",
      "The product middle shows rails, panes, and utility surfaces clearly.",
      "The closing section still feels like a tool, not a landing page template."
    ]
  ),
  "figma-community-marketplace": buildExportScreens(
    stitchCaptureAssets["figma-community-marketplace"],
    "Community File Marketplace",
    ["Browse hero", "Library grid", "Template close"],
    [
      "The opening frame anchors discovery through visible browsing controls.",
      "The center crop emphasizes dense but legible template inventory.",
      "The closing crop keeps community files readable and product-native."
    ]
  ),
  "figma-multiplayer-tour": buildExportScreens(
    stitchCaptureAssets["figma-multiplayer-tour"],
    "Multiplayer Product Tour",
    ["Tour opener", "Collaboration state", "Workflow close"],
    [
      "The opener frames collaboration as an active product surface.",
      "The middle crop highlights presence cues and canvas activity.",
      "The close keeps the workflow explanation grounded in UI."
    ]
  ),
  "figma-plugin-directory": buildExportScreens(
    stitchCaptureAssets["figma-plugin-directory"],
    "Plugin Directory",
    ["Directory opener", "Plugin grid", "Install close"],
    [
      "The first frame should look like a tool marketplace, not a marketing page.",
      "The middle crop favors dense but readable plugin inventory and category controls.",
      "The close keeps install moments and product chrome visually crisp."
    ]
  ),
  "figma-design-system-docs": buildExportScreens(
    stitchCaptureAssets["figma-design-system-docs"],
    "Design System Docs",
    ["Docs opener", "Token table", "Component close"],
    [
      "The opener makes the docs feel inspectable and system-native immediately.",
      "The middle crop highlights dense tables, previews, and rails without chaos.",
      "The close keeps annotations and component detail inside one product rhythm."
    ]
  ),
  "figma-figjam-session": buildExportScreens(
    stitchCaptureAssets["figma-figjam-session"],
    "FigJam Session",
    ["Workshop hero", "Canvas cluster", "Facilitation close"],
    [
      "The opening frame needs to signal active collaboration in one glance.",
      "The middle crop centers sticky-note activity and breakout templates.",
      "The close keeps facilitation controls and canvas energy balanced."
    ]
  ),
  "airbnb-discovery-landing": buildExportScreens(
    stitchCaptureAssets["airbnb-discovery-landing"],
    "Kindred Stay Landing Page",
    ["Search hero", "Browse listing", "Reserve handoff"],
    [
      "The top frame opens with a search-first welcome and warm trust cues.",
      "The center crop emphasizes browsing rhythm and soft card geometry.",
      "The lower crop shows the booking handoff without breaking tone."
    ]
  ),
  "airbnb-host-onboarding": buildExportScreens(
    stitchCaptureAssets["airbnb-host-onboarding"],
    "Host Onboarding Flow",
    ["Onboarding hero", "Step guidance", "Action close"],
    [
      "The first screen presents onboarding with calm, practical reassurance.",
      "The second crop highlights step-by-step modules and supportive panels.",
      "The closing screen lands on action without becoming aggressive."
    ]
  ),
  "airbnb-experience-marketplace": buildExportScreens(
    stitchCaptureAssets["airbnb-experience-marketplace"],
    "Local Experience Marketplace",
    ["Category hero", "Experience cards", "Detail close"],
    [
      "The first frame sets a friendly discovery context immediately.",
      "The middle crop shows lived-in cards and warm social proof rhythm.",
      "The last crop keeps the booking pathway human and simple."
    ]
  ),
  "airbnb-neighborhood-guide": buildExportScreens(
    stitchCaptureAssets["airbnb-neighborhood-guide"],
    "Neighborhood Guide Landing",
    ["Guide opener", "Local cards", "Stay handoff"],
    [
      "The first frame should feel local, friendly, and place-led.",
      "The middle crop mixes guide cards and warm map cues without losing clarity.",
      "The close turns discovery into a stay handoff while keeping the tone calm."
    ]
  ),
  "airbnb-group-trip-planner": buildExportScreens(
    stitchCaptureAssets["airbnb-group-trip-planner"],
    "Group Trip Planner",
    ["Planner hero", "Shared itinerary", "Booking close"],
    [
      "The opening frame introduces planning as a shared, low-friction activity.",
      "The middle crop shows itineraries, wishlists, and booking cards in one warm system.",
      "The close keeps group action obvious without feeling transactional."
    ]
  ),
  "airbnb-host-trust-center": buildExportScreens(
    stitchCaptureAssets["airbnb-host-trust-center"],
    "Host Trust Center",
    ["Trust opener", "Safety modules", "Support close"],
    [
      "The first frame needs to reduce host anxiety immediately.",
      "The middle crop emphasizes safety, proof, and human reassurance modules.",
      "The close keeps support and conversion inside the same friendly structure."
    ]
  ),
  "ibm-solution-page": buildExportScreens(
    stitchCaptureAssets["ibm-solution-page"],
    "Technical Architecture Landing Page",
    ["System hero", "Proof grid", "Operational close"],
    [
      "The hero states value precisely with strict structural control.",
      "The middle crop shows evidence-led modules instead of decorative sections.",
      "The close keeps operations and CTA in one exact visual system."
    ]
  ),
  "ibm-architecture-explainer": buildExportScreens(
    stitchCaptureAssets["ibm-architecture-explainer"],
    "Architecture Explainer",
    ["Architecture opener", "Diagram section", "Summary close"],
    [
      "The opening frame is literate, direct, and architecture-led.",
      "The middle crop favors diagrams, labels, and technical readability.",
      "The end frame resolves into documentation-like clarity."
    ]
  ),
  "ibm-docs-marketing-hybrid": buildExportScreens(
    stitchCaptureAssets["ibm-docs-marketing-hybrid"],
    "Docs and Marketing Hybrid",
    ["Docs hero", "Navigation system", "Proof close"],
    [
      "The first crop balances product positioning with documentation clarity.",
      "The middle section shows dense but structured rails and content blocks.",
      "The close keeps trust and next-step actions in the same system."
    ]
  ),
  "ibm-cloud-ops-console": buildExportScreens(
    stitchCaptureAssets["ibm-cloud-ops-console"],
    "Cloud Ops Console",
    ["Ops hero", "Status grid", "Command close"],
    [
      "The opening frame should read like an enterprise control room immediately.",
      "The middle crop emphasizes status modules, precise labels, and data rhythm.",
      "The close keeps action surfaces strict and operational."
    ]
  ),
  "ibm-compliance-blueprint": buildExportScreens(
    stitchCaptureAssets["ibm-compliance-blueprint"],
    "Compliance Blueprint",
    ["Blueprint opener", "Policy rail", "Audit close"],
    [
      "The first frame should project governance and control, not brand theater.",
      "The middle crop highlights blueprint diagrams, policy rails, and proof structure.",
      "The close keeps audit tables readable and exact."
    ]
  ),
  "ibm-automation-briefing": buildExportScreens(
    stitchCaptureAssets["ibm-automation-briefing"],
    "Executive Automation Briefing",
    ["Briefing hero", "Process evidence", "Decision close"],
    [
      "The opener makes the executive summary clear in one pass.",
      "The middle crop balances process steps and proof cards carefully.",
      "The close resolves into one confident next-step moment."
    ]
  ),
  "tiktok-campaign-drop": buildExportScreens(
    stitchCaptureAssets["tiktok-campaign-drop"],
    "TikTok Pulse Campaign Microsite",
    ["Hook screen", "Momentum burst", "CTA drop"],
    [
      "The first frame lands through contrast, urgency, and creator-native hooks.",
      "The second crop emphasizes motion rhythm and content energy.",
      "The last frame converts inside the same social-speed language."
    ]
  ),
  "tiktok-live-commerce": buildExportScreens(
    stitchCaptureAssets["tiktok-live-commerce"],
    "Live Commerce Launch",
    ["Commerce hook", "Offer burst", "Buy-now close"],
    [
      "The opening crop prioritizes the hook and price signal immediately.",
      "The middle screen keeps commerce data fast and visually punchy.",
      "The close retains urgency without breaking the creator feel."
    ]
  ),
  "tiktok-trend-challenge": buildExportScreens(
    stitchCaptureAssets["tiktok-trend-challenge"],
    "Trend Challenge Hub",
    ["Trend opener", "Participation wall", "Challenge CTA"],
    [
      "The first frame is built around participation and visual hook.",
      "The middle crop amplifies creator energy and challenge momentum.",
      "The close keeps the invitation bold, playful, and obvious."
    ]
  ),
  "tiktok-music-countdown": buildExportScreens(
    stitchCaptureAssets["tiktok-music-countdown"],
    "Music Release Countdown",
    ["Countdown hero", "Creator burst", "Drop close"],
    [
      "The first frame should make the release countdown impossible to miss.",
      "The middle crop mixes creator clips and overlay type into one event rhythm.",
      "The close keeps urgency and conversion inside the same social pacing."
    ]
  ),
  "tiktok-fandom-arena": buildExportScreens(
    stitchCaptureAssets["tiktok-fandom-arena"],
    "Fandom Arena",
    ["Arena opener", "Reaction wall", "Join close"],
    [
      "The opener should signal community participation immediately.",
      "The middle crop amplifies reactions, mashups, and creator challenge energy.",
      "The close makes the join action feel native to the fandom flow."
    ]
  ),
  "tiktok-shop-sprint": buildExportScreens(
    stitchCaptureAssets["tiktok-shop-sprint"],
    "Shop Sprint Event",
    ["Shop hero", "Offer burst", "Checkout close"],
    [
      "The first frame fuses creator media with price urgency right away.",
      "The middle crop keeps commerce data fast and visually punchy.",
      "The close lands on a buy-now moment without losing creator-native tone."
    ]
  ),
  "google-ai-lab-microsite": buildExportScreens(
    stitchCaptureAssets["google-ai-lab-microsite"],
    "Google AI Lab Microsite",
    ["Lab opener", "Research shelf", "Demo close"],
    [
      "The opener balances research polish and experimental energy.",
      "The middle shelf keeps multiple experiments visible without clutter.",
      "The close preserves a product-demo feeling instead of a generic portfolio grid."
    ]
  ),
  "google-model-showcase": buildExportScreens(
    stitchCaptureAssets["google-model-showcase"],
    "Google Model Showcase",
    ["Model opener", "Demo shelf", "Capability close"],
    [
      "The first frame should feel like a useful research demo rather than a brand splash.",
      "The middle crop balances modular demo shelves with playful geometry.",
      "The close keeps capabilities clear and approachable."
    ]
  ),
  "google-toolkit-directory": buildExportScreens(
    stitchCaptureAssets["google-toolkit-directory"],
    "Google Toolkit Directory",
    ["Directory opener", "Tool grid", "Filter close"],
    [
      "The opening frame should feel like a bright experimental toolkit shelf.",
      "The middle crop favors modular cards and category clarity over decoration.",
      "The close keeps filters and tool metadata calm and useful."
    ]
  ),
  "instagram-creator-portfolio": buildExportScreens(
    stitchCaptureAssets["instagram-creator-portfolio"],
    "Instagram Creator Portfolio Archive",
    ["Archive opener", "Selected works", "Profile close"],
    [
      "The first frame lands through strong image rhythm and creator identity.",
      "The middle crop emphasizes selected works and curated visual pacing.",
      "The close keeps profile, contact, and collaboration cues in the same system."
    ]
  ),
  "meta-spatial-launch": buildExportScreens(
    stitchCaptureAssets["meta-spatial-launch"],
    "Meta Spatial Product Launch",
    ["Spatial hero", "Immersive product", "Launch close"],
    [
      "The hero establishes depth and device focus immediately.",
      "The middle crop favors product immersion over interface clutter.",
      "The final frame closes with one clear launch action and spatial proof."
    ]
  ),
  "cargo-graphic-design-index": buildExportScreens(
    stitchCaptureAssets["cargo-graphic-design-index"],
    "Graphic Design Template Index",
    ["Lead poster", "Project shelf", "Detail close"],
    [
      "The opener lands through one strong poster and a calm filtering strip.",
      "The middle crop keeps multiple design covers visible without flattening them.",
      "The close resolves into a project detail with metadata and clear pacing."
    ]
  ),
  "cargo-photography-journal": buildExportScreens(
    stitchCaptureAssets["cargo-photography-journal"],
    "Photography Journal Template",
    ["Image opener", "Series shelf", "Caption close"],
    [
      "The first crop gives image scale priority over interface noise.",
      "The middle frame keeps project series visible with quiet captions.",
      "The close lands on one image and one calm detail rail."
    ]
  ),
  "cargo-architecture-monograph": buildExportScreens(
    stitchCaptureAssets["cargo-architecture-monograph"],
    "Architecture Monograph Template",
    ["Monograph opener", "Plan spread", "Project close"],
    [
      "The opening frame balances project image and measured data.",
      "The middle crop keeps plans, sections, and labels readable.",
      "The close holds photography and project notes in a disciplined split."
    ]
  ),
  "cargo-fashion-lookbook": buildExportScreens(
    stitchCaptureAssets["cargo-fashion-lookbook"],
    "Fashion Lookbook Template",
    ["Lookbook cover", "Collection rail", "Editorial close"],
    [
      "The first frame behaves like a lookbook cover with vertical image pull.",
      "The middle crop keeps multiple looks visible with sparse captions.",
      "The close resolves into a project detail without losing elegance."
    ]
  ),
  "cargo-art-direction-moodboard": buildExportScreens(
    stitchCaptureAssets["cargo-art-direction-moodboard"],
    "Art Direction Moodboard Template",
    ["Moodboard opener", "Campaign wall", "Project close"],
    [
      "The first crop behaves like a curated image board rather than a card grid.",
      "The middle frame keeps mixed media and campaigns visually ordered.",
      "The close gives one project enough focus to feel premium."
    ]
  ),
  "cargo-type-specimen-archive": buildExportScreens(
    stitchCaptureAssets["cargo-type-specimen-archive"],
    "Type Specimen Archive Template",
    ["Specimen opener", "Glyph sheet", "Release close"],
    [
      "The opener lands through oversized type and quiet release metadata.",
      "The middle crop favors specimen structure over decorative layout.",
      "The close keeps release information exact and readable."
    ]
  ),
  "cargo-studio-directory": buildExportScreens(
    stitchCaptureAssets["cargo-studio-directory"],
    "Studio Directory Template",
    ["Directory opener", "Filter rail", "Case-study close"],
    [
      "The first frame behaves like a selected project directory with one lead case.",
      "The middle crop keeps sector filters and lists visually quiet.",
      "The close transitions from listing mode into a premium case-study entry."
    ]
  ),
  "sokoglam-editorial-commerce": buildExportScreens(
    stitchCaptureAssets["sokoglam-editorial-commerce"],
    "Soko Glam Editorial Commerce",
    ["Curation hero", "Routine shelf", "Proof close"],
    [
      "The opening frame should feel expert-picked and community-backed rather than discount-led.",
      "The middle crop balances education blocks, product rails, and routine logic.",
      "The close keeps review proof and shoppable trust in one calm system."
    ]
  ),
  "goka-social-commerce": buildExportScreens(
    stitchCaptureAssets["goka-social-commerce"],
    "Goka Social Commerce",
    ["Social hero", "Bundle rail", "WhatsApp close"],
    [
      "The opener should feel bright, mobile-first, and immediately social-native.",
      "The middle crop keeps bundles, campaigns, and free-shipping cues easy to scan.",
      "The close should emphasize support and authenticity without losing energy."
    ]
  ),
  "miin-omnichannel-routine": buildExportScreens(
    stitchCaptureAssets["miin-omnichannel-routine"],
    "MiiN Omnichannel Routine Shop",
    ["Retail hero", "Routine learning", "Store close"],
    [
      "The opener should signal curated discovery and retail trust in one glance.",
      "The middle crop combines education, products, and omnichannel cues cleanly.",
      "The close keeps workshops, glossary, and shopping paths polished and clear."
    ]
  ),
  "innisfree-ingredient-merchandising": buildExportScreens(
    stitchCaptureAssets["innisfree-ingredient-merchandising"],
    "Innisfree Ingredient Merchandising",
    ["Promo hero", "Ingredient grid", "Member close"],
    [
      "The opener should make ingredients, bundles, and promotions obvious right away.",
      "The middle crop keeps dense product merchandising structured and fast to scan.",
      "The close should integrate loyalty and shipping cues into the same commerce rhythm."
    ]
  ),
  "aesop-editorial-commerce": buildExportScreens(
    stitchCaptureAssets["aesop-editorial-commerce"],
    "Aesop Editorial Commerce",
    ["Editorial hero", "Product shelf", "Cultural close"],
    [
      "The first frame should read as literary and premium before it reads as sales-led.",
      "The middle crop keeps product metadata sensory, quiet, and elegant.",
      "The close should preserve commerce while staying sparse and authored."
    ]
  ),
  "allbirds-friendly-dtc": buildExportScreens(
    stitchCaptureAssets["allbirds-friendly-dtc"],
    "Allbirds Friendly DTC",
    ["Audience hero", "Collection shelf", "Benefit close"],
    [
      "The opener should make browsing feel easy and welcoming immediately.",
      "The middle crop highlights collections, best sellers, and simple benefits.",
      "The close keeps comfort and sustainability proof conversion-ready."
    ]
  ),
  "gymshark-launch-commerce": buildExportScreens(
    stitchCaptureAssets["gymshark-launch-commerce"],
    "Gymshark Launch Commerce",
    ["Launch hero", "New-in wall", "Shop close"],
    [
      "The opener needs drop-event urgency and product clarity in the same frame.",
      "The middle crop keeps new-in products fast, dense, and obviously shoppable.",
      "The close repeats action without letting the page collapse into noise."
    ]
  ),
  "latam-kbeauty-clubfront": buildExportScreens(
    stitchCaptureAssets["latam-kbeauty-clubfront"],
    "Hori Ritual K-Beauty Clubfront",
    ["Club hero", "Routine shelf", "Trust close"],
    [
      "The opener should feel ritual-led, premium, and guided instead of discount-heavy.",
      "The middle crop should make quiz and step-based routine logic obvious in one glance.",
      "The close should keep proof and shoppable trust calm and instructive."
    ]
  ),
  "natura-botanical-ritual-shop": buildExportScreens(
    stitchCaptureAssets["natura-botanical-ritual-shop"],
    "Natura Botanical Ritual Shop",
    ["Ritual hero", "Category flow", "Refill close"],
    [
      "The first frame should feel earthy, ritual-led, and gift-aware.",
      "The middle crop keeps beauty categories moving in a warm editorial sequence.",
      "The close integrates refill and brand trust into the same premium retail system."
    ]
  ),
  "boticario-gift-fragrance-grid": buildExportScreens(
    stitchCaptureAssets["boticario-gift-fragrance-grid"],
    "Boticario Gift Fragrance Grid",
    ["Gift hero", "Kit wall", "Loyalty close"],
    [
      "The opener needs to balance fragrance mood with obvious gift intent.",
      "The middle crop should keep kits, tiles, and fast add-to-bag moments clean and bright.",
      "The close should make loyalty and pickup cues feel helpful, not cluttered."
    ]
  ),
  "yanbal-consultant-beauty-club": buildExportScreens(
    stitchCaptureAssets["yanbal-consultant-beauty-club"],
    "Karita Koreana Conversion Storefront",
    ["Consultant hero", "Catalog shelf", "Support close"],
    [
      "The opener should make local trust and payment assurance visible immediately.",
      "The middle crop should keep routine-sequence browsing and product rails fast and obvious.",
      "The close should turn WhatsApp support and review proof into a clean purchase handoff."
    ]
  ),
  "neo-tokyo-night-drive-portfolio": buildExportScreens(
    stitchCaptureAssets["neo-tokyo-night-drive-portfolio"],
    "Neo Tokyo Night Drive Portfolio",
    ["Night hero", "Billboard rail", "Midnight close"],
    [
      "The opener should establish neon city atmosphere and project hierarchy in one frame.",
      "The middle crop should feel like animated billboards guiding the portfolio scroll.",
      "The close keeps credits and contact sharp inside the cinematic night mood."
    ]
  ),
  "shibuya-replicant-archive": buildExportScreens(
    stitchCaptureAssets["shibuya-replicant-archive"],
    "Shibuya Replicant Archive",
    ["Replicant opener", "Signal wall", "Archive close"],
    [
      "The opening frame should read like a premium future-noir archive system.",
      "The middle crop keeps dense metadata and holographic labels readable through glass layers.",
      "The close should stay luxurious and exact instead of drifting into game UI."
    ]
  )
};

export function getStitchExports(exampleSlug: string) {
  return exportRegistry[exampleSlug] ?? [];
}

export function getArchiveStitchExports(entry: PromptArchiveEntry) {
  return entry.stitchExampleSlugs.flatMap((slug, index) => {
    const screens = getStitchExports(slug);
    const selectedScreen = screens[index % Math.max(screens.length, 1)];

    return selectedScreen
      ? [
          {
            ...selectedScreen,
            sourceSlug: slug
          }
        ]
      : [];
  });
}
