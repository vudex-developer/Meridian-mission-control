# Device Layout Previews Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build three Dashboard presentation targets: Galaxy Flip, iPhone, and PC, with production responsive behavior plus fixed high-resolution preview routes.

**Architecture:** Keep one Next.js app and one shared Dashboard data model. Extract the current desktop Dashboard into a desktop composition, add two mobile compositions, and render them through either responsive production CSS or a fixed preview frame shell.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, existing inline SVG chart primitives, Vercel.

## Global Constraints

- Phase 1 covers the Dashboard route only.
- Production route remains `/`.
- Preview routes are `/preview/flip`, `/preview/iphone`, and `/preview/desktop`.
- Preview frame sizes are exactly `1080 x 2640`, `1290 x 2796`, and `2880 x 1620`.
- No user-agent sniffing.
- No separate deployments for each device.
- Existing `npm run test:layout` must keep passing for the desktop dashboard.
- Local Node 24 may hang on `next build`; verify production build through Vercel or local Node 22.

---

## File Structure

- Create `src/app/dashboard/dashboard-data.ts`: derives the Dashboard view model currently assembled inside `src/app/page.tsx`.
- Create `src/app/dashboard/DashboardDesktop.tsx`: contains the current PC 16:9 Dashboard composition, moved from `src/app/page.tsx`.
- Create `src/app/dashboard/DashboardMobile.tsx`: exports `DashboardPhone` and `DashboardFlip` mobile compositions.
- Create `src/app/dashboard/ResponsiveDashboard.tsx`: chooses Flip, Phone, or Desktop with CSS breakpoint visibility, not user-agent detection.
- Create `src/app/preview/preview-config.ts`: stores frame dimensions and target metadata.
- Create `src/app/preview/PreviewShell.tsx`: reusable scaled frame wrapper for preview routes.
- Create `src/app/preview/flip/page.tsx`: renders Flip preview.
- Create `src/app/preview/iphone/page.tsx`: renders iPhone preview.
- Create `src/app/preview/desktop/page.tsx`: renders PC preview.
- Modify `src/app/page.tsx`: becomes a thin wrapper around `ResponsiveDashboard`.
- Modify `src/app/globals.css`: adds preview frame utilities and mobile Dashboard density classes.
- Modify `scripts/check-dashboard-layout.mjs`: keeps desktop assertions and adds preview route/file assertions.
- Keep `package.json` unchanged unless the implementation discovers the existing `test:layout` script is missing.

---

### Task 1: Extract Dashboard Data And Preserve Desktop Composition

**Files:**
- Create: `src/app/dashboard/dashboard-data.ts`
- Create: `src/app/dashboard/DashboardDesktop.tsx`
- Create: `src/app/dashboard/ResponsiveDashboard.tsx`
- Modify: `src/app/page.tsx`
- Test: `scripts/check-dashboard-layout.mjs`

**Interfaces:**
- Produces: `type DashboardViewModel`
- Produces: `function useDashboardViewModel(): DashboardViewModel`
- Produces: `function DashboardDesktop({ model }: { model: DashboardViewModel }): JSX.Element`
- Produces: `function ResponsiveDashboard(): JSX.Element`
- Consumes: existing `useApp`, `projects`, `projectById`, `kpis`, `revTrend`, `revTrendMonths`, `pipelineDonut`, `topRevenue`, `recentActivity`, `recommendations`, `ventures`, `alerts`, and `agenda`.

- [ ] **Step 1: Create the Dashboard view-model helper**

Create `src/app/dashboard/dashboard-data.ts` with this structure:

