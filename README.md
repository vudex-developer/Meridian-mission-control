# Meridian Mission Control

**AI Venture Operating System — From Meetings to Revenue.**

파운더 2인(Jeff · Luke)이 여러 벤처·컨설팅 프로젝트를 "매출 관점"으로 운영하도록 돕는 AI COO 기반 미션 컨트롤 대시보드. 비주얼 컨셉 프로토타입(`../Meridian Mission Control.dc.html`)을 실제 동작하는 웹 앱으로 구현한 것입니다.

## 기술 스택

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (디자인 토큰은 `src/app/globals.css`의 `@theme`)
- **Geist / Geist Mono** 폰트 (`next/font`)
- 차트는 외부 라이브러리 없이 인라인 SVG로 구현 (`src/components/ui/charts.tsx`)

## 실행

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
```

## 화면 (10 + 상세)

| 라우트 | 화면 |
|---|---|
| `/` | Dashboard (Mission Control) |
| `/portfolio` | Portfolio (2개 벤처) |
| `/projects` | Projects (Board / Schedule / Table) |
| `/projects/[id]` | Project Detail (레이더·타임라인·리스크) |
| `/meetings` | Meetings (요약·액션 아이템) |
| `/revenue` | Revenue Engine (퍼널·KPI·월별 매출) |
| `/documents` | Documents |
| `/timeline` | Timeline (주간·마일스톤) |
| `/graph` | Knowledge Graph |
| `/coo` | AI COO (랭킹 추천·코칭·의사결정 로그) |
| `/settings` | Settings |

## 핵심 기능

- **페르소나 전환** — 사이드바 하단 프로필 클릭으로 Luke ↔ Jeff 전환. Dashboard/AI COO의 우선순위·추천·실행점수가 관점별로 바뀜 (localStorage 저장).
- **커맨드 팔레트** — `⌘K` / `Ctrl+K`로 열기, `ESC`로 닫기.
- **AI COO 랭킹** — 매출 임팩트 순 추천(근거·CTA·기대매출·확신도).

## 폴더 구조

```
src/
  app/            # 각 화면 (App Router 페이지)
  components/
    layout/       # Sidebar, Topbar, CommandPalette, MobileNav, AppShell
    ui/           # Icon, Card, charts (Sparkline/Donut/Gauge/Bars ...)
  data/seed.ts    # 시드 데이터 (9 프로젝트 / 2 벤처 / KPI / 추천 ...)
  lib/            # types, tokens, nav, stage, app-context (persona/⌘K)
```

## 다음 단계 (기획안 Phase 2+)

- 시드 데이터 → DB 스키마 이전 (Postgres/Supabase), CRUD
- AI COO 랭킹을 룰 + LLM(서버 사이드)으로 실제화
- 파운더 인증 / 워크스페이스 / 실시간 업데이트
