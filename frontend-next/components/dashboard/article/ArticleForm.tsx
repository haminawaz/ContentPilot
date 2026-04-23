"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  FileText,
  Globe,
  Hash,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  onSubmit: (topic: string, language: string, wordCount: number) => void;
  isLoading: boolean;
}

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
];

const WORD_COUNT_OPTIONS = [
  { value: 1000, label: "Short", desc: "~1000 words" },
  { value: 1500, label: "Medium", desc: "~1500 words" },
  { value: 2000, label: "Long", desc: "~2000 words" },
];

const FEATURES = [
  "SEO optimized",
  "Human-like writing",
  "FAQ included",
  "Link strategy",
];

const SUGGESTIONS = [
  "Best practices for remote team management",
  "AI-driven keyword clustering for content teams",
  "How structural SEO compounds authority in 2026",
];

export function ArticleForm({ onSubmit, isLoading }: Props) {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("en");
  const [wordCount, setWordCount] = useState(1500);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onSubmit(topic.trim(), language, wordCount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-signal-orange/10 text-signal-orange text-[11px] font-bold uppercase tracking-mc-wide">
          <Sparkles className="w-3 h-3" />
          AI-powered generation
        </span>
        <h1 className="mt-4 text-[40px] md:text-[48px] leading-[1.02] font-semibold tracking-mc-tight text-ink-black text-balance">
          Create an{" "}
          <span className="relative inline-block">
            <span className="relative z-10">SEO-optimized</span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="absolute left-0 right-0 bottom-1 h-[6px] bg-signal-orange/30 -z-0 origin-left"
            />
          </span>{" "}
          article
        </h1>
        <p className="mt-3 text-[15px] text-slate-gray max-w-xl mx-auto">
          Enter your topic and let ContentPilot handle the research, writing,
          and optimization.
        </p>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="relative bg-lifted-cream border border-ink-black/5 rounded-3xl shadow-mc-soft p-6 md:p-8">
        <div
          className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-signal-orange/50 to-transparent"
          aria-hidden
        />

        {/* Topic */}
        <div>
          <label
            htmlFor="topic"
            className="flex items-center gap-2 text-[12px] font-bold text-ink-black tracking-mc-wide mb-2 ml-1">
            <FileText className="w-3.5 h-3.5" />
            Article topic or primary keyword
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-gray absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isLoading}
              placeholder="e.g., Best practices for remote team management"
              autoComplete="off"
              className="w-full bg-canvas-cream/50 border border-ink-black/10 rounded-mc-button pl-11 pr-4 py-3.5 text-[14px] text-ink-black placeholder:text-dust-taupe focus:outline-none focus:border-ink-black transition-colors"
            />
          </div>

          {/* Suggestions */}
          <div className="mt-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setTopic(s)}
                disabled={isLoading}
                className="text-[11px] px-2.5 py-1 rounded-full bg-canvas-cream border border-ink-black/10 text-slate-gray hover:text-ink-black hover:border-ink-black/30 transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Language + Word count */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <div>
            <label
              htmlFor="language"
              className="flex items-center gap-2 text-[12px] font-bold text-ink-black tracking-mc-wide mb-2 ml-1">
              <Globe className="w-3.5 h-3.5" /> Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={isLoading}
              className="w-full bg-canvas-cream/50 border border-ink-black/10 rounded-mc-button px-4 py-3 text-[14px] text-ink-black focus:outline-none focus:border-ink-black transition-colors">
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-[12px] font-bold text-ink-black tracking-mc-wide mb-2 ml-1">
              <Hash className="w-3.5 h-3.5" /> Article length
            </label>
            <div className="grid grid-cols-3 gap-2">
              {WORD_COUNT_OPTIONS.map((opt) => {
                const active = wordCount === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setWordCount(opt.value)}
                    disabled={isLoading}
                    className={`relative rounded-mc-button border px-3 py-2.5 text-left transition-colors ${
                      active
                        ? "bg-ink-black text-canvas-cream border-ink-black"
                        : "bg-canvas-cream/50 text-ink-black border-ink-black/10 hover:border-ink-black/30"
                    }`}>
                    <span className="block text-[12px] font-bold tracking-mc-wide uppercase">
                      {opt.label}
                    </span>
                    <span
                      className={`block text-[10px] mt-0.5 ${active ? "text-canvas-cream/70" : "text-slate-gray"}`}>
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-7">
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            isLoading={isLoading}
            disabled={isLoading || !topic.trim()}
            className="w-full">
            {!isLoading && <Sparkles className="w-4 h-4" />}
            {isLoading ? "Generating your article..." : "Generate article"}
          </Button>
        </div>

        {/* Features */}
        <div className="mt-6 flex items-center justify-center gap-x-5 gap-y-2 flex-wrap">
          {FEATURES.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1.5 text-[11px] text-slate-gray">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              {f}
            </span>
          ))}
        </div>
      </motion.form>
    </motion.div>
  );
}
