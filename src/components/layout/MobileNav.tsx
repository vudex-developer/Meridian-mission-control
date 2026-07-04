"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/nav";
import { Icon } from "@/components/ui/Icon";

export function MobileNav() {
  const pathname = usePathname();
  const active = pathname.startsWith("/projects") ? "projects" : navItems.find((n) => n.href === pathname)?.id ?? "dashboard";
  const items = navItems.filter((n) => n.mobile);

  return (
    <nav
      className="flex h-[60px] items-center justify-around border-t border-border2 px-1 backdrop-blur-md md:hidden"
      style={{ background: "rgba(8,12,20,0.96)" }}
    >
      {items.map((n) => {
        const isActive = n.id === active;
        const color = isActive ? "var(--color-accent2)" : "var(--color-text3)";
        return (
          <Link key={n.id} href={n.href} className="flex min-w-[54px] flex-col items-center gap-[3px] p-[6px_8px]">
            <span className="flex h-5 w-5 items-center justify-center" style={{ color }}>
              <Icon path={n.icon} size={20} />
            </span>
            <span className="text-[9.5px]" style={{ color, fontWeight: isActive ? 600 : 500 }}>
              {n.mobileLabel ?? n.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
