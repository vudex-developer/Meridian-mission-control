import { ICON } from "@/data/seed";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: string;
  mobile?: boolean;
  mobileLabel?: string;
  title: string;
  subtitle: string;
}

export const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/", icon: ICON.dashboard, mobile: true, mobileLabel: "Home", title: "Mission Control", subtitle: "Friday, July 3, 2026 · What should you do today?" },
  { id: "portfolio", label: "Portfolio", href: "/portfolio", icon: ICON.portfolio, badge: "2", mobile: true, title: "Portfolio", subtitle: "Two ventures · combined health & revenue" },
  { id: "projects", label: "Projects", href: "/projects", icon: ICON.projects, badge: "9", mobile: true, title: "Active Projects", subtitle: "9 projects across the portfolio" },
  { id: "meetings", label: "Meetings", href: "/meetings", icon: ICON.meetings, title: "Meetings", subtitle: "Where decisions turn into execution" },
  { id: "revenue", label: "Revenue", href: "/revenue", icon: ICON.revenue, mobile: true, title: "Revenue Engine", subtitle: "From meetings to revenue" },
  { id: "documents", label: "Documents", href: "/documents", icon: ICON.documents, title: "Documents", subtitle: "Proposals, contracts & diagnostics" },
  { id: "timeline", label: "Timeline", href: "/timeline", icon: ICON.timeline, title: "Timeline", subtitle: "Milestones across weeks and months" },
  { id: "graph", label: "Knowledge Graph", href: "/graph", icon: ICON.graph, title: "Knowledge Graph", subtitle: "Everything is connected" },
  { id: "coo", label: "AI COO", href: "/coo", icon: ICON.coo, mobile: true, mobileLabel: "AI COO", title: "AI COO", subtitle: "Your always-on operating partner" },
  { id: "settings", label: "Settings", href: "/settings", icon: ICON.settings, title: "Settings", subtitle: "Workspace & founders" },
];

export function routeMeta(pathname: string): { title: string; subtitle: string } {
  if (pathname.startsWith("/projects/") && pathname !== "/projects") {
    return { title: "Project", subtitle: "Full execution & revenue view" };
  }
  const exact = navItems.find((n) => n.href === pathname);
  if (exact) return { title: exact.title, subtitle: exact.subtitle };
  return { title: "Mission Control", subtitle: "" };
}
