"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Sparkles,
  User,
  LogOut,
  FileText,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";
import { clearAuthCookie } from "@/lib/auth-client";
import { getCredits, type StoredCredits } from "@/lib/user-storage";
import { useState, useEffect } from "react";

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
    href: "/dashboard/article-listing",
    label: "Article Listing",
    icon: FileText,
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: User,
  },
];

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [credits, setCredits] = useState<StoredCredits>({
    total: 2,
    used: 0,
    plan: "free",
  });

  useEffect(() => {
    setCredits(getCredits());
    const onStorage = () => setCredits(getCredits());
    window.addEventListener("storage", onStorage);
    const id = setInterval(() => setCredits(getCredits()), 2000);
    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(id);
    };
  }, []);

  const handleLogout = () => {
    clearAuthCookie();
    router.push("/auth/login");
    router.refresh();
  };

  const remaining = Math.max(0, credits.total - credits.used);
  const pct = credits.total > 0 ? (credits.used / credits.total) * 100 : 0;
  const barColor =
    pct < 50
      ? "bg-emerald-500"
      : pct < 80
        ? "bg-amber-400"
        : "bg-signal-orange";

  return (
    <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-lifted-cream border-r border-ink-black/5 h-screen sticky top-0">
      <div className="flex items-center gap-3 px-7 py-6 border-b border-ink-black/5">
        <Image
          src="/logo.png"
          alt="Structa Logo"
          width={40}
          height={40}
          className={`w-auto object-contain transition-all duration-500`}
          priority
        />
        <div className="leading-tight cursor-default">
          <p className="text-[15px] font-bold text-[#d12329] tracking-mc-tight">
            Structa
          </p>
        </div>
      </div>

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
              )}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-canvas-cream border border-ink-black/10 shadow-mc-soft"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-3">
                <Icon className="w-4.5 h-4.5" />
                {item.label}
              </span>
              {active && (
                <span className="relative z-10 ml-auto w-1.5 h-1.5 rounded-full bg-signal-orange" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-2">
        <Link
          href="/dashboard/profile?tab=subscription"
          className="block rounded-2xl border border-ink-black/8 bg-canvas-cream p-4 hover:bg-white transition-colors group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-signal-orange" />
              <span className="text-[12px] font-semibold text-ink-black">
                Credits
              </span>
            </div>
            <span className="text-[11px] font-medium capitalize text-slate-gray bg-ink-black/5 px-2 py-0.5 rounded-full">
              {credits.plan}
            </span>
          </div>

          <div className="h-1.5 rounded-full bg-ink-black/8 overflow-hidden mb-2">
            <motion.div
              className={`h-full rounded-full ${barColor} transition-colors`}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-gray">
              {credits.used} used of {credits.total}
            </span>
            <span className="text-[11px] font-semibold text-ink-black">
              {remaining} left
            </span>
          </div>

          <p className="mt-2 text-[11px] text-slate-gray/70 group-hover:text-slate-gray transition-colors">
            Upgrade for more →
          </p>
        </Link>
      </div>

      <div className="px-4 py-4 border-t border-ink-black/5">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] text-slate-gray hover:text-ink-black hover:bg-ink-black/5 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </Button>
      </div>
    </aside>
  );
}
