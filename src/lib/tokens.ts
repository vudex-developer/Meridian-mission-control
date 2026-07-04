// Maps semantic "tone" names to raw CSS variable references so components can
// use consistent colors both in Tailwind classes and inline SVG props.

export type Tone =
  | "accent"
  | "accent2"
  | "green"
  | "amber"
  | "red"
  | "violet"
  | "neutral"
  | "text2";

export const toneColor: Record<string, string> = {
  accent: "var(--color-accent)",
  accent2: "var(--color-accent2)",
  green: "var(--color-green)",
  amber: "var(--color-amber)",
  red: "var(--color-red)",
  violet: "var(--color-violet)",
  neutral: "var(--color-text2)",
  text2: "var(--color-text2)",
};

export const toneDim: Record<string, string> = {
  accent: "var(--color-accentdim)",
  accent2: "var(--color-accentdim)",
  green: "var(--color-greendim)",
  amber: "var(--color-amberdim)",
  red: "var(--color-reddim)",
  violet: "var(--color-violetdim)",
  neutral: "rgba(255,255,255,0.06)",
  text2: "rgba(255,255,255,0.06)",
};

export const healthMap = {
  healthy: { label: "Healthy", color: "var(--color-green)", dim: "var(--color-greendim)" },
  watch: { label: "Watch", color: "var(--color-amber)", dim: "var(--color-amberdim)" },
  risk: { label: "At risk", color: "var(--color-red)", dim: "var(--color-reddim)" },
} as const;

export const riskMap = {
  low: { label: "Low", color: "var(--color-green)" },
  med: { label: "Medium", color: "var(--color-amber)" },
  high: { label: "High", color: "var(--color-red)" },
} as const;

export const ventureColor: Record<string, string> = {
  "Senior Residence": "#4C82FB",
  "Healthcare Gateway": "#A78BFA",
};
