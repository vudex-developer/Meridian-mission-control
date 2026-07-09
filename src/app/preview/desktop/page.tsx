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
