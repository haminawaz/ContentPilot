"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { ArticleResult } from "./ArticleResult";
import { api } from "@/lib/api";
import type { ArticleDetail } from "@/types/article";
import type { ContentResponse } from "@/types/content-response";

function toResultData(
  article: ArticleDetail,
): ContentResponse["response"] | null {
  if (!article.metadata || !article.linking_strategy || !article.faq) {
    return null;
  }
  return {
    metadata: article.metadata,
    content: {
      markdown: article.content,
      wordCount: article.word_count,
    },
    linkingStrategy: article.linking_strategy,
    faq: article.faq,
  };
}

function SkeletonDetail() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-5 animate-pulse">
      <div className="grid grid-cols-2 gap-4">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="bg-lifted-cream border border-ink-black/5 rounded-2xl p-5 h-20"
          />
        ))}
      </div>
      <div className="bg-lifted-cream border border-ink-black/5 rounded-mc-stadium p-1.5 flex gap-1 self-start">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-9 w-24 rounded-full bg-ink-black/8" />
        ))}
      </div>
      <div className="bg-lifted-cream border border-ink-black/5 rounded-3xl shadow-mc-soft p-8 min-h-96">
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-3 bg-ink-black/8 rounded-full"
              style={{ width: `${70 + (i % 3) * 10}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ArticleDetailClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setError("Invalid article ID.");
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.content.getArticle(Number(id));
        setArticle(res.response);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load article.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const resultData = article ? toResultData(article) : null;

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-mc-wide font-bold text-slate-gray">
            Article detail
          </p>
          <h1 className="text-[24px] font-semibold tracking-mc-tight text-ink-black truncate max-w-lg">
            {loading ? "Loading…" : (article?.title ?? "Article")}
          </h1>
        </div>
        <button
          onClick={() => router.push("/dashboard/article-listing")}
          className="inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-semibold px-4 py-2 rounded-mc-button bg-lifted-cream border border-ink-black/10 text-ink-black hover:bg-white transition-colors shrink-0">
          <ArrowLeft className="w-4 h-4" />
          Back to listing
        </button>
      </motion.div>

      {loading && <SkeletonDetail />}

      {!loading && error && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-50 grid place-items-center">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-[15px] font-semibold text-ink-black">
            Couldn&apos;t load article
          </p>
          <p className="text-[13px] text-slate-gray max-w-xs">{error}</p>
          <button
            onClick={() => router.push("/dashboard/article-listing")}
            className="mt-2 inline-flex cursor-pointer items-center gap-2 bg-signal-orange text-white px-5 py-2.5 rounded-mc-button font-semibold text-[13px] hover:bg-light-signal-orange transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to listing
          </button>
        </motion.div>
      )}

      {!loading && article && !resultData && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto flex flex-col items-center justify-center py-20 gap-4 text-center">
          <AlertCircle className="w-8 h-8 text-slate-gray" />
          <p className="text-[15px] font-semibold text-ink-black">
            Article data is incomplete
          </p>
          <p className="text-[13px] text-slate-gray max-w-xs">
            This article is missing SEO metadata. It may have been generated
            with an older version.
          </p>
        </motion.div>
      )}

      {!loading && resultData && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}>
          <ArticleResult data={resultData} />
        </motion.div>
      )}
    </div>
  );
}
