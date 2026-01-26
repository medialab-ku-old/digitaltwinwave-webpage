# DigitalTwinWave 프로젝트 문서

## 개요

DigitalTwinWave는 AI 기반 디지털 트윈 기업의 공식 웹사이트입니다. Next.js 16과 React 19를 기반으로 구축되었으며, 회사 소개, 팀 소개, 기술 R&D, 채용 정보 등을 제공합니다.

---

## 기술 스택

| 카테고리 | 기술 | 버전 |
|---------|------|------|
| 프레임워크 | Next.js | 16.1.0 |
| UI 라이브러리 | React | 19.2.3 |
| 언어 | TypeScript | 5.x |
| 스타일링 | Tailwind CSS | 4.x |
| 애니메이션 | Motion (Framer Motion) | 12.23.26 |
| 다국어 | next-intl | 4.6.1 |
| CSS-in-JS | styled-components | 6.1.19 |
| 이미지 처리 | sharp, plaiceholder | 0.34.5, 3.0.0 |
| 마크다운 | gray-matter, react-markdown | 4.0.3, 10.1.0 |
| 지도 | react-kakao-maps-sdk | 1.2.0 |

---

## 프로젝트 구조

```
DigitalTwinWave/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # 다국어 라우팅 (ko)
│   │   ├── layout.tsx            # 루트 레이아웃
│   │   ├── page.tsx              # 홈페이지
│   │   ├── people/               # 팀 소개
│   │   ├── history/              # 회사 연혁
│   │   ├── rnd/                  # R&D 기술
│   │   ├── contact/              # 연락처
│   │   └── careers/              # 채용
│   │       └── [postId]/         # 채용공고 상세 (동적)
│   ├── globals.css               # 전역 스타일
│   ├── robots.ts                 # robots.txt 생성
│   └── sitemap.ts                # sitemap.xml 생성
├── components/                   # 재사용 컴포넌트
│   ├── layout/                   # 레이아웃
│   │   ├── Header.tsx            # 데스크탑 헤더
│   │   ├── Menu.tsx              # 모바일 메뉴
│   │   └── Background.tsx        # 배경 효과
│   ├── ui/                       # UI 요소
│   │   ├── Title.tsx             # 페이지 제목
│   │   ├── FacePicture.tsx       # 프로필 사진
│   │   └── DownArrow.tsx         # 스크롤 화살표
│   ├── animation/                # 애니메이션
│   │   ├── AnimateOnScroll.tsx   # 스크롤 애니메이션
│   │   └── Variants.ts           # Motion variants
│   └── ScrollToTop.tsx           # 스크롤 초기화
├── hooks/                        # 커스텀 훅
│   ├── useKakaoLoader.ts         # 카카오맵 로더
│   ├── useLightbox.ts            # 라이트박스 상태
│   └── useListRef.ts             # 배열 Ref 관리
├── lib/                          # 유틸리티
│   ├── image.ts                  # Blur placeholder
│   ├── path.ts                   # 경로 정규화
│   ├── post.ts                   # 마크다운 파싱
│   └── type.d.ts                 # 타입 정의
├── i18n/                         # 국제화
│   ├── locales.ts                # 지원 언어
│   ├── navigation.ts             # 다국어 네비게이션
│   └── request.ts                # 요청별 로케일
├── translations/                 # 번역 파일
│   └── ko.json                   # 한국어
├── posts/                        # 마크다운 포스트
│   └── 2026-recruitment.md       # 채용 공고
├── public/                       # 정적 자산
│   ├── logo.png
│   ├── background.mp4
│   ├── campus.webp
│   ├── people/                   # 팀 사진
│   ├── rnd/                      # R&D 이미지
│   └── posts/                    # 첨부파일
├── fonts/                        # 폰트
│   └── SUIT-Variable.woff2
├── proxy.ts                      # next-intl 미들웨어
├── next.config.ts                # Next.js 설정
├── tsconfig.json                 # TypeScript 설정
├── postcss.config.mjs            # PostCSS 설정
└── package.json                  # 의존성
```

---

## 페이지별 구조

### 1. 홈페이지 (`/`)
- **파일**: `app/[locale]/page.tsx`
- **특징**:
  - 비디오 배경 (`background.mp4`)
  - 전체 화면 2섹션 (snap scroll)
  - 회사명과 간단한 소개

