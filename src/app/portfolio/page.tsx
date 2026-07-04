import Link from "next/link";
import { Card } from "@/components/ui/primitives";
import { healthMap } from "@/lib/tokens";
import { ventures, projects } from "@/data/seed";

const spark: Record<string, { area: string; line: string; grad: string; stroke: string }> = {
  senior: {
    area: "M0 44 L50 40 L100 34 L150 30 L200 22 L250 18 L300 10 L300 56 L0 56 Z",
    line: "M0 44 L50 40 L100 34 L150 30 L200 22 L250 18 L300 10",
    grad: "pfA",
    stroke: "#4C82FB",
  },
  gateway: {
    area: "M0 40 L50 42 L100 34 L150 36 L200 28 L250 30 L300 20 L300 56 L0 56 Z",
    line: "M0 40 L50 42 L100 34 L150 36 L200 28 L250 30 L300 20",
    grad: "pfB",
    stroke: "#A78BFA",
  },
};

export default function PortfolioPage() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-[20px] px-[28px] pb-[56px] pt-[26px]">
      <div className="grid grid-cols-1 gap-[20px] lg:grid-cols-2">
        {ventures.map((v) => {
          const members = projects.filter((p) => p.venture === (v.id === "senior" ? "Senior Residence" : "Healthcare Gateway"));
          const s = spark[v.id];
          const arc = Math.round((2 * Math.PI * 44 * v.progress) / 100);
          return (
            <Card key={v.id} radius={20} className="flex flex-col gap-[18px] p-[24px]">
              <div className="flex items-center gap-[20px]">
                <div className="relative h-[104px] w-[104px] shrink-0">
                  <svg width="104" height="104" viewBox="0 0 104 104" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="52" cy="52" r="44" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="9" />
                    <circle cx="52" cy="52" r="44" fill="none" stroke={v.color} strokeWidth="9" strokeLinecap="round" strokeDasharray={`${arc} 999`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-[22px] font-semibold">{v.progress}%</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="h-[10px] w-[10px] rounded-[3px]" style={{ background: v.color }} />
                    <span className="text-[16px] font-bold leading-[1.2]">{v.name}</span>
                  </div>
                  <div className="mt-[6px] text-[12.5px] text-text3">{v.projectCount} projects · Health {v.healthScore}/100</div>
                  <div className="mt-[14px] flex gap-[22px]">
                    <div>
                      <div className="text-[10px] uppercase text-text3">Revenue</div>
                      <div className="font-mono text-[17px] font-semibold text-text2">{v.revenue}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-text3">Next milestone</div>
                      <div className="mt-[2px] text-[13px] font-semibold">{v.milestone}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[56px]">
                <svg width="100%" height="56" viewBox="0 0 300 56" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id={s.grad} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor={s.stroke} stopOpacity="0.32" />
                      <stop offset="1" stopColor={s.stroke} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={s.area} fill={`url(#${s.grad})`} />
                  <path d={s.line} fill="none" stroke={s.stroke} strokeWidth="2" />
                </svg>
              </div>
              <div className="flex flex-col gap-2 border-t border-border pt-[14px]">
                {members.map((p) => {
                  const h = healthMap[p.health];
                  return (
                    <Link key={p.id} href={`/projects/${p.id}`} className="row-hover flex items-center gap-[11px] rounded-[10px] p-[9px_11px]">
                      <span className="flex-1 text-[13px] font-medium">{p.name}</span>
                      <span className="text-[11px] text-text3">{p.stage}</span>
                      <span className="rounded-full px-[8px] py-[2px] text-[11px] font-semibold" style={{ background: h.dim, color: h.color }}>{p.healthScore}</span>
                    </Link>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
