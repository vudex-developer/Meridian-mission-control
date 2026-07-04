"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routeMeta } from "@/lib/nav";
import { useApp } from "@/lib/app-context";

export function Topbar() {
  const pathname = usePathname();
  const { founder } = useApp();
  const meta = routeMeta(pathname);

  return (
    <header
      className="flex shrink-0 items-center gap-[18px] border-b border-border px-[28px] py-4 backdrop-blur-md"
      style={{ background: "rgba(6,9,15,0.72)" }}
    >
      <div className="min-w-0 flex-1">
        <div className="text-[18px] font-bold tracking-[-0.015em]">{meta.title}</div>
        <div className="mt-[1px] text-[12px] text-text3">{meta.subtitle}</div>
      </div>
      <div className="hidden pr-1 font-mono text-[12px] tracking-[0.01em] text-text2 sm:block">09:12 KST</div>
      <Link
        href="/coo"
        className="relative flex items-center gap-[10px] rounded-[12px] border p-[8px_14px_8px_12px]"
        style={{ borderColor: "rgba(76,130,251,0.35)", background: "linear-gradient(180deg, rgba(76,130,251,0.14), rgba(76,130,251,0.05))" }}
      >
        <span className="relative flex h-[9px] w-[9px]">
          <span className="absolute inset-0 rounded-full" style={{ background: "var(--color-accent)", animation: "mc-ring 1.8s ease-out infinite" }} />
          <span className="relative h-[9px] w-[9px] rounded-full" style={{ background: "var(--color-accent2)", boxShadow: "0 0 10px var(--color-accent)" }} />
        </span>
        <span className="text-[12.5px] font-semibold text-accent2">AI COO</span>
        <span className="font-mono text-[11px] text-text2">{founder.execScore}%</span>
      </Link>
    </header>
  );
}
