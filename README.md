# designprom

디자인 영감, 브랜드 DNA, 스타일 카테고리, Stitch용 프롬프트 레시피를 정리하는 독립 작업 폴더입니다.

## 구조

- `docs/plans/`
  - 제품 방향, 정보 구조, MVP 범위를 담은 PRD
- `docs/guides/`
  - 실제 카테고리 카드와 프롬프트 초안

## 현재 문서

- `docs/plans/2026-03-29-design-prompt-library-prd.md`
- `docs/guides/2026-03-29-design-prompt-library-seed-content.md`
- `docs/guides/2026-03-30-stitch-export-workflow.md`

## Stitch export 구조

- 샘플 및 실제 결과물 경로: `public/stitch-exports/`
- SDK 생성 결과 경로: `public/stitch-exports/real/`
- 예시 카드 메타데이터: `src/data/stitch-exports.ts`
- 생성 스크립트: `npm run stitch:generate-brand-dna`

## 앱 실행

- 개발 서버: `npm run dev`
- 프로덕션 빌드: `npm run build`

로컬 npm 캐시 권한 문제가 있으면 아래처럼 설치합니다.

- `npm install --cache .npm-cache`
