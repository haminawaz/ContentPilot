import React, { useState } from "react";
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
import type { ContentResponse } from "../types";

interface ResultDisplayProps {
  data: ContentResponse["response"];
}

type TabType = "content" | "seo" | "links" | "faq";

const TABS = [
  { id: "content" as TabType, label: "Article", icon: FileText },
  { id: "seo" as TabType, label: "SEO Data", icon: Database },
  { id: "links" as TabType, label: "Links", icon: LinkIcon },
  { id: "faq" as TabType, label: "FAQ", icon: HelpCircle },
];

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<TabType>("content");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(data.content.markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabContent = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid-cols-2"
        style={{ marginBottom: "1.5rem", gap: "1rem" }}>
        <div
          className="card"
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              padding: "0.75rem",
              background: "var(--success-bg)",
              borderRadius: "10px",
            }}>
            <CheckCircle size={20} style={{ color: "var(--success)" }} />
          </div>
          <div>
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                margin: 0,
              }}>
              Word Count
            </p>
            <p style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>
              {data.content.wordCount.toLocaleString()}
            </p>
          </div>
        </div>
        <div
          className="card"
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              padding: "0.75rem",
              background: "var(--primary-glow)",
              borderRadius: "10px",
            }}>
            <TrendingUp size={20} style={{ color: "var(--primary)" }} />
          </div>
          <div>
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                margin: 0,
              }}>
              Keywords
            </p>
            <p style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>
              {data.metadata.targetKeywords.length}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="tabs">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab ${activeTab === tab.id ? "active" : ""}`}>
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </motion.div>

      {/* Content Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel"
        style={{ padding: "2rem", minHeight: "400px" }}>
        <AnimatePresence mode="wait">
          {/* Article Tab */}
          {activeTab === "content" && (
            <motion.div
              key="content"
              variants={tabContent}
              initial="hidden"
              animate="visible"
              exit="exit">
              {/* Copy Button */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "1rem",
                }}>
                <button
                  onClick={handleCopy}
                  className="btn btn-secondary"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
                  {copied ? (
                    <>
                      <Check size={14} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy Markdown
                    </>
                  )}
                </button>
              </div>
              <div className="markdown-content">
                <ReactMarkdown>{data.content.markdown}</ReactMarkdown>
              </div>
            </motion.div>
          )}

          {/* SEO Tab */}
          {activeTab === "seo" && (
            <motion.div
              key="seo"
              variants={tabContent}
              initial="hidden"
              animate="visible"
              exit="exit">
              {/* Meta Tags */}
              <div style={{ marginBottom: "2rem" }}>
                <h3
                  style={{
                    fontSize: "1rem",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}>
                  <Tag size={16} style={{ color: "var(--primary)" }} />
                  Meta Tags
                </h3>
                <div className="card" style={{ marginBottom: "1rem" }}>
                  <label
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>
                    Title Tag
                  </label>
                  <p
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      margin: "0.25rem 0 0",
                      color: "var(--text-primary)",
                    }}>
                    {data.metadata.title}
                  </p>
                </div>
                <div className="card">
                  <label
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>
                    Meta Description
                  </label>
                  <p
                    style={{
                      margin: "0.25rem 0 0",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}>
                    {data.metadata.metaDescription}
                  </p>
                </div>
              </div>

              {/* Keywords */}
              <div>
                <h3
                  style={{
                    fontSize: "1rem",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}>
                  <TrendingUp size={16} style={{ color: "var(--primary)" }} />
                  Target Keywords
                </h3>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                  {data.metadata.targetKeywords.map((kw, i) => (
                    <div
                      key={i}
                      className="card"
                      style={{
                        padding: "0.75rem 1rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        flex: "0 0 auto",
                      }}>
                      <span style={{ fontWeight: 600 }}>{kw.keyword}</span>
                      <span
                        className={`badge ${kw.type === "primary" ? "badge-primary" : ""}`}
                        style={{
                          fontSize: "0.7rem",
                          textTransform: "capitalize",
                        }}>
                        {kw.type}
                      </span>
                      {kw.density && (
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--text-muted)",
                          }}>
                          {kw.density}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Links Tab */}
          {activeTab === "links" && (
            <motion.div
              key="links"
              variants={tabContent}
              initial="hidden"
              animate="visible"
              exit="exit">
              {/* Internal Links */}
              <div style={{ marginBottom: "2rem" }}>
                <h3
                  style={{
                    fontSize: "1rem",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}>
                  <LinkIcon size={16} style={{ color: "var(--success)" }} />
                  Internal Linking Opportunities
                </h3>
                {data.linkingStrategy.internalLinks.map((link, i) => (
                  <div
                    key={i}
                    className="card"
                    style={{ marginBottom: "0.75rem" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                      }}>
                      <CheckCircle
                        size={16}
                        style={{
                          color: "var(--success)",
                          marginTop: "2px",
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontWeight: 600 }}>
                          {link.targetTopic}
                        </p>
                        <p
                          style={{
                            margin: "0.25rem 0 0",
                            fontSize: "0.9rem",
                            color: "var(--primary)",
                          }}>
                          Anchor: "{link.anchorText}"
                        </p>
                        <p
                          style={{
                            margin: "0.5rem 0 0",
                            fontSize: "0.85rem",
                            color: "var(--text-tertiary)",
                            fontStyle: "italic",
                          }}>
                          {link.context}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* External Links */}
              <div>
                <h3
                  style={{
                    fontSize: "1rem",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}>
                  <ExternalLink size={16} style={{ color: "var(--info)" }} />
                  External References
                </h3>
                {data.linkingStrategy.externalLinks.map((link, i) => (
                  <div
                    key={i}
                    className="card"
                    style={{ marginBottom: "0.75rem" }}>
                    <p style={{ margin: 0, fontWeight: 600 }}>
                      {link.anchorText}
                    </p>
                    {link.url && (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "0.85rem",
                          display: "block",
                          marginTop: "0.25rem",
                        }}>
                        {link.url}
                      </a>
                    )}
                    <p
                      style={{
                        margin: "0.5rem 0 0",
                        fontSize: "0.85rem",
                        color: "var(--text-tertiary)",
                      }}>
                      {link.context}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* FAQ Tab */}
          {activeTab === "faq" && (
            <motion.div
              key="faq"
              variants={tabContent}
              initial="hidden"
              animate="visible"
              exit="exit">
              <h3
                style={{
                  fontSize: "1rem",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}>
                <HelpCircle size={16} style={{ color: "var(--warning)" }} />
                Frequently Asked Questions
              </h3>
              {data.faq.map((item, i) => (
                <div key={i} className="card" style={{ marginBottom: "1rem" }}>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.5rem",
                    }}>
                    <span style={{ color: "var(--primary)", fontWeight: 700 }}>
                      Q:
                    </span>
                    {item.question}
                  </p>
                  <div
                    style={{
                      marginTop: "0.75rem",
                      paddingLeft: "1.5rem",
                      borderLeft: "2px solid var(--primary)",
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                    }}>
                    {item.answer}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
