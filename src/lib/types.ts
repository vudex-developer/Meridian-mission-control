// ============================================================
// Meridian Mission Control — Domain types (spec §5)
// ============================================================

export type PersonaId = "luke" | "jeff";

export type VentureName = "Senior Residence" | "Healthcare Gateway";

export type RevenueStage =
  | "Discovery Meeting"
  | "Free Consulting"
  | "Paid Diagnosis"
  | "Master Plan"
  | "Execution / PMO"
  | "Operation"
  | "Success Fee";

export type Health = "healthy" | "watch" | "risk";
export type RiskLevel = "low" | "med" | "high";

export interface Founder {
  id: PersonaId;
  name: string;
  letter: string;
  role: string;
  execScore: number;
  gradient: string;
}

export interface Venture {
  id: "senior" | "gateway";
  name: string;
  short: string;
  color: string;
  color2: string;
  projectCount: number;
  healthScore: number;
  progress: number;
  revenue: string;
  milestone: string;
}

export interface ProjectMeeting {
  d: string;
  t: string;
  o: string;
}

export interface ProjectDoc {
  n: string;
  s: "Draft" | "Shared" | "Signed" | "Sent" | "In review" | "Ready to send" | "Needs revision";
}

export interface ProjectRisk {
  text: string;
  level: "Low" | "Medium" | "High";
}

export interface ProjectStageStep {
  name: string;
  done?: boolean;
  active?: boolean;
}

export interface Project {
  id: string;
  name: string;
  venture: VentureName;
  stage: RevenueStage;
  progress: number;
  health: Health;
  healthScore: number;
  revenue: string;
  potential: string;
  owner: "Luke" | "Jeff";
  nextAction: string;
  riskLevel: RiskLevel;
  opportunityScore: number;
  revenueScore: number;
  // detail extras
  aiRec: string;
  stages: ProjectStageStep[];
  meetings: ProjectMeeting[];
  documents: ProjectDoc[];
  partners: string[];
  risks: ProjectRisk[];
  revStatus: string;
}

export interface Kpi {
  label: string;
  value: string;
  delta: string;
  sub: string;
  tone: "green" | "amber" | "red" | "neutral" | "accent" | "violet";
  icon: string; // svg path
  trend: number[];
}

export interface Alert {
  severity: "warn" | "info" | "star";
  tone: "red" | "amber" | "accent" | "green";
  text: string;
}

export interface AgendaMeeting {
  time: string;
  title: string;
  attendees: string;
  revenue?: string;
}

export interface Recommendation {
  rank: number;
  projectId: string;
  title: string;
  tag: string;
  tone: "accent" | "violet" | "green" | "amber" | "red";
  reason: string;
  cta: string;
  revenue: string;
  confidence: number;
  action?: string;
  eta?: string;
}

export interface CoachingItem {
  icon: string;
  tone: "green" | "amber" | "accent" | "violet";
  q: string;
  a: string;
}

export interface Decision {
  date: string;
  decision: string;
  reason: string;
}

export interface ActivityEvent {
  icon: string;
  tone: "green" | "amber" | "accent" | "violet" | "red";
  text: string;
  time: string;
}

export interface FunnelStage {
  name: string;
  count: number;
  value: string;
  tone: "neutral" | "accent" | "violet" | "green";
}

export interface RevenueKpi {
  label: string;
  value: string;
  delta: string;
  tone: "green" | "amber" | "neutral";
}

export interface MonthlyBar {
  m: string;
  contract: number;
  operation: number;
}

export interface DocumentRow {
  name: string;
  project: string;
  type: string;
  status: "Draft" | "Signed" | "Sent" | "Review";
  date: string;
  value: string;
}

export interface Milestone {
  date: string;
  label: string;
  venture: VentureName;
}

export interface TimelineEvent {
  day: number; // 0-6
  top: number;
  h: number;
  title: string;
  time: string;
  tone: "accent" | "violet" | "green" | "amber" | "red";
}

export interface GraphNode {
  id: number;
  label: string;
  type: GraphNodeType;
  x: number;
  y: number;
  big?: boolean;
}

export type GraphNodeType =
  | "person"
  | "venture"
  | "hospital"
  | "inst"
  | "company"
  | "doc"
  | "investor"
  | "meeting";

export interface SettingToggle {
  label: string;
  desc: string;
  on: boolean;
}
