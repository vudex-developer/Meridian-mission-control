import Link from "next/link";
import { Card } from "@/components/ui/primitives";
import { StackedBars } from "@/components/ui/charts";
import { Icon } from "@/components/ui/Icon";
import { toneColor } from "@/lib/tokens";
import { funnel, revenueKpis, monthlyRevenue } from "@/data/seed";

const funnelBg: Record<string, { bg: string; border: string }> = {
  neutral: { bg: "var(--color-bg2)", border: "var(--color-border)" },
  accent: { bg: "rgba(76,130,251,0.1)", border: "rgba(76,130,251,0.26)" },
  violet: { bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.28)" },
  green: { bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.3)" },
};

export default function RevenuePage() {
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-[22px] px-[28px] pb-[56px] pt-[26px]">
      {/* FREE CONSULTING WARNING */}
      <div
        className="animate-up flex items-center gap-[14px] rounded-[16px] border p-[16px_20px]"
        style={{ borderColor: "rgba(245,184,69,0.3)", background: "linear-gradient(120deg, rgba(245,184,69,0.12), transparent)" }}
      >
        <span className="text-[20px]">⚠️</span>
        <div className="flex-1">
          <div className="text-[14px] font-semibold">Free Consulting ratio is 31% — above your 20% ceiling.</div>
          <div className="mt-[2px] text-[12.5px] text-text2">삼산병원 (21 days) and Zabara (16 days) are consuming unpaid capacity. Convert or exit them this week.</div>
        </div>
        <Link href="/coo" className="rounded-[10px] px-[15px] py-[8px] text-[12.5px] font-bold" style={{ background: "var(--color-amber)", color: "#1a1200" }}>Fix now</Link>
      </div>

      {/* FUNNEL */}
      <Card radius={20} className="p-[24px]">
        <div className="mb-[22px] flex items-center justify-between">
          <div>
            <div className="text-[16px] font-bold tracking-[-0.01em]">Revenue Engine</div>
            <div className="mt-[2px] text-[12px] text-text3">From meetings to revenue — every project must move right.</div>
          </div>
          <div className="font-mono text-[12px] text-text2">Pipeline ₩640M</div>
        </div>
        <div className="flex items-stretch gap-[6px] overflow-x-auto pb-1">
          {funnel.map((s, i) => {
            const c = funnelBg[s.tone];
            return (
              <div key={s.name} className="flex min-w-[150px] flex-1 items-center gap-[6px]">
                <div className="flex min-h-[126px] flex-1 flex-col rounded-[14px] border p-[16px_15px]" style={{ borderColor: c.border, background: c.bg }}>
                  <div className="text-[11px] font-semibold uppercase leading-[1.3] tracking-[0.04em]" style={{ color: toneColor[s.tone] }}>{s.name}</div>
                  <div className="m-[8px_0_2px] font-mono text-[28px] font-semibold">{s.count}</div>
                  <div className="text-[11px] text-text3">projects</div>
                  <div className="mt-auto pt-[10px] font-mono text-[13px] font-semibold" style={{ color: toneColor[s.tone] }}>{s.value}</div>
                </div>
                {i < funnel.length - 1 ? (
                  <Icon path="M5 12h14M13 6l6 6-6 6" size={16} width={2} color="var(--color-text2)" className="shrink-0 opacity-40" />
                ) : null}
              </div>
            );
          })}
        </div>
      </Card>

      {/* REVENUE KPIs */}
      <div className="grid grid-cols-2 gap-[14px] lg:grid-cols-4">
        {revenueKpis.map((k) => (
          <Card key={k.label} radius={16} className="p-[17px_18px]">
            <div className="mb-[9px] text-[11.5px] text-text2">{k.label}</div>
            <div className="font-mono text-[22px] font-semibold tracking-[-0.02em]">{k.value}</div>
            <div className="mt-[6px] text-[11px] font-medium" style={{ color: toneColor[k.tone] }}>{k.delta}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 items-start gap-[22px] lg:grid-cols-[1.4fr_1fr]">
        {/* MONTHLY REVENUE */}
        <Card className="p-[22px_24px]">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-[15px] font-bold">Monthly Revenue</span>
            <div className="flex gap-[14px] text-[11px] text-text2">
              <span className="flex items-center gap-[6px]"><span className="h-[9px] w-[9px] rounded-[2px]" style={{ background: "var(--color-accent)" }} />Contract</span>
              <span className="flex items-center gap-[6px]"><span className="h-[9px] w-[9px] rounded-[2px]" style={{ background: "var(--color-green)" }} />Operation</span>
            </div>
          </div>
          <StackedBars data={monthlyRevenue} />
        </Card>

        {/* FREE CONSULTING RATIO */}
        <Card className="flex flex-col p-[22px_24px]">
          <span className="mb-[18px] text-[15px] font-bold">Free Consulting Ratio</span>
          <div className="relative mx-auto h-[150px] w-[150px]">
            <svg width="150" height="150" viewBox="0 0 150 150" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="75" cy="75" r="62" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="13" />
              <circle cx="75" cy="75" r="62" fill="none" stroke="var(--color-amber)" strokeWidth="13" strokeLinecap="round" strokeDasharray="121 999" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="font-mono text-[30px] font-semibold text-amber">31%</div>
              <div className="text-[10px] text-text3">of capacity</div>
            </div>
          </div>
          <div className="mt-4 text-center text-[12px] leading-[1.5] text-text2">
            Target ceiling <strong className="text-text">20%</strong>. AI flags every project unpaid beyond 14 days.
          </div>
        </Card>
      </div>
    </div>
  );
}
