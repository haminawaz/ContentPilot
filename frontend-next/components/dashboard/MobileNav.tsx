"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  {
    href: "/dashboard/generate-article",
    label: "Generate",
    icon: Sparkles,
  },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-4 left-4 right-4 z-40 bg-lifted-cream border border-ink-black/10 rounded-mc-stadium shadow-mc-heavy px-2 py-2">
      <div className="flex items-center justify-around">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-[11px] font-medium transition-colors",
                active
                  ? "text-ink-black bg-canvas-cream"
                  : "text-slate-gray hover:text-ink-black",
              )}>
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
