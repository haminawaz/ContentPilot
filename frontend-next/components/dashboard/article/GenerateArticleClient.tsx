"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { ArticleForm } from "./ArticleForm";
import { ArticleLoading } from "./ArticleLoading";
import { ArticleResult } from "./ArticleResult";
import { generateContent } from "@/lib/generate-api";
import type { ContentResponse } from "@/types/content";
import { Toast } from "@/components/ui/Toast";

type View = "form" | "loading" | "result";

export function GenerateArticleClient() {
  const [view, setView] = useState<View>("form");
  const [data, setData] = useState<ContentResponse["response"] | null>(null);
  const [toast, setToast] = useState<{
    id: number;
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info") =>
    setToast({ id: Date.now(), message, type });

  const handleGenerate = async (
    topic: string,
    language: string,
    wordCount: number,
  ) => {
    setView("loading");
    setData(null);
    try {
      const result = await generateContent(topic, language, wordCount);
      setData(result.response);
      setView("result");
      showToast("Article generated. Your draft is ready.", "success");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to generate content. Please try again.";
      showToast(message, "error");
      setView("form");
    }
  };

  const handleReset = () => {
    setData(null);
    setView("form");
  };

  return (
    <div className="relative">
      {/* Sub-header with reset action when showing result */}
      {view === "result" && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-mc-wide font-bold text-slate-gray">
              Generated draft
            </p>
            <h1 className="text-[24px] font-semibold tracking-mc-tight text-ink-black">
              Review &amp; polish your article
            </h1>
          </div>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold px-4 py-2 rounded-mc-button bg-lifted-cream border border-ink-black/10 text-ink-black hover:bg-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            New article
          </button>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {view === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}>
            <ArticleForm onSubmit={handleGenerate} isLoading={false} />
          </motion.div>
        )}
        {view === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}>
            <ArticleLoading />
          </motion.div>
        )}
        {view === "result" && data && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}>
            <ArticleResult data={data} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toasts */}
      <AnimatePresence>
        {toast && (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      {/* Offline/demo hint when no backend */}
      {view === "form" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto mt-6 flex items-start gap-3 text-[12px] text-slate-gray bg-lifted-cream border border-ink-black/5 rounded-2xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-slate-gray shrink-0 mt-0.5" />
          <p>
            Generation calls{" "}
            <code className="font-mono text-ink-black bg-ink-black/5 px-1.5 py-0.5 rounded">
              {process.env.NEXT_PUBLIC_API_URL ||
                "http://localhost:3001/api/v1"}
              /ai-search
            </code>
            . Set{" "}
            <code className="font-mono text-ink-black bg-ink-black/5 px-1.5 py-0.5 rounded">
              NEXT_PUBLIC_API_URL
            </code>{" "}
            to point at your backend.
          </p>
        </motion.div>
      )}
    </div>
  );
}
