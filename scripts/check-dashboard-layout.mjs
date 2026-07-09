import { readFileSync } from "node:fs";

const page = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const desktop = readFileSync(new URL("../src/app/dashboard/DashboardDesktop.tsx", import.meta.url), "utf8");
const mobile = readFileSync(new URL("../src/app/dashboard/DashboardMobile.tsx", import.meta.url), "utf8");
const responsive = readFileSync(new URL("../src/app/dashboard/ResponsiveDashboard.tsx", import.meta.url), "utf8");
const previewConfig = readFileSync(new URL("../src/app/preview/preview-config.ts", import.meta.url), "utf8");
const previewShell = readFileSync(new URL("../src/app/preview/PreviewShell.tsx", import.meta.url), "utf8");
const flipPreview = readFileSync(new URL("../src/app/preview/flip/page.tsx", import.meta.url), "utf8");
const iphonePreview = readFileSync(new URL("../src/app/preview/iphone/page.tsx", import.meta.url), "utf8");
const desktopPreview = readFileSync(new URL("../src/app/preview/desktop/page.tsx", import.meta.url), "utf8");
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

for (const [name, source, component] of [
  ["flip", flipPreview, "DashboardFlip"],
  ["iphone", iphonePreview, "DashboardPhone"],
  ["desktop", desktopPreview, "DashboardDesktop"],
]) {
  if (!source.includes(component)) {
    failures.push(`${name} preview route is missing ${component}.`);
  }
  if (!source.includes(`previewFrames.${name}`)) {
    failures.push(`${name} preview route is missing previewFrames.${name}.`);
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
