import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { MobileNav } from "./MobileNav";
import { CommandPalette } from "./CommandPalette";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{
        background:
          "radial-gradient(1200px 600px at 78% -10%, rgba(76,130,251,0.10), transparent 60%), var(--color-bg)",
      }}
    >
      <Sidebar />
      <main className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar />
        <div className="flex-1 overflow-x-hidden overflow-y-auto">{children}</div>
        <MobileNav />
      </main>
      <CommandPalette />
    </div>
  );
}
