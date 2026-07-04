import type {
  ActivityEvent,
  AgendaMeeting,
  Alert,
  CoachingItem,
  Decision,
  DocumentRow,
  Founder,
  FunnelStage,
  GraphNode,
  Kpi,
  Milestone,
  MonthlyBar,
  Project,
  Recommendation,
  RevenueKpi,
  SettingToggle,
  TimelineEvent,
  Venture,
} from "@/lib/types";

// ---------- Icons (svg path data) ----------
export const ICON = {
  dashboard: "M4 13h7V4H4v9Zm9 7h7v-9h-7v9ZM4 20h7v-5H4v5Zm9-11h7V4h-7v5Z",
  portfolio: "M3 7h18M3 12h18M3 17h18",
  projects: "M4 6h16M4 12h16M4 18h10",
  meetings: "M8 2v4M16 2v4M4 8h16M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z",
  revenue: "M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  documents: "M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5ZM14 3v5h5",
  timeline: "M3 12h4l2 6 4-14 2 8h6",
  graph:
    "M6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7 6.5 11 15M17 6.5 13 15",
  coo: "M12 3a5 5 0 0 1 5 5c0 2-1 3-1 5H8c0-2-1-3-1-5a5 5 0 0 1 5-5ZM9 18h6M10 21h4",
  settings:
    "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19 12a7 7 0 0 0-.1-1l2-1.6-2-3.4-2.4 1a7 7 0 0 0-1.7-1L14.5 2h-4l-.4 2.6a7 7 0 0 0-1.7 1l-2.4-1-2 3.4L4 11a7 7 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 1.7 1l.4 2.4h4l.4-2.6a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6a7 7 0 0 0 .1-1Z",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-3.2-3.2",
} as const;

// ---------- Founders ----------
export const founders: Record<string, Founder> = {
  luke: {
    id: "luke",
    name: "Luke",
    letter: "L",
    role: "AI Strategy · Execution",
    execScore: 71,
    gradient: "linear-gradient(140deg,#6FA0FF,#3E63C7)",
  },
  jeff: {
    id: "jeff",
    name: "Jeff",
    letter: "J",
    role: "Founder · BD · Investment",
    execScore: 68,
    gradient: "linear-gradient(140deg,#A78BFA,#6D4FCF)",
  },
};

// ---------- Ventures ----------
export const ventures: Venture[] = [
  {
    id: "senior",
    name: "Senior Residence",
    short: "Senior Residence",
    color: "#4C82FB",
    color2: "#7DA6FF",
    projectCount: 5,
    healthScore: 72,
    progress: 58,
    revenue: "₩120M",
    milestone: "Berkeley Aden MOU signing",
  },
  {
    id: "gateway",
    name: "Korea Healthcare Innovation Gateway",
    short: "Healthcare Gateway",
    color: "#A78BFA",
    color2: "#C4B0FF",
    projectCount: 4,
    healthScore: 64,
    progress: 41,
    revenue: "₩85M",
    milestone: "삼산병원 Paid Diagnosis",
  },
];

