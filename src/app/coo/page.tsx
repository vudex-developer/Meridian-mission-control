"use client";

import Link from "next/link";
import { useApp } from "@/lib/app-context";
import { Card } from "@/components/ui/primitives";
import { toneColor, toneDim } from "@/lib/tokens";
import { recommendations, coaching, decisions } from "@/data/seed";

export default function CooPage() {
  const { persona, founder } = useApp();
  const isLuke = persona === "luke";
  const recs = recommendations[persona];

  return (
    <div className="mx-auto flex max-w-[1120px] flex-col gap-[22px] px-[28px] pb-[56px] pt-[26px]">
      {/* HERO */}
      <div
        className="animate-up relative overflow-hidden rounded-[22px] border p-[28px_30px]"
        style={{ borderColor: "rgba(76,130,251,0.24)", background: "linear-gradient(120deg, rgba(76,130,251,0.15), rgba(167,139,250,0.08))" }}
      >
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative flex items-center gap-[24px]">
          <div className="relative h-[84px] w-[84px] shrink-0">
            <span className="animate-pulse-mc absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }} />
            <div className="absolute inset-[14px] flex items-center justify-center rounded-full" style={{ background: "linear-gradient(140deg,#7DA6FF,#3E63C7)", boxShadow: "0 8px 26px rgba(76,130,251,0.5)" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="12" r="5.5" stroke="#fff" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="1.8" fill="#fff" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-[11.5px] font-semibold uppercase tracking-[0.08em] text-accent2">AI Chief Operating Officer</div>
            <h1 className="m-[8px_0_6px] text-[24px] font-bold tracking-[-0.02em]">Good morning, {founder.name}. Here&apos;s where to push today.</h1>
            {isLuke ? (
              <p className="m-0 text-[14px] leading-[1.55] text-text2">
                Execution score <strong className="text-text">71%</strong> · Pipeline <strong className="text-text">₩640M</strong> · Free Consulting ratio <strong className="text-amber">31%</strong> — above target. I&apos;ve ranked three execution moves by revenue impact.
              </p>
            ) : (
              <p className="m-0 text-[14px] leading-[1.55] text-text2">
                Deal score <strong className="text-text">68%</strong> · Pipeline <strong className="text-text">₩640M</strong> · Investment window <strong className="text-green">open</strong>. I&apos;ve ranked three business-development and capital moves by portfolio impact.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* RANKED RECOMMENDATIONS */}
      <div className="flex flex-col gap-[14px]">
        {recs.map((p) => {
          const rankBg = p.rank === 1 ? (isLuke ? "linear-gradient(140deg,#4C82FB,#2C5FD6)" : "linear-gradient(140deg,#A78BFA,#6D4FCF)") : "var(--color-surfacehi)";
          const rankColor = p.rank === 1 ? "#fff" : "var(--color-accent2)";
          return (
            <Card key={p.projectId} className="flex items-start gap-[20px] p-[22px_24px]">
              <div className="shrink-0 text-center">
                <div className="mb-[5px] text-[10px] uppercase tracking-[0.08em] text-text3">Priority</div>
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] font-mono text-[24px] font-semibold" style={{ background: rankBg, color: rankColor, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14)" }}>{p.rank}</div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-[10px]">
                  <span className="text-[18px] font-bold tracking-[-0.01em]">{p.title}</span>
                  <span className="rounded-full px-[9px] py-[2px] text-[10.5px] font-semibold" style={{ background: toneDim[p.tone], color: toneColor[p.tone] }}>{p.tag}</span>
                </div>
                <p className="m-[9px_0_14px] max-w-[640px] text-[14px] leading-[1.55] text-text2">{p.reason}</p>
                <div className="flex flex-wrap gap-[10px]">
                  <Link href={`/projects/${p.projectId}`} className="rounded-[10px] bg-accent px-[15px] py-[8px] text-[12.5px] font-semibold text-white">{p.cta}</Link>
                  <Link href={`/projects/${p.projectId}`} className="rounded-[10px] border border-border2 px-[15px] py-[8px] text-[12.5px] font-semibold text-text">Open project</Link>
                </div>
              </div>
              <div className="shrink-0 border-l border-border pl-[22px] text-right">
                <div className="mb-1 text-[10px] uppercase tracking-[0.07em] text-text3">Est. revenue</div>
                <div className="font-mono text-[20px] font-semibold text-green">{p.revenue}</div>
                <div className="mt-3 mb-1 text-[10px] uppercase tracking-[0.07em] text-text3">Confidence</div>
                <div className="font-mono text-[14px] font-semibold">{p.confidence}%</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* REVENUE COACHING */}
      <Card className="p-[22px_24px]">
        <div className="mb-[6px] text-[15px] font-bold">Revenue Coaching</div>
        <p className="m-0 mb-4 text-[13px] text-text3">I interrogate every project against one question: is there a clear, dated path to revenue?</p>
        <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2">
          {coaching.map((c) => (
            <div key={c.q} className="flex gap-[12px] rounded-[12px] border border-border bg-bg2 p-[14px_15px]">
              <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px]" style={{ background: toneDim[c.tone] }}>{c.icon}</span>
              <div>
                <div className="text-[13px] font-semibold">{c.q}</div>
                <div className="mt-[3px] text-[12px] leading-[1.45] text-text2">{c.a}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* DECISION LOG */}
      <Card className="p-[22px_24px]">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[15px] font-bold">Decision Log</span>
          <span className="text-[11.5px] text-text3">I remember every call you make.</span>
        </div>
        <div className="flex flex-col">
          {decisions.map((d, i) => (
            <div key={i} className="flex gap-[18px] border-b border-border py-[14px] last:border-0">
              <div className="w-[92px] shrink-0 pt-[2px] font-mono text-[12px] text-text3">{d.date}</div>
              <div className="flex-1">
                <div className="text-[13.5px] font-semibold">{d.decision}</div>
                <div className="mt-[3px] text-[12px] text-text2"><span className="text-text3">Reason:</span> {d.reason}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
