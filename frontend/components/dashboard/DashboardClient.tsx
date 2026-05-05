"use client";

import { useEffect, useState } from "react";
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
  RefreshCw,
} from "lucide-react";
import { getUser } from "@/lib/user-storage";
import { api } from "@/lib/api";
import type { ArticleListItem } from "@/types/article";

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export function DashboardClient() {
  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [recentRes, overviewRes] = await Promise.all([
          api.content.getArticles(1, 4),
          api.dashboard.overview<any>(),
        ]);
        setArticles(recentRes.response?.articles ?? []);
        setStats(overviewRes.response);
      } catch (err) {
        // Ignore error
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const displayStats = [
    {
      label: "Articles generated",
      value: stats?.articles_generated ?? "0",
      icon: FileText,
      accent: "bg-signal-orange/10 text-signal-orange",
    },
    {
      label: "Ranked keywords",
      value: stats?.ranked_keywords?.toLocaleString() ?? "0",
      icon: Target,
      accent: "bg-emerald-500/10 text-emerald-600",
    },
    {
      label: "Words written",
      value:
        stats?.words_written > 1000
          ? `${(stats.words_written / 1000).toFixed(1)}k`
          : (stats?.words_written ?? "0"),
      icon: Zap,
      accent: "bg-ink-black/5 text-ink-black",
    },
  ];

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
            <h1 className="text-[32px] md:text-[40px] leading-[1.05] font-semibold tracking-mc-tight text-balance">
              Welcome back, {getUser()?.first_name ?? ""}
              <br />
              Let&apos;s build something that ranks.
            </h1>
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

      <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {displayStats.map((s, i) => {
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
                {loading ? (
                  <RefreshCw className="w-5 h-5 text-slate-gray animate-spin mt-1" />
                ) : (
                  s.value
                )}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-[12px] text-slate-gray">{s.label}</p>
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
              href="/dashboard/article-listing"
              className="text-[12px] font-semibold text-ink-black hover:text-signal-orange transition-colors flex items-center gap-1"
            >
              View all
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {loading ? (
            <div className="py-12 flex justify-center items-center">
              <RefreshCw className="w-5 h-5 text-slate-gray animate-spin" />
            </div>
          ) : articles.length > 0 ? (
            <ul className="divide-y divide-ink-black/5">
              {articles.map((r) => (
                <li
                  key={r.id}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-canvas-cream transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-ink-black/5 grid place-items-center shrink-0">
                    <FileText className="w-4 h-4 text-ink-black" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/dashboard/article-detail/${r.id}`}
                      className="block group w-fit max-w-full"
                    >
                      <p className="text-[14px] font-medium text-ink-black truncate group-hover:text-signal-orange transition-colors">
                        {r.title || "Untitled article"}
                      </p>
                    </Link>
                    <p className="text-[12px] text-slate-gray mt-0.5">
                      {r.word_count.toLocaleString()} words ·{" "}
                      {LANGUAGE_NAMES[r.language] ?? r.language}
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-gray flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3" />
                    {timeAgo(r.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-signal-orange/10 grid place-items-center mb-4">
                <FileText className="w-6 h-6 text-signal-orange" />
              </div>
              <h2 className="text-[16px] font-semibold tracking-mc-tight text-ink-black">
                No articles yet
              </h2>
              <p className="mt-1.5 text-[13px] text-slate-gray max-w-[240px]">
                You haven&apos;t generated any articles.
              </p>
              <Link
                href="/dashboard/generate-article"
                className="mt-5 inline-flex items-center gap-2 bg-signal-orange text-white px-4 py-2.5 rounded-mc-button font-medium text-[13px] hover:bg-light-signal-orange transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Generate
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}
