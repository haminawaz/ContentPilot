import { useState } from "react";
import { InputForm } from "./components/InputForm";
import { ResultDisplay } from "./components/ResultDisplay";
import { LoadingView } from "./components/LoadingView";
import { ToastContainer, useToast } from "./components/Toast";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { generateContent } from "./api";
import type { ContentResponse } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, ArrowLeft, Sun, Moon } from "lucide-react";

function AppContent() {
  const [data, setData] = useState<ContentResponse["response"] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toasts, dismissToast, success, error: showError } = useToast();
  const { theme, toggleTheme } = useTheme();

  const handleGenerate = async (
    topic: string,
    language: string,
    wordCount: number,
  ) => {
    setIsLoading(true);
    setData(null);

    try {
      const result = await generateContent(topic, language, wordCount);
      setData(result.response);
      success(
        "Article Generated!",
        "Your SEO-optimized content is ready to use.",
      );
    } catch (err: any) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message ||
        "Failed to generate content. Please try again.";
      const errorDetails = err.response?.data?.error?.details;
      showError("Generation Failed", errorDetails || errorMessage);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setData(null);
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Header */}
      <header
        className="glass-panel"
        style={{
          margin: "1.5rem 1.5rem 0",
          padding: "1rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              background: "var(--gradient-primary)",
              padding: "0.6rem",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Compass size={24} style={{ color: "white" }} />
          </div>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "1.25rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}>
              Content<span className="gradient-text">Pilot</span>
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: "0.7rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}>
              AI Content Engine
            </p>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {data && !isLoading && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleReset}
              className="btn btn-secondary"
              style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
              <ArrowLeft size={16} />
              New Article
            </motion.button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-icon"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            <motion.div
              initial={false}
              animate={{ rotate: theme === "light" ? 0 : 180 }}
              transition={{ duration: 0.3 }}>
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </motion.div>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container" style={{ flex: 1, padding: "3rem 1.5rem" }}>
        <AnimatePresence mode="wait">
          {!isLoading && !data && (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}>
              <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}>
              <LoadingView />
            </motion.div>
          )}

          {!isLoading && data && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <ResultDisplay data={data} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: "2rem 1.5rem",
          textAlign: "center",
          borderTop: "1px solid var(--border-secondary)",
        }}>
        <p
          style={{
            margin: 0,
            color: "var(--text-muted)",
            fontSize: "0.85rem",
          }}>
          © 2026{" "}
          <strong style={{ color: "var(--primary)" }}>ContentPilot</strong> —
          AI-Powered SEO Content Generation
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