### 2. People (`/people`)
- **파일**: `app/[locale]/people/page.tsx`, `view.tsx`
- **데이터**: `translations/ko.json`의 `cofounder` 배열
- **특징**:
  - Founders 섹션 (4명)
  - Core Developers 섹션
  - 프로필 사진 + Blur placeholder
  - 반응형: 모바일 가로 스크롤, 데스크탑 그리드

### 3. History (`/history`)
- **파일**: `app/[locale]/history/page.tsx`, `view.tsx`
- **데이터**: `translations/ko.json`의 `history` 객체
- **특징**:
  - 세로 타임라인 시각화
  - 순차적 애니메이션

### 4. R&D (`/rnd`)
- **파일**: `app/[locale]/rnd/page.tsx`, `view.tsx`, `content.tsx`
- **데이터**: `translations/ko.json`의 `technology` 배열
- **특징**:
  - 5개 기술 분야
  - 전체 화면 snap scroll
  - 좌측 네비게이터
  - 이미지/YouTube 비디오 컨텐츠
  - 라이트박스 기능

### 5. Contact (`/contact`)
- **파일**: `app/[locale]/contact/page.tsx`, `view.tsx`
- **데이터**: `translations/ko.json`의 `contact` 객체
- **특징**:
  - 회사 주소, 전화번호
  - 캠퍼스 이미지
  - Kakao Map 임베드

### 6. Careers (`/careers`, `/careers/[postId]`)
- **파일**: `app/[locale]/careers/page.tsx`, `view.tsx`, `[postId]/`
- **데이터**: `posts/*.md` 마크다운 파일
- **특징**:
  - 채용공고 목록 테이블
  - 마크다운 렌더링
  - 첨부파일 다운로드

---

## 컴포넌트 상세

### Header.tsx
```tsx
// 데스크탑 상단 네비게이션
// xl 이상에서만 표시
// 로고 + 5개 메뉴 (People, History, R&D, Careers, Contact)
```

### Menu.tsx
```tsx
// 모바일 햄버거 메뉴
// styled-components로 애니메이션
// AnimatePresence로 부드러운 진입/퇴장
```

### Background.tsx
```tsx
// 세 가지 배경 컴포넌트:
// 1. Background - 그리드 패턴
// 2. AuroraBackground - 그라데이션 애니메이션
// 3. VideoBackground - 비디오 배경 (홈페이지)
```

### AnimateOnScroll.tsx
```tsx
// 스크롤 시 요소 애니메이션
// IntersectionObserver 기반
// Props: once, amount, custom
```

### Title.tsx
```tsx
// Title - 메인 제목 (그라데이션)
// Subtitle - 서브 제목
// AnimateOnScroll 포함
```

### FacePicture.tsx
```tsx
// 프로필 사진 컴포넌트
// Next.js Image + Blur placeholder
// 비율 5:6 유지
```

---

## 커스텀 훅

### useKakaoLoader
```typescript
// Kakao Maps API 로드
// 환경변수: NEXT_PUBLIC_KAKAOJSKEY
import { useKakaoLoader } from '@/hooks/useKakaoLoader';
const { loading, error } = useKakaoLoader();
```

### useLightbox
```typescript
// 라이트박스 상태 관리
import { useLightbox } from '@/hooks/useLightbox';
const { index, isOpen, openLightbox, closeLightbox } = useLightbox();
```

### useListRef
```typescript
// 배열 형태 Ref 관리
import { useListRef } from '@/hooks/useListRef';
const [refs, getRef] = useListRef<HTMLDivElement>();
```

---

## 유틸리티 함수

### lib/image.ts
```typescript
// Blur placeholder 생성 (서버 전용)
import { getLocalBlurData } from '@/lib/image';
const { base64, img } = await getLocalBlurData('/people/photo.webp');
```

### lib/post.ts
```typescript
// 마크다운 포스트 파싱
import { getPosts, getPostData } from '@/lib/post';
const posts = getPosts();                    // 모든 포스트
const post = getPostData('2026-recruitment'); // 특정 포스트
```

### lib/path.ts
```typescript
// 경로 정규화
import { normalizePath } from '@/lib/path';
const path = normalizePath('///image.png'); // '/image.png'
```

---

## 데이터 구조

### translations/ko.json

