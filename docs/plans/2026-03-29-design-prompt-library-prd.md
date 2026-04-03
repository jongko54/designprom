# Design Prompt Library PRD

> 작성일: 2026-03-29
> 프로젝트명(가칭): `Prompt DNA Library`
> 문서 목적: 디자인 영감 탐색, 프롬프트 학습, Stitch 생성 워크플로우를 하나로 묶는 서비스의 MVP 범위 확정

## 1. 한 줄 정의

`Prompt DNA Library`는 사람들이 "이 디자인 느낌을 어떻게 프롬프트로 써야 하는지"를 배우고, 바로 Stitch에 넣어 결과를 만드는 데 초점을 둔 디자인 프롬프트 라이브러리다.

핵심은 `브랜드/스타일 감각 -> 시각 특성 -> 프롬프트 레시피 -> 결과 예시 -> 재사용` 흐름을 짧게 만드는 것이다.

## 2. 문제 정의

현재 AI로 사이트를 만들 때 가장 큰 문제는 아래 3가지다.

1. 사용자는 좋은 레퍼런스를 봐도 왜 좋아 보이는지 구조적으로 설명하지 못한다.
2. "애플 느낌", "틱톡 느낌"처럼 모호한 표현을 Stitch나 다른 생성 도구에 넣어도 결과가 흔들린다.
3. 대부분의 인스피레이션 사이트는 예시를 보여주지만, 그 예시를 생성 가능한 프롬프트로 번역해주지 않는다.

즉, 현재 시장에는 `보는 경험`은 많지만 `만드는 경험`을 바로 도와주는 제품은 드물다.

## 3. 제품 가설

- 사람들은 완성된 디자인보다 `재현 가능한 스타일 시스템`을 원한다.
- 브랜드 이름을 그대로 따라 하는 것보다 `DNA 단위로 추상화한 스타일 레시피`가 더 안전하고 더 오래 간다.
- 좋은 결과물은 한 번의 긴 프롬프트보다 `구조화된 프롬프트 카드 + 조절 가능한 trait`에서 나온다.
- 참고 사이트의 강점은 분리되어 있다.
  - `Cargo`: 창작자 맥락과 실제 사용 사례
  - `Framer`: 빠른 선택과 템플릿 탐색
  - `Land-book`, `Lapa Ninja`: 필터 중심 인스피레이션
  - `Godly`, `Awwwards`: 강한 큐레이션 기준
  - `Mobbin`: 패턴 단위 분해

우리 제품은 위 강점을 `프롬프트 학습형 디자인 라이브러리`로 재조합한다.

## 4. 목표와 비목표

### 목표

- 사용자가 원하는 디자인 톤을 30초 안에 찾게 한다.
- 각 스타일을 Stitch에서 바로 사용할 수 있는 프롬프트 형태로 제공한다.
- 결과 예시와 함께 `왜 이런 결과가 나오는지`를 설명한다.
- 카테고리를 단순한 취향 분류가 아니라 `시스템적 속성`으로 설계한다.
- 초기 콘텐츠만으로도 "디자인 모르는 사람도 시작할 수 있다"는 인상을 준다.

### 비목표

- 초기 버전에서 디자인 파일 편집기까지 만들지 않는다.
- 커뮤니티 업로드/평가 시스템은 MVP에서 제외한다.
- 실제 브랜드 자산 복제, 로고 재사용, 특정 제품 UI 복제는 다루지 않는다.
- Figma 플러그인, 브라우저 확장, 실시간 협업 기능은 이후 단계로 미룬다.

## 5. 타깃 사용자

### 1차 타깃

- AI로 랜딩 페이지나 소개 사이트를 만드는 1인 창업자
- 디자인 감각은 부족하지만 결과물 퀄리티를 빠르게 끌어올리고 싶은 개발자
- 노코드/로우코드 도구를 쓰는 마케터, 운영자, PM

### 2차 타깃

- 프롬프트 베이스로 시안을 빠르게 탐색하는 디자이너
- 여러 스타일 방향을 비교해 제안해야 하는 에이전시/프리랜서

