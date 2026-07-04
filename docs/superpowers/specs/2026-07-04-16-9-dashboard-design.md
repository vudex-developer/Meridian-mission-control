# 16:9 Dashboard Design

## Goal

Make the dashboard route (`/`) read as a single 16:9 mission board so the main operating metrics are visible at once on desktop screens.

## Scope

- Optimize the dashboard page first.
- Keep the existing navigation, persona switch, command palette, and data model.
- Avoid changing list-heavy secondary pages into fixed boards.

## Layout

- The dashboard page fills the available app viewport height.
- The dashboard uses full width instead of the previous centered `1280px` column.
- Content is organized into a compact top band, a primary middle grid, and a bottom/right decision rail.
- Cards use smaller padding, tighter gaps, and stable fixed heights so the page does not rely on vertical scrolling at common 16:9 desktop sizes.

## Verification

- Add a source-level layout check that asserts the dashboard has a fixed board container and no old centered-scroll wrapper.
- Run `npm run test:layout`.
- Run `npm run build`.
- Inspect the running app at `http://172.30.1.45:3000`.
