interface IconProps {
  path: string;
  size?: number;
  width?: number;
  color?: string;
  className?: string;
}

/** Renders a stroke-based icon from an SVG path (matches the concept's icon set). */
export function Icon({ path, size = 17, width = 1.7, color = "currentColor", className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ color, flex: "0 0 auto" }}
    >
      <path d={path} stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