## 6. 포지셔닝

### 하지 말아야 할 포지셔닝

- 단순 갤러리
- 예쁜 사이트 모음
- 무제한 디자인 템플릿 모음

### 가져가야 할 포지셔닝

- `Design inspiration, translated into prompts`
- `브랜드 감각을 복제하지 않고 DNA로 해석하는 라이브러리`
- `Stitch와 같은 생성 도구에서 바로 쓰는 디자인 프롬프트 운영체제`

## 7. 제품 원칙

1. 브랜드명보다 `시각 특성`을 먼저 보여준다.
2. 모든 카드는 `복붙 가능한 프롬프트`를 가져야 한다.
3. 스타일은 반드시 `Do / Avoid / Traits / Output`로 설명한다.
4. 예시는 많기보다 선별적이어야 한다.
5. 사용자는 보기만 하는 것이 아니라 `비교하고 변형`할 수 있어야 한다.
6. "예쁜 설명"보다 "실제로 결과가 나오는 문장"을 우선한다.

## 8. 카테고리 시스템

서비스의 기본 축은 4개다.

### 축 1. Brand-inspired DNA

- `Calm Precision UI`
- `Warm Global Hospitality`
- `Enterprise Grid System`
- `Creator Velocity`
- `Embedded Trust`
- `Focused Operator`
- `Modular Knowledge Workspace`

### 축 2. Visual Medium

- `2D`
- `3D`
- `Animation`
- `Illustration-led`
- `Photography-led`

### 축 3. Use Case

- `Landing`
- `Portfolio`
- `Product Story`
- `Ecommerce`
- `Dashboard`
- `Docs`

### 축 4. Traits

- `Minimal`
- `Dense`
- `Premium`
- `Playful`
- `Editorial`
- `Systematic`
- `Futuristic`
- `Brutalist`

## 9. 사이트 정보 구조

### 최상위 내비게이션

- `Brand DNA`
- `Styles`
- `Use Cases`
- `Compare`
- `Collections`
- `Prompt Builder`

### 핵심 페이지 집합

1. `Home`
2. `Brand DNA Hub`
3. `Style Category Hub`
4. `Category Detail`
5. `Compare Lab`
6. `Collection Detail`
7. `Prompt Builder`

## 10. 페이지별 역할

### 10.1 Home

역할:
- 사용자에게 "무엇을 만들고 싶은지"를 빠르게 선택하게 한다.
- 강한 첫인상과 큐레이션 신뢰를 동시에 만든다.

포함 섹션:
- Hero
- Quick Intent Picker
- Featured DNA
- Style Categories
- Before / Prompt / After
- Compare Grid
- Collections
- Final CTA

### 10.2 Brand DNA Hub

역할:
- 기업/브랜드 레퍼런스 철학을 직접적인 복제가 아닌 `DNA 카드`로 이해시키는 공간

포함 섹션:
- DNA introduction
- Filter bar
- DNA card grid
- Legal/ethical note

### 10.3 Style Category Hub

역할:
- 2D, 3D, 애니메이션, 브루탈리즘, 에디토리얼 등 시각적 언어 중심 탐색

포함 섹션:
- category hero
- trait filters
- visual examples
- recipes

### 10.4 Category Detail

역할:
- 한 카테고리의 모든 정보를 `즉시 생성 가능한 구조`로 제공

포함 섹션:
- DNA summary
- visual traits
- prompt formula
- Stitch prompt
- output gallery
- do / avoid
- remix controls
- related categories

### 10.5 Compare Lab

역할:
- 같은 목적물에 대해 서로 다른 미감을 비교하게 한다.

예시:
- `SaaS landing page`를 `Calm Precision`, `Enterprise Grid`, `Creator Velocity`로 비교

### 10.6 Collections

역할:
- 실제 작업 상황 기준으로 카드를 묶는다.

예시:
- `B2B SaaS launch`
- `Luxury portfolio`
- `Creator product drop`
- `AI tool landing`

### 10.7 Prompt Builder