```tsx
"use client";

import { useApp } from "@/lib/app-context";
import {
  projects,
  projectById,
  kpis,
  revTrend,
  revTrendMonths,
  pipelineDonut,
  topRevenue,
  recentActivity,
  recommendations,
  ventures,
  alerts,
  agenda,
} from "@/data/seed";

export type DashboardBrief = {
  decision: string;
  why: string;
  action: string;
  impact: string;
};

export type DashboardViewModel = {
  persona: "luke" | "jeff";
  isLuke: boolean;
  founder: ReturnType<typeof useApp>["founder"];
  priorities: typeof recommendations.luke;
  visibleProjects: typeof projects;
  compactActivity: typeof recentActivity;
  brief: DashboardBrief;
  projects: typeof projects;
  projectById: typeof projectById;
  kpis: typeof kpis;
  revTrend: typeof revTrend;
  revTrendMonths: typeof revTrendMonths;
  pipelineDonut: typeof pipelineDonut;
  topRevenue: typeof topRevenue;
  ventures: typeof ventures;
  alerts: typeof alerts;
  agenda: typeof agenda;
};

export function useDashboardViewModel(): DashboardViewModel {
  const { persona, founder } = useApp();
  const isLuke = persona === "luke";
  const priorities = recommendations[persona];
  const visibleProjects = projects.slice(0, 7);
  const compactActivity = recentActivity.slice(0, 3);
  const brief = isLuke
    ? {
        decision: "Today is a conversion-cleanup day, not a new-project day.",
        why: "삼산병원 has been parked in Free Consulting for 21 days and Berkeley Aden is 13 days overdue. Together they represent ₩75M of near-term pipeline that can still move this week.",
        action: "Send the Paid Diagnosis proposal first, then lock a Berkeley Aden follow-up owner before lunch.",
        impact: "₩75M pipeline at risk",
      }
    : {
        decision: "Today is an investment-decision day, with VS PharmTech as the highest-conviction memo.",
        why: "The round timing is closing while Berkeley Aden still needs an MOU call. Delaying either decision weakens the Senior Residence track and the ₩45M unlock.",
        action: "Finish the VS PharmTech memo, then decide whether Berkeley Aden advances to MOU terms this week.",
        impact: "₩45M unlock decision",
      };

  return {
    persona,
    isLuke,
    founder,
    priorities,
    visibleProjects,
    compactActivity,
    brief,
    projects,
    projectById,
    kpis,
    revTrend,
    revTrendMonths,
    pipelineDonut,
    topRevenue,
    ventures,
    alerts,
    agenda,
  };
}
```

- [ ] **Step 2: Move the current desktop JSX into `DashboardDesktop`**

Create `src/app/dashboard/DashboardDesktop.tsx`. Move the current returned JSX from `src/app/page.tsx` into this component and replace local variables with `model` fields.

The file must start with:

```tsx
"use client";

import Link from "next/link";
import type { DashboardViewModel } from "./dashboard-data";
import { Card, SectionHeader, ProgressBar, Dot } from "@/components/ui/primitives";
import { Sparkline, AreaChart, Donut, RingGauge } from "@/components/ui/charts";
import { Icon } from "@/components/ui/Icon";
import { toneColor, toneDim, riskMap, ventureColor } from "@/lib/tokens";
import { stagePips } from "@/lib/stage";

export function DashboardDesktop({ model }: { model: DashboardViewModel }) {
  const {
    founder,
    isLuke,
    priorities,
    visibleProjects,
    compactActivity,
    brief,
    projects,
    projectById,
    kpis,
    revTrend,
    revTrendMonths,
    pipelineDonut,
    topRevenue,
    ventures,
    alerts,
    agenda,
  } = model;

  return (
    <div className="dashboard-169-board h-full overflow-hidden p-3 xl:p-4">
      {/* Replace this comment with the current desktop Dashboard JSX from src/app/page.tsx before committing Task 1. Do not leave this comment in the final file. */}
    </div>
  );
}
```

When moving the JSX, preserve these exact strings:

```txt
dashboard-169-board
grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]
morning-brief-depth
Decision
Why now
Today's action
```

- [ ] **Step 3: Create the responsive wrapper**

Create `src/app/dashboard/ResponsiveDashboard.tsx`:

