import { Card } from "@/components/ui/primitives";
import { documents } from "@/data/seed";

const statusTone: Record<string, { color: string; bg: string }> = {
  Signed: { color: "var(--color-green)", bg: "var(--color-greendim)" },
  Draft: { color: "var(--color-amber)", bg: "var(--color-amberdim)" },
  Sent: { color: "var(--color-accent2)", bg: "var(--color-accentdim)" },
  Review: { color: "var(--color-violet)", bg: "var(--color-violetdim)" },
};

export default function DocumentsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-[28px] pb-[56px] pt-[26px]">
      <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((d) => {
          const t = statusTone[d.status];
          return (
            <Card key={d.name} radius={16} className="p-[18px_20px]">
              <div className="mb-[14px] flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-[9px]" style={{ background: t.bg, color: t.color }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5ZM14 3v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
                </span>
                <span className="rounded-full px-[9px] py-[3px] text-[10.5px] font-semibold" style={{ background: t.bg, color: t.color }}>{d.status}</span>
              </div>
              <div className="mb-[3px] text-[14px] font-semibold">{d.name}</div>
              <div className="text-[12px] text-text3">{d.project} · {d.type}</div>
              <div className="mt-[14px] flex justify-between border-t border-border pt-3 text-[11.5px] text-text3">
                <span>{d.date}</span>
                <span className="font-mono text-text2">{d.value}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
