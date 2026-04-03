# Designprom Sitemap And Flows

> 작성일: 2026-03-29
> 목적: PRD를 바탕으로 실제 화면 구조와 탐색 흐름을 구현 수준으로 고정

## 1. Sitemap

### Public routes

- `/`
- `/dna`
- `/styles`
- `/collections`
- `/compare`
- `/builder`

### Future routes

- `/dna/[slug]`
- `/styles/[slug]`
- `/collections/[slug]`
- `/use-cases/[slug]`
- `/search`

## 2. Primary user flows

### Flow A. Brand-first exploration

1. Home 진입
2. Featured Brand DNA 선택
3. DNA 상세에서 traits와 Stitch prompt 확인
4. 연관 style category로 이동
5. 프롬프트 복사 후 생성 도구로 이동

### Flow B. Medium-first exploration

1. Home 또는 Styles 진입
2. `3D`, `Editorial`, `Animation` 등 선택
3. 스타일 상세에서 use case 추천 확인
4. 같은 스타일의 다른 prompt variation 비교
5. 프롬프트 복사

### Flow C. Goal-first exploration

1. Collections 진입
2. `AI SaaS Launch` 같은 목적형 컬렉션 선택
3. 추천 DNA + styles 묶음 확인
4. 한 방향을 builder로 보내 조합
5. Stitch prompt 생성

## 3. Navigation behavior

- 헤더는 모든 페이지 공통
- 홈의 hero CTA는 `dna`와 `builder`로 분기
- Compare는 교육 페이지 역할이므로 내비게이션에서 항상 상단 노출
- Builder는 최종 행동 지점이므로 우측 CTA로 분리

## 4. Content relationships

- DNA card는 최소 3개의 style category와 연결
- Style card는 최소 2개의 use case와 연결
- Collection은 최소 3개의 card를 포함
- Compare entry는 항상 같은 use case를 기준으로 3개 방향 비교

## 5. MVP implementation order

1. 홈
2. `dna`, `styles`, `collections`
3. `compare`
4. `builder`
5. 동적 상세 페이지
