"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, ChevronRight } from "lucide-react";

const LABELS: Record<string, string> = {
  dashboard: "Overview",
  "generate-article": "Generate Article",
  profile: "Profile",
};

export function Topbar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 z-30 bg-canvas-cream/80 backdrop-blur-xl border-b border-ink-black/5">
      <div className="flex items-center justify-between gap-4 px-6 lg:px-10 h-16">
        {/* Breadcrumbs */}
        <nav
          className="flex items-center gap-1.5 text-[13px] text-slate-gray min-w-0"
          aria-label="Breadcrumb">
          {segments.map((seg, i) => {
            const href = "/" + segments.slice(0, i + 1).join("/");
            const last = i === segments.length - 1;
            const label = LABELS[seg] || seg.replace(/-/g, " ");
            return (
              <span key={href} className="flex items-center gap-1.5 min-w-0">
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                {last ? (
                  <span className="text-ink-black font-semibold capitalize truncate">
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="capitalize hover:text-ink-black transition-colors truncate">
                    {label}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 h-10 rounded-mc-button bg-lifted-cream border border-ink-black/10 w-64">
            <Search className="w-4 h-4 text-slate-gray shrink-0" />
            <input
              placeholder="Search articles, keywords..."
              className="bg-transparent text-[13px] text-ink-black placeholder:text-slate-gray focus:outline-none w-full"
            />
            <kbd className="text-[10px] font-mono text-slate-gray px-1.5 py-0.5 rounded bg-ink-black/5 border border-ink-black/10">
              ⌘K
            </kbd>
          </div>

          <button
            aria-label="Notifications"
            className="relative w-10 h-10 rounded-full bg-lifted-cream border border-ink-black/10 grid place-items-center hover:bg-white transition-colors">
            <Bell className="w-4 h-4 text-ink-black" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-signal-orange" />
          </button>

          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 pl-1 pr-3 h-10 rounded-full bg-lifted-cream border border-ink-black/10 hover:bg-white transition-colors">
            <span className="w-7 h-7 rounded-full bg-ink-black text-canvas-cream text-[11px] font-semibold grid place-items-center">
              AM
            </span>
            <span className="text-[13px] font-medium text-ink-black">
              Alex M.
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
