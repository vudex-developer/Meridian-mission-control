import { graphNodes, graphEdges, graphLegend, graphTypeColor } from "@/data/seed";

const VW = 1000;
const VH = 600;

export default function GraphPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-[28px] pb-[56px] pt-[26px]">
      <div
        className="relative h-[640px] overflow-hidden rounded-[20px] border border-border"
        style={{ background: "radial-gradient(700px 400px at 50% 42%, rgba(76,130,251,0.06), transparent), var(--color-surface)" }}
      >
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
          {graphEdges.map(([a, b], i) => {
            const na = graphNodes[a];
            const nb = graphNodes[b];
            return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="rgba(125,166,255,0.16)" strokeWidth="1.4" />;
          })}
        </svg>

        {graphNodes.map((n) => (
          <div
            key={n.id}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-[24px] border border-border2 p-[7px_13px_7px_9px] backdrop-blur-[4px]"
            style={{ left: `${(n.x / VW) * 100}%`, top: `${(n.y / VH) * 100}%`, background: "rgba(15,22,38,0.9)" }}
          >
            <span
              className="rounded-full"
              style={{ width: n.big ? 15 : 11, height: n.big ? 15 : 11, background: graphTypeColor[n.type], boxShadow: `0 0 10px ${graphTypeColor[n.type]}` }}
            />
            <span style={{ fontSize: n.big ? 12.5 : 11, fontWeight: n.big ? 700 : 500, color: "var(--color-text)" }}>{n.label}</span>
          </div>
        ))}

        <div className="absolute bottom-[18px] left-[18px] flex flex-wrap gap-[14px] rounded-[12px] border border-border p-[12px_16px]" style={{ background: "rgba(10,15,26,0.8)" }}>
          {graphLegend.map((g) => (
            <span key={g.l} className="flex items-center gap-[7px] text-[11.5px] text-text2">
              <span className="h-[9px] w-[9px] rounded-full" style={{ background: g.c }} />
              {g.l}
            </span>
          ))}
        </div>
        <div className="absolute right-[20px] top-[18px] text-[11.5px] text-text3">13 entities · 19 relationships · auto-linked</div>
      </div>
    </div>
  );
}