// ---------- Projects (9 seed) ----------
export const projects: Project[] = [
  {
    id: "sansan",
    name: "삼산병원",
    venture: "Healthcare Gateway",
    stage: "Free Consulting",
    progress: 35,
    health: "risk",
    healthScore: 52,
    revenue: "₩0",
    potential: "₩30M",
    owner: "Luke",
    nextAction: "Send Paid Diagnosis Proposal",
    riskLevel: "high",
    opportunityScore: 88,
    revenueScore: 74,
    aiRec:
      "Send the Paid Diagnosis proposal within 48 hours. The clinical champion (Dr. Park) is aligned and the budget cycle closes end of month. 21 days unpaid is eroding your anchor price — every additional free session lowers what they will pay for the Master Plan.",
    stages: [
      { name: "Discovery", done: true },
      { name: "Free Consulting", active: true },
      { name: "Paid Diagnosis" },
      { name: "Master Plan" },
      { name: "Execution" },
    ],
    meetings: [
      { d: "Jul 3", t: "Diagnosis scoping", o: "Luke · Dr. Park" },
      { d: "Jun 24", t: "Free workshop #3", o: "Luke" },
      { d: "Jun 12", t: "Intro & needs", o: "Luke · Jeff" },
    ],
    documents: [
      { n: "Free Diagnosis Notes", s: "Shared" },
      { n: "Paid Diagnosis Proposal", s: "Draft" },
    ],
    partners: ["삼산병원", "Dr. Park (Champion)"],
    risks: [
      { text: "21 days in Free Consulting — margin erosion", level: "High" },
      { text: "No signed scope of work", level: "Medium" },
    ],
    revStatus: "Free Consulting",
  },
  {
    id: "berkeley",
    name: "Berkeley Aden",
    venture: "Senior Residence",
    stage: "Master Plan",
    progress: 48,
    health: "watch",
    healthScore: 61,
    revenue: "₩0",
    potential: "₩45M",
    owner: "Jeff",
    nextAction: "Follow-up — 13 days overdue",
    riskLevel: "high",
    opportunityScore: 92,
    revenueScore: 80,
    aiRec:
      "Break the 13-day silence today. Berkeley Aden is the highest-leverage node in the portfolio — Bakar Labs and Zabara both route through this relationship. Send the MOU draft and lock a next meeting before Friday, or the entire Senior Residence track stalls.",
    stages: [
      { name: "Discovery", done: true },
      { name: "Paid Diagnosis", done: true },
      { name: "Master Plan", active: true },
      { name: "Execution" },
      { name: "Operation" },
    ],
    meetings: [
      { d: "Jun 20", t: "Master plan review", o: "Jeff" },
      { d: "Jun 6", t: "Partnership terms", o: "Jeff · Luke" },
    ],
    documents: [
      { n: "Master Plan v2", s: "In review" },
      { n: "MOU Draft", s: "Ready to send" },
    ],
    partners: ["Berkeley Aden", "Bakar Labs", "Zabara"],
    risks: [
      { text: "Follow-up overdue 13 days", level: "High" },
      { text: "MOU unsigned", level: "Medium" },
    ],
    revStatus: "Master Plan",
  },
  {
    id: "gil",
    name: "길병원",
    venture: "Healthcare Gateway",
    stage: "Execution / PMO",
    progress: 66,
    health: "watch",
    healthScore: 70,
    revenue: "₩45M",
    potential: "₩20M",
    owner: "Luke",
    nextAction: "Revise Operating Proposal",
    riskLevel: "med",
    opportunityScore: 71,
    revenueScore: 84,
    aiRec:
      "The Operating Proposal under-prices the PMO scope relative to delivered value. Rework the success-fee structure to capture operational upside, then resubmit — the contract is otherwise ready to sign.",
    stages: [
      { name: "Discovery", done: true },
      { name: "Paid Diagnosis", done: true },
      { name: "Master Plan", done: true },
      { name: "Execution", active: true },
      { name: "Operation" },
    ],
    meetings: [
      { d: "Jun 30", t: "PMO status", o: "Luke" },
      { d: "Jun 15", t: "Execution kickoff", o: "Luke · Jeff" },
    ],
    documents: [
      { n: "Operating Proposal", s: "Needs revision" },
      { n: "Execution Contract", s: "Signed" },
    ],
    partners: ["길병원", "PMO Team"],
    risks: [{ text: "Under-priced success fee", level: "Medium" }],
    revStatus: "Execution / PMO",
  },
  {
    id: "vspharm",
    name: "VS PharmTech",
    venture: "Senior Residence",
    stage: "Paid Diagnosis",
    progress: 55,
    health: "healthy",
    healthScore: 81,
    revenue: "₩30M",
    potential: "₩60M",
    owner: "Jeff",
    nextAction: "Prepare investment memo",
    riskLevel: "low",
    opportunityScore: 95,
    revenueScore: 88,
    aiRec:
      "Highest investment potential in the portfolio — traction, margin profile and team all score in the top decile. The round is closing and your allocation window is finite. Prepare the investment memo and secure the term sheet this week before the price moves.",
    stages: [
      { name: "Discovery", done: true },
      { name: "Paid Diagnosis", active: true },
      { name: "Master Plan" },
      { name: "Execution" },
      { name: "Operation" },
    ],
    meetings: [{ d: "Jun 25", t: "Investment review", o: "Jeff · Luke" }],
    documents: [{ n: "Investment Memo", s: "Draft" }],
    partners: ["VS PharmTech", "Investor"],
    risks: [{ text: "Round closing — allocation window finite", level: "Medium" }],
    revStatus: "Paid Diagnosis",
  },
  {
    id: "bakar",
    name: "Bakar Labs",
    venture: "Senior Residence",
    stage: "Discovery Meeting",
    progress: 22,
    health: "watch",
    healthScore: 58,
    revenue: "₩0",
    potential: "₩25M",
    owner: "Jeff",
    nextAction: "Schedule scoping call",
    riskLevel: "med",
    opportunityScore: 66,
    revenueScore: 60,
    aiRec:
      "Warm intro is live but no scoping call is booked. This is a founder-to-founder relationship best opened by Jeff. Schedule the first working session to convert the introduction into a defined partnership opportunity.",
    stages: [
      { name: "Discovery", active: true },
      { name: "Paid Diagnosis" },
      { name: "Master Plan" },
      { name: "Execution" },
      { name: "Operation" },
    ],
    meetings: [{ d: "Jun 18", t: "Warm intro", o: "Jeff" }],
    documents: [{ n: "Partnership one-pager", s: "Draft" }],
    partners: ["Bakar Labs", "Berkeley Aden"],
    risks: [{ text: "No scoping call booked", level: "Medium" }],
    revStatus: "Discovery Meeting",
  },
  {
    id: "zabara",
    name: "Zabara",
    venture: "Healthcare Gateway",
    stage: "Free Consulting",
    progress: 28,
    health: "risk",
    healthScore: 49,
    revenue: "₩0",
    potential: "₩18M",
    owner: "Luke",
    nextAction: "Convert to Paid Diagnosis or exit",
    riskLevel: "high",
    opportunityScore: 54,
    revenueScore: 52,
    aiRec:
      "16 days in Free Consulting with weak conversion signals. Decide this week: convert to a paid diagnosis or exit to reclaim capacity for higher-leverage projects.",
    stages: [
      { name: "Discovery", done: true },
      { name: "Free Consulting", active: true },
      { name: "Paid Diagnosis" },
      { name: "Master Plan" },
      { name: "Execution" },
    ],
    meetings: [{ d: "Jun 22", t: "Free scoping", o: "Luke" }],
    documents: [{ n: "Scoping Notes", s: "Shared" }],
    partners: ["Zabara", "Berkeley Aden"],
    risks: [{ text: "16 days unpaid, weak signals", level: "High" }],
    revStatus: "Free Consulting",
  },
  {
    id: "nakdong",
    name: "City OCL",
    venture: "Senior Residence",
    stage: "Operation",
    progress: 88,
    health: "healthy",
    healthScore: 86,
    revenue: "₩90M",
    potential: "₩12M/mo",
    owner: "Jeff",
    nextAction: "Quarterly operating review",
    riskLevel: "low",
    opportunityScore: 60,
    revenueScore: 90,
    aiRec:
      "Flagship recurring-revenue account. Maintain the operating cadence and use the quarterly review to expand scope into adjacent services.",
    stages: [
      { name: "Discovery", done: true },
      { name: "Paid Diagnosis", done: true },
      { name: "Master Plan", done: true },
      { name: "Execution", done: true },
      { name: "Operation", active: true },
    ],
    meetings: [{ d: "Jun 28", t: "Ops review", o: "Jeff" }],
    documents: [{ n: "Operating Report Q2", s: "Signed" }],
    partners: ["City OCL"],
    risks: [{ text: "Watch renewal timing", level: "Low" }],
    revStatus: "Operation",
  },
  {
    id: "incheon",
    name: "Incheon Care Hub",
    venture: "Healthcare Gateway",
    stage: "Master Plan",
    progress: 44,
    health: "watch",
    healthScore: 64,
    revenue: "₩0",
    potential: "₩40M",
    owner: "Luke",
    nextAction: "Deliver master plan draft",
    riskLevel: "med",
    opportunityScore: 72,
    revenueScore: 70,
    aiRec:
      "Master plan draft is due Jul 20. Keep the delivery dated and confirm the paid-diagnosis learnings are reflected so the plan justifies the execution fee.",
    stages: [
      { name: "Discovery", done: true },
      { name: "Paid Diagnosis", done: true },
      { name: "Master Plan", active: true },
      { name: "Execution" },
      { name: "Operation" },
    ],
    meetings: [{ d: "Jun 26", t: "Plan working session", o: "Luke" }],
    documents: [{ n: "Master Plan Draft", s: "Draft" }],
    partners: ["Incheon Care Hub"],
    risks: [{ text: "Delivery date at risk", level: "Medium" }],
    revStatus: "Master Plan",
  },
  {
    id: "nonhyun",
    name: "논현 시니어 레지던스",
    venture: "Senior Residence",
    stage: "Discovery Meeting",
    progress: 15,
    health: "watch",
    healthScore: 60,
    revenue: "₩0",
    potential: "₩50M",
    owner: "Jeff",
    nextAction: "Site assessment & concept brief",
    riskLevel: "med",
    opportunityScore: 78,
    revenueScore: 64,
    aiRec:
      "Large potential contract at an early stage. Move quickly to a site assessment and concept brief to establish a dated path toward a paid diagnosis.",
    stages: [
      { name: "Discovery", active: true },
      { name: "Paid Diagnosis" },
      { name: "Master Plan" },
      { name: "Execution" },
      { name: "Operation" },
    ],
    meetings: [{ d: "Jun 29", t: "Intro meeting", o: "Jeff" }],
    documents: [{ n: "Concept Brief", s: "Draft" }],
    partners: ["논현 시니어 레지던스"],
    risks: [{ text: "Early stage, undated", level: "Medium" }],
    revStatus: "Discovery Meeting",
  },
];

