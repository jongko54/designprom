# Adobe Substance 3D Pipeline

## Goal

Use Adobe as the material and lookdev layer, not as the web runtime.

The production stack should be:

1. Modeling in Blender, C4D, or another DCC
2. Material authoring in Adobe Substance 3D Painter
3. Texture variation generation in Adobe Substance 3D Sampler
4. Fast still-frame lookdev in Adobe Substance 3D Stager
5. Export to `GLB`
6. Compress textures and meshes for the web
7. Implement interaction in `three.js + @react-three/fiber`

## Recommended Adobe Apps

### Painter

Use for:

- hero object materials
- clearcoat, brushed metal, lacquer, frosted plastic, anodized finishes
- edge wear, micro-scratches, roughness breakup, emission masks

Best fit in this project:

- `Monolith Drift`: obsidian lacquer and champagne trims
- `Orbit Forge`: anodized cobalt rings and opaline core
- `Petal Signal`: pearlescent translucent petals
- `Tidal Beacon`: sea-glass beacon and oxidized metal details

### Sampler

Use for:

- generating surface variations from photos or scans
- building subtle roughness and normal breakup
- deriving secondary surface sets without repainting everything

Best fit in this project:

- floor surface variation
- mineral noise
- fine spray breakup
- lacquer imperfection maps

### Stager

Use for:

- still lookdev approval
- camera framing references
- lighting direction references for the engineering handoff

Do not treat it as the shipping web engine.

## Production Rules

- Export one hero object family per scene, not a large environment kit.
- Prefer one dominant sculptural object plus 2-4 support elements.
- Keep materials few but rich. Three strong materials beat twelve average ones.
- Author roughness carefully. Cheap-looking 3D is usually a roughness problem before it is a geometry problem.
- Use emissive accents sparingly. Most premium surfaces read better through reflection than glow.

## Export Contract

For each scene, deliver:

- `scene-name.glb`
- base color, normal, ORM, emission, transmission-related textures as needed
- one neutral HDRI reference still from Stager
- one approved material board image

Target web constraints:

- hero mesh budget should stay conservative
- texture sizes should usually land at `2K`, with `4K` used only when justified
- convert web textures to compressed formats before shipping

## Web Handoff

Engineering runtime should stay:

- `three.js`
- `@react-three/fiber`
- one main `Canvas`
- DOM prompt cards outside the canvas

Recommended next production pass:

1. Finalize one scene first: `Monolith Drift`
2. Build its hero mesh in DCC
3. Texture in Painter
4. Approve stills in Stager
5. Export `GLB`
6. Replace the procedural geometry in the site with the authored asset
7. Repeat for the remaining three scenes

## Product Decision

Adobe helps if the license includes Substance 3D tools.

It does not replace the runtime stack.

As of Adobe help pages checked on April 14, 2026:

- Substance 3D Viewer support ended on October 16, 2025
- Adobe Aero support ends on November 6, 2025

That is why the correct split is:

- Adobe for material and lookdev quality
- R3F for the live interactive web page