```tsx
"use client";

import { useDashboardViewModel } from "./dashboard-data";
import { DashboardDesktop } from "./DashboardDesktop";

export function ResponsiveDashboard() {
  const model = useDashboardViewModel();

  return <DashboardDesktop model={model} />;
}
```

- [ ] **Step 4: Replace `src/app/page.tsx` with a thin entrypoint**

Replace the file with:

```tsx
import { ResponsiveDashboard } from "./dashboard/ResponsiveDashboard";

export default function DashboardPage() {
  return <ResponsiveDashboard />;
}
```

- [ ] **Step 5: Run the desktop layout check**

Run:

```bash
npm run test:layout
```

Expected:

```txt
Dashboard layout check passed.
```

- [ ] **Step 6: Commit Task 1**

Run:

```bash
git add src/app/page.tsx src/app/dashboard/dashboard-data.ts src/app/dashboard/DashboardDesktop.tsx src/app/dashboard/ResponsiveDashboard.tsx scripts/check-dashboard-layout.mjs
git commit -m "Refactor dashboard desktop composition"
```

---

### Task 2: Add Flip And iPhone Dashboard Compositions

**Files:**
- Create: `src/app/dashboard/DashboardMobile.tsx`
- Modify: `src/app/dashboard/ResponsiveDashboard.tsx`
- Modify: `src/app/globals.css`
- Test: `scripts/check-dashboard-layout.mjs`

**Interfaces:**
- Consumes: `DashboardViewModel` from `src/app/dashboard/dashboard-data.ts`
- Produces: `function DashboardPhone({ model }: { model: DashboardViewModel }): JSX.Element`
- Produces: `function DashboardFlip({ model }: { model: DashboardViewModel }): JSX.Element`

- [ ] **Step 1: Create mobile composition components**

Create `src/app/dashboard/DashboardMobile.tsx`:

