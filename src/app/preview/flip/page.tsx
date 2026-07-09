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