export const projectById = (id: string) => projects.find((p) => p.id === id);

// ---------- KPI cards ----------
export const kpis: Kpi[] = [
  { label: "Active Projects", value: "9", delta: "+2", sub: "this quarter", tone: "green", icon: ICON.projects, trend: [5, 6, 6, 7, 7, 8, 9] },
  { label: "Revenue Pipeline", value: "₩640M", delta: "+18%", sub: "MoM", tone: "accent", icon: ICON.timeline, trend: [380, 410, 440, 470, 510, 560, 640] },
  { label: "Proposals Out", value: "5", delta: "2 due", sub: "48h", tone: "amber", icon: ICON.documents, trend: [2, 3, 3, 4, 4, 5, 5] },
  { label: "Contracts", value: "3", delta: "+1", sub: "signed", tone: "green", icon: "M9 12l2 2 4-4M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z", trend: [1, 1, 2, 2, 2, 3, 3] },
  { label: "Revenue (QTD)", value: "₩205M", delta: "+31%", sub: "vs target", tone: "green", icon: ICON.revenue, trend: [90, 110, 130, 150, 170, 190, 205] },
  { label: "Free Consulting", value: "31%", delta: "over 20%", sub: "ceiling", tone: "red", icon: "M12 9v4M12 17h.01M10.3 3.9 2 18a1 1 0 0 0 .9 1.5h18.2A1 1 0 0 0 22 18L13.7 3.9a1 1 0 0 0-1.7 0Z", trend: [18, 22, 26, 24, 28, 30, 31] },
  { label: "AI Health Score", value: "68", delta: "stable", sub: "/100", tone: "violet", icon: ICON.coo, trend: [61, 64, 66, 65, 67, 68, 68] },
  { label: "Meeting ROI", value: "3.2×", delta: "+0.4", sub: "rev/meeting", tone: "accent", icon: ICON.meetings, trend: [2.4, 2.6, 2.7, 2.9, 3.0, 3.1, 3.2] },
];

