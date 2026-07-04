"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/nav";
import { useApp } from "@/lib/app-context";
import { Icon } from "@/components/ui/Icon";
import { ICON } from "@/data/seed";

export function Sidebar() {
  const pathname = usePathname();
  const { founder, togglePersona, setCmdOpen } = useApp();
  const active = pathname.startsWith("/projects") ? "projects" : navItems.find((n) => n.href === pathname)?.id ?? "dashboard";

  return (
    <aside className="hidden h-full w-[238px] shrink-0 flex-col gap-1 border-r border-border p-[18px_14px] backdrop-blur-md md:flex" style={{ background: "linear-gradient(180deg, rgba(12,18,30,0.6), rgba(8,12,20,0.6))" }}>
      <div className="flex items-center gap-[11px] p-[8px_8px_16px]">
        <div
          className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px]"
          style={{ background: "linear-gradient(140deg, var(--color-accent), #2C5FD6)", boxShadow: "0 6px 18px rgba(76,130,251,0.4), inset 0 1px 0 rgba(255,255,255,0.3)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1.7" />
            <path d="M12 3v18M3 12h18" stroke="#fff" strokeWidth="1.2" opacity="0.55" />
            <circle cx="12" cy="12" r="3" fill="#fff" />
          </svg>
        </div>
        <div className="leading-[1.1]">
          <div className="text-[14.5px] font-bold tracking-[-0.01em]">Meridian</div>
          <div className="text-[10.5px] font-medium tracking-[0.02em] text-text3">Mission Control</div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-[2px] overflow-y-auto">
        {navItems.map((n) => {
          const isActive = n.id === active;
          return (
            <Link
              key={n.id}
              href={n.href}
              className="flex items-center gap-[11px] rounded-[10px] p-[9px_11px]"
              style={{
                color: isActive ? "var(--color-text)" : "var(--color-text2)",
                background: isActive ? "linear-gradient(90deg, var(--color-accentdim), transparent)" : "transparent",
                borderLeft: `2px solid ${isActive ? "var(--color-accent)" : "transparent"}`,
              }}
            >
              <span className="flex h-[19px] w-[19px] shrink-0 items-center justify-center" style={{ color: isActive ? "var(--color-accent2)" : "var(--color-text3)" }}>
                <Icon path={n.icon} />
              </span>
              <span className="flex-1 text-[13px]" style={{ fontWeight: isActive ? 600 : 500 }}>
                {n.label}
              </span>
              {n.badge ? (
                <span className="rounded-full bg-accentdim px-[6px] py-[1px] font-mono text-[10px] font-semibold text-accent2">{n.badge}</span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-[6px] flex flex-col gap-2 border-t border-border pt-3">
        <button
          onClick={() => setCmdOpen(true)}
          className="flex items-center gap-[9px] rounded-[10px] border border-border2 p-[8px_10px] text-[12px] text-text2"
        >
          <Icon path={ICON.search} size={14} width={1.8} />
          <span className="flex-1 text-left">Search &amp; Ask</span>
          <span className="rounded-[5px] px-[5px] py-[1px] font-mono text-[10.5px]" style={{ background: "rgba(255,255,255,0.06)" }}>
            ⌘K
          </span>
        </button>
        <button onClick={togglePersona} className="flex items-center gap-[10px] rounded-[12px] border border-border p-[7px_8px] text-left">
          <div className="flex h-8 w-8 items-center justify-center rounded-[9px] text-[13px] font-bold text-white" style={{ background: founder.gradient }}>
            {founder.letter}
          </div>
          <div className="flex-1 leading-[1.15]">
            <div className="text-[12.5px] font-semibold">{founder.name}</div>
            <div className="text-[10.5px] text-text3">{founder.role}</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: "var(--color-text3)" }}>
            <path d="M8 9l4-4 4 4M8 15l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
