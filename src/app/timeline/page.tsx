import { Card } from "@/components/ui/primitives";
import { toneColor, ventureColor } from "@/lib/tokens";
import { timelineDays, timelineEvents, milestones } from "@/data/seed";

const toneBg: Record<string, string> = {
  accent: "rgba(76,130,251,0.16)",
  violet: "rgba(167,139,250,0.16)",
  green: "rgba(52,211,153,0.16)",
  amber: "rgba(245,184,69,0.16)",
  red: "rgba(247,111,111,0.16)",
};

export default function TimelinePage() {
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-[20px] px-[28px] pb-[56px] pt-[26px]">
      <Card className="p-[22px_24px]">
        <div className="mb-[18px] flex items-center justify-between">
          <span className="text-[15px] font-bold">This Week</span>
          <span className="font-mono text-[12px] text-text3">Jun 30 – Jul 7, 2026</span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {timelineDays.map((d) => (
            <div key={d} className="pb-[6px] text-center text-[11.5px] font-semibold text-text3">{d}</div>
          ))}
        </div>
        <div className="relative grid h-[360px] grid-cols-7 gap-2">
          {timelineDays.map((d) => (
            <div key={d} className="rounded-[10px] border border-border bg-bg2" />
          ))}
          {timelineEvents.map((e, i) => (
            <div
              key={i}
              className="absolute overflow-hidden rounded-[9px] p-[7px_9px]"
              style={{
                left: `calc(${((e.day / 7) * 100).toFixed(3)}% + 3px)`,
                width: `calc(${(100 / 7).toFixed(3)}% - 6px)`,
                top: `${e.top}%`,
                height: `${e.h}%`,
                background: toneBg[e.tone],
                border: `1px solid ${toneColor[e.tone]}`,
                borderLeft: `3px solid ${toneColor[e.tone]}`,
              }}
            >
              <div className="font-mono text-[10px] font-semibold" style={{ color: toneColor[e.tone] }}>{e.time}</div>
              <div className="mt-[2px] text-[11.5px] font-semibold leading-[1.25] text-text">{e.title}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-[22px_24px]">
        <div className="mb-[18px] text-[15px] font-bold">Milestone Timeline</div>
        <div className="flex flex-col">
          {milestones.map((m, i) => (
            <div key={i} className="flex items-center gap-4 border-b border-border py-[13px] last:border-0">
              <div className="w-[62px] shrink-0 font-mono text-[12.5px] font-semibold text-text">{m.date}</div>
              <span className="h-[11px] w-[11px] shrink-0 rounded-full" style={{ background: ventureColor[m.venture], boxShadow: "0 0 0 4px rgba(255,255,255,0.04)" }} />
              <div className="flex-1">
                <div className="text-[13.5px] font-semibold">{m.label}</div>
                <div className="text-[11.5px] text-text3">{m.venture}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
