"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Sparkles,
  Clock,
  Globe,
  Hash,
  ArrowUpRight,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

function SkeletonRow() {
  return (
    <tr className="animate-pulse border-b border-ink-black/5">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-ink-black/8 shrink-0" />
          <div className="flex-1 min-w-0 space-y-2">
            <div className="h-3.5 bg-ink-black/8 rounded-full w-2/3" />
            <div className="h-3 bg-ink-black/5 rounded-full w-1/3" />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 hidden md:table-cell">
        <div className="h-3.5 bg-ink-black/5 rounded-full w-16" />
      </td>
      <td className="px-6 py-4 hidden sm:table-cell">
        <div className="h-3.5 bg-ink-black/5 rounded-full w-20" />
      </td>
      <td className="px-6 py-4 text-right">
        <div className="h-8 w-8 bg-ink-black/5 rounded-lg ml-auto" />
      </td>
    </tr>
  );
}

function getPageNumbers(currentPage: number, totalPages: number) {
  const delta = 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-signal-orange/10 grid place-items-center mb-5">
        <FileText className="w-7 h-7 text-signal-orange" />
      </div>
      <h2 className="text-[20px] font-semibold tracking-mc-tight text-ink-black">
        No articles yet
      </h2>
      <p className="mt-2 text-[14px] text-slate-gray max-w-xs">
        You haven&apos;t generated any articles. Create your first SEO-optimized
        piece now.
      </p>
      <Link
        href="/dashboard/generate-article"
        className="mt-6 inline-flex items-center gap-2 bg-signal-orange text-white px-5 py-3 rounded-mc-button font-semibold text-[14px] hover:bg-light-signal-orange transition-colors">
        <Sparkles className="w-4 h-4" />
        Generate new article
        <ArrowUpRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}

export function ArticleListingClient() {
  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  const fetchArticles = async (pageNum = page) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.content.getArticles(pageNum, pageSize);
      setArticles(res.response.articles ?? []);
      setTotalPages(res.response.pagination.totalPages);
      setTotalCount(res.response.pagination.totalCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(page);
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-ink-black text-canvas-cream px-8 py-10">
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
              Your content library
            </p>
            <h1 className="text-[32px] md:text-[40px] leading-[1.05] font-semibold tracking-mc-tight text-balance">
              Article history
            </h1>
            <p className="mt-3 text-[14px] text-canvas-cream/70 max-w-xl">
              Browse and revisit every article you&apos;ve generated with
              Structa.
            </p>
          </div>
          <Link
            href="/dashboard/generate-article"
            className="group inline-flex items-center gap-2 bg-signal-orange text-white px-5 py-3 rounded-mc-button font-semibold text-[14px] hover:bg-light-signal-orange transition-colors shrink-0">
            <Sparkles className="w-4 h-4" />
            Generate new
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="bg-lifted-cream border border-ink-black/5 rounded-2xl shadow-mc-soft overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink-black/5">
          <div>
            <h2 className="text-[16px] font-semibold text-ink-black tracking-mc-tight">
              Generated articles
            </h2>
            <p className="text-[12px] text-slate-gray mt-0.5">
              {loading
                ? "Loading…"
                : totalCount > 0
                  ? `${totalCount} article${totalCount === 1 ? "" : "s"} total`
                  : "No articles generated yet"}
            </p>
          </div>
          <button
            onClick={() => fetchArticles(page)}
            disabled={loading}
            title="Refresh"
            className="p-2 rounded-xl text-slate-gray hover:text-ink-black hover:bg-canvas-cream transition-colors disabled:opacity-40">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 py-4 bg-red-50 border-b border-red-100 text-[13px] text-red-600 flex items-center justify-between gap-3">
              <span>{error}</span>
              <button
                onClick={() => fetchArticles(page)}
                className="font-semibold underline underline-offset-2">
                Retry
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-canvas-cream/50">
                <th className="px-6 py-3 text-[12px] font-semibold text-slate-gray uppercase tracking-wider">
                  Article
                </th>
                <th className="px-6 py-3 text-[12px] font-semibold text-slate-gray uppercase tracking-wider hidden md:table-cell">
                  Length
                </th>
                <th className="px-6 py-3 text-[12px] font-semibold text-slate-gray uppercase tracking-wider hidden sm:table-cell">
                  Generated
                </th>
                <th className="px-6 py-3 text-[12px] font-semibold text-slate-gray uppercase tracking-wider text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-black/5">
              {loading &&
                Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              {!loading &&
                !error &&
                articles.map((article, i) => (
                  <motion.tr
                    key={article.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="hover:bg-canvas-cream/40 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-signal-orange/10 grid place-items-center shrink-0">
                          <FileText className="w-4 h-4 text-signal-orange" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[14px] font-medium text-ink-black truncate group-hover:text-signal-orange transition-colors">
                            {article.title || "Untitled article"}
                          </p>
                          <p className="text-[11px] text-slate-gray mt-0.5 flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {LANGUAGE_NAMES[article.language] ??
                              article.language}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="inline-flex items-center gap-1 text-[13px] text-ink-black">
                        {article.word_count.toLocaleString()}{" "}
                        <span className="text-slate-gray">words</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="text-[13px] text-slate-gray">
                        {timeAgo(article.createdAt)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/dashboard/article-detail/${article.id}`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-ink-black/5 text-slate-gray hover:text-signal-orange hover:border-signal-orange/30 hover:bg-signal-orange/5 transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
        </div>

        {!loading && !error && articles.length === 0 && <EmptyState />}

        {!loading && !error && totalPages > 1 && (
          <div className="px-6 py-4 border-t border-ink-black/5 flex items-center justify-between gap-4 bg-canvas-cream/30">
            <p className="text-[12px] text-slate-gray">
              Page <span className="font-semibold text-ink-black">{page}</span>{" "}
              of{" "}
              <span className="font-semibold text-ink-black">{totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || loading}
                className="p-2 rounded-lg border border-ink-black/10 text-slate-gray hover:text-ink-black hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1">
                {getPageNumbers(page, totalPages).map((p, i) => {
                  if (p === "...") {
                    return (
                      <span
                        key={`dots-${i}`}
                        className="w-8 h-8 flex items-center justify-center text-slate-gray text-[12px]">
                        ...
                      </span>
                    );
                  }

                  const pageNum = p as number;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`min-w-[32px] h-8 text-[12px] font-semibold rounded-lg transition-colors ${
                        page === pageNum
                          ? "bg-ink-black text-white"
                          : "text-slate-gray hover:bg-white hover:text-ink-black border border-transparent hover:border-ink-black/10"
                      }`}>
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || loading}
                className="p-2 rounded-lg border border-ink-black/10 text-slate-gray hover:text-ink-black hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </motion.section>
    </div>
  );
}
