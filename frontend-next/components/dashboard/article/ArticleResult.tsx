"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Database,
  Link as LinkIcon,
  HelpCircle,
  CheckCircle,
  ExternalLink,
  Copy,
  Check,
  Tag,
  TrendingUp,
} from "lucide-react";
import type { ContentResponse } from "@/types/content";
import { cn } from "@/lib/utils";

interface Props {
  data: ContentResponse["response"];
}

type TabType = "content" | "seo" | "links" | "faq";

const TABS: { id: TabType; label: string; icon: typeof FileText }[] = [
  { id: "content", label: "Article", icon: FileText },
  { id: "seo", label: "SEO data", icon: Database },
  { id: "links", label: "Links", icon: LinkIcon },
  { id: "faq", label: "FAQ", icon: HelpCircle },
];

export function ArticleResult({ data }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("content");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(data.content.markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-5">
      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 gap-4">
        <StatCard
          icon={CheckCircle}
          accent="bg-emerald-500/10 text-emerald-600"
          label="Word count"
          value={data.content.wordCount.toLocaleString()}
        />
        <StatCard
          icon={TrendingUp}
          accent="bg-signal-orange/10 text-signal-orange"
          label="Keywords"
          value={String(data.metadata.targetKeywords.length)}
        />
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-lifted-cream border border-ink-black/5 rounded-mc-stadium p-1.5 flex items-center gap-1 self-start">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = t.id === activeTab;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={cn(
                "relative px-4 py-2 rounded-full text-[13px] font-semibold tracking-mc-tight transition-colors flex items-center gap-2",
                active ? "text-canvas-cream" : "text-slate-gray hover:text-ink-black",
              )}>
              {active && (
                <motion.span
                  layoutId="result-tab"
                  className="absolute inset-0 rounded-full bg-ink-black"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className="w-4 h-4 relative" />
              <span className="relative">{t.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Content panel */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-lifted-cream border border-ink-black/5 rounded-3xl shadow-mc-soft p-6 md:p-8 min-h-[420px]">
        <AnimatePresence mode="wait">
          {activeTab === "content" && (
            <motion.div
              key="content"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25 }}>
              <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
                <div>
                  <p className="text-[11px] uppercase tracking-mc-wide font-bold text-slate-gray">
                    Markdown draft
                  </p>
                  <h3 className="text-[18px] font-semibold text-ink-black tracking-mc-tight">
                    {data.metadata.title}
                  </h3>
                </div>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-2 rounded-mc-button bg-canvas-cream border border-ink-black/10 text-ink-black hover:bg-white transition-colors">
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy markdown
                    </>
                  )}
                </button>
              </div>
              <article className="markdown-body">
                <ReactMarkdown>{data.content.markdown}</ReactMarkdown>
              </article>
            </motion.div>
          )}

          {activeTab === "seo" && (
            <motion.div
              key="seo"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25 }}>
              <section className="mb-7">
                <h3 className="flex items-center gap-2 text-[14px] font-semibold text-ink-black mb-3">
                  <Tag className="w-4 h-4 text-signal-orange" /> Meta tags
                </h3>
                <div className="bg-canvas-cream border border-ink-black/5 rounded-2xl p-5 mb-3">
                  <p className="text-[10px] uppercase tracking-mc-wide font-bold text-slate-gray">
                    Title tag
                  </p>
                  <p className="mt-1 text-[15px] font-semibold text-ink-black">
                    {data.metadata.title}
                  </p>
                </div>
                <div className="bg-canvas-cream border border-ink-black/5 rounded-2xl p-5">
                  <p className="text-[10px] uppercase tracking-mc-wide font-bold text-slate-gray">
                    Meta description
                  </p>
                  <p className="mt-1 text-[14px] text-ink-black leading-relaxed">
                    {data.metadata.metaDescription}
                  </p>
                </div>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-[14px] font-semibold text-ink-black mb-3">
                  <TrendingUp className="w-4 h-4 text-signal-orange" /> Target
                  keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.metadata.targetKeywords.map((kw, i) => (
                    <div
                      key={i}
                      className="inline-flex items-center gap-2 bg-canvas-cream border border-ink-black/5 rounded-full px-3 py-1.5">
                      <span className="text-[13px] font-semibold text-ink-black">
                        {kw.keyword}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-mc-wide px-2 py-0.5 rounded-full",
                          kw.type === "primary"
                            ? "bg-signal-orange text-white"
                            : kw.type === "secondary"
                              ? "bg-ink-black text-canvas-cream"
                              : "bg-ink-black/10 text-slate-gray",
                        )}>
                        {kw.type}
                      </span>
                      {kw.density && (
                        <span className="text-[11px] text-slate-gray font-mono">
                          {kw.density}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === "links" && (
            <motion.div
              key="links"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25 }}>
              <section className="mb-7">
                <h3 className="flex items-center gap-2 text-[14px] font-semibold text-ink-black mb-3">
                  <LinkIcon className="w-4 h-4 text-emerald-600" /> Internal
                  linking opportunities
                </h3>
                <div className="flex flex-col gap-3">
                  {data.linkingStrategy.internalLinks.map((link, i) => (
                    <div
                      key={i}
                      className="bg-canvas-cream border border-ink-black/5 rounded-2xl p-5 flex gap-3">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[14px] font-semibold text-ink-black">
                          {link.targetTopic}
                        </p>
                        <p className="text-[12px] text-signal-orange mt-0.5">
                          Anchor: &ldquo;{link.anchorText}&rdquo;
                        </p>
                        <p className="text-[13px] text-slate-gray italic mt-1.5">
                          {link.context}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="flex items-center gap-2 text-[14px] font-semibold text-ink-black mb-3">
                  <ExternalLink className="w-4 h-4 text-link-blue" /> External
                  references
                </h3>
                <div className="flex flex-col gap-3">
                  {data.linkingStrategy.externalLinks.map((link, i) => (
                    <div
                      key={i}
                      className="bg-canvas-cream border border-ink-black/5 rounded-2xl p-5">
                      <p className="text-[14px] font-semibold text-ink-black">
                        {link.anchorText}
                      </p>
                      {link.url && (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[12px] text-link-blue hover:underline break-all block mt-1">
                          {link.url}
                        </a>
                      )}
                      <p className="text-[13px] text-slate-gray mt-1.5">
                        {link.context}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === "faq" && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25 }}>
              <h3 className="flex items-center gap-2 text-[14px] font-semibold text-ink-black mb-4">
                <HelpCircle className="w-4 h-4 text-signal-orange" /> Frequently
                asked questions
              </h3>
              <div className="flex flex-col gap-3">
                {data.faq.map((item, i) => (
                  <div
                    key={i}
                    className="bg-canvas-cream border border-ink-black/5 rounded-2xl p-5">
                    <p className="text-[14px] font-semibold text-ink-black flex gap-2">
                      <span className="text-signal-orange">Q:</span>
                      <span>{item.question}</span>
                    </p>
                    <div className="mt-3 pl-4 border-l-2 border-signal-orange text-[13.5px] text-slate-gray leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  accent,
  label,
  value,
}: {
  icon: typeof FileText;
  accent: string;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-lifted-cream border border-ink-black/5 rounded-2xl p-5 flex items-center gap-4">
      <div className={cn("w-11 h-11 rounded-xl grid place-items-center", accent)}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[12px] text-slate-gray">{label}</p>
        <p className="text-[22px] font-semibold text-ink-black tracking-mc-tight leading-tight">
          {value}
        </p>
      </div>
    </div>
  );
}
