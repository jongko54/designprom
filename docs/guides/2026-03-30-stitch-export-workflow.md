# Stitch Export Workflow

`Brand DNA`와 DNA 상세 카드의 `Stitch output captures`는 아래 구조를 기준으로 실제 결과물로 교체할 수 있습니다.

## 파일 위치

- 정적 자산 폴더: `public/stitch-exports/`
- 실제 SDK 생성 결과: `public/stitch-exports/real/`
- 메타데이터 레지스트리: `src/data/stitch-exports.ts`
- 생성 스크립트: `scripts/generate-stitch-brand-dna.mjs`

## 현재 샘플 자산

- `public/stitch-exports/apple-launch.svg`
- `public/stitch-exports/figma-workspace.svg`
- `public/stitch-exports/airbnb-booking.svg`
- `public/stitch-exports/ibm-enterprise.svg`
- `public/stitch-exports/tiktok-drop.svg`

## 교체 방법

1. Stitch에서 실제 결과 화면을 export 합니다.
2. 이미지를 `public/stitch-exports/`에 넣습니다.
3. `src/data/stitch-exports.ts`에서 해당 example slug의 `image.src`, `generatedAt`, `promptVersion`, `runLabel`을 갱신합니다.
4. 필요하면 `objectPosition`을 조정해서 카드 크롭을 맞춥니다.

## SDK로 다시 생성하기

1. Stitch API가 프로젝트에서 활성화되어 있어야 합니다.
2. 아래 명령으로 access token을 주입해 실행합니다.

```bash
STITCH_ACCESS_TOKEN="$(gcloud auth print-access-token)" \
GOOGLE_CLOUD_PROJECT="$(gcloud config get-value project)" \
npm run stitch:generate-brand-dna
```

3. 생성 결과는 `public/stitch-exports/real/manifest.json`에 기록됩니다.

## example slug 매핑

- Apple
  - `apple-ai-launch`
  - `apple-feature-story`
  - `apple-pricing-proof`
- Figma
  - `figma-workspace-home`
  - `figma-community-marketplace`
  - `figma-multiplayer-tour`
- Airbnb
  - `airbnb-discovery-landing`
  - `airbnb-host-onboarding`
  - `airbnb-experience-marketplace`
- IBM
  - `ibm-solution-page`
  - `ibm-architecture-explainer`
  - `ibm-docs-marketing-hybrid`
- TikTok
  - `tiktok-campaign-drop`
  - `tiktok-live-commerce`
  - `tiktok-trend-challenge`

## 메모

- 현재 레지스트리는 브랜드별 샘플 보드를 기반으로 seeded 되어 있습니다.
- 실제 Stitch export 이미지가 들어오면 상세 카드와 Brand DNA hero에서 자동으로 그 자산을 우선 사용합니다.
