"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Zap } from "lucide-react";
import { getUser, getCredits, type StoredCredits } from "@/lib/user-storage";

const LABELS: Record<string, string> = {
  dashboard: "Overview",
  "generate-article": "Generate Article",
  profile: "Profile",
  "article-detail": "Article Detail",
  "article-listing": "Article History",
};

export function Topbar() {
  const pathname = usePathname();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [credits, setCredits] = useState<StoredCredits>({
    total: 2,
    used: 0,
    plan: "free",
  });

  useEffect(() => {
    const user = getUser();
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
    }
    setCredits(getCredits());

    const onStorage = () => setCredits(getCredits());
    window.addEventListener("storage", onStorage);
    const id = setInterval(() => setCredits(getCredits()), 2000);
    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(id);
    };
  }, []);

  const initials =
    (firstName ? firstName[0].toUpperCase() : "") +
    (lastName ? lastName[0].toUpperCase() : "");
  const displayName = firstName
    ? `${firstName}${lastName ? " " + lastName[0].toUpperCase() + "." : ""}`
    : "Account";
  const allSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs = allSegments.reduce(
    (acc, seg, i) => {
      if (isNaN(Number(seg))) {
        acc.push({
          label: LABELS[seg] || seg.replace(/-/g, " "),
          href: "/" + allSegments.slice(0, i + 1).join("/"),
        });
      }
      return acc;
    },
    [] as { label: string; href: string }[],
  );

  const remaining = Math.max(0, credits.total - credits.used);
  const pct = credits.total > 0 ? (remaining / credits.total) * 100 : 0;
  const creditColor =
    pct > 50
      ? "bg-emerald-500"
      : pct > 20
        ? "bg-amber-400"
        : "bg-signal-orange";

  return (
    <header className="sticky top-0 z-30 bg-canvas-cream/80 backdrop-blur-xl border-b border-ink-black/5">
      <div className="flex items-center justify-between gap-4 px-6 lg:px-10 h-16">
        <nav
          className="flex items-center gap-1.5 text-[13px] text-slate-gray min-w-0"
          aria-label="Breadcrumb"
        >
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;

            return (
              <span
                key={crumb.href}
                className="flex items-center gap-1.5 min-w-0"
              >
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                {isLast ? (
                  <span className="text-ink-black font-semibold capitalize truncate">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="capitalize hover:text-ink-black transition-colors truncate"
                  >
                    {crumb.label}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/profile?tab=subscription"
            title="View subscription plans"
            className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-full bg-lifted-cream border border-ink-black/10 hover:bg-white transition-colors group"
          >
            <span
              className={`w-2 h-2 rounded-full ${creditColor} transition-colors`}
            />
            <span className="text-[12px] font-semibold text-ink-black leading-none">
              {remaining}
              <span className="font-normal text-slate-gray">
                /{credits.total}
              </span>
            </span>
            <Zap className="w-3.5 h-3.5 text-slate-gray group-hover:text-signal-orange transition-colors" />
            <span className="text-[11px] text-slate-gray capitalize">
              {credits.plan}
            </span>
          </Link>

          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 pl-1 pr-3 h-10 rounded-full bg-lifted-cream border border-ink-black/10 hover:bg-white transition-colors"
          >
            <span className="w-7 h-7 rounded-full bg-ink-black text-canvas-cream text-[11px] font-semibold grid place-items-center">
              {initials || "?"}
            </span>
            <span className="text-[13px] font-medium text-ink-black">
              {displayName}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
