import { Card } from "@/components/ui/primitives";
import { meetingList, actionItems } from "@/data/seed";

const waveBars = Array.from({ length: 46 }, (_, i) => ({
  delay: (i * 0.055).toFixed(2),
  h: 16 + Math.round(Math.abs(Math.sin(i * 0.8) + Math.sin(i * 0.31)) * 42),
}));

export default function MeetingsPage() {
  return (
    <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-[20px] px-[28px] pb-[56px] pt-[26px] lg:grid-cols-[290px_1fr]">
      {/* LEFT */}
      <div className="flex flex-col gap-4">
        <div className="rounded-[16px] border p-[18px]" style={{ borderColor: "rgba(247,111,111,0.28)", background: "linear-gradient(150deg, rgba(247,111,111,0.1), transparent)" }}>
          <div className="mb-3 flex items-center gap-[10px]">
            <span className="animate-blink h-[10px] w-[10px] rounded-full" style={{ background: "var(--color-red)" }} />
            <span className="text-[12.5px] font-semibold">Recording · 12:04</span>
          </div>
          <div className="mb-3 flex h-[38px] items-center gap-[2px]">
            {waveBars.map((w, i) => (
              <div key={i} className="flex-1 rounded-[2px]" style={{ height: `${w.h}%`, background: "var(--color-red)", opacity: 0.85, transformOrigin: "center", animation: `mc-wave 0.9s ease-in-out infinite`, animationDelay: `-${w.delay}s` }} />
            ))}
          </div>
          <div className="text-[11.5px] text-text2">AI is transcribing &amp; extracting decisions live.</div>
        </div>
        <Card radius={16} className="p-2">
          {meetingList.map((m) => (
            <div key={m.id} className="mb-[2px] flex cursor-pointer gap-3 rounded-[11px] p-[12px]" style={{ background: m.active ? "var(--color-surfacehi)" : "transparent" }}>
              <div className="w-[44px] shrink-0 pt-[1px] font-mono text-[11.5px] font-semibold" style={{ color: m.active ? "var(--color-accent2)" : "var(--color-text3)" }}>{m.time}</div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold">{m.title}</div>
                <div className="mt-[2px] text-[11px] text-text3">{m.attendees}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col gap-[18px]">
        <Card className="p-[22px_24px]">
          <div className="mb-1 flex items-center justify-between">
            <h1 className="m-0 text-[20px] font-bold tracking-[-0.01em]">삼산병원 diagnosis scoping</h1>
            <span className="rounded-full bg-greendim px-[10px] py-[3px] text-[11px] font-semibold text-green">AI Summarized</span>
          </div>
          <div className="mb-[18px] text-[12.5px] text-text3">Today · 09:30 · Luke, Dr. Park</div>
          <div className="mb-2 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-text3">Summary</div>
          <p className="m-0 mb-5 text-[14px] leading-[1.65] text-text2">
            Dr. Park confirmed the clinical need for a structured diagnostic engagement and validated budget authority for Q3. Three prior free workshops have established trust; the champion is ready to move to a paid engagement but needs a formal scope document. Pricing anchor discussed at ₩30M for the diagnosis phase.
          </p>
          <div className="mb-5 grid grid-cols-1 gap-[14px] md:grid-cols-2">
            <div className="rounded-[12px] border border-border bg-bg2 p-[14px_16px]">
              <div className="mb-[6px] text-[10.5px] uppercase tracking-[0.06em] text-text3">Decision</div>
              <div className="text-[13.5px] font-semibold">Move 삼산병원 to Paid Diagnosis.</div>
            </div>
            <div className="rounded-[12px] border p-[14px_16px]" style={{ background: "var(--color-greendim)", borderColor: "rgba(52,211,153,0.22)" }}>
              <div className="mb-[6px] text-[10.5px] uppercase tracking-[0.06em] text-green">Revenue Opportunity</div>
              <div className="font-mono text-[18px] font-semibold text-green">₩30,000,000</div>
            </div>
          </div>
          <div className="mb-3 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-text3">Action Items</div>
          <div className="flex flex-col">
            {actionItems.map((a, i) => (
              <div key={i} className="flex items-center gap-[13px] border-b border-border py-[11px] last:border-0">
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[6px]" style={{ border: `1.5px solid ${a.done ? "var(--color-green)" : "var(--color-border2)"}`, background: a.done ? "var(--color-green)" : "transparent" }}>
                  {a.done ? (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#06090F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  ) : null}
                </span>
                <span className="flex-1 text-[13px]" style={{ color: a.done ? "var(--color-text3)" : "var(--color-text)", textDecoration: a.done ? "line-through" : "none" }}>{a.task}</span>
                <span className="text-[11.5px] text-text3">{a.owner}</span>
                <span className="w-[44px] shrink-0 text-right font-mono text-[11.5px] text-text2">{a.due}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex items-center gap-[14px] rounded-[16px] border p-[18px_20px]" style={{ borderColor: "rgba(76,130,251,0.24)", background: "linear-gradient(120deg, rgba(76,130,251,0.11), transparent)" }}>
          <div className="flex-1">
            <div className="mb-[6px] text-[11.5px] font-semibold uppercase tracking-[0.06em] text-accent2">AI Follow-up Recommendation</div>
            <div className="text-[13.5px] leading-[1.5] text-text">Proposal needed. Send the Paid Diagnosis proposal within 48h and schedule the kickoff before the Q3 budget locks.</div>
          </div>
          <button className="shrink-0 rounded-[10px] bg-accent px-4 py-[9px] text-[12.5px] font-semibold text-white">Generate proposal</button>
        </div>
      </div>
    </div>
  );
}
