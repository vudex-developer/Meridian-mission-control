"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, ProgressBar } from "@/components/ui/primitives";
import { healthMap } from "@/lib/tokens";
import { projectById } from "@/data/seed";

const docStatusColor: Record<string, string> = {
  Signed: "var(--color-green)",
  "Ready to send": "var(--color-green)",
  Draft: "var(--color-amber)",
  "Needs revision": "var(--color-amber)",
  "In review": "var(--color-amber)",
  Shared: "var(--color-text2)",
  Sent: "var(--color-accent2)",
};

function radar(scores: number[]) {
  const cx = 100, cy = 100, rMax = 78;
  const angs = [-90, 30, 150].map((d) => (d * Math.PI) / 180);
  const pt = (ang: number, r: number) => ({
    x: +(cx + Math.cos(ang) * r).toFixed(1),
    y: +(cy + Math.sin(ang) * r).toFixed(1),
  });
  const rings = [0.25, 0.5, 0.75, 1].map((f) => angs.map((a) => { const p = pt(a, rMax * f); return `${p.x},${p.y}`; }).join(" "));
  const axes = angs.map((a) => pt(a, rMax));
  const dots = angs.map((a, i) => pt(a, (rMax * scores[i]) / 100));
  const poly = dots.map((p) => `${p.x},${p.y}`).join(" ");
  return { rings, axes, dots, poly };
}

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const p = projectById(params.id);

  if (!p) {
    return (
      <div className="mx-auto max-w-[1200px] px-[28px] pt-[40px]">
        <div className="text-[15px] text-text2">Project not found.</div>
        <Link href="/projects" className="mt-3 inline-block text-[13px] text-accent2">← All projects</Link>
      </div>
    );
  }

  const h = healthMap[p.health];
  const r = radar([p.healthScore, p.opportunityScore, p.revenueScore]);

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-[20px] px-[28px] pb-[56px] pt-[22px]">
      <Link href="/projects" className="flex w-fit items-center gap-[7px] text-[12.5px] text-text2">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
        All projects
      </Link>

      <div className="flex flex-wrap items-start gap-4">
        <div className="min-w-[280px] flex-1">
          <div className="flex items-center gap-3">
            <h1 className="m-0 text-[26px] font-bold tracking-[-0.02em]">{p.name}</h1>
            <span className="rounded-full px-[10px] py-[3px] text-[11.5px] font-semibold" style={{ background: h.dim, color: h.color }}>{h.label}</span>
          </div>
          <div className="mt-[5px] text-[13px] text-text3">{p.venture} · Owner {p.owner} · Stage {p.stage}</div>
        </div>
      </div>

      {/* AI RECOMMENDATION */}
      <div className="flex gap-4 rounded-[16px] border p-[20px_22px]" style={{ borderColor: "rgba(76,130,251,0.24)", background: "linear-gradient(120deg, rgba(76,130,251,0.12), transparent)" }}>
        <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px]" style={{ background: "linear-gradient(140deg,#7DA6FF,#3E63C7)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5.5" stroke="#fff" strokeWidth="1.6" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </div>
        <div className="flex-1">
          <div className="mb-[6px] text-[12px] font-semibold uppercase tracking-[0.06em] text-accent2">AI COO Recommendation</div>
          <p className="m-0 text-[14px] leading-[1.6] text-text">{p.aiRec}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-[20px] lg:grid-cols-[1.55fr_1fr]">
        <div className="flex flex-col gap-[20px]">
          {/* SCORES + RADAR */}
          <Card radius={16} className="flex items-center gap-[22px] p-[20px_22px]">
            <div className="relative shrink-0">
              <svg width="150" height="150" viewBox="0 0 200 200">
                {r.rings.map((pts, i) => (<polygon key={i} points={pts} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />))}
                {r.axes.map((a, i) => (<line key={i} x1="100" y1="100" x2={a.x} y2={a.y} stroke="rgba(255,255,255,0.09)" strokeWidth="1" />))}
                <polygon points={r.poly} fill="rgba(76,130,251,0.22)" stroke="var(--color-accent)" strokeWidth="2" style={{ filter: "drop-shadow(0 0 4px rgba(76,130,251,0.5))" }} />
                {r.dots.map((d, i) => (<circle key={i} cx={d.x} cy={d.y} r="3.5" fill="var(--color-accent2)" />))}
              </svg>
            </div>
            <div className="flex flex-1 flex-col gap-[14px]">
              <ScoreRow label="Health Score" value={p.healthScore} color={h.color} />
              <ScoreRow label="Opportunity Score" value={p.opportunityScore} color="var(--color-accent)" valueColor="var(--color-accent2)" />
              <ScoreRow label="Revenue Score" value={p.revenueScore} color="var(--color-green)" valueColor="var(--color-green)" />
            </div>
          </Card>

          {/* PROGRESS TIMELINE */}
          <Card radius={16} className="p-[20px_22px]">
            <div className="mb-5 text-[14px] font-bold">Progress Timeline</div>
            <div className="flex items-start">
              {p.stages.map((st, i) => {
                const dotBg = st.done ? "var(--color-accent)" : st.active ? "rgba(76,130,251,0.15)" : "var(--color-bg2)";
                const dotBorder = st.done || st.active ? "var(--color-accent)" : "var(--color-border2)";
                const dotInner = st.done ? "#fff" : st.active ? "var(--color-accent2)" : "transparent";
                const textColor = st.active ? "var(--color-text)" : st.done ? "var(--color-text2)" : "var(--color-text3)";
                return (
                  <div key={i} className="relative flex flex-1 flex-col items-center text-center">
                    {i < p.stages.length - 1 && <div className="absolute left-1/2 top-[9px] z-0 h-[2px] w-full" style={{ background: "var(--color-border)" }} />}
                    <div className="relative z-[1] flex h-[19px] w-[19px] items-center justify-center rounded-full" style={{ background: dotBg, border: `2px solid ${dotBorder}` }}>
                      <span className="h-[7px] w-[7px] rounded-full" style={{ background: dotInner }} />
                    </div>
                    <div className="mt-[9px] text-[11px]" style={{ color: textColor, fontWeight: st.active ? 700 : 500 }}>{st.name}</div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* MEETINGS */}
          <Card radius={16} className="p-[20px_22px]">
            <div className="mb-[14px] text-[14px] font-bold">Meetings</div>
            {p.meetings.map((m, i) => (
              <div key={i} className="flex gap-[14px] border-b border-border py-[11px] last:border-0">
                <div className="w-[54px] shrink-0 font-mono text-[12px] text-text3">{m.d}</div>
                <div className="flex-1 text-[13px] font-medium">{m.t}</div>
                <div className="text-[12px] text-text3">{m.o}</div>
              </div>
            ))}
          </Card>

          {/* DOCUMENTS */}
          <Card radius={16} className="p-[20px_22px]">
            <div className="mb-[14px] text-[14px] font-bold">Documents</div>
            <div className="flex flex-col gap-[9px]">
              {p.documents.map((d, i) => (
                <div key={i} className="flex items-center gap-[11px] rounded-[11px] border border-border bg-bg2 p-[11px_13px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: "var(--color-text3)" }}><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5ZM14 3v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
                  <span className="flex-1 text-[13px] font-medium">{d.n}</span>
                  <span className="text-[11px] font-semibold" style={{ color: docStatusColor[d.s] ?? "var(--color-text2)" }}>{d.s}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT RAIL */}
        <div className="flex flex-col gap-[20px]">
          <div className="rounded-[16px] border p-[18px_20px]" style={{ borderColor: "rgba(52,211,153,0.26)", background: "linear-gradient(150deg, rgba(52,211,153,0.11), transparent)" }}>
            <div className="mb-2 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-green">Revenue Status</div>
            <div className="mb-1 text-[14px] font-semibold">{p.revStatus}</div>
            <div className="font-mono text-[24px] font-semibold text-green">{p.potential}</div>
            <div className="mt-[2px] text-[11.5px] text-text3">potential contract value</div>
          </div>

          <Card radius={16} className="p-[18px_20px]">
            <div className="mb-3 text-[13px] font-bold">Partners</div>
            <div className="flex flex-wrap gap-2">
              {p.partners.map((pt) => (
                <span key={pt} className="rounded-full border border-border2 bg-bg2 px-[11px] py-[5px] text-[12px] text-text2">{pt}</span>
              ))}
            </div>
          </Card>

          <Card radius={16} className="p-[18px_20px]">
            <div className="mb-3 text-[13px] font-bold">Risks</div>
            <div className="flex flex-col gap-[10px]">
              {p.risks.map((rk, i) => (
                <div key={i} className="flex items-start gap-[10px]">
                  <span className="mt-[5px] h-[6px] w-[6px] shrink-0 rounded-full" style={{ background: "var(--color-red)" }} />
                  <div className="flex-1">
                    <div className="text-[12.5px] text-text">{rk.text}</div>
                    <div className="text-[11px] text-text3">{rk.level} severity</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Link href="/graph" className="rounded-[16px] border border-border bg-surface p-[18px_20px]">
            <div className="flex items-center justify-between">
              <div className="text-[13px] font-bold">Relationship Graph</div>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="var(--color-text3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="mt-[6px] text-[12px] text-text3">See how this project connects to partners, investors &amp; meetings.</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ScoreRow({ label, value, color, valueColor }: { label: string; value: number; color: string; valueColor?: string }) {
  return (
    <div>
      <div className="mb-[5px] flex justify-between text-[12px]">
        <span className="text-text2">{label}</span>
        <span className="font-mono font-semibold" style={{ color: valueColor ?? color }}>{value}</span>
      </div>
      <ProgressBar value={value} color={color} glow={false} />
    </div>
  );
}