// ---------- Dashboard revenue trend (area) ----------
export const revTrend = [86, 102, 121, 118, 140, 165, 188, 205];
export const revTrendMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

// ---------- Pipeline donut ----------
export const pipelineDonut = [
  { label: "Execution / PMO", pct: 38, color: "#4C82FB", value: "₩240M" },
  { label: "Master Plan", pct: 28, color: "#7DA6FF", value: "₩180M" },
  { label: "Operation", pct: 14, color: "#34D399", value: "₩90M" },
  { label: "Success Fee", pct: 11, color: "#A78BFA", value: "₩70M" },
  { label: "Paid Diagnosis", pct: 9, color: "#F5B845", value: "₩60M" },
];

// ---------- Top revenue ranking ----------
export const topRevenue = [
  { name: "City OCL", value: "₩90M", pct: 100, color: "#7DA6FF" },
  { name: "Incheon Care Hub", value: "₩40M", pct: 57, color: "#F5B845" },
  { name: "길병원", value: "₩45M", pct: 64, color: "#A78BFA" },
  { name: "VS PharmTech", value: "₩30M", pct: 43, color: "#34D399" },
];

// ---------- Recent activity ----------
export const recentActivity: ActivityEvent[] = [
  { icon: "📄", tone: "amber", text: "Paid Diagnosis proposal drafted for 삼산병원", time: "2m ago" },
  { icon: "🤖", tone: "accent", text: "AI COO flagged Berkeley Aden follow-up as overdue", time: "18m ago" },
  { icon: "✅", tone: "green", text: "길병원 Execution Contract signed — ₩45M", time: "1h ago" },
  { icon: "💰", tone: "green", text: "Success fee invoiced · 길병원 PMO", time: "2h ago" },
  { icon: "⭐", tone: "violet", text: "VS PharmTech scored highest investment potential", time: "3h ago" },
];

