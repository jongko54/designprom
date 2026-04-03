#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { StitchToolClient } from "@google/stitch-sdk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "public", "stitch-exports", "real");
const manifestPath = path.join(outputDir, "manifest.json");
const sampleFilter = new Set(
  process.argv.slice(2).flatMap((value) => value.split(",")).filter(Boolean)
);

function readShellValue(command) {
  try {
    return execSync(command, {
      cwd: rootDir,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch {
    return "";
  }
}

const accessToken =
  process.env.STITCH_ACCESS_TOKEN || readShellValue("gcloud auth print-access-token");
const googleCloudProject =
  process.env.GOOGLE_CLOUD_PROJECT || readShellValue("gcloud config get-value project");

if (!accessToken || !googleCloudProject) {
  console.error(
    "Stitch generation requires STITCH_ACCESS_TOKEN and GOOGLE_CLOUD_PROJECT, or a working gcloud login."
  );
  process.exit(1);
}

const samples = [
  {
    slug: "apple-ai-launch",
    brand: "Apple",
    title: "Quiet AI Launch Hero",
    prompt:
      "Design a premium AI product landing page in an Apple-inspired direction with generous white space, quiet monochrome surfaces, crisp product typography, subtle depth, and one disciplined cobalt highlight. Keep the hero centered, reduce chrome, and make the CTA feel precise and expensive rather than loud."
  },
  {
    slug: "apple-feature-story",
    brand: "Apple",
    title: "Product Feature Story",
    prompt:
      "Create an Apple-like feature story page for a software product. Use oversized product framing, restrained neutral backgrounds, premium light gradients, concise copy blocks, and highly controlled transitions. Keep every section product-led and remove unnecessary badges, icons, and promotional clutter."
  },
  {
    slug: "apple-pricing-proof",
    brand: "Apple",
    title: "Pricing and Proof Layout",
    prompt:
      "Design a pricing and proof page in an Apple-like direction. Use a sharp monochrome grid, generous spacing, very few accent colors, and one glass-like feature comparison lens to highlight the main plan. The result should feel premium, calm, and easy to scan."
  },
  {
    slug: "apple-ambient-device-launch",
    brand: "Apple",
    title: "Ambient Device Launch",
    prompt:
      "Design an Apple-inspired landing page for a desk AI device. Use a black-to-silver hero stage, floating hardware render, a huge restrained headline, minimal navigation, and one section showing ecosystem pairing across phone, desktop, and audio. Keep the layout sparse, glossy, and expensive."
  },
  {
    slug: "apple-creative-suite-story",
    brand: "Apple",
    title: "Creative Suite Story",
    prompt:
      "Create an Apple-like feature story page for a creative software suite. Use giant product stills, split editorial chapters, muted neutral surfaces, one luminous gradient ribbon, and a workflow story that moves from capture to edit to publish. Remove all marketing clutter."
  },
  {
    slug: "apple-assistant-os-preview",
    brand: "Apple",
    title: "Assistant OS Preview",
    prompt:
      "Design an Apple-inspired OS preview page for an AI assistant. Use soft frosted device frames, stacked feature bands, one comparison strip, and calm monochrome depth. The page should feel like a keynote product reveal, not a SaaS dashboard."
  },
  {
    slug: "figma-workspace-home",
    brand: "Figma",
    title: "Collaborative Workspace Home",
    prompt:
      "Design a Figma-inspired collaborative workspace landing page with layered side rails, canvas framing, floating utility panes, live-collaboration cues, and crisp product hierarchy. Make the page feel like a real product surface rather than a generic SaaS marketing layout."
  },
  {
    slug: "figma-community-marketplace",
    brand: "Figma",
    title: "Community File Marketplace",
    prompt:
      "Create a Figma-inspired community marketplace page with dense but legible file cards, layered utility filters, a visible working-surface rhythm, and subtle colorful file accents. Keep the page product-native, browsable, and highly functional."
  },
  {
    slug: "figma-multiplayer-tour",
    brand: "Figma",
    title: "Multiplayer Product Tour",
    prompt:
      "Design a Figma-like product tour page with collaborative cursor moments, pane reveals, canvas zoom framing, and clear workflow storytelling. Keep the interface crisp, tool-first, and readable while showing active multiplayer energy."
  },
  {
    slug: "figma-plugin-directory",
    brand: "Figma",
    title: "Plugin Directory",
    prompt:
      "Design a Figma-inspired plugin directory with a left tool rail, dense plugin cards, category chips, install panels, and active workspace framing. Make the page feel like a working product surface with colorful plugin accents."
  },
  {
    slug: "figma-design-system-docs",
    brand: "Figma",
    title: "Design System Docs",
    prompt:
      "Create a Figma-like design system docs landing page with token tables, component previews, side navigation rails, collaborative annotations, and a readable but dense product rhythm. It should feel like a real system library, not a blog."
  },
  {
    slug: "figma-figjam-session",
    brand: "Figma",
    title: "FigJam Session",
    prompt:
      "Design a Figma-inspired FigJam workshop page with sticky-note clusters, cursor presence, breakout templates, and facilitation controls around a large canvas. The page should feel lively, collaborative, and tool-native."
  },
  {
    slug: "airbnb-discovery-landing",
    brand: "Airbnb",
    title: "Stay Discovery Landing",
    prompt:
      "Create a travel marketplace landing page in an Airbnb-inspired direction with warm neutral backgrounds, rounded modules, approachable sans-serif typography, welcoming photography, and a search-first booking flow. Make the page feel human, trustworthy, and easy to browse."
  },
  {
    slug: "airbnb-host-onboarding",
    brand: "Airbnb",
    title: "Host Onboarding Flow",
    prompt:
      "Design a host onboarding page in an Airbnb-like design language with friendly rounded cards, practical step-by-step guidance, soft glassy focus panels, warm photography, and reassuring typography. Keep the page helpful, human, and conversion-friendly."
  },
  {
    slug: "airbnb-experience-marketplace",
    brand: "Airbnb",
    title: "Local Experience Marketplace",
    prompt:
      "Create an Airbnb-inspired local experiences marketplace page with modular discovery cards, soft rounded geometry, warm neutral backgrounds, human-led photography, and clear social proof. Make the layout feel browsable, welcoming, and highly practical."
  },
  {
    slug: "airbnb-neighborhood-guide",
    brand: "Airbnb",
    title: "Neighborhood Guide Landing",
    prompt:
      "Create an Airbnb-inspired neighborhood guide landing page with warm photography, local guide cards, map cues, gentle rounded modules, and a browsable editorial travel rhythm. Keep it welcoming and discovery-first."
  },
  {
    slug: "airbnb-group-trip-planner",
    brand: "Airbnb",
    title: "Group Trip Planner",
    prompt:
      "Design an Airbnb-like group trip planner page with itinerary panels, shared wishlists, booking cards, and reassuring collaboration cues. Use warm neutrals, approachable typography, and a clear action flow."
  },
  {
    slug: "airbnb-host-trust-center",
    brand: "Airbnb",
    title: "Host Trust Center",
    prompt:
      "Design a host trust center page in an Airbnb-inspired language with safety modules, earnings proof, testimonial moments, soft rounded panels, and human photography. Make the page feel practical, calm, and trustworthy."
  },
  {
    slug: "ibm-solution-page",
    brand: "IBM",
    title: "Enterprise Solution Overview",
    prompt:
      "Design an IBM-inspired enterprise solution page with rigorous grid alignment, clear module boundaries, restrained monochrome surfaces, concise technical copy, and one disciplined blue accent. The page should feel exact, literate, and credible to an enterprise buyer."
  },
  {
    slug: "ibm-architecture-explainer",
    brand: "IBM",
    title: "Architecture Explainer",
    prompt:
      "Create an IBM-like architecture explainer page for a data platform. Use strict columns, diagram-friendly modules, precise labels, and controlled translucent overlays that highlight system pathways without adding decorative noise. Keep the tone technical, stable, and executive-readable."
  },
  {
    slug: "ibm-docs-marketing-hybrid",
    brand: "IBM",
    title: "Docs and Marketing Hybrid",
    prompt:
      "Design a docs-meets-marketing page in an IBM-inspired enterprise system. Use a strict grid, clear information density, exact headings, modular content rails, and minimal motion. The page should bridge solution marketing and technical documentation without losing structure."
  },
  {
    slug: "ibm-cloud-ops-console",
    brand: "IBM",
    title: "Cloud Ops Console",
    prompt:
      "Design an IBM-inspired cloud operations landing page with a rigid enterprise grid, data-rich status modules, precise labels, restrained monochrome surfaces, and one exact cobalt accent. It should feel operational, stable, and technical."
  },
  {
    slug: "ibm-compliance-blueprint",
    brand: "IBM",
    title: "Compliance Blueprint",
    prompt:
      "Create an IBM-like compliance blueprint page for a regulated AI platform. Use diagram blocks, policy rails, audit tables, and structured proof sections. Keep the page disciplined, literate, and documentation-clear."
  },
  {
    slug: "ibm-automation-briefing",
    brand: "IBM",
    title: "Executive Automation Briefing",
    prompt:
      "Design an IBM-inspired executive briefing page for enterprise automation. Use modular evidence cards, architecture summaries, process step diagrams, and confident typography. The result should feel measured and credible."
  },
  {
    slug: "tiktok-campaign-drop",
    brand: "TikTok",
    title: "Creator Campaign Drop",
    prompt:
      "Create a TikTok-inspired campaign microsite with punchy overlay typography, creator-native pacing, vertical-video composition cues, high-contrast sections, and kinetic type transitions. The page should feel immediate, social, and impossible to ignore on first scroll."
  },
  {
    slug: "tiktok-live-commerce",
    brand: "TikTok",
    title: "Live Commerce Launch",
    prompt:
      "Design a TikTok-like live commerce landing page with creator overlays, rapid scene changes, strong pricing callouts, vertical-media framing, and social-proof moments that feel native to creator content. Keep the pace fast and the hierarchy obvious."
  },
  {
    slug: "tiktok-trend-challenge",
    brand: "TikTok",
    title: "Trend Challenge Hub",
    prompt:
      "Create a TikTok-inspired trend challenge page with high-immediacy hooks, bold 3D color blocks, creator-native overlays, rapid scan hierarchy, and playful interaction cues. Make the page feel energetic, social-first, and participation-ready."
  },
  {
    slug: "tiktok-music-countdown",
    brand: "TikTok",
    title: "Music Release Countdown",
    prompt:
      "Create a TikTok-inspired music release microsite with a giant countdown hero, bold overlay typography, creator clips, neon accents, and fast vertical pacing. The page should feel like a drop, not a traditional marketing site."
  },
  {
    slug: "tiktok-fandom-arena",
    brand: "TikTok",
    title: "Fandom Arena",
    prompt:
      "Design a TikTok-like fandom hub page with live reaction cards, creator mashups, challenge modules, rapid scan hierarchy, and playful participation prompts. Keep the energy high and social-native."
  },
  {
    slug: "tiktok-shop-sprint",
    brand: "TikTok",
    title: "Shop Sprint Event",
    prompt:
      "Create a TikTok-inspired shop event landing page with product cards mixed into creator media, strong price flashes, overlay badges, kinetic transitions, and a mobile-first commerce rhythm."
  },
  {
    slug: "google-ai-lab-microsite",
    brand: "Google",
    title: "Google AI Lab Microsite",
    prompt:
      "Design a Google-inspired AI lab microsite with primary-color geometry, modular storytelling, playful 3D forms, crisp product clarity, and an experimental research-demo tone that still feels usable."
  },
  {
    slug: "google-model-showcase",
    brand: "Google",
    title: "Google Model Showcase",
    prompt:
      "Design a Google-inspired AI model showcase page with primary-color geometry, modular demo shelves, crisp explainer sections, playful but useful 3D forms, and a research-demo tone that feels clear and approachable."
  },
  {
    slug: "google-toolkit-directory",
    brand: "Google",
    title: "Google Toolkit Directory",
    prompt:
      "Create a Google-inspired experimental tools directory with modular cards, bright filter tabs, primary-color object accents, calm documentation clarity, and an open lab feeling. Keep the interface exploratory but highly usable."
  },
  {
    slug: "instagram-creator-portfolio",
    brand: "Instagram",
    title: "Instagram Creator Portfolio Archive",
    prompt:
      "Create an Instagram-inspired creator portfolio archive with image-first composition, selective gradients, gallery pacing, creator profile modules, and a polished mobile-native visual rhythm."
  },
  {
    slug: "meta-spatial-launch",
    brand: "Meta",
    title: "Meta Spatial Product Launch",
    prompt:
      "Design a Meta-inspired spatial product launch microsite with immersive 3D hero objects, luminous blue depth, mixed-reality product framing, and cinematic narrative sections that feel polished and future-facing."
  },
  {
    slug: "cargo-graphic-design-index",
    brand: "Cargo / Graphic Design",
    title: "Graphic Design Template Index",
    prompt:
      "Design a Cargo-inspired graphic design portfolio template with a quiet project list, poster-led thumbnails, strong editorial whitespace, and metadata that feels useful instead of decorative."
  },
  {
    slug: "cargo-photography-journal",
    brand: "Cargo / Photography",
    title: "Photography Journal Template",
    prompt:
      "Create a Cargo-like photography portfolio template with large image-led modules, calm captions, sparse navigation, and a journal-like sequence that feels curated and minimal."
  },
  {
    slug: "cargo-architecture-monograph",
    brand: "Cargo / Architecture",
    title: "Architecture Monograph Template",
    prompt:
      "Design a Cargo-inspired architecture portfolio template with split columns, monographic typography, large project imagery, quiet plan labels, and a precise editorial structure."
  },
  {
    slug: "cargo-fashion-lookbook",
    brand: "Cargo / Fashion",
    title: "Fashion Lookbook Template",
    prompt:
      "Create a Cargo-inspired fashion portfolio template with a lookbook feel, tall image sequencing, sparse captions, runway-like pacing, and a polished editorial homepage."
  },
  {
    slug: "cargo-art-direction-moodboard",
    brand: "Cargo / Art Direction",
    title: "Art Direction Moodboard Template",
    prompt:
      "Design a Cargo-like art direction portfolio template with moodboard-style project grouping, mixed-media covers, strong image hierarchy, and a controlled but expressive archive layout."
  },
  {
    slug: "cargo-type-specimen-archive",
    brand: "Cargo / Typography",
    title: "Type Specimen Archive Template",
    prompt:
      "Create a Cargo-inspired typography portfolio template with oversized specimen type, release metadata, glyph sheets, quiet monochrome structure, and a specimen-first archive rhythm."
  },
  {
    slug: "cargo-studio-directory",
    brand: "Cargo / Studio",
    title: "Studio Directory Template",
    prompt:
      "Design a Cargo-inspired studio portfolio template with a selected project directory, service filters, structured lists, restrained premium type, and a calm case-study path."
  },
  {
    slug: "sokoglam-editorial-commerce",
    brand: "Soko Glam",
    title: "Soko Glam Editorial Commerce",
    prompt:
      "Design a U.S.-market K-beauty ecommerce homepage with editorial curation, warm but premium product photography, expert-picked trust language, routine education blocks, review-led proof, and a soft conversion rhythm. Keep the layout clean, helpful, and community-driven rather than discount-marketplace heavy."
  },
  {
    slug: "goka-social-commerce",
    brand: "Goka",
    title: "Goka Social Commerce",
    prompt:
      "Create a Latin America K-beauty ecommerce homepage with Spanish-first copy, WhatsApp trust cues, social-native campaign modules, authentic-product reassurance, free-shipping emphasis, and a club-like membership tone. Keep the page bright, friendly, mobile-first, and community-oriented."
  },
  {
    slug: "miin-omnichannel-routine",
    brand: "MiiN Cosmetics",
    title: "MiiN Omnichannel Routine Shop",
    prompt:
      "Design a European K-beauty ecommerce homepage with curated product discovery, visible EU-compliance trust blocks, structured routine education, workshop and glossary entry points, and a polished omnichannel retail feel. Keep the layout informative, credible, and conversion-ready without losing warmth."
  },
  {
    slug: "innisfree-ingredient-merchandising",
    brand: "Innisfree Singapore",
    title: "Innisfree Ingredient Merchandising",
    prompt:
      "Create a Southeast Asia K-beauty homepage with ingredient-led navigation, dense promotional merchandising, bundle-first product sections, online-exclusive rails, and localized shipping and membership cues. Keep the layout fast-scanning, commerce-forward, and highly organized."
  },
  {
    slug: "aesop-editorial-commerce",
    brand: "Aesop",
    title: "Aesop Editorial Commerce",
    prompt:
      "Design a premium skincare ecommerce homepage with an editorial hero, muted neutral surfaces, literary section titles, sensory product metadata, and calm shoppable modules. Blend commerce with cultural navigation and keep the page sparse, precise, and high-trust."
  },
  {
    slug: "allbirds-friendly-dtc",
    brand: "Allbirds",
    title: "Allbirds Friendly DTC",
    prompt:
      "Create a direct-to-consumer footwear ecommerce homepage with a friendly hero, split audience CTAs, named collection modules, best-seller shelves, and short benefit-led copy blocks about comfort and sustainability. Keep the layout bright, easy to browse, and conversion-ready."
  },
  {
    slug: "gymshark-launch-commerce",
    brand: "Gymshark",
    title: "Gymshark Launch Commerce",
    prompt:
      "Design a high-energy activewear ecommerce homepage with a campaign-led hero, launch collection callouts, rapid new-in product grids, fit and color metadata, and strong repeated shop CTAs. Make it feel like a release event with commerce built directly into the first scroll."
  },
  {
    slug: "ai-design-guide-science-hero",
    brand: "Designprom / Home",
    title: "AI Design Guide Hero",
    prompt:
      "Design a cinematic landing page for a prompt guide website with the single hero title 'AI Design Guide'. Use a dark research-observatory atmosphere, one large luminous core object, layered translucent panels, quiet grid overlays, and a science-exhibit sense of depth inspired by immersive interactive microsites. The result should feel like a prompt analysis interface rather than a generic SaaS homepage, with minimal text beyond the hero title and a strong editorial composition."
  }
];

const selectedSamples = sampleFilter.size
  ? samples.filter((sample) => sampleFilter.has(sample.slug))
  : samples;

if (!selectedSamples.length) {
  console.error("No Stitch samples matched the provided slug filter.");
  process.exit(1);
}

function getExtension(contentType) {
  if (contentType.includes("png")) {
    return "png";
  }

  if (contentType.includes("jpeg") || contentType.includes("jpg")) {
    return "jpg";
  }

  if (contentType.includes("webp")) {
    return "webp";
  }

  return "png";
}

async function fetchBinary(url) {
  let response = await fetch(url);

  if (!response.ok) {
    response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  if (!response.ok) {
    throw new Error(`Failed to download asset: ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get("content-type") ?? "image/png";
  const extension = getExtension(contentType);
  const buffer = Buffer.from(await response.arrayBuffer());

  return { buffer, contentType, extension };
}

function extractGenerationPayload(result) {
  const components = result?.outputComponents ?? [];
  const designComponent = components.find((component) => component.design?.screens?.length);
  const textComponents = components
    .filter((component) => component.text)
    .map((component) => component.text);
  const suggestions = components
    .filter((component) => component.suggestion)
    .map((component) => component.suggestion);

  if (!designComponent) {
    throw new Error("Stitch response did not include a generated screen.");
  }

  const screen = designComponent.design.screens[0];

  if (!screen?.screenshot?.downloadUrl || !screen?.htmlCode?.downloadUrl) {
    throw new Error("Generated screen is missing downloadable image or HTML URLs.");
  }

  return {
    screen,
    suggestions,
    textComponents
  };
}

await mkdir(outputDir, { recursive: true });

const client = new StitchToolClient({
  accessToken,
  projectId: googleCloudProject,
  timeout: 300_000
});
let existingManifest = [];

try {
  existingManifest = JSON.parse(await readFile(manifestPath, "utf8"));
} catch {
  existingManifest = [];
}

const manifestMap = new Map(existingManifest.map((entry) => [entry.slug, entry]));

try {
  const project = await client.callTool("create_project", {
    title: `Designprom Brand DNA Samples ${new Date().toISOString().slice(0, 10)}`
  });
  const projectId = project.name.replace("projects/", "");
  const failures = [];

  for (const sample of selectedSamples) {
    console.log(`Generating ${sample.brand} sample: ${sample.slug}...`);

    try {
      const result = await client.callTool("generate_screen_from_text", {
        deviceType: "DESKTOP",
        modelId: "GEMINI_3_1_PRO",
        projectId,
        prompt: sample.prompt
      });
      const { screen, suggestions, textComponents } = extractGenerationPayload(result);
      const imageUrl = screen.screenshot.downloadUrl;
      const htmlUrl = screen.htmlCode.downloadUrl;
      const { buffer, contentType, extension } = await fetchBinary(imageUrl);
      const fileName = `${sample.slug}.${extension}`;
      const filePath = path.join(outputDir, fileName);

      await writeFile(filePath, buffer);

      manifestMap.set(sample.slug, {
        brand: sample.brand,
        contentType,
        fileName,
        generatedAt: new Date().toISOString(),
        htmlUrl,
        imageUrl,
        notes: textComponents,
        prompt: sample.prompt,
        projectId,
        screenId: screen.id,
        slug: sample.slug,
        suggestions,
        title: screen.title ?? sample.title
      });

      console.log(`Saved ${sample.slug} -> public/stitch-exports/real/${fileName}`);
    } catch (error) {
      failures.push(sample.slug);
      console.error(`Failed ${sample.slug}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (failures.length) {
    console.error(`Stitch generation failed for: ${failures.join(", ")}`);
    process.exitCode = 1;
  }
} finally {
  await client.close();
}

const manifest = samples
  .map((sample) => manifestMap.get(sample.slug))
  .filter(Boolean);

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote manifest -> ${path.relative(rootDir, manifestPath)}`);