역할:
- 미리 준비된 속성을 조합해 개인화 프롬프트를 만든다.

조합 축:
- page type
- tone
- layout density
- motion
- imagery
- contrast

## 11. 페이지 와이어프레임 초안

### 11.1 Home

```text
[Header]
  Logo | Brand DNA | Styles | Compare | Collections | Prompt Builder

[Hero]
  H1: Find a design language, not just a screenshot
  Search / intent input
  CTA: Explore DNA / Build Prompt

[Quick Intent Picker]
  Landing | Portfolio | Dashboard | Ecommerce | Docs | Campaign

[Featured DNA]
  6 cards with visual chips + one-line summaries

[Styles Grid]
  2D | 3D | Animation | Editorial | Minimal | Brutalist

[Before / Prompt / After]
  Reference feeling -> prompt recipe -> example output

[Compare]
  Same use case, 3 visual directions side by side

[Collections]
  Curated bundles for real scenarios

[Footer]
```

### 11.2 Category Detail

```text
[Header]

[Category Hero]
  Name
  DNA tag / medium tag / use case tags
  Copy Stitch Prompt

[Visual Traits]
  Layout
  Type
  Color
  Motion
  Imagery
  Density

[Prompt Formula]
  Required tokens
  Optional traits
  Avoid list

[Output Gallery]
  3 to 6 generated examples

[Do / Avoid]
  Specific guidance

[Remix Controls]
  More premium
  Less motion
  More editorial
  Mobile-first

[Related Categories]
```

### 11.3 Compare Lab

```text
[Use Case Selector]
  Example: SaaS Landing

[Column A]
  Calm Precision UI
  Prompt
  Output

[Column B]
  Enterprise Grid System
  Prompt
  Output

[Column C]
  Creator Velocity
  Prompt
  Output

[Bottom Section]
  What changed in layout / type / motion / mood
```

### 11.4 Prompt Builder

```text
[Builder Controls]
  Page type
  Tone
  Visual medium
  Typography mood
  Motion level
  Color direction
  Density

[Live Prompt Output]
  Stitch-ready prompt

[Preview Cards]
  Similar categories
```

## 12. 콘텐츠 카드 스키마

각 카테고리 카드는 아래 필드를 기본으로 가진다.

| 필드 | 설명 |
|------|------|
| `slug` | URL 식별자 |
| `title` | 카테고리 이름 |
| `shortSummary` | 한 줄 요약 |
| `axis` | DNA / style / use-case |
| `medium` | 2D / 3D / animation 등 |
| `traits` | tag 배열 |
| `visualTraits` | layout, type, color, motion, imagery, density |
| `doList` | 반드시 넣을 요소 |
| `avoidList` | 피해야 할 요소 |
| `promptFormula` | 일반형 프롬프트 템플릿 |
| `stitchPrompt` | 복붙용 완성 프롬프트 |
| `outputIdeas` | 예시 산출물 시나리오 |
| `related` | 연관 카테고리 |
| `sources` | 철학/레퍼런스 출처 |

## 13. MVP 기능 범위

### 포함

- 홈
- 카테고리 목록/상세
- 필터/검색
- 프롬프트 복사
- Compare 1개 템플릿
- Collections 6개
- 관리자 없이도 넣을 수 있는 로컬 콘텐츠 구조

### 제외

- 로그인
- 저장/북마크
- 사용자 제출
- 자동 이미지 생성 파이프라인
- 개인별 프롬프트 히스토리

## 14. 큐레이션 운영 방식

초기에는 유저 업로드 대신 에디토리얼 큐레이션으로 간다.

운영 단위:
- 매주 `featured DNA` 3개 교체
- 월간 `new recipes` 8개 추가
- `use case collection` 중심으로 카드 재조합

큐레이션 기준:
- 결과물 재현성
- 스타일 구분 명확성
- 설명 가능성
- Stitch 친화성

## 15. 안전성과 법적 가드레일

### 해야 할 것

