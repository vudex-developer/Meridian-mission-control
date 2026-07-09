"use client";

import { useDashboardViewModel } from "./dashboard-data";
import { DashboardDesktop } from "./DashboardDesktop";

export function ResponsiveDashboard() {
  const model = useDashboardViewModel();

  return <DashboardDesktop model={model} />;
}
