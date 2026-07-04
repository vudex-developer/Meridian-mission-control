import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
  style,
  radius = 18,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  radius?: number;
}) {
  return (
    <div
      className={`border border-border bg-surface ${className}`}
      style={{ borderRadius: radius, ...style }}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  title,
  meta,
  action,
}: {
  title: string;
  meta?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-[9px]">
        <span className="text-[15px] font-bold tracking-[-0.01em]">{title}</span>
        {meta ? <span className="font-mono text-[11px] text-text3">{meta}</span> : null}
      </div>
      {action}
    </div>
  );
}

export function Pill({
  children,
  color,
  bg,
  className = "",
}: {
  children: ReactNode;
  color: string;
  bg: string;
  className?: string;
}) {
  return (
    <span
      className={`rounded-full px-[9px] py-[3px] text-[10.5px] font-semibold ${className}`}
      style={{ color, background: bg }}
    >
      {children}
    </span>
  );
}

export function ProgressBar({
  value,
  color,
  height = 6,
  glow = true,
}: {
  value: number;
  color: string;
  height?: number;
  glow?: boolean;
}) {
  return (
    <div
      className="w-full overflow-hidden rounded-full"
      style={{ height, background: "rgba(255,255,255,0.07)" }}
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${value}%`,
          background: color,
          boxShadow: glow ? `0 0 7px ${color}` : "none",
        }}
      />
    </div>
  );
}

export function Dot({ color, size = 8, glow = true }: { color: string; size?: number; glow?: boolean }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 3,
        background: color,
        flex: "0 0 auto",
        boxShadow: glow ? `0 0 6px ${color}` : "none",
        display: "inline-block",
      }}
    />
  );
}
