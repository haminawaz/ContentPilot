"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getUser } from "@/lib/user-storage";

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

  useEffect(() => {
    const user = getUser();
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
    }
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

  return (
    <header className="sticky top-0 z-30 bg-canvas-cream/80 backdrop-blur-xl border-b border-ink-black/5">
      <div className="flex items-center justify-between gap-4 px-6 lg:px-10 h-16">
        <nav
          className="flex items-center gap-1.5 text-[13px] text-slate-gray min-w-0"
          aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;

            return (
              <span
                key={crumb.href}
                className="flex items-center gap-1.5 min-w-0">
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                {isLast ? (
                  <span className="text-ink-black font-semibold capitalize truncate">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="capitalize hover:text-ink-black transition-colors truncate">
                    {crumb.label}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 pl-1 pr-3 h-10 rounded-full bg-lifted-cream border border-ink-black/10 hover:bg-white transition-colors">
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
