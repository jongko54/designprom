# Monolith Drift Substance Spec

## Scene Intent

`Monolith Drift` is the first production scene.

The target is not “generic 3D hero”.

The target is:

- premium
- architectural
- lacquer-heavy
- quiet
- expensive

It should feel closer to a luxury brand installation than a tech demo.

## Hero Object Breakdown

Build one scene kit with these parts:

1. `hero_monolith_A`
   - tallest central slab
   - proportion: dominant and symmetrical
   - front face large enough to carry subtle UI-like light bars

2. `hero_monolith_B`
   - left supporting slab
   - slightly thinner and more angled

3. `hero_monolith_C`
   - right supporting slab
   - slightly taller than B, but still secondary to A

4. `plinth_main`
   - wide low base under the center slab

5. `plinth_side_L`
   - left support base

6. `plinth_side_R`
   - right support base

7. `orbital_arc_back`
   - soft luminous arc behind the center slab

8. `light_blade_L`
   - thin amber blade accent

9. `light_blade_R`
   - thin amber blade accent

10. `shard_set`
    - 4-6 floating metallic fragments

## Material Set

Keep the material count small.

### Material 01: Obsidian Lacquer

Use on:

- all primary slab bodies

Target qualities:

- near-black base
- subtle warm undertone
- very low roughness variation
- visible clearcoat
- delicate micro-scratches only under grazing light

Painter notes:

- strong clearcoat layer
- low-frequency roughness breakup
- no obvious edge wear
- no noisy damage

### Material 02: Champagne PVD Metal

Use on:

- edge trims
- accent bars

Target qualities:

- pale warm metal
- polished but not mirror-perfect
- slightly brushed directionality

Painter notes:

- anisotropic feel if needed in final DCC
- keep highlights narrow and premium

### Material 03: Smoked Glass Resin

Use on:

- front overlay plane
- subtle face sheet

Target qualities:

- dark translucent surface
- slight amber tint
- controlled reflection

Painter notes:

- transmission should stay subtle
- avoid fully transparent glass look

### Material 04: Floor Resin

Use on:

- stage floor
- plinth tops if needed

Target qualities:

- dark resin
- high reflectance
- clean, minimal breakup

Sampler notes:

- derive a very soft resin imperfection pattern
- keep normal intensity low

## Texture Guidance

Default texture target:

- `2K` for monoliths
- `1K` for secondary shards if needed

Maps:

- Base Color
- Normal
- ORM or separate roughness/metallic/AO
- Emissive only where truly needed

Avoid:

- fake dirt
- heavy grunge
- random scratches everywhere
- exaggerated edge wear

## Lighting Approval In Stager

Build one approval lighting setup:

- dark studio void
- one warm key from upper front-left
- one soft cool fill from upper back-right
- one low amber floor bounce

Approval stills required:

1. front hero
2. left three-quarter
3. right three-quarter
4. grazing close-up on lacquer
5. trim material close-up

## Geometry Rules

- bevel every visible edge
- no razor-sharp default cubes in production asset
- keep silhouettes clean and monolithic
- secondary pieces should never steal attention from the center slab

## Web Export Contract

Deliver:

- `monolith-drift.glb`
- one texture set folder
- one material board PNG
- one Stager lighting reference PNG

Runtime replacement target:

- replace the procedural `MonolithDrift` cluster in [prompt-showcase-scene.tsx](/Users/jongho/workspace/designprom/src/components/three/prompt-showcase-scene.tsx:200)
- preserve current camera and interaction behavior
- keep the scene as a single dominant canvas on the page

## Done Definition

The scene is ready when:

- the lacquer reads deep and premium
- the trims read metallic without looking chrome-cheap
- the center monolith dominates immediately
- the scene still looks expensive with the UI hidden
