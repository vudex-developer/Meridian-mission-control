"use client";

import Link from "next/link";
import { useApp } from "@/lib/app-context";
import { Card, SectionHeader, ProgressBar, Dot } from "@/components/ui/primitives";
import { Sparkline, AreaChart, Donut, RingGauge } from "@/components/ui/charts";
import { Icon } from "@/components/ui/Icon";
import { toneColor, toneDim, riskMap, ventureColor } from "@/lib/tokens";
import { stagePips } from "@/lib/stage";
import {
  projects,
  projectById,
  kpis,
  revTrend,
  revTrendMonths,
  pipelineDonut,
  topRevenue,
  recentActivity,
  recommendations,
  ventures,
  alerts,
  agenda,
} from "@/data/seed";

export default function DashboardPage() {
  const { persona, founder } = useApp();
  const isLuke = persona === "luke";
  const priorities = recommendations[persona];
  const visibleProjects = projects.slice(0, 7);
  const compactActivity = recentActivity.slice(0, 3);

  return (
    <div className="dashboard-169-board h-full overflow-hidden p-3 xl:p-4">
      <div className="grid h-full min-h-0 gap-3 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)] xl:grid-rows-[auto_minmax(0,1fr)]">
        <section
          className="relative min-h-0 overflow-hidden rounded-[16px] border p-4 xl:col-span-2"
          style={{
            borderColor: "rgba(76,130,251,0.22)",
            background:
              "linear-gradient(115deg, rgba(76,130,251,0.16), rgba(76,130,251,0.03) 46%, rgba(167,139,250,0.07))",
          }}
        >
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
          <div className="relative grid items-center gap-4 lg:grid-cols-[minmax(0,1.15fr)_auto_minmax(420px,0.9fr)]">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-accent2">
                <Icon path="M12 3v2M12 19v2M5 12H3M21 12h-2M6 6l-1.4-1.4M19.4 19.4 18 18M18 6l1.4-1.4M4.6 19.4 6 18M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" size={13} width={1.6} />
                Morning Brief
              </div>
              <h1 className="m-[7px_0_5px] text-[22px] font-bold leading-[1.15]">Good morning, {founder.name}.</h1>
              <p className="m-0 line-clamp-2 max-w-[760px] text-[12.5px] leading-[1.45] text-text2">
                {isLuke ? (
                  <>
                    Execution score is <strong className="text-text">71%</strong>. 삼산병원 and Berkeley Aden are the two revenue windows to clear this week, worth an estimated <strong className="text-green">₩75M</strong>.
                  </>
                ) : (
                  <>
                    Deal score is <strong className="text-text">68%</strong>. VS PharmTech is highest-conviction, while Berkeley Aden needs a decision to unlock <strong className="text-green">₩45M</strong>.
                  </>
                )}
              </p>
            </div>

            <div className="hidden scale-[0.78] lg:block">
              <RingGauge value={founder.execScore} />
            </div>

            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
              {kpis.map((k) => (
                <Card key={k.label} radius={12} className="min-w-0 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[10.5px] font-medium text-text2">{k.label}</span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px]" style={{ background: toneDim[k.tone], color: toneColor[k.tone] }}>
                      <Icon path={k.icon} size={13} />
                    </span>
                  </div>
                  <div className="mt-1 font-mono text-[19px] font-semibold">{k.value}</div>
                  <Sparkline data={k.trend} color={toneColor[k.tone]} />
                  <div className="mt-1 flex items-center gap-1 text-[10px]" style={{ color: toneColor[k.tone] }}>
                    <span className="font-semibold">{k.delta}</span>
                    <span className="truncate text-text3">{k.sub}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="grid min-h-0 gap-3 xl:grid-rows-[minmax(230px,0.92fr)_minmax(0,1fr)]">
          <div className="grid min-h-0 gap-3 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <Card className="min-h-0 overflow-hidden p-4" radius={14}>
              <SectionHeader
                title="Project Progress"
                meta={`${projects.length} active`}
                action={<Link href="/projects" className="text-[11px] font-medium text-accent2">Open →</Link>}
              />
              <div className="grid gap-[6px]">
                {visibleProjects.map((p) => {
                  const { stageNow } = stagePips(p);
                  return (
                    <Link key={p.id} href={`/projects/${p.id}`} className="row-hover grid grid-cols-[8px_minmax(98px,0.75fr)_minmax(0,1fr)_34px_8px] items-center gap-2 rounded-[9px] px-2 py-[6px]">
                      <Dot color={ventureColor[p.venture]} size={7} />
                      <div className="min-w-0">
                        <div className="truncate text-[11.5px] font-semibold">{p.name}</div>
                        <div className="truncate text-[9.5px] text-text3">{stageNow}</div>
                      </div>
                      <ProgressBar value={p.progress} color={ventureColor[p.venture]} height={5} />
                      <span className="font-mono text-[10.5px] text-text2">{p.progress}%</span>
                      <span className="h-[7px] w-[7px] rounded-full" style={{ background: riskMap[p.riskLevel].color }} />
                    </Link>
                  );
                })}
              </div>
            </Card>

            <Card className="min-h-0 p-4" radius={14}>
              <div className="mb-2 flex items-end justify-between">
                <div>
                  <div className="text-[13px] font-bold">Cumulative Revenue</div>
                  <div className="text-[10.5px] text-text3">QTD trajectory</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[18px] font-semibold">₩205M</div>
                  <div className="text-[10px] text-green">+18% run-rate</div>
                </div>
              </div>
              <div className="h-[138px]">
                <AreaChart data={revTrend} />
              </div>
              <div className="mt-1 flex justify-between">
                {revTrendMonths.map((m) => (
                  <span key={m} className="font-mono text-[9.5px] text-text3">{m}</span>
                ))}
              </div>
            </Card>
          </div>

          <div className="grid min-h-0 gap-3 lg:grid-cols-3">
            <Card className="min-h-0 p-4" radius={14}>
              <div className="mb-3 text-[13px] font-bold">Pipeline by Stage</div>
              <div className="flex items-center gap-4">
                <div className="scale-[0.86]">
                  <Donut segments={pipelineDonut} centerTop="₩640M" centerBottom="pipeline" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-[7px]">
                  {pipelineDonut.map((s) => (
                    <div key={s.label} className="flex items-center gap-2 text-[10.5px]">
                      <Dot color={s.color} size={8} />
                      <span className="flex-1 truncate text-text2">{s.label}</span>
                      <span className="font-mono text-text3">{s.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="min-h-0 p-4" radius={14}>
              <div className="mb-3 text-[13px] font-bold">Top Revenue Projects</div>
              <div className="flex flex-col gap-[10px]">
                {topRevenue.map((r) => (
                  <div key={r.name}>
                    <div className="mb-[5px] flex justify-between gap-3">
                      <span className="truncate text-[11px] text-text">{r.name}</span>
                      <span className="font-mono text-[10.5px] font-semibold text-text2">{r.value}</span>
                    </div>
                    <ProgressBar value={r.pct} color={r.color} height={6} />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="min-h-0 p-4" radius={14}>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[13px] font-bold">Recent Activity</span>
                <span className="animate-blink h-[6px] w-[6px] rounded-full" style={{ background: "var(--color-green)", boxShadow: "0 0 8px var(--color-green)" }} />
              </div>
              <div className="flex flex-col gap-3">
                {compactActivity.map((a, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] text-[11px]" style={{ background: toneDim[a.tone] }}>{a.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="line-clamp-2 text-[11px] leading-[1.35] text-text">{a.text}</div>
                      <div className="mt-[1px] font-mono text-[9.5px] text-text3">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <aside className="grid min-h-0 gap-3 xl:grid-rows-[minmax(0,0.95fr)_minmax(0,0.85fr)_auto]">
          <Card className="min-h-0 overflow-hidden p-4" radius={14}>
            <SectionHeader
              title="Today's Priorities"
              meta="3 actions"
              action={<Link href="/coo" className="text-[11px] font-medium text-accent2">AI COO →</Link>}
            />
            <div className="flex flex-col gap-2">
              {priorities.map((p) => {
                const proj = projectById(p.projectId);
                const rankBg = p.rank === 1 ? (isLuke ? "linear-gradient(140deg,#4C82FB,#2C5FD6)" : "linear-gradient(140deg,#A78BFA,#6D4FCF)") : "var(--color-surfacehi)";
                const rankColor = p.rank === 1 ? "#fff" : "var(--color-accent2)";
                return (
                  <Link key={p.projectId} href={`/projects/${p.projectId}`} className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-3 rounded-[11px] border border-border bg-bg2 p-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-[8px] font-mono text-[12px] font-semibold" style={{ background: rankBg, color: rankColor }}>{p.rank}</div>
                    <div className="min-w-0">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="truncate text-[12px] font-semibold">{p.title}</span>
                        <span className="shrink-0 rounded-full px-[6px] py-[1px] text-[9px] font-semibold" style={{ background: toneDim[p.tone], color: toneColor[p.tone] }}>{p.tag}</span>
                      </div>
                      <div className="mt-[2px] truncate text-[10.5px] text-text2">{p.action}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[11px] font-semibold text-text2">{proj?.potential}</div>
                      <div className="text-[9.5px] text-text3">{p.eta}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>

          <div className="grid min-h-0 gap-3 lg:grid-cols-2 xl:grid-cols-1">
            <Card className="min-h-0 overflow-hidden p-4" radius={14}>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[13px] font-bold">AI Alerts</span>
                <span className="animate-blink h-[6px] w-[6px] rounded-full" style={{ background: "var(--color-red)" }} />
              </div>
              <div className="flex flex-col gap-2">
                {alerts.slice(0, 2).map((a, i) => (
                  <div key={i} className="flex gap-2 rounded-[10px] p-[10px]" style={{ background: toneDim[a.tone], border: `1px solid ${toneColor[a.tone]}33` }}>
                    <span className="shrink-0 text-[12px] leading-[1.35]">{a.severity === "star" ? "*" : "!"}</span>
                    <div className="line-clamp-2 text-[11px] leading-[1.35] text-text">{a.text}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="min-h-0 overflow-hidden p-4" radius={14}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[13px] font-bold">Meetings</span>
                <Link href="/meetings" className="text-[11px] font-medium text-accent2">All →</Link>
              </div>
              <div className="flex flex-col">
                {agenda.slice(0, 3).map((m, i) => (
                  <Link key={i} href="/meetings" className="grid grid-cols-[40px_minmax(0,1fr)_auto] gap-2 border-b border-border py-[8px] last:border-0">
                    <div className="font-mono text-[10.5px] font-semibold text-accent2">{m.time}</div>
                    <div className="min-w-0">
                      <div className="truncate text-[11.5px] font-semibold">{m.title}</div>
                      <div className="truncate text-[9.5px] text-text3">{m.attendees}</div>
                    </div>
                    {m.revenue ? <span className="self-center rounded-full bg-greendim px-[6px] py-[2px] text-[9px] font-semibold text-green">{m.revenue}</span> : null}
                  </Link>
                ))}
              </div>
            </Card>
          </div>

          <div className="relative overflow-hidden rounded-[14px] border p-4" style={{ borderColor: "rgba(52,211,153,0.28)", background: "linear-gradient(150deg, rgba(52,211,153,0.13), rgba(52,211,153,0.02))" }}>
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-green">Revenue Opportunity</div>
            <div className="mb-1 text-[13px] font-semibold">삼산병원 · Paid Diagnosis</div>
            <div className="mb-2 line-clamp-2 text-[10.5px] leading-[1.35] text-text2">Send the proposal within 48 hours before the window closes.</div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[22px] font-semibold text-green">₩30M</span>
              <span className="text-[10px] text-text3">est. contract</span>
            </div>
          </div>
        </aside>

        <section className="grid gap-3 xl:col-span-2 xl:hidden">
          <Card className="p-4" radius={14}>
            <SectionHeader title="Portfolio" action={<Link href="/portfolio" className="text-[11px] font-medium text-accent2">Details →</Link>} />
            <div className="grid gap-3 md:grid-cols-2">
              {ventures.map((b) => (
                <div key={b.id} className="rounded-[12px] border border-border bg-bg2 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <Dot color={b.color} size={8} glow={false} />
                    <span className="text-[12px] font-semibold">{b.short}</span>
                  </div>
                  <ProgressBar value={b.progress} color={`linear-gradient(90deg, ${b.color}, ${b.color2})`} height={6} glow={false} />
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
