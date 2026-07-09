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