```tsx
"use client";

import Link from "next/link";
import type { DashboardViewModel } from "./dashboard-data";
import { Card, ProgressBar } from "@/components/ui/primitives";
import { RingGauge, Sparkline } from "@/components/ui/charts";
import { Icon } from "@/components/ui/Icon";
import { toneColor, toneDim } from "@/lib/tokens";

function MobileKpis({ model, compact }: { model: DashboardViewModel; compact: boolean }) {
  const items = compact ? model.kpis.slice(0, 2) : model.kpis;
  return (
    <div className={compact ? "grid grid-cols-2 gap-2" : "grid grid-cols-2 gap-3"}>
      {items.map((k) => (
        <Card key={k.label} radius={12} className={compact ? "p-3" : "p-4"}>
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-[10.5px] font-medium text-text2">{k.label}</span>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px]" style={{ background: toneDim[k.tone], color: toneColor[k.tone] }}>
              <Icon path={k.icon} size={13} />
            </span>
          </div>
          <div className={compact ? "mt-1 font-mono text-[18px] font-semibold" : "mt-2 font-mono text-[21px] font-semibold"}>{k.value}</div>
          {!compact ? <Sparkline data={k.trend} color={toneColor[k.tone]} /> : null}
          <div className="mt-1 flex items-center gap-1 text-[10px]" style={{ color: toneColor[k.tone] }}>
            <span className="font-semibold">{k.delta}</span>
            <span className="truncate text-text3">{k.sub}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

function TopPriority({ model, compact }: { model: DashboardViewModel; compact: boolean }) {
  const priority = model.priorities[0];
  const project = model.projectById(priority.projectId);
  return (
    <Link href={`/projects/${priority.projectId}`} className="block rounded-[14px] border border-border bg-bg2 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-accent2">Top AI COO Action</div>
          <div className="mt-1 text-[17px] font-bold leading-[1.15]">{priority.title}</div>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-accent font-mono text-[14px] font-semibold text-white">{priority.rank}</div>
      </div>
      <div className={compact ? "line-clamp-2 text-[12px] leading-[1.4] text-text2" : "text-[13px] leading-[1.45] text-text2"}>{priority.action}</div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="rounded-full px-[8px] py-[3px] text-[10.5px] font-semibold" style={{ background: toneDim[priority.tone], color: toneColor[priority.tone] }}>{priority.tag}</span>
        <span className="font-mono text-[12px] font-semibold text-green">{project?.potential}</span>
      </div>
    </Link>
  );
}

function RevenueOpportunity() {
  return (
    <section className="rounded-[14px] border p-4" style={{ borderColor: "rgba(52,211,153,0.28)", background: "linear-gradient(150deg, rgba(52,211,153,0.13), rgba(52,211,153,0.02))" }}>
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-green">Revenue Opportunity</div>
      <div className="mb-1 text-[14px] font-semibold">삼산병원 · Paid Diagnosis</div>
      <div className="text-[12px] leading-[1.45] text-text2">Send the proposal within 48 hours before the window closes.</div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-mono text-[24px] font-semibold text-green">₩30M</span>
        <span className="text-[10px] text-text3">est. contract</span>
      </div>
    </section>
  );
}

export function DashboardPhone({ model }: { model: DashboardViewModel }) {
  return (
    <div className="dashboard-phone-feed min-h-full px-4 pb-6 pt-4">
      <section className="rounded-[16px] border border-border bg-surface p-4">
        <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-accent2">Morning Brief</div>
        <h1 className="mt-2 text-[24px] font-bold leading-[1.12]">Good morning, {model.founder.name}.</h1>
        <p className="mt-3 text-[13px] leading-[1.5] text-text2">{model.brief.why}</p>
        <div className="mt-3 rounded-[12px] border border-border bg-bg2 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-green">Today's action</div>
          <div className="mt-1 text-[13px] font-semibold leading-[1.4]">{model.brief.action}</div>
        </div>
      </section>
      <TopPriority model={model} compact={false} />
      <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-3">
        <Card radius={14} className="flex items-center justify-center p-2">
          <RingGauge value={model.founder.execScore} />
        </Card>
        <MobileKpis model={model} compact={true} />
      </div>
      <RevenueOpportunity />
      <MobileKpis model={model} compact={false} />
    </div>
  );
}

export function DashboardFlip({ model }: { model: DashboardViewModel }) {
  return (
    <div className="dashboard-flip-feed min-h-full px-3 pb-5 pt-3">
      <section className="rounded-[15px] border border-border bg-surface p-3">
        <div className="text-[9.5px] font-semibold uppercase tracking-[0.08em] text-accent2">Morning Brief</div>
        <h1 className="mt-2 text-[21px] font-bold leading-[1.12]">Good morning, {model.founder.name}.</h1>
        <p className="mt-2 line-clamp-3 text-[12px] leading-[1.45] text-text2">{model.brief.why}</p>
      </section>
      <TopPriority model={model} compact={true} />
      <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-2">
        <Card radius={13} className="flex items-center justify-center p-1">
          <div className="scale-[0.78]"><RingGauge value={model.founder.execScore} /></div>
        </Card>
        <MobileKpis model={model} compact={true} />
      </div>
      <RevenueOpportunity />
      <section className="rounded-[13px] border border-border bg-surface p-3">
        <div className="mb-2 text-[12px] font-bold">Next Meetings</div>
        <div className="flex flex-col">
          {model.agenda.slice(0, 2).map((m) => (
            <Link key={`${m.time}-${m.title}`} href="/meetings" className="grid grid-cols-[42px_minmax(0,1fr)] gap-2 border-b border-border py-2 last:border-0">
              <div className="font-mono text-[10.5px] font-semibold text-accent2">{m.time}</div>
              <div className="min-w-0">
                <div className="truncate text-[11.5px] font-semibold">{m.title}</div>
                <div className="truncate text-[9.5px] text-text3">{m.attendees}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Update `ResponsiveDashboard` to render three compositions by breakpoint**

Replace `src/app/dashboard/ResponsiveDashboard.tsx` with:

```tsx
"use client";

