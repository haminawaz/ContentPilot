"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Brain,
  PenTool,
  Link2,
  CheckCircle,
  Sparkles,
} from "lucide-react";

const STEPS = [
  { icon: Zap, text: "Analyzing search intent..." },
  { icon: Brain, text: "Scouting top competitors..." },
  { icon: PenTool, text: "Crafting your outline..." },
  { icon: Sparkles, text: "Writing engaging content..." },
  { icon: Link2, text: "Building link strategy..." },
  { icon: CheckCircle, text: "Polishing for publication..." },
];

export function ArticleLoading() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setStep((s) => (s + 1) % STEPS.length),
      2500,
    );
    return () => clearInterval(id);
  }, []);

  const current = STEPS[step];
  const Icon = current.icon;

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-lifted-cream border border-ink-black/5 rounded-3xl shadow-mc-soft p-10 text-center">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #141413 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
          aria-hidden
        />

        {/* Rotating rings behind icon */}
        <div className="relative mx-auto w-28 h-28 mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-signal-orange/40"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3 rounded-full border border-ink-black/10"
          />
          <div className="absolute inset-0 grid place-items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ scale: 0.7, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.7, opacity: 0, rotate: 20 }}
                transition={{ duration: 0.35 }}
                className="w-16 h-16 rounded-2xl bg-signal-orange/10 border border-signal-orange/20 grid place-items-center">
                <Icon className="w-7 h-7 text-signal-orange" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}>
            <h2 className="text-[22px] font-semibold text-ink-black tracking-mc-tight">
              {current.text}
            </h2>
            <p className="mt-1 text-[13px] text-slate-gray">
              ContentPilot is working on your article...
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="mt-7 flex items-center justify-center gap-2">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step
                  ? "w-6 bg-signal-orange"
                  : i < step
                    ? "w-1.5 bg-ink-black/30"
                    : "w-1.5 bg-ink-black/10"
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Skeleton preview */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-6 bg-lifted-cream border border-ink-black/5 rounded-3xl shadow-mc-soft p-6 md:p-8">
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-9 w-24 rounded-xl bg-ink-black/5 animate-pulse"
            />
          ))}
        </div>

        <div className="h-7 w-2/3 rounded-lg bg-ink-black/10 animate-pulse mb-4" />
        <div className="space-y-2">
          <div className="h-4 rounded bg-ink-black/5 animate-pulse" />
          <div className="h-4 w-[95%] rounded bg-ink-black/5 animate-pulse" />
          <div className="h-4 w-[90%] rounded bg-ink-black/5 animate-pulse" />
          <div className="h-4 w-[78%] rounded bg-ink-black/5 animate-pulse" />
        </div>
        <div className="h-6 w-1/3 rounded-lg bg-ink-black/10 animate-pulse mt-6 mb-3" />
        <div className="space-y-2">
          <div className="h-4 rounded bg-ink-black/5 animate-pulse" />
          <div className="h-4 w-[88%] rounded bg-ink-black/5 animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
}
