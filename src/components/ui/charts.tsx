// Lightweight inline SVG charts — no external chart lib, matching the concept.

export function Sparkline({ data, color }: { data: number[]; color: string }) {
  const mn = Math.min(...data);
  const mx = Math.max(...data);
  const rng = mx - mn || 1;
  const pts = data
    .map((v, i) => `${((i / (data.length - 1)) * 64).toFixed(1)},${(20 - ((v - mn) / rng) * 18).toFixed(1)}`)
    .join(" ");
  return (
    <svg width="100%" height="22" viewBox="0 0 64 22" preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
    </svg>
  );
}

export function AreaChart({ data, max = 220 }: { data: number[]; max?: number }) {
  const W = 640;
  const H = 150;
  const pts = data.map((v, i) => ({
    x: +((i / (data.length - 1)) * W).toFixed(1),
    y: +(H - (v / max) * H).toFixed(1),
  }));
  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `0,${H} ${line} ${W},${H}`;
  return (
    <svg width="100%" height="150" viewBox="0 0 640 150" preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id="rtGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(76,130,251,0.34)" />
          <stop offset="1" stopColor="rgba(76,130,251,0)" />
        </linearGradient>
      </defs>
      <line x1="0" y1="37.5" x2="640" y2="37.5" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <line x1="0" y1="75" x2="640" y2="75" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <line x1="0" y1="112.5" x2="640" y2="112.5" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <polygon points={area} fill="url(#rtGrad)" />
      <polyline
        points={line}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 2px 6px rgba(76,130,251,0.4))" }}
      />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--color-bg)" stroke="var(--color-accent2)" strokeWidth="2" />
      ))}
    </svg>
  );
}

export function Donut({
  segments,
  size = 126,
  stroke = 15,
  centerTop,
  centerBottom,
}: {
  segments: { pct: number; color: string }[];
  size?: number;
  stroke?: number;
  centerTop?: string;
  centerBottom?: string;
}) {
  const r = size / 2 - stroke / 2 - 4;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div style={{ position: "relative", width: size, height: size, flex: "0 0 auto" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
        {segments.map((s, i) => {
          const len = (s.pct / 100) * c;
          const dash = `${len} ${c - len}`;
          const offset = (-acc / 100) * c;
          acc += s.pct;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={dash}
              strokeDashoffset={offset}
              style={{ filter: `drop-shadow(0 0 3px ${s.color})` }}
            />
          );
        })}
      </svg>
      {(centerTop || centerBottom) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerTop && <div className="font-mono text-[19px] font-semibold">{centerTop}</div>}
          {centerBottom && (
            <div className="text-[9.5px] uppercase tracking-[0.06em] text-text3">{centerBottom}</div>
          )}
        </div>
      )}
    </div>
  );
}

export function RingGauge({ value, size = 132, stroke = 11 }: { value: number; size?: number; stroke?: number }) {
  const r = size / 2 - stroke / 2 - 4;
  const c = 2 * Math.PI * r;
  const arc = (value / 100) * c;
  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#gaugeG)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${arc} 999`}
          style={{ filter: "drop-shadow(0 0 6px rgba(76,130,251,0.6))" }}
        />
        <defs>
          <linearGradient id="gaugeG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7DA6FF" />
            <stop offset="1" stopColor="#4C82FB" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-mono text-[32px] font-semibold tracking-[-0.02em]">{value}</div>
        <div className="text-[10px] uppercase tracking-[0.08em] text-text3">Execution</div>
      </div>
    </div>
  );
}

export function StackedBars({ data }: { data: { m: string; contract: number; operation: number }[] }) {
  return (
    <div className="flex h-[180px] items-end gap-[14px] pt-[10px]">
      {data.map((b) => (
        <div key={b.m} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
          <div className="flex h-full w-full flex-col justify-end gap-[2px]">
            <div className="w-full rounded-t-[4px]" style={{ background: "var(--color-green)", height: `${b.operation}%` }} />
            <div
              className="w-full"
              style={{
                background: "var(--color-accent)",
                height: `${b.contract}%`,
                borderRadius: b.operation > 0 ? 0 : "4px 4px 0 0",
              }}
            />
          </div>
          <span className="font-mono text-[10.5px] text-text3">{b.m}</span>
        </div>
      ))}
    </div>
  );
}