```json
{
  "metadata": {
    "title": "디지털트윈웨이브",
    "description": "..."
  },
  "home": {
    "title": "디지털트윈웨이브",
    "description": "..."
  },
  "contact": {
    "title": "Contact Us",
    "address": "...",
    "phone": "..."
  },
  "technology": [
    {
      "index": 0,
      "developer": "김동민",
      "field": "3차원 모델 재구성",
      "description": "...",
      "image": "/rnd/gaussian.webp",
      "reference": "..."
    }
    // ... 5개 기술
  ],
  "cofounder": [
    {
      "index": 0,
      "name": "홍길동",
      "image": "/people/photo.webp",
      "role": "CEO",
      "major": "...",
      "description": "..."
    }
    // ... 팀원들
  ],
  "history": {
    "title": "History",
    "timeline": [
      { "date": "2024.10", "title": "설립", "description": "..." }
      // ... 타임라인 항목
    ]
  },
  "career": {
    "title": "Careers",
    "table": { "date": "작성일", "title": "제목", "file": "첨부" }
  }
}
```

### posts/*.md (Front Matter)

```markdown
---
title: "2026년 채용 공고"
date: "2025-11-15"
file: "/posts/recruitment.pdf"
---

마크다운 본문...
```

---

## 타입 정의 (lib/type.d.ts)

```typescript
interface CofounderItem {
  index: number;
  name: string;
  image: string;
  role: string;
  major: string;
  description: string;
}

interface TechnologyItem {
  index: number;
  developer: string;
  field: string;
  description: string;
  image?: string;
  video?: string;
  reference?: string;
}

interface TimelineItem {
  date: string;
  title: string;
  description: string;
}
```

---

## 환경 변수

| 변수명 | 용도 |
|--------|------|
| `NEXT_PUBLIC_KAKAOJSKEY` | Kakao Maps JavaScript API 키 |

---

## 스크립트

```bash
# 개발 서버 실행
yarn dev

# 프로덕션 빌드
yarn build

# 프로덕션 서버 시작
yarn start

# ESLint 실행
yarn lint
```

---

## 스타일링 가이드

### CSS 변수 (globals.css)
```css
--background: #ffffff;           /* 배경색 */
--foreground: #171717;           /* 전경색 */
--brand: rgb(33, 95, 219);       /* 브랜드 색상 (파란색) */
```

### 주요 Tailwind 클래스
- `hide-scrollbar`: 스크롤바 숨김
- `draggable`: 텍스트 선택 허용 (기본은 불가)
- 반응형: `xl:` (1280px 이상)

### Motion Variants (Variants.ts)
```typescript
containerVariants  // 컨테이너 staggerChildren
itemVariants       // 아이템 fade + slide up
```

---

## 다국어 설정

### 현재 지원 언어
- `ko` (한국어) - 기본

### 확장 방법
1. `i18n/locales.ts`에 언어 추가
2. `translations/{locale}.json` 파일 생성
3. URL: `/{locale}/path` (기본 언어는 생략)

---

## 성능 최적화

- **SSG (Static Site Generation)**: 모든 페이지 정적 생성
- **이미지 최적화**: Next.js Image + AVIF/WebP
- **Blur Placeholder**: plaiceholder로 LQIP
- **코드 스플리팅**: 자동 (Next.js)
- **폰트 최적화**: 변수 폰트 (SUIT-Variable)

---

## 배포 정보

- **도메인**: `https://digitaltwinwave.com/`
- **메타데이터**: OpenGraph, Twitter Card 설정
- **SEO**: robots.txt, sitemap.xml 자동 생성

---

## 작업 시 참고사항

### 새 페이지 추가
1. `app/[locale]/` 아래에 폴더 생성
2. `page.tsx` (서버 컴포넌트) 생성
3. `view.tsx` (클라이언트 컴포넌트) 필요시 분리
4. `translations/ko.json`에 데이터 추가

### 새 팀원 추가
1. `public/people/`에 사진 추가 (WebP 권장)
2. `translations/ko.json`의 `cofounder` 배열에 추가

### 새 기술 추가
1. `public/rnd/`에 이미지/비디오 추가
2. `translations/ko.json`의 `technology` 배열에 추가

### 채용공고 추가
1. `posts/`에 마크다운 파일 생성
2. Front matter에 title, date, file(선택) 설정
3. `public/posts/`에 첨부파일 추가 (선택)

---

## 문서 버전

- **작성일**: 2026-01-26
- **프로젝트 버전**: 0.1.0
