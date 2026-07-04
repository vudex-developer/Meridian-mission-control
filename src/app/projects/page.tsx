"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/primitives";
import { healthMap, riskMap, ventureColor } from "@/lib/tokens";
import { stagePips } from "@/lib/stage";
import { projects, schedule, schedWeeks } from "@/data/seed";

type View = "board" | "schedule" | "table";

export default function ProjectsPage() {
  const [view, setView] = useState<View>("board");
  const tabs: { key: View; label: string }[] = [
    { key: "board", label: "Board" },
    { key: "schedule", label: "Schedule" },
    { key: "table", label: "Table" },
  ];

  return (
    <div className="mx-auto flex max-w-[1320px] flex-col gap-[18px] px-[28px] pb-[56px] pt-[22px]">
      <div className="flex w-fit items-center gap-2 rounded-[12px] border border-border bg-surface p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setView(t.key)}
            className="rounded-[9px] px-[15px] py-[7px] text-[12.5px] font-semibold"
            style={view === t.key ? { background: "var(--color-accent)", color: "#fff" } : { color: "var(--color-text2)" }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {view === "board" && <BoardView />}
      {view === "schedule" && <ScheduleView />}
      {view === "table" && <TableView />}
    </div>
  );
}

function BoardView() {
  return (
    <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2 xl:grid-cols-3">
      {projects.map((p) => {
        const { pips, stageNow } = stagePips(p);
        const h = healthMap[p.health];
        return (
          <Link key={p.id} href={`/projects/${p.id}`} className="flex flex-col gap-[14px] rounded-[16px] border border-border bg-surface p-[18px_19px]">
            <div className="flex items-start gap-[10px]">
              <span className="mt-[5px] h-[9px] w-[9px] shrink-0 rounded-[3px]" style={{ background: ventureColor[p.venture], boxShadow: `0 0 7px ${ventureColor[p.venture]}` }} />
              <div className="min-w-0 flex-1">
                <div className="text-[14.5px] font-semibold tracking-[-0.01em]">{p.name}</div>
                <div className="text-[11px] text-text3">{p.venture}</div>
              </div>
              <span className="rounded-full px-[9px] py-[3px] text-[10.5px] font-semibold" style={{ background: h.dim, color: h.color }}>{h.label}</span>
            </div>
            <div>
              <div className="mb-[7px] flex gap-1">
                {pips.map((s, i) => (
                  <div key={i} title={s.name} className="h-[6px] flex-1 rounded-full" style={{ background: s.bg, boxShadow: s.glow }} />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11.5px] text-text2">{stageNow}</span>
                <span className="font-mono text-[11px] text-text3">{p.progress}%</span>
              </div>
            </div>
            <div className="flex items-center gap-[9px] border-t border-border pt-3">
              <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[7px] bg-surfacehi text-[10.5px] font-semibold text-text2">{p.owner[0]}</span>
              <span className="flex-1 truncate text-[11.5px] text-text2">{p.nextAction}</span>
              <span className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: riskMap[p.riskLevel].color }} title={`${riskMap[p.riskLevel].label} risk`} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function ScheduleView() {
  const n = schedWeeks.length;
  return (
    <Card className="p-[20px_22px]">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[15px] font-bold">Project Schedule</span>
        <div className="flex gap-[16px] text-[11px] text-text2">
          <span className="flex items-center gap-[6px]"><span className="h-[9px] w-[9px] rounded-[2px]" style={{ background: "#4C82FB" }} />Senior Residence</span>
          <span className="flex items-center gap-[6px]"><span className="h-[9px] w-[9px] rounded-[2px]" style={{ background: "#A78BFA" }} />Healthcare Gateway</span>
        </div>
      </div>
      <div className="mb-1 flex">
        <div className="w-[190px] shrink-0" />
        <div className="grid flex-1" style={{ gridTemplateColumns: `repeat(${n},1fr)` }}>
          {schedWeeks.map((w) => (
            <div key={w} className="pb-2 text-center font-mono text-[10.5px] text-text3">{w}</div>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        {schedule.map((r) => {
          const color = ventureColor[r.venture as keyof typeof ventureColor] ?? "#4C82FB";
          return (
            <Link key={r.id} href={`/projects/${r.id}`} className="flex items-center py-[7px]">
              <div className="flex w-[190px] shrink-0 items-center gap-[9px] pr-[14px]">
                <span className="h-[8px] w-[8px] shrink-0 rounded-[3px]" style={{ background: color }} />
                <span className="truncate text-[12.5px] text-text">{r.name}</span>
              </div>
              <div className="relative h-[30px] flex-1">
                <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${n},1fr)` }}>
                  {schedWeeks.map((w) => (
                    <div key={w} className="border-l border-border" />
                  ))}
                </div>
                <div
                  className="absolute top-[5px] flex h-[20px] items-center overflow-hidden rounded-[7px] px-[9px]"
                  style={{ left: `${(r.start / n) * 100}%`, width: `${(r.span / n) * 100}%`, background: color, opacity: 0.9, boxShadow: `0 0 10px ${color}66` }}
                >
                  <span className="truncate text-[10.5px] font-semibold text-white">{r.phase}</span>
                </div>
                <div className="absolute top-[-1px] flex -translate-x-1/2 flex-col items-center" style={{ left: `${((r.mlCol + 0.5) / n) * 100}%` }} title={r.ml}>
                  <span className="h-[9px] w-[9px] rounded-full" style={{ background: "#fff", border: `2px solid ${color}`, boxShadow: `0 0 8px ${color}` }} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}

function TableView() {
  const cols = "1.7fr 1fr 0.95fr 0.85fr 0.8fr 0.7fr 1.5fr";
  return (
    <Card className="overflow-hidden">
      <div className="grid gap-[14px] border-b border-border p-[14px_20px] text-[10.5px] font-semibold uppercase tracking-[0.06em] text-text3" style={{ gridTemplateColumns: cols }}>
        <span>Project</span><span>Current Stage</span><span>Progress</span><span>Health</span><span>Revenue</span><span>Owner</span><span>Next Action</span>
      </div>
      {projects.map((p) => {
        const h = healthMap[p.health];
        return (
          <Link key={p.id} href={`/projects/${p.id}`} className="grid items-center gap-[14px] border-b border-border p-[15px_20px] last:border-0" style={{ gridTemplateColumns: cols }}>
            <div className="flex min-w-0 items-center gap-[11px]">
              <span className="h-[8px] w-[8px] shrink-0 rounded-[3px]" style={{ background: ventureColor[p.venture] }} />
              <div className="min-w-0">
                <div className="text-[13.5px] font-semibold">{p.name}</div>
                <div className="text-[11px] text-text3">{p.venture}</div>
              </div>
            </div>
            <div className="text-[12.5px] text-text2">{p.stage}</div>
            <div className="flex items-center gap-[9px]">
              <div className="h-[6px] flex-1 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: ventureColor[p.venture] }} />
              </div>
              <span className="font-mono text-[11px] text-text2">{p.progress}</span>
            </div>
            <div><span className="rounded-full px-[9px] py-[3px] text-[11px] font-semibold" style={{ background: h.dim, color: h.color }}>{h.label}</span></div>
            <div className="font-mono text-[12.5px] font-semibold text-text2">{p.revenue}</div>
            <div className="text-[12.5px] text-text2">{p.owner}</div>
            <div className="flex min-w-0 items-center gap-2">
              <span className="truncate text-[12.5px] text-text">{p.nextAction}</span>
              <span className="h-[6px] w-[6px] shrink-0 rounded-full" style={{ background: riskMap[p.riskLevel].color }} title={`${riskMap[p.riskLevel].label} risk`} />
            </div>
          </Link>
        );
      })}
    </Card>
  );
}
