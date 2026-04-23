"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

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
        <nav
          className="flex items-center gap-1.5 text-[13px] text-slate-gray min-w-0"
          aria-label="Breadcrumb"
        >
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
                    className="capitalize hover:text-ink-black transition-colors truncate"
                  >
                    {label}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 pl-1 pr-3 h-10 rounded-full bg-lifted-cream border border-ink-black/10 hover:bg-white transition-colors"
          >
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
