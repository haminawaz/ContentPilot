"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { LayoutDashboard, Sparkles, User, LogOut, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";
import { clearAuthCookie } from "@/lib/auth-client";

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

  const handleLogout = () => {
    clearAuthCookie();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-lifted-cream border-r border-ink-black/5 h-screen sticky top-0">
      <div className="flex items-center gap-3 px-7 py-6 border-b border-ink-black/5">
        <Image
          src="/logo.png"
          alt="ContentPilot Logo"
          width={40}
          height={40}
          className={`w-auto object-contain transition-all duration-500`}
          priority
        />
        <div className="leading-tight cursor-default">
          <p className="text-[15px] font-bold text-[#d12329] tracking-mc-tight">
            Content<span className=" text-[#ef9b1a]">Pilot</span>
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
              )}>
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
      <div className="px-4 py-4 border-t border-ink-black/5">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] text-slate-gray hover:text-ink-black hover:bg-ink-black/5 transition-colors cursor-pointer">
          <LogOut className="w-4 h-4" />
          Sign out
        </Button>
      </div>
    </aside>
  );
}