import { useDashboardViewModel } from "./dashboard-data";
import { DashboardDesktop } from "./DashboardDesktop";
import { DashboardFlip, DashboardPhone } from "./DashboardMobile";

export function ResponsiveDashboard() {
  const model = useDashboardViewModel();

  return (
    <>
      <div className="block min-[390px]:hidden md:hidden">
        <DashboardFlip model={model} />
      </div>
      <div className="hidden min-[390px]:block md:hidden">
        <DashboardPhone model={model} />
      </div>
      <div className="hidden h-full md:block">
        <DashboardDesktop model={model} />
      </div>
    </>
  );
}
```

- [ ] **Step 3: Add mobile feed spacing utilities**

Append to `src/app/globals.css`:

```css
.dashboard-phone-feed,
.dashboard-flip-feed {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dashboard-phone-feed {
  background:
    radial-gradient(620px 320px at 70% -8%, rgba(76, 130, 251, 0.12), transparent 60%),
    var(--color-bg);
}

.dashboard-flip-feed {
  background:
    radial-gradient(520px 280px at 72% -6%, rgba(76, 130, 251, 0.11), transparent 60%),
    var(--color-bg);
}
```

- [ ] **Step 4: Run layout check**

Run:

```bash
npm run test:layout
```

Expected:

```txt
Dashboard layout check passed.
```

- [ ] **Step 5: Commit Task 2**

Run:

```bash
git add src/app/dashboard/DashboardMobile.tsx src/app/dashboard/ResponsiveDashboard.tsx src/app/globals.css
git commit -m "Add mobile dashboard layouts"
```

---

### Task 3: Add Fixed Preview Routes

**Files:**
- Create: `src/app/preview/preview-config.ts`
- Create: `src/app/preview/PreviewShell.tsx`
- Create: `src/app/preview/flip/page.tsx`
- Create: `src/app/preview/iphone/page.tsx`
- Create: `src/app/preview/desktop/page.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: `type PreviewTarget = "flip" | "iphone" | "desktop"`
- Produces: `const previewFrames: Record<PreviewTarget, PreviewFrame>`
- Produces: `function PreviewShell(props: PreviewShellProps): JSX.Element`
- Consumes: `DashboardFlip`, `DashboardPhone`, `DashboardDesktop`, and `useDashboardViewModel`

- [ ] **Step 1: Create preview frame config**

Create `src/app/preview/preview-config.ts`:

```ts
export type PreviewTarget = "flip" | "iphone" | "desktop";

export type PreviewFrame = {
  target: PreviewTarget;
  label: string;
  width: number;
  height: number;
  scaleBaseWidth: number;
};

export const previewFrames: Record<PreviewTarget, PreviewFrame> = {
  flip: {
    target: "flip",
    label: "Galaxy Flip",
    width: 1080,
    height: 2640,
    scaleBaseWidth: 360,
  },
  iphone: {
    target: "iphone",
    label: "Apple iPhone",
    width: 1290,
    height: 2796,
    scaleBaseWidth: 430,
  },
  desktop: {
    target: "desktop",
    label: "PC Desktop",
    width: 2880,
    height: 1620,
    scaleBaseWidth: 1440,
  },
};
```

- [ ] **Step 2: Create preview shell**

Create `src/app/preview/PreviewShell.tsx`:

```tsx
import type { ReactNode } from "react";
import type { PreviewFrame } from "./preview-config";

type PreviewShellProps = {
  frame: PreviewFrame;
  children: ReactNode;
};

export function PreviewShell({ frame, children }: PreviewShellProps) {
  const scale = frame.scaleBaseWidth / frame.width;
  return (
    <main className="preview-stage">
      <header className="preview-toolbar">
        <div>
          <div className="preview-title">{frame.label}</div>
          <div className="preview-meta">
            {frame.width} x {frame.height}
          </div>
        </div>
        <a href="/" className="preview-link">Live dashboard</a>
      </header>
      <section className="preview-scroll">
        <div
          className="preview-frame"
          data-preview-target={frame.target}
          data-preview-width={frame.width}
          data-preview-height={frame.height}
          style={{
            width: frame.width,
            height: frame.height,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            marginBottom: frame.height * (scale - 1),
          }}
        >
          {children}
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 3: Add preview CSS**

Append to `src/app/globals.css`:

```css
.preview-stage {
  min-height: 100vh;
  background: #05070c;
  color: var(--color-text);
  padding: 18px;
}

.preview-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 0 auto 16px;
  max-width: 1480px;
}

