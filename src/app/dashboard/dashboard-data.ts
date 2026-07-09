"use client";

import { useApp } from "@/lib/app-context";
import {
  projects,
  projectById,
  kpis,
  revTrend,
  revTrendMonths,
  pipelineDonut,
  topRevenue,
  recentActivity,
  recommendations,
  ventures,
  alerts,
  agenda,
} from "@/data/seed";

export type DashboardBrief = {
  decision: string;
  why: string;
  action: string;
  impact: string;
};

export type DashboardViewModel = {
  persona: "luke" | "jeff";
  isLuke: boolean;
  founder: ReturnType<typeof useApp>["founder"];
  priorities: typeof recommendations.luke;
  visibleProjects: typeof projects;
  compactActivity: typeof recentActivity;
  brief: DashboardBrief;
  projects: typeof projects;
  projectById: typeof projectById;
  kpis: typeof kpis;
  revTrend: typeof revTrend;
  revTrendMonths: typeof revTrendMonths;
  pipelineDonut: typeof pipelineDonut;
  topRevenue: typeof topRevenue;
  ventures: typeof ventures;
  alerts: typeof alerts;
  agenda: typeof agenda;
};

export function useDashboardViewModel(): DashboardViewModel {
  const { persona, founder } = useApp();
  const isLuke = persona === "luke";
  const priorities = recommendations[persona];
  const visibleProjects = projects.slice(0, 7);
  const compactActivity = recentActivity.slice(0, 3);
  const brief = isLuke
    ? {
        decision: "Today is a conversion-cleanup day, not a new-project day.",
        why: "삼산병원 has been parked in Free Consulting for 21 days and Berkeley Aden is 13 days overdue. Together they represent ₩75M of near-term pipeline that can still move this week.",
        action: "Send the Paid Diagnosis proposal first, then lock a Berkeley Aden follow-up owner before lunch.",
        impact: "₩75M pipeline at risk",
      }
    : {
        decision: "Today is an investment-decision day, with VS PharmTech as the highest-conviction memo.",
        why: "The round timing is closing while Berkeley Aden still needs an MOU call. Delaying either decision weakens the Senior Residence track and the ₩45M unlock.",
        action: "Finish the VS PharmTech memo, then decide whether Berkeley Aden advances to MOU terms this week.",
        impact: "₩45M unlock decision",
      };

  return {
    persona,
    isLuke,
    founder,
    priorities,
    visibleProjects,
    compactActivity,
    brief,
    projects,
    projectById,
    kpis,
    revTrend,
    revTrendMonths,
    pipelineDonut,
    topRevenue,
    ventures,
    alerts,
    agenda,
  };
}
