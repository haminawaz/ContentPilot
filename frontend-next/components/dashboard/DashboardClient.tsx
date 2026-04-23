"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  FileText,
  TrendingUp,
  Target,
  ArrowUpRight,
  Zap,
  Clock,
} from "lucide-react";

const STATS = [
  {
    label: "Articles generated",
    value: "142",
    delta: "+18%",
    icon: FileText,
    accent: "bg-signal-orange/10 text-signal-orange",
  },
  {
    label: "Avg. SEO score",
    value: "92.4",
    delta: "+4.2",
    icon: TrendingUp,
    accent: "bg-link-blue/10 text-link-blue",
  },
  {
    label: "Ranked keywords",
    value: "1,284",
    delta: "+212",
    icon: Target,
    accent: "bg-emerald-500/10 text-emerald-600",
  },
  {
    label: "Words written",
    value: "198k",
    delta: "+12k",
    icon: Zap,
    accent: "bg-ink-black/5 text-ink-black",
  },
];

const RECENT = [
  {
    title: "Best practices for remote team management",
    keywords: 14,
    words: 1820,
    status: "Published",
    time: "2h ago",
  },
  {
    title: "AI-driven keyword clustering for content teams",
    keywords: 22,
    words: 2140,
    status: "Draft",
    time: "Yesterday",
  },
  {
    title: "Structural SEO: a 2025 playbook for growth marketers",
    keywords: 18,
    words: 1960,
    status: "Published",
    time: "2 days ago",
  },
  {
    title: "E-E-A-T signals every SaaS blog needs to earn",
    keywords: 11,
    words: 1510,
    status: "Published",
    time: "5 days ago",
  },
];

export function DashboardClient() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-ink-black text-canvas-cream px-8 py-10"
      >
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-signal-orange/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-link-blue/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-canvas-cream/70 mb-3">
              <span className="eyebrow-dot" />
              Welcome back
            </p>
            <h1 className="text-[32px] md:text-[40px] leading-[1.05] font-semibold tracking-mc-tight text-balance">
              Good morning, Alex.
              <br />
              Let&apos;s build something that ranks.
            </h1>
            <p className="mt-3 text-[14px] text-canvas-cream/70 max-w-xl">
              Your last article climbed 6 positions this week. Time to keep the
              momentum going.
            </p>
          </div>
          <Link
            href="/dashboard/generate-article"
            className="group inline-flex items-center gap-2 bg-signal-orange text-white px-5 py-3 rounded-mc-button font-semibold text-[14px] hover:bg-light-signal-orange transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            New article
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </motion.section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="relative bg-lifted-cream border border-ink-black/5 rounded-2xl p-5 shadow-mc-soft"
            >
              <div
                className={`w-9 h-9 rounded-xl grid place-items-center ${s.accent}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <p className="mt-4 text-[28px] font-semibold text-ink-black tracking-mc-tight leading-none">
                {s.value}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-[12px] text-slate-gray">{s.label}</p>
                <span className="text-[11px] font-semibold text-emerald-600">
                  {s.delta}
                </span>
              </div>
            </motion.div>
          );
        })}
      </section>

      <section className="w-full gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 bg-lifted-cream border border-ink-black/5 rounded-2xl shadow-mc-soft overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-ink-black/5">
            <div>
              <h2 className="text-[16px] font-semibold text-ink-black tracking-mc-tight">
                Recent articles
              </h2>
              <p className="text-[12px] text-slate-gray mt-0.5">
                Your last four pieces of published or drafted content
              </p>
            </div>
            <Link
              href="/dashboard/generate-article"
              className="text-[12px] font-semibold text-ink-black hover:text-signal-orange transition-colors flex items-center gap-1"
            >
              View all
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <ul className="divide-y divide-ink-black/5">
            {RECENT.map((r, i) => (
              <li
                key={i}
                className="px-6 py-4 flex items-center gap-4 hover:bg-canvas-cream transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-ink-black/5 grid place-items-center shrink-0">
                  <FileText className="w-4 h-4 text-ink-black" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-medium text-ink-black truncate">
                    {r.title}
                  </p>
                  <p className="text-[12px] text-slate-gray mt-0.5">
                    {r.words.toLocaleString()} words · {r.keywords} keywords
                  </p>
                </div>
                <span
                  className={`hidden sm:inline-flex text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                    r.status === "Published"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-ink-black/5 text-slate-gray"
                  }`}
                >
                  {r.status}
                </span>
                <span className="text-[11px] text-slate-gray flex items-center gap-1 shrink-0">
                  <Clock className="w-3 h-3" />
                  {r.time}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>
    </div>
  );
}
