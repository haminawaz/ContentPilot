"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Sparkles,
  User,
  Compass,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/dashboard/generate-article",
    label: "Generate Article",
    icon: Sparkles,
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: User,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-lifted-cream border-r border-ink-black/5 h-screen sticky top-0">
      {/* Brand */}
      <div className="flex items-center gap-3 px-7 py-6 border-b border-ink-black/5">
        <div className="w-10 h-10 rounded-mc-button bg-ink-black grid place-items-center">
          <Compass className="w-5 h-5 text-canvas-cream" />
        </div>
        <div className="leading-tight">
          <p className="text-[15px] font-bold text-ink-black tracking-mc-tight">
            Content<span className="text-signal-orange">Pilot</span>
          </p>
          <p className="text-[10px] uppercase tracking-mc-wide text-slate-gray font-semibold">
            Content engine
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
        <p className="px-3 pb-2 text-[10px] uppercase tracking-mc-wide font-semibold text-slate-gray/70">
          Workspace
        </p>
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
                "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors",
                active
                  ? "text-ink-black"
                  : "text-slate-gray hover:text-ink-black hover:bg-ink-black/5",
              )}>
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-canvas-cream border border-ink-black/10 shadow-mc-soft"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-3">
                <Icon className="w-[18px] h-[18px]" />
                {item.label}
              </span>
              {active && (
                <span className="relative z-10 ml-auto w-1.5 h-1.5 rounded-full bg-signal-orange" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade card */}
      <div className="px-4 pb-4">
        <div className="relative overflow-hidden rounded-2xl bg-ink-black text-canvas-cream p-5">
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-signal-orange/30 blur-2xl" />
          <div className="relative">
            <p className="text-[11px] uppercase tracking-mc-wide font-bold text-signal-orange mb-2">
              Pro Tier
            </p>
            <p className="text-[14px] font-medium leading-snug mb-3">
              Unlock unlimited SEO articles & bulk generation.
            </p>
            <button className="text-[12px] font-semibold px-3 py-2 rounded-lg bg-canvas-cream text-ink-black hover:bg-white transition-colors">
              Upgrade plan
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-ink-black/5">
        <Link
          href="/auth/login"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] text-slate-gray hover:text-ink-black hover:bg-ink-black/5 transition-colors">
          <LogOut className="w-4 h-4" />
          Sign out
        </Link>
      </div>
    </aside>
  );
}
