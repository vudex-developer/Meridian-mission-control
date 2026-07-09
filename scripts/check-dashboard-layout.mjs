import { readFileSync } from "node:fs";

const page = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const desktop = readFileSync(new URL("../src/app/dashboard/DashboardDesktop.tsx", import.meta.url), "utf8");
const nextConfig = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
const failures = [];

if (!desktop.includes("dashboard-169-board")) {
  failures.push("Dashboard is missing the dashboard-169-board marker.");
}

if (!desktop.includes("h-full") || !desktop.includes("overflow-hidden")) {
  failures.push("Dashboard does not declare a fixed-height overflow-hidden board container.");
}

if (desktop.includes("max-w-[1280px]")) {
  failures.push("Dashboard still uses the old centered max-width wrapper.");
}

if (!desktop.includes("grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]")) {
  failures.push("Dashboard is missing the 16:9 desktop board grid.");
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