.preview-title {
  font-size: 14px;
  font-weight: 700;
}

.preview-meta {
  margin-top: 2px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text3);
}

.preview-link {
  border: 1px solid var(--color-border2);
  border-radius: 8px;
  padding: 8px 11px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-accent2);
}

.preview-scroll {
  margin: 0 auto;
  max-width: 1480px;
  overflow: auto;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-bg);
}

.preview-frame {
  overflow: hidden;
  background: var(--color-bg);
}
```

- [ ] **Step 4: Create Flip preview route**

Create `src/app/preview/flip/page.tsx`:

```tsx
"use client";

import { DashboardFlip } from "@/app/dashboard/DashboardMobile";
import { useDashboardViewModel } from "@/app/dashboard/dashboard-data";
import { PreviewShell } from "../PreviewShell";
import { previewFrames } from "../preview-config";

export default function FlipPreviewPage() {
  const model = useDashboardViewModel();
  return (
    <PreviewShell frame={previewFrames.flip}>
      <DashboardFlip model={model} />
    </PreviewShell>
  );
}
```

- [ ] **Step 5: Create iPhone preview route**

Create `src/app/preview/iphone/page.tsx`:

```tsx
"use client";

import { DashboardPhone } from "@/app/dashboard/DashboardMobile";
import { useDashboardViewModel } from "@/app/dashboard/dashboard-data";
import { PreviewShell } from "../PreviewShell";
import { previewFrames } from "../preview-config";

export default function IPhonePreviewPage() {
  const model = useDashboardViewModel();
  return (
    <PreviewShell frame={previewFrames.iphone}>
      <DashboardPhone model={model} />
    </PreviewShell>
  );
}
```

- [ ] **Step 6: Create desktop preview route**

Create `src/app/preview/desktop/page.tsx`:

```tsx
"use client";

import { DashboardDesktop } from "@/app/dashboard/DashboardDesktop";
import { useDashboardViewModel } from "@/app/dashboard/dashboard-data";
import { PreviewShell } from "../PreviewShell";
import { previewFrames } from "../preview-config";

export default function DesktopPreviewPage() {
  const model = useDashboardViewModel();
  return (
    <PreviewShell frame={previewFrames.desktop}>
      <DashboardDesktop model={model} />
    </PreviewShell>
  );
}
```

- [ ] **Step 7: Commit Task 3**

Run:

```bash
git add src/app/preview src/app/globals.css
git commit -m "Add device preview routes"
```

---

### Task 4: Add Preview Layout Checks And Final Verification

**Files:**
- Modify: `scripts/check-dashboard-layout.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: source text in `src/app/preview/preview-config.ts`, preview route files, and Dashboard composition files.
- Produces: `npm run test:layout` validates desktop markers and preview frame markers.

- [ ] **Step 1: Extend layout check script**

Modify `scripts/check-dashboard-layout.mjs` so it reads the new files and checks required preview dimensions:

