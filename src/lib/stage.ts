import type { Project } from "@/lib/types";
import { ventureColor } from "@/lib/tokens";

export const STAGES = ["Discovery", "Paid Dx", "Master Plan", "Execution", "Operation", "Success Fee"];

export const stageIdx: Record<string, number> = {
  "Discovery Meeting": 0,
  "Free Consulting": 0,
  "Paid Diagnosis": 1,
  "Master Plan": 2,
  "Execution / PMO": 3,
  Operation: 4,
  "Success Fee": 5,
};

export interface Pip {
  name: string;
  bg: string;
  glow: string;
}

export function stagePips(p: Project): { pips: Pip[]; stageNow: string; stuck: boolean } {
  const idx = stageIdx[p.stage] ?? 0;
  const stuck = p.stage === "Free Consulting";
  const color = ventureColor[p.venture];
  const pips = STAGES.map((name, i) => ({
    name,
    bg: i < idx ? color : i === idx ? (stuck ? "var(--color-amber)" : color) : "rgba(255,255,255,0.09)",
    glow: i <= idx ? `0 0 6px ${stuck && i === idx ? "var(--color-amber)" : color}` : "none",
  }));
  return { pips, stageNow: stuck ? "Free Consulting" : STAGES[idx], stuck };
}
