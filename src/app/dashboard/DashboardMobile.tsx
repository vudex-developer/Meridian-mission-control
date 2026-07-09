"use client";

import Link from "next/link";
import type { DashboardViewModel } from "./dashboard-data";
import { Card } from "@/components/ui/primitives";
import { RingGauge, Sparkline } from "@/components/ui/charts";
import { Icon } from "@/components/ui/Icon";
import { toneColor, toneDim } from "@/lib/tokens";

function MobileKpis({ model, compact }: { model: DashboardViewModel; compact: boolean }) {
  const items = compact ? model.kpis.slice(0, 2) : model.kpis;
  return (
    <div className={compact ? "grid grid-cols-2 gap-2" : "grid grid-cols-2 gap-3"}>
      {items.map((k) => (
        <Card key={k.label} radius={12} className={compact ? "p-3" : "p-4"}>
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-[10.5px] font-medium text-text2">{k.label}</span>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px]" style={{ background: toneDim[k.tone], color: toneColor[k.tone] }}>
              <Icon path={k.icon} size={13} />
            </span>
          </div>
          <div className={compact ? "mt-1 font-mono text-[18px] font-semibold" : "mt-2 font-mono text-[21px] font-semibold"}>{k.value}</div>
          {!compact ? <Sparkline data={k.trend} color={toneColor[k.tone]} /> : null}
          <div className="mt-1 flex items-center gap-1 text-[10px]" style={{ color: toneColor[k.tone] }}>
            <span className="font-semibold">{k.delta}</span>
            <span className="truncate text-text3">{k.sub}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

function TopPriority({ model, compact }: { model: DashboardViewModel; compact: boolean }) {
  const priority = model.priorities[0];
  const project = model.projectById(priority.projectId);
  return (
    <Link href={`/projects/${priority.projectId}`} className="block rounded-[14px] border border-border bg-bg2 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-accent2">Top AI COO Action</div>
          <div className="mt-1 text-[17px] font-bold leading-[1.15]">{priority.title}</div>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-accent font-mono text-[14px] font-semibold text-white">{priority.rank}</div>
      </div>
      <div className={compact ? "line-clamp-2 text-[12px] leading-[1.4] text-text2" : "text-[13px] leading-[1.45] text-text2"}>{priority.action}</div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="rounded-full px-[8px] py-[3px] text-[10.5px] font-semibold" style={{ background: toneDim[priority.tone], color: toneColor[priority.tone] }}>{priority.tag}</span>
        <span className="font-mono text-[12px] font-semibold text-green">{project?.potential}</span>
      </div>
    </Link>
  );
}

function RevenueOpportunity() {
  return (
    <section className="rounded-[14px] border p-4" style={{ borderColor: "rgba(52,211,153,0.28)", background: "linear-gradient(150deg, rgba(52,211,153,0.13), rgba(52,211,153,0.02))" }}>
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-green">Revenue Opportunity</div>
      <div className="mb-1 text-[14px] font-semibold">삼산병원 · Paid Diagnosis</div>
      <div className="text-[12px] leading-[1.45] text-text2">Send the proposal within 48 hours before the window closes.</div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-mono text-[24px] font-semibold text-green">₩30M</span>
        <span className="text-[10px] text-text3">est. contract</span>
      </div>
    </section>
  );
}

export function DashboardPhone({ model }: { model: DashboardViewModel }) {
  return (
    <div className="dashboard-phone-feed min-h-full px-4 pb-6 pt-4">
      <section className="rounded-[16px] border border-border bg-surface p-4">
        <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-accent2">Morning Brief</div>
        <h1 className="mt-2 text-[24px] font-bold leading-[1.12]">Good morning, {model.founder.name}.</h1>
        <p className="mt-3 text-[13px] leading-[1.5] text-text2">{model.brief.why}</p>
        <div className="mt-3 rounded-[12px] border border-border bg-bg2 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-green">Today's action</div>
          <div className="mt-1 text-[13px] font-semibold leading-[1.4]">{model.brief.action}</div>
        </div>
      </section>
      <TopPriority model={model} compact={false} />
      <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-3">
        <Card radius={14} className="flex items-center justify-center p-2">
          <RingGauge value={model.founder.execScore} />
        </Card>
        <MobileKpis model={model} compact />
      </div>
      <RevenueOpportunity />
      <MobileKpis model={model} compact={false} />
    </div>
  );
}

export function DashboardFlip({ model }: { model: DashboardViewModel }) {
  return (
    <div className="dashboard-flip-feed min-h-full px-3 pb-5 pt-3">
      <section className="rounded-[15px] border border-border bg-surface p-3">
        <div className="text-[9.5px] font-semibold uppercase tracking-[0.08em] text-accent2">Morning Brief</div>
        <h1 className="mt-2 text-[21px] font-bold leading-[1.12]">Good morning, {model.founder.name}.</h1>
        <p className="mt-2 line-clamp-3 text-[12px] leading-[1.45] text-text2">{model.brief.why}</p>
      </section>
      <TopPriority model={model} compact />
      <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-2">
        <Card radius={13} className="flex items-center justify-center p-1">
          <div className="scale-[0.78]">
            <RingGauge value={model.founder.execScore} />
          </div>
        </Card>
        <MobileKpis model={model} compact />
      </div>
      <RevenueOpportunity />
      <section className="rounded-[13px] border border-border bg-surface p-3">
        <div className="mb-2 text-[12px] font-bold">Next Meetings</div>
        <div className="flex flex-col">
          {model.agenda.slice(0, 2).map((m) => (
            <Link key={`${m.time}-${m.title}`} href="/meetings" className="grid grid-cols-[42px_minmax(0,1fr)] gap-2 border-b border-border py-2 last:border-0">
              <div className="font-mono text-[10.5px] font-semibold text-accent2">{m.time}</div>
              <div className="min-w-0">
                <div className="truncate text-[11.5px] font-semibold">{m.title}</div>
                <div className="truncate text-[9.5px] text-text3">{m.attendees}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