// ---------- Alerts ----------
export const alerts: Alert[] = [
  { severity: "warn", tone: "red", text: "Berkeley Aden follow-up is overdue — 13 days since last contact." },
  { severity: "warn", tone: "amber", text: "삼산병원 has stayed in Free Consulting for 21 days." },
  { severity: "star", tone: "accent", text: "VS PharmTech has the highest investment potential in the portfolio." },
  { severity: "star", tone: "green", text: "Send 삼산병원 proposal within 48 hours to hold the window." },
];

// ---------- Today's meetings ----------
export const agenda: AgendaMeeting[] = [
  { time: "09:30", title: "삼산병원 diagnosis scoping", attendees: "Luke · Dr. Park", revenue: "₩30M" },
  { time: "11:00", title: "Berkeley Aden partner sync", attendees: "Jeff · Bakar Labs" },
  { time: "15:00", title: "VS PharmTech investment review", attendees: "Jeff · Luke", revenue: "₩45M" },
];

// ---------- Revenue engine ----------
export const funnel: FunnelStage[] = [
  { name: "Discovery Meeting", count: 3, value: "—", tone: "neutral" },
  { name: "Paid Diagnosis", count: 2, value: "₩60M", tone: "accent" },
  { name: "Master Plan", count: 2, value: "₩180M", tone: "accent" },
  { name: "Execution / PMO", count: 1, value: "₩240M", tone: "violet" },
  { name: "Operation", count: 1, value: "₩90M", tone: "green" },
  { name: "Success Fee", count: 0, value: "₩70M", tone: "green" },
];

export const revenueKpis: RevenueKpi[] = [
  { label: "Proposals", value: "5", delta: "2 due in 48h", tone: "amber" },
  { label: "Quotations", value: "₩310M", delta: "across 4 projects", tone: "neutral" },
  { label: "Contracts Signed", value: "₩205M", delta: "+₩45M this month", tone: "green" },
  { label: "Monthly Revenue", value: "₩38M", delta: "+18% MoM", tone: "green" },
  { label: "Success Fee", value: "₩70M", delta: "projected", tone: "neutral" },
  { label: "Operation Revenue", value: "₩12M/mo", delta: "recurring", tone: "green" },
  { label: "Avg. Deal Cycle", value: "47d", delta: "−6d QoQ", tone: "green" },
  { label: "Win Rate", value: "61%", delta: "+9pts", tone: "green" },
];

export const monthlyRevenue: MonthlyBar[] = [
  { m: "Feb", contract: 22, operation: 8 },
  { m: "Mar", contract: 30, operation: 10 },
  { m: "Apr", contract: 26, operation: 14 },
  { m: "May", contract: 44, operation: 16 },
  { m: "Jun", contract: 52, operation: 20 },
  { m: "Jul", contract: 66, operation: 22 },
  { m: "Aug", contract: 48, operation: 26 },
];

