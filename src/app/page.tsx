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

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-[22px] px-[28px] pb-[56px] pt-[26px]">
      {/* MORNING BRIEF */}
      <div
        className="animate-up relative overflow-hidden rounded-[22px] border p-[26px_28px]"
        style={{
          borderColor: "rgba(76,130,251,0.22)",
          background: "linear-gradient(115deg, rgba(76,130,251,0.16), rgba(76,130,251,0.03) 46%, rgba(167,139,250,0.07))",
        }}
      >
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative flex flex-wrap items-start gap-[26px]">
          <div className="min-w-[340px] flex-1">
            <div className="flex items-center gap-[9px] text-[11.5px] font-semibold uppercase tracking-[0.08em] text-accent2">
              <Icon path="M12 3v2M12 19v2M5 12H3M21 12h-2M6 6l-1.4-1.4M19.4 19.4 18 18M18 6l1.4-1.4M4.6 19.4 6 18M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" size={14} width={1.6} />
              Morning Brief
            </div>
            <h1 className="m-[12px_0_8px] text-[27px] font-bold leading-[1.2] tracking-[-0.02em]">Good morning, {founder.name}.</h1>
            {isLuke ? (
              <p className="m-0 max-w-[640px] text-[14.5px] leading-[1.6] text-text2">
                Execution score is <strong className="text-text">71%</strong>. Two revenue windows are closing this week — <strong className="text-text">삼산병원</strong> has sat in Free Consulting for 21 days and <strong className="text-text">Berkeley Aden</strong> is 13 days overdue on follow-up. Clear these two and you convert an estimated <strong className="text-green">₩75M</strong> of pipeline.
              </p>
            ) : (
              <p className="m-0 max-w-[640px] text-[14.5px] leading-[1.6] text-text2">
                Deal score is <strong className="text-text">68%</strong>. <strong className="text-text">VS PharmTech</strong> is your highest-conviction investment — prepare the memo before the round closes. <strong className="text-text">Berkeley Aden</strong> MOU needs a decision this week to unlock the Senior Residence track worth <strong className="text-green">₩45M</strong>.
              </p>
            )}
            <div className="mt-[18px] flex flex-wrap gap-[10px]">
              <Link href="/coo" className="flex items-center gap-2 rounded-[11px] bg-accent px-4 py-[10px] text-[13px] font-semibold text-white" style={{ boxShadow: "0 8px 22px rgba(76,130,251,0.35)" }}>
                Start today&apos;s execution
                <Icon path="M5 12h14M13 6l6 6-6 6" size={15} width={1.9} color="#fff" />
              </Link>
              <Link href="/revenue" className="flex items-center gap-2 rounded-[11px] border border-border2 px-4 py-[10px] text-[13px] font-semibold text-text">
                View revenue engine
              </Link>
            </div>
          </div>
          <div className="min-w-[190px]">
            <RingGauge value={founder.execScore} />
          </div>
        </div>
      </div>

      {/* PROJECT PROGRESS AT A GLANCE */}
      <Card className="p-[20px_22px]">
        <SectionHeader
          title="Project Progress"
          meta="9 active"
          action={<Link href="/projects" className="text-[12px] font-medium text-accent2">Open board →</Link>}
        />
        <div className="grid grid-cols-1 gap-x-[26px] gap-y-[10px] md:grid-cols-2">
          {projects.map((p) => {
            const { stageNow } = stagePips(p);
            return (
              <Link key={p.id} href={`/projects/${p.id}`} className="row-hover flex items-center gap-[13px] rounded-[10px] p-[9px_6px]">
                <Dot color={ventureColor[p.venture]} />
                <div className="w-[138px] min-w-0 shrink-0">
                  <div className="truncate text-[12.5px] font-semibold">{p.name}</div>
                  <div className="truncate text-[10.5px] text-text3">{stageNow}</div>
                </div>
                <div className="flex flex-1 items-center gap-[10px]">
                  <div className="flex-1">
                    <ProgressBar value={p.progress} color={ventureColor[p.venture]} />
                  </div>
                  <span className="w-[30px] shrink-0 text-right font-mono text-[11px] text-text2">{p.progress}%</span>
                  <span className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: riskMap[p.riskLevel].color }} title={`${riskMap[p.riskLevel].label} risk`} />
                </div>
              </Link>
            );
          })}
        </div>
      </Card>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 gap-[14px] lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label} radius={16} className="flex flex-col gap-[9px] p-[16px_17px]">
            <div className="flex items-center justify-between">
              <span className="text-[11.5px] font-medium text-text2">{k.label}</span>
              <span className="flex h-[26px] w-[26px] items-center justify-center rounded-[8px]" style={{ background: toneDim[k.tone], color: toneColor[k.tone] }}>
                <Icon path={k.icon} size={15} />
              </span>
            </div>
            <div className="font-mono text-[23px] font-semibold tracking-[-0.02em]">{k.value}</div>
            <Sparkline data={k.trend} color={toneColor[k.tone]} />
            <div className="flex items-center gap-[6px] text-[11px]" style={{ color: toneColor[k.tone] }}>
              <span className="font-semibold">{k.delta}</span>
              <span className="text-text3">{k.sub}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* REVENUE TREND */}
      <Card className="p-[20px_22px]">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <div className="text-[15px] font-bold tracking-[-0.01em]">Cumulative Revenue</div>
            <div className="mt-[2px] text-[12px] text-text3">QTD trajectory vs. pipeline conversion</div>
          </div>
          <div className="flex items-end gap-[22px]">
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[0.06em] text-text3">Realized</div>
              <div className="font-mono text-[19px] font-semibold">₩205M</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[0.06em] text-text3">Run-rate</div>
              <div className="font-mono text-[19px] font-semibold text-green">+18%</div>
            </div>
          </div>
        </div>
        <div className="relative h-[150px]">
          <AreaChart data={revTrend} />
        </div>
        <div className="mt-2 flex justify-between">
          {revTrendMonths.map((m) => (
            <span key={m} className="font-mono text-[10.5px] text-text3">{m}</span>
          ))}
        </div>
      </Card>

      {/* ANALYTICS ROW */}
      <div className="grid grid-cols-1 gap-[14px] lg:grid-cols-3">
        <Card className="p-[20px_22px]">
          <div className="mb-4 text-[14px] font-bold tracking-[-0.01em]">Pipeline by Stage</div>
          <div className="flex items-center gap-[18px]">
            <Donut segments={pipelineDonut} centerTop="₩640M" centerBottom="pipeline" />
            <div className="flex flex-1 flex-col gap-2">
              {pipelineDonut.map((s) => (
                <div key={s.label} className="flex items-center gap-2 text-[11.5px]">
                  <Dot color={s.color} size={9} />
                  <span className="flex-1 truncate text-text2">{s.label}</span>
                  <span className="font-mono text-text3">{s.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-[20px_22px]">
          <div className="mb-4 text-[14px] font-bold tracking-[-0.01em]">Top Revenue Projects</div>
          <div className="flex flex-col gap-[13px]">
            {topRevenue.map((r) => (
              <div key={r.name}>
                <div className="mb-[6px] flex justify-between">
                  <span className="max-w-[150px] truncate text-[12px] text-text">{r.name}</span>
                  <span className="font-mono text-[11.5px] font-semibold text-text2">{r.value}</span>
                </div>
                <ProgressBar value={r.pct} color={r.color} height={7} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-[20px_22px]">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-[14px] font-bold tracking-[-0.01em]">Recent Activity</span>
            <span className="animate-blink h-[6px] w-[6px] rounded-full" style={{ background: "var(--color-green)", boxShadow: "0 0 8px var(--color-green)" }} />
          </div>
          <div className="flex flex-col gap-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-[11px]">
                <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[8px] text-[12px]" style={{ background: toneDim[a.tone] }}>{a.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] leading-[1.4] text-text">{a.text}</div>
                  <div className="mt-[1px] font-mono text-[10.5px] text-text3">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* TWO COLUMN */}
      <div className="grid grid-cols-1 items-start gap-[22px] lg:grid-cols-[1.55fr_1fr]">
        <div className="flex flex-col gap-[22px]">
          {/* TODAY PRIORITIES */}
          <Card className="p-[20px_22px]">
            <SectionHeader
              title="Today's Priorities"
              meta="3 actions"
              action={<Link href="/coo" className="text-[12px] font-medium text-accent2">Open AI COO →</Link>}
            />
            <div className="flex flex-col gap-[10px]">
              {priorities.map((p) => {
                const proj = projectById(p.projectId);
                const rankBg = p.rank === 1 ? (isLuke ? "linear-gradient(140deg,#4C82FB,#2C5FD6)" : "linear-gradient(140deg,#A78BFA,#6D4FCF)") : "var(--color-surfacehi)";
                const rankColor = p.rank === 1 ? "#fff" : "var(--color-accent2)";
                return (
                  <Link key={p.projectId} href={`/projects/${p.projectId}`} className="flex items-center gap-[14px] rounded-[13px] border border-border bg-bg2 p-[14px]">
                    <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px] font-mono text-[14px] font-semibold" style={{ background: rankBg, color: rankColor }}>{p.rank}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-semibold">{p.title}</span>
                        <span className="rounded-full px-[7px] py-[1px] text-[10px] font-semibold" style={{ background: toneDim[p.tone], color: toneColor[p.tone] }}>{p.tag}</span>
                      </div>
                      <div className="mt-[3px] text-[12.5px] text-text2">{p.action}</div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="font-mono text-[13.5px] font-semibold text-text2">{proj?.potential}</div>
                      <div className="text-[10.5px] text-text3">{p.eta}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>

          {/* PORTFOLIO OVERVIEW */}
          <Card className="p-[20px_22px]">
            <SectionHeader title="Portfolio" action={<Link href="/portfolio" className="text-[12px] font-medium text-accent2">Details →</Link>} />
            <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2">
              {ventures.map((b) => (
                <div key={b.id} className="rounded-[14px] border border-border bg-bg2 p-[16px]">
                  <div className="mb-1 flex items-center gap-2">
                    <Dot color={b.color} size={9} glow={false} />
                    <span className="text-[13.5px] font-semibold leading-[1.2]">{b.short}</span>
                  </div>
                  <div className="mb-[14px] text-[11px] text-text3">{b.projectCount} projects · Health {b.healthScore}</div>
                  <div className="mb-[6px]">
                    <ProgressBar value={b.progress} color={`linear-gradient(90deg, ${b.color}, ${b.color2})`} height={7} glow={false} />
                  </div>
                  <div className="flex justify-between text-[11px] text-text2">
                    <span>{b.progress}% complete</span>
                    <span className="font-mono text-text">{b.revenue}</span>
                  </div>
                  <div className="mt-3 border-t border-border pt-[11px] text-[11.5px] text-text2">
                    <span className="text-text3">Next:</span> {b.milestone}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT RAIL */}
        <div className="flex flex-col gap-[22px]">
          <Card className="p-[20px_22px]">
            <div className="mb-[15px] flex items-center gap-[9px]">
              <span className="text-[15px] font-bold tracking-[-0.01em]">AI Alerts</span>
              <span className="animate-blink h-[6px] w-[6px] rounded-full" style={{ background: "var(--color-red)" }} />
            </div>
            <div className="flex flex-col gap-[10px]">
              {alerts.map((a, i) => (
                <div key={i} className="flex gap-[11px] rounded-[12px] p-[12px]" style={{ background: toneDim[a.tone], border: `1px solid ${toneColor[a.tone]}33` }}>
                  <span className="shrink-0 text-[14px] leading-[1.35]">{a.severity === "star" ? "⭐" : "⚠️"}</span>
                  <div className="text-[12.5px] leading-[1.45] text-text">{a.text}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-[20px_22px]">
            <div className="mb-[15px] flex items-center justify-between">
              <span className="text-[15px] font-bold tracking-[-0.01em]">Today&apos;s Meetings</span>
              <Link href="/meetings" className="text-[12px] font-medium text-accent2">All →</Link>
            </div>
            <div className="flex flex-col">
              {agenda.map((m, i) => (
                <Link key={i} href="/meetings" className="flex gap-[13px] border-b border-border py-[12px] last:border-0">
                  <div className="w-[46px] shrink-0 pt-[1px] font-mono text-[12.5px] font-semibold text-accent2">{m.time}</div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold">{m.title}</div>
                    <div className="mt-[2px] text-[11.5px] text-text3">{m.attendees}</div>
                  </div>
                  {m.revenue ? <span className="self-center rounded-full bg-greendim px-[8px] py-[2px] text-[10px] font-semibold text-green">{m.revenue}</span> : null}
                </Link>
              ))}
            </div>
          </Card>

          <div className="relative overflow-hidden rounded-[18px] border p-[20px_22px]" style={{ borderColor: "rgba(52,211,153,0.28)", background: "linear-gradient(150deg, rgba(52,211,153,0.13), rgba(52,211,153,0.02))" }}>
            <div className="mb-2 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-green">Today&apos;s Revenue Opportunity</div>
            <div className="mb-1 text-[15px] font-semibold">삼산병원 · Paid Diagnosis</div>
            <div className="mb-[14px] text-[12.5px] leading-[1.5] text-text2">Highest-conviction conversion. Send the Paid Diagnosis proposal within 48 hours before the window closes.</div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[26px] font-semibold text-green">₩30,000,000</span>
              <span className="text-[11px] text-text3">est. contract</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
