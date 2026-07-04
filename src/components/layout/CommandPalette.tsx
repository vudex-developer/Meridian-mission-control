"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/lib/app-context";
import { commandActions } from "@/data/seed";

export function CommandPalette() {
  const { cmdOpen, setCmdOpen } = useApp();
  const router = useRouter();
  if (!cmdOpen) return null;

  const go = (href: string) => {
    setCmdOpen(false);
    router.push(href);
  };

  return (
    <div
      onClick={() => setCmdOpen(false)}
      className="animate-fade fixed inset-0 z-[80] flex items-start justify-center pt-[14vh]"
      style={{ background: "rgba(3,5,10,0.6)", backdropFilter: "blur(4px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[560px] max-w-[92vw] overflow-hidden rounded-[16px] border border-border2 bg-surface2"
        style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.6)", animation: "mc-up .22s ease" }}
      >
        <div className="flex items-center gap-3 border-b border-border p-[16px_18px]">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="var(--color-text3)" strokeWidth="1.8" />
            <path d="m20 20-3.2-3.2" stroke="var(--color-text3)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            autoFocus
            placeholder="Ask the AI COO, jump to a project…"
            className="flex-1 border-none bg-transparent text-[14.5px] text-text outline-none placeholder:text-text3"
          />
          <span className="rounded-[5px] border border-border2 px-[6px] py-[2px] font-mono text-[10.5px] text-text3">ESC</span>
        </div>
        <div className="max-h-[340px] overflow-y-auto p-2">
          <div className="p-[8px_10px_4px] text-[10.5px] uppercase tracking-[0.07em] text-text3">Quick actions</div>
          {commandActions.map((c) => (
            <button
              key={c.label}
              onClick={() => go(c.href)}
              className="row-hover flex w-full items-center gap-3 rounded-[10px] p-[10px_12px] text-left"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-accentdim text-accent2">{c.icon}</span>
              <span className="flex-1 text-[13.5px] font-medium">{c.label}</span>
              <span className="text-[11px] text-text3">{c.hint}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