// ---------- AI COO ----------
export const recommendations: Record<string, Recommendation[]> = {
  luke: [
    {
      rank: 1,
      projectId: "sansan",
      title: "삼산병원",
      tag: "Free Consulting 21d",
      tone: "amber",
      action: "Send Paid Diagnosis Proposal",
      eta: "within 48h",
      reason:
        "Sitting in Free Consulting for 21 days with strong engagement signals. Recommend sending the Paid Diagnosis proposal today — clinical champion is aligned and budget cycle closes end of month. Every day unpaid erodes the anchor price.",
      cta: "Send Paid Diagnosis Proposal",
      revenue: "₩30,000,000",
      confidence: 82,
    },
    {
      rank: 2,
      projectId: "berkeley",
      title: "Berkeley Aden",
      tag: "Overdue 13d",
      tone: "red",
      action: "Follow-up — last contact 13 days ago",
      eta: "today",
      reason:
        "Follow-up required — last contact 13 days ago. This is the portfolio's highest-leverage relationship (Bakar Labs, Zabara all flow through it). Silence is costing momentum. Send the MOU draft and lock the next meeting before Friday.",
      cta: "Send follow-up + MOU draft",
      revenue: "₩45,000,000",
      confidence: 68,
    },
    {
      rank: 3,
      projectId: "gil",
      title: "길병원",
      tag: "Revision",
      tone: "accent",
      action: "Operating Proposal requires revision",
      eta: "this week",
      reason:
        "Operating Proposal requires revision — the PMO scope is under-priced vs. delivered value. Rework the success-fee structure to capture operational upside, then resubmit. Contract is otherwise ready to sign.",
      cta: "Revise Operating Proposal",
      revenue: "₩20,000,000",
      confidence: 74,
    },
  ],
  jeff: [
    {
      rank: 1,
      projectId: "vspharm",
      title: "VS PharmTech",
      tag: "Investment",
      tone: "violet",
      action: "Prepare investment memo before round closes",
      eta: "this week",
      reason:
        "Highest investment potential in the portfolio — traction, margin profile and team all score in the top decile. The round is closing and your allocation window is finite. Prepare the investment memo and secure the term sheet this week before the price moves.",
      cta: "Prepare investment memo",
      revenue: "₩60,000,000",
      confidence: 79,
    },
    {
      rank: 2,
      projectId: "berkeley",
      title: "Berkeley Aden",
      tag: "MOU decision",
      tone: "red",
      action: "Sign the MOU to unlock Senior Residence track",
      eta: "today",
      reason:
        "The MOU is drafted and ready — it only needs your decision as the dealmaker. Signing it unlocks the entire Senior Residence track and the Bakar Labs / Zabara relationships that route through Berkeley Aden. Make the call today.",
      cta: "Approve & sign MOU",
      revenue: "₩45,000,000",
      confidence: 71,
    },
    {
      rank: 3,
      projectId: "bakar",
      title: "Bakar Labs",
      tag: "BD",
      tone: "accent",
      action: "Schedule scoping call to open partnership",
      eta: "this week",
      reason:
        "Warm intro is live but no scoping call is booked. This is a founder-to-founder relationship best opened by you. Schedule the first working session to convert the introduction into a defined partnership opportunity.",
      cta: "Schedule scoping call",
      revenue: "₩25,000,000",
      confidence: 64,
    },
  ],
};

export const coaching: CoachingItem[] = [
  { icon: "💰", tone: "green", q: "Is this project making money?", a: "삼산병원: not yet — 21 days unpaid. Convert now." },
  { icon: "🚧", tone: "amber", q: "What is blocking revenue?", a: "Berkeley Aden: stalled follow-up, no dated next step." },
  { icon: "📄", tone: "accent", q: "When will the proposal be sent?", a: "2 proposals due within 48h — 삼산병원 & Zabara." },
  { icon: "✍️", tone: "violet", q: "Has the contract been signed?", a: "길병원 ready pending success-fee revision." },
];

export const decisions: Decision[] = [
  { date: "2026.07.03", decision: "Prioritize Meridian over VUGEN.", reason: "Berkeley Aden opportunity — highest portfolio leverage." },
  { date: "2026.06.28", decision: "Cap Free Consulting at 20% of weekly capacity.", reason: "Unpaid work crowding out paid diagnosis pipeline." },
  { date: "2026.06.21", decision: "Lead 삼산병원 with Paid Diagnosis, not free scoping.", reason: "Anchor price protects downstream Master Plan fee." },
];