```js
import { readFileSync } from "node:fs";

const page = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const desktop = readFileSync(new URL("../src/app/dashboard/DashboardDesktop.tsx", import.meta.url), "utf8");
const mobile = readFileSync(new URL("../src/app/dashboard/DashboardMobile.tsx", import.meta.url), "utf8");
const responsive = readFileSync(new URL("../src/app/dashboard/ResponsiveDashboard.tsx", import.meta.url), "utf8");
const previewConfig = readFileSync(new URL("../src/app/preview/preview-config.ts", import.meta.url), "utf8");
const previewShell = readFileSync(new URL("../src/app/preview/PreviewShell.tsx", import.meta.url), "utf8");
const nextConfig = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
const failures = [];

if (!desktop.includes("dashboard-169-board")) {
  failures.push("Dashboard desktop composition is missing the dashboard-169-board marker.");
}

if (!desktop.includes("h-full") || !desktop.includes("overflow-hidden")) {
  failures.push("Dashboard desktop composition does not declare a fixed-height overflow-hidden board container.");
}

if (desktop.includes("max-w-[1280px]")) {
  failures.push("Dashboard desktop composition still uses the old centered max-width wrapper.");
}

if (!desktop.includes("grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]")) {
  failures.push("Dashboard desktop composition is missing the 16:9 desktop board grid.");
}

if (!desktop.includes("morning-brief-depth")) {
  failures.push("Morning Brief is missing the structured depth section.");
}

for (const label of ["Decision", "Why now", "Today's action"]) {
  if (!desktop.includes(label)) {
    failures.push(`Morning Brief is missing the ${label} cue.`);
  }
}

if (!page.includes("ResponsiveDashboard")) {
  failures.push("Dashboard page is not using ResponsiveDashboard.");
}

for (const marker of ["DashboardFlip", "DashboardPhone", "DashboardDesktop", "min-[390px]:hidden", "md:block"]) {
  if (!responsive.includes(marker)) {
    failures.push(`ResponsiveDashboard is missing ${marker}.`);
  }
}

for (const marker of ["dashboard-phone-feed", "dashboard-flip-feed", "Top AI COO Action", "Revenue Opportunity"]) {
  if (!mobile.includes(marker)) {
    failures.push(`Mobile dashboard composition is missing ${marker}.`);
  }
}

for (const required of ["1080", "2640", "1290", "2796", "2880", "1620"]) {
  if (!previewConfig.includes(required)) {
    failures.push(`Preview config is missing required frame value ${required}.`);
  }
}

for (const marker of ["data-preview-target", "data-preview-width", "data-preview-height", "preview-frame"]) {
  if (!previewShell.includes(marker)) {
    failures.push(`PreviewShell is missing ${marker}.`);
  }
}

if (!nextConfig.includes("allowedDevOrigins") || !nextConfig.includes("172.30.1.45")) {
  failures.push("Next dev config does not allow the chosen network URL origin.");
}

if (failures.length > 0) {
  console.error("Dashboard layout check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Dashboard layout check passed.");
```

- [ ] **Step 2: Keep package script stable**

Confirm `package.json` still contains:

```json
"test:layout": "node scripts/check-dashboard-layout.mjs"
```

Do not add a second test script unless the check grows beyond source marker validation.

- [ ] **Step 3: Run source layout check**

Run:

```bash
npm run test:layout
```

Expected:

```txt
Dashboard layout check passed.
```

- [ ] **Step 4: Run Vercel production build**

Run:

```bash
npx vercel --prod --scope lukenk-4293s-projects
```

Expected output includes:

```txt
✓ Compiled successfully
Finished TypeScript
✓ Generating static pages
Build Completed
ready
```

- [ ] **Step 5: Confirm live preview URLs respond**

Run:

```bash
curl -I https://meridianai-gamma.vercel.app/preview/flip
curl -I https://meridianai-gamma.vercel.app/preview/iphone
curl -I https://meridianai-gamma.vercel.app/preview/desktop
```

Expected for each:

```txt
HTTP/2 200
```

- [ ] **Step 6: Commit Task 4**

Run:

```bash
git add scripts/check-dashboard-layout.mjs package.json
git commit -m "Verify device layout previews"
```

- [ ] **Step 7: Push final branch**

Run:

```bash
git push origin main
```

Expected:

```txt
main -> main
```
