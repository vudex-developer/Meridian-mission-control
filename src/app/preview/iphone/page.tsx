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