- 브랜드의 철학, 레이아웃 방식, 밀도, 톤을 추상화한다.
- 공식 디자인 시스템, 공식 디자인 가이드, 공식 크리에이티브 자료를 기준으로 해석한다.

### 하지 말아야 할 것

- 로고, 상표, 제품 스크린샷 복제
- 특정 앱 UI를 거의 동일하게 재구성
- "copy Apple homepage exactly" 같은 직접 복제 프롬프트 제공

카테고리 이름은 가능하면 `Apple style`보다 `Calm Precision UI`처럼 추상화된 운영명이 우선이다.

## 16. 성공 지표

### 북극성 지표

- `prompt_copy_to_generation_rate`

정의:
- 카테고리 상세에서 프롬프트를 복사한 사용자가 실제로 생성 액션으로 이어지는 비율

### 보조 지표

- 카테고리 상세 진입률
- 검색 후 클릭률
- Compare Lab 사용률
- 컬렉션 기반 복사율
- 7일 재방문율

## 17. 초기 KPI 가정

- 홈 방문자의 35% 이상이 첫 세션에서 카테고리 상세 진입
- 상세 진입자의 20% 이상이 프롬프트 복사
- 복사자의 30% 이상이 Compare 또는 관련 카테고리 추가 탐색

## 18. MVP 빌드 순서

### Phase 1. Content-first MVP

- 카테고리 20개 작성
- 컬렉션 6개 작성
- 홈/허브/상세/비교 페이지 구현

### Phase 2. Utility layer

- Prompt Builder
- 프롬프트 변형 옵션
- 결과 예시 관리 구조

### Phase 3. Growth layer

- 저장/북마크
- 유저 컬렉션
- 제출/에디터 리뷰

## 19. 구현 우선순위

1. 카테고리 데이터 모델 확정
2. 홈과 상세 페이지 템플릿 구현
3. 필터 기준과 태그 체계 구현
4. Compare Lab 1차 버전
5. Prompt Builder 1차 버전

## 20. 첫 MVP에 넣을 컬렉션 제안

- `AI SaaS Launch`
- `Creative Portfolio`
- `Enterprise Product Marketing`
- `Luxury Editorial Commerce`
- `Creator Campaign Drop`
- `Investor-ready Startup Site`

## 21. 디자인 방향 제안

서비스 자체 비주얼은 너무 무난하면 안 된다. 제품 정체성이 `디자인 감각 번역`이기 때문이다.

권장 방향:
- 타이포그래피: 표현력 있는 세리프 + 기능적 산세리프 조합
- 배경: 단색 대신 질감 있는 그라데이션 또는 패턴
- 카드: 갤러리처럼 보여도 도구적인 정보가 드러나야 함
- 모션: 입장 애니메이션은 분명하게, 상호작용은 절제
- 느낌: `editorial tool meets design lab`

## 22. 참고한 외부 기준

다음 소스는 2026-03-29 기준으로 확인했다.

- Cargo: https://cargo.site/
- Cargo Information: https://cargo.site/information
- Framer Marketplace Templates: https://www.framer.com/marketplace/templates/
- Webflow Template Categories: https://webflow.com/templates/categories
- Land-book: https://land-book.com/
- Lapa Ninja Categories: https://www.lapa.ninja/category/
- Godly Info: https://godly.website/info
- Awwwards About: https://www.awwwards.com/about-us/
- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/
- Apple UI Design Tips: https://developer.apple.com/design/tips/
- Airbnb Cereal: https://airbnb.design/wp-content/themes/airbnbdesign/microsites/cereal/introduction/
- IBM Design Language: https://www.ibm.com/design/language
- Carbon Design System: https://carbondesignsystem.com/
- TikTok Creative Codes: https://ads.tiktok.com/business/library/Creative_Codes_ENG.pdf

## 23. 다음 실행 항목

1. 이 PRD 기준으로 카테고리 seed 콘텐츠를 먼저 채운다.
2. 홈/상세/비교 3개 템플릿부터 디자인한다.
3. 이후 Stitch prompt copy 워크플로우를 UI에 연결한다.