// ---------- Documents ----------
export const documents: DocumentRow[] = [
  { name: "Paid Diagnosis Proposal", project: "삼산병원", type: "Proposal", status: "Draft", date: "Jul 3", value: "₩30M" },
  { name: "Master Plan v2", project: "Berkeley Aden", type: "Master Plan", status: "Review", date: "Jun 20", value: "₩45M" },
  { name: "Execution Contract", project: "길병원", type: "Contract", status: "Signed", date: "Jun 15", value: "₩45M" },
  { name: "Investment Memo", project: "VS PharmTech", type: "Memo", status: "Draft", date: "Jul 1", value: "₩60M" },
  { name: "MOU Draft", project: "Berkeley Aden", type: "Agreement", status: "Sent", date: "Jun 28", value: "—" },
  { name: "Success Fee Invoice", project: "길병원", type: "Invoice", status: "Signed", date: "Jun 30", value: "₩70M" },
];

// ---------- Timeline ----------
export const timelineDays = ["Mon 30", "Tue 1", "Wed 3", "Thu 4", "Fri 5", "Sat 6", "Sun 7"];
export const timelineEvents: TimelineEvent[] = [
  { day: 2, top: 6, h: 13, title: "삼산병원 scoping", tone: "accent", time: "09:30" },
  { day: 2, top: 34, h: 12, title: "Berkeley Aden sync", tone: "violet", time: "11:00" },
  { day: 2, top: 62, h: 14, title: "VS PharmTech review", tone: "green", time: "15:00" },
  { day: 0, top: 20, h: 12, title: "길병원 PMO", tone: "violet", time: "10:00" },
  { day: 3, top: 40, h: 12, title: "Proposal due: 삼산병원", tone: "amber", time: "EOD" },
  { day: 4, top: 12, h: 12, title: "Berkeley Aden MOU deadline", tone: "red", time: "17:00" },
  { day: 1, top: 50, h: 12, title: "Incheon master plan", tone: "accent", time: "14:00" },
];

export const milestones: Milestone[] = [
  { date: "Jul 5", label: "Berkeley Aden MOU signing", venture: "Senior Residence" },
  { date: "Jul 12", label: "삼산병원 Paid Diagnosis start", venture: "Healthcare Gateway" },
  { date: "Jul 20", label: "Incheon Master Plan delivery", venture: "Healthcare Gateway" },
  { date: "Aug 1", label: "VS PharmTech investment close", venture: "Senior Residence" },
];

// ---------- Project schedule (gantt) ----------
export const schedWeeks = ["Jul W1", "Jul W2", "Jul W3", "Jul W4", "Aug W1", "Aug W2", "Aug W3", "Aug W4"];
export const schedule = [
  { id: "vspharm", name: "VS PharmTech", venture: "Senior Residence", start: 0, span: 4, phase: "Diagnosis → Investment", mlCol: 4, ml: "Round close · Aug 1" },
  { id: "berkeley", name: "Berkeley Aden", venture: "Senior Residence", start: 0, span: 2, phase: "Master Plan", mlCol: 1, ml: "MOU · Jul 5" },
  { id: "bakar", name: "Bakar Labs", venture: "Senior Residence", start: 2, span: 2, phase: "Discovery", mlCol: 2, ml: "Scoping call" },
  { id: "nakdong", name: "City OCL", venture: "Senior Residence", start: 0, span: 8, phase: "Operation", mlCol: 5, ml: "Q review" },
  { id: "sansan", name: "삼산병원", venture: "Healthcare Gateway", start: 0, span: 2, phase: "Paid Diagnosis", mlCol: 1, ml: "Proposal · 48h" },
  { id: "gil", name: "길병원", venture: "Healthcare Gateway", start: 1, span: 3, phase: "Execution / PMO", mlCol: 3, ml: "Op review" },
  { id: "incheon", name: "Incheon Care Hub", venture: "Healthcare Gateway", start: 1, span: 3, phase: "Master Plan", mlCol: 3, ml: "Draft · Jul 20" },
  { id: "zabara", name: "Zabara", venture: "Healthcare Gateway", start: 0, span: 1, phase: "Free Consulting", mlCol: 0, ml: "Convert / exit" },
  { id: "nonhyun", name: "논현 시니어 레지던스", venture: "Senior Residence", start: 3, span: 3, phase: "Discovery", mlCol: 4, ml: "Concept brief" },
];

