# Device Layout Previews Design

## Goal

Meridian Mission Control should support three presentation targets from one Next.js codebase:

- Galaxy Flip style mobile layout
- Apple iPhone style mobile layout
- PC desktop layout

The production app should automatically adapt by viewport size. The app should also expose dedicated preview routes that make it easy to capture or review each target at high resolution while preserving the intended aspect ratio.

## Scope

Phase 1 covers the Dashboard route only. It establishes the layout system, preview frame system, and responsive conventions. Other routes keep their current responsive behavior until later phases.

Preview routes:

- `/preview/flip`
- `/preview/iphone`
- `/preview/desktop`

Production route:

- `/`

## Target Frames

The preview routes use fixed design frames that preserve device proportions and target at least 2x capture quality.

| Target | Preview Frame | Intent |
| --- | ---: | --- |
| Galaxy Flip | `1080 x 2640` | Tall unfolded Flip-style mobile capture |
| iPhone | `1290 x 2796` | High-density iPhone Pro-style mobile capture |
| PC | `2880 x 1620` | 16:9 desktop capture matching the mission-control board concept |

Preview frames are for design QA and export. The live app remains fluid and should not force these exact pixel sizes on real devices.

## Layout Strategy

Use one shared data model and shared card primitives. Split only the page composition:

- `DashboardDesktop`: retains the current 16:9 board layout, side rail, dense KPI grid, pipeline, priorities, alerts, and meetings.
- `DashboardPhone`: uses a single-column mobile feed with larger touch targets, concise KPI cards, priority actions first, and revenue/meeting sections below.
- `DashboardFlip`: uses a more compressed single-column flow optimized for tall narrow screens, emphasizing morning brief, top action, execution score, and the next two revenue-critical items.

The production Dashboard chooses between these compositions with CSS breakpoints rather than user-agent detection. The preview routes render the same compositions inside fixed frames.

## Breakpoint Behavior

Production viewport behavior:

- Narrow mobile: Flip-oriented density for very narrow screens.
- Standard mobile: iPhone-oriented density.
- Tablet and desktop: current desktop layout when width is sufficient.

The implementation should avoid brittle device detection. Width, height, and available layout space determine the layout.

## Preview Route Behavior

Each preview route should render a neutral preview shell with:

- The target frame dimensions encoded in metadata/config.
- A scaled viewport frame that fits inside the browser window for review.
- A link or label showing the exact target size.
- The relevant Dashboard composition rendered inside the frame.

The preview shell is not part of the production experience and should not alter global navigation behavior on the real Dashboard.

## Visual Priorities

Mobile layouts should not simply shrink the desktop board. They should reorder the same operational content around mobile decision-making:

1. Morning brief
2. Highest-priority AI COO action
3. Execution score and compact KPIs
4. Revenue opportunity
5. Meetings and alerts
6. Secondary portfolio/pipeline details

PC keeps the current mission-control composition and 16:9 density.

## Data Flow

Dashboard data should remain centralized in existing seed/context structures. Layout components receive already-derived dashboard sections through props or local helpers. Avoid duplicating business data inside each device component.

## Testing And Verification

Required checks:

- Existing `npm run test:layout` must keep passing for the desktop dashboard.
- Add preview layout checks for the three frame sizes.
- Verify live `/` at representative viewport sizes:
  - Flip: `360 x 880` or equivalent tall narrow mobile viewport
  - iPhone: `430 x 932`
  - Desktop: `1440 x 810`
- Verify preview routes expose frames matching:
  - `1080 x 2640`
  - `1290 x 2796`
  - `2880 x 1620`

## Non-Goals

- No user-agent sniffing.
- No separate deployments for each device.
- No full redesign of every secondary page in Phase 1.
- No image export pipeline in Phase 1; browser screenshots are enough.

## Open Risks

The current local Node 24 environment has shown unreliable behavior with local `next build`. Vercel production build passes with the committed Node 22 engine setting. Implementation verification should rely on Vercel build output or a local Node 22 shell.