// ---------- Knowledge graph ----------
export const graphTypeColor: Record<string, string> = {
  person: "#4C82FB",
  venture: "#A78BFA",
  hospital: "#34D399",
  inst: "#F5B845",
  company: "#7DA6FF",
  doc: "#58657E",
  investor: "#34D399",
  meeting: "#F76F6F",
};
export const graphNodes: GraphNode[] = [
  { id: 0, label: "Jeff", type: "person", x: 640, y: 120, big: true },
  { id: 1, label: "Luke", type: "person", x: 620, y: 360, big: true },
  { id: 2, label: "Berkeley Aden", type: "inst", x: 350, y: 130, big: true },
  { id: 3, label: "Bakar Labs", type: "inst", x: 170, y: 70 },
  { id: 4, label: "Zabara", type: "inst", x: 150, y: 250 },
  { id: 5, label: "Senior Residence", type: "venture", x: 470, y: 250, big: true },
  { id: 6, label: "Healthcare Gateway", type: "venture", x: 540, y: 470, big: true },
  { id: 7, label: "삼산병원", type: "hospital", x: 770, y: 500 },
  { id: 8, label: "길병원", type: "hospital", x: 880, y: 400 },
  { id: 9, label: "VS PharmTech", type: "company", x: 380, y: 470 },
  { id: 10, label: "Investor", type: "investor", x: 850, y: 180 },
  { id: 11, label: "Documents", type: "doc", x: 300, y: 400 },
  { id: 12, label: "Meetings", type: "meeting", x: 470, y: 60 },
];
export const graphEdges: [number, number][] = [
  [2, 3], [2, 4], [2, 5], [2, 0], [5, 0], [5, 9], [9, 1], [6, 1], [6, 7], [6, 8],
  [7, 1], [8, 1], [0, 1], [10, 0], [10, 2], [11, 1], [12, 2], [12, 0], [5, 6],
];
export const graphLegend = [
  { l: "People", c: graphTypeColor.person },
  { l: "Ventures", c: graphTypeColor.venture },
  { l: "Hospitals", c: graphTypeColor.hospital },
  { l: "Institutions", c: graphTypeColor.inst },
  { l: "Companies", c: graphTypeColor.company },
  { l: "Investors", c: graphTypeColor.investor },
];

// ---------- Meetings module ----------
export const meetingList = [
  { id: "m1", time: "09:30", title: "삼산병원 diagnosis scoping", when: "Today · 09:30", attendees: "Luke, Dr. Park", active: true },
  { id: "m2", time: "11:00", title: "Berkeley Aden partner sync", when: "Today · 11:00", attendees: "Jeff, Bakar Labs", active: false },
  { id: "m3", time: "15:00", title: "VS PharmTech investment review", when: "Today · 15:00", attendees: "Jeff, Luke", active: false },
  { id: "m4", time: "Jun 30", title: "길병원 PMO status", when: "Jun 30", attendees: "Luke", active: false },
];
export const actionItems = [
  { task: "Draft Paid Diagnosis proposal (₩30M)", owner: "Luke", due: "Jul 4", done: false },
  { task: "Confirm clinical data access with Dr. Park", owner: "Luke", due: "Jul 5", done: false },
  { task: "Loop Jeff in on pricing anchor", owner: "Luke", due: "Jul 3", done: true },
];

// ---------- Settings ----------
export const settingsToggles: SettingToggle[] = [
  { label: "Proactive morning brief", desc: "AI COO greets you with ranked priorities daily.", on: true },
  { label: "Free Consulting alerts", desc: "Warn when a project stays unpaid past 14 days.", on: true },
  { label: "Revenue window nudges", desc: "Push notifications 48h before a proposal window closes.", on: true },
  { label: "Auto meeting summaries", desc: "Transcribe & extract decisions from voice recordings.", on: false },
];

// ---------- Command palette quick actions ----------
export const commandActions = [
  { icon: "⚡", label: "Send 삼산병원 Paid Diagnosis proposal", hint: "Action", href: "/projects/sansan" },
  { icon: "↗", label: "Follow up with Berkeley Aden", hint: "Action", href: "/projects/berkeley" },
  { icon: "📊", label: "Open Revenue Engine", hint: "Go", href: "/revenue" },
  { icon: "🤖", label: "Ask the AI COO for today's brief", hint: "AI", href: "/coo" },
  { icon: "🕸", label: "Explore Knowledge Graph", hint: "Go", href: "/graph" },
  { icon: "📅", label: "Jump to Timeline", hint: "Go", href: "/timeline" },
];
