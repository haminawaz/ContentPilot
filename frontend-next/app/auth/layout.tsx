"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, TrendingUp, Target } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex font-sans selection:bg-signal-orange selection:text-white bg-canvas-cream">
      {/* LEFT: form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col min-h-screen relative overflow-hidden">
        {/* ambient decoration */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(15,15,15,0.05) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse at top right, black 0%, transparent 65%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at top right, black 0%, transparent 65%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full bg-signal-orange/[0.06] blur-[100px]"
        />
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 80, ease: "linear", repeat: Infinity }}
          className="pointer-events-none absolute -top-40 -right-40 w-[420px] h-[420px] rounded-full border border-light-signal-orange/20"
        />

        <div className="relative z-10 px-8 pt-8 md:px-12 md:pt-10 flex items-center justify-between">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="ContentPilot Logo"
              width={350}
              height={350}
              className="h-16 md:h-20 w-auto object-contain"
              priority
            />
          </Link>

          <Link
            href="/"
            className="hidden md:inline-flex items-center gap-1.5 text-[12px] font-medium tracking-mc-tight text-slate-gray hover:text-ink-black transition-colors group">
            Back to site
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center px-8 py-12 md:px-16 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[420px]">
            <div className="relative">
              {/* soft card glow */}
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-signal-orange/5 via-transparent to-canvas-cream/40 blur-2xl pointer-events-none"
              />
              <div className="relative bg-white border border-ink-black/5 rounded-mc-consent shadow-mc-soft p-8 md:p-10">
                {children}
              </div>
            </div>

            <p className="text-center mt-8 text-[11px] tracking-mc-wide uppercase text-slate-gray/70">
              Secured by ContentPilot &middot; v1.0
            </p>
          </motion.div>
        </div>
      </div>

      {/* RIGHT: 3D scene */}
      <div className="hidden lg:flex w-1/2 bg-ink-black relative overflow-hidden flex-col items-center justify-center p-16">
        {/* rotating rings */}
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 90, ease: "linear", repeat: Infinity }}
          className="absolute top-[-15%] right-[-10%] w-[520px] h-[520px] border border-white/5 rounded-full"
        />
        <motion.div
          aria-hidden
          animate={{ rotate: -360 }}
          transition={{ duration: 120, ease: "linear", repeat: Infinity }}
          className="absolute bottom-[-12%] left-[-18%] w-[440px] h-[440px] border border-white/5 rounded-full"
        />
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          className="absolute top-[28%] left-[8%] w-[220px] h-[220px] border border-signal-orange/15 rounded-full"
        />

        {/* ambient halo */}
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] bg-signal-orange/10 rounded-full blur-[120px]"
        />

        {/* dot grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1400 }}
          className="relative z-10 max-w-md w-full">
          {/* floating KPI card (top-right) */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { delay: 0.8, duration: 0.6 },
              y: {
                delay: 0.8,
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
              },
            }}
            className="absolute -top-10 -right-6 z-20 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-signal-orange/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-signal-orange" />
              </div>
              <div>
                <p className="text-[10px] tracking-mc-wide uppercase text-white/50">
                  Ranking
                </p>
                <p className="text-white text-sm font-medium tracking-mc-tight">
                  #3 &rarr; #1
                </p>
              </div>
            </div>
          </motion.div>

          {/* floating KPI card (bottom-left) */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { delay: 1, duration: 0.6 },
              y: {
                delay: 1,
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
              },
            }}
            className="absolute -bottom-8 -left-4 z-20 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[10px] tracking-mc-wide uppercase text-white/50">
                  Intent match
                </p>
                <p className="text-white text-sm font-medium tracking-mc-tight">
                  96% aligned
                </p>
              </div>
            </div>
          </motion.div>

          {/* main analytics card */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
            className="relative bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-mc-stadium p-7 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-signal-orange" />
                <span className="text-white/80 text-[11px] font-semibold tracking-mc-wide uppercase">
                  Flight deck
                </span>
              </div>
              <div className="flex gap-1.5">
                <span className="text-[10px] px-2.5 py-1 rounded-mc-pill bg-white/10 text-white/60">
                  W
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-mc-pill bg-signal-orange text-white font-medium">
                  M
                </span>
              </div>
            </div>

            {/* animated chart */}
            <div className="relative h-32 mb-2">
              <svg
                viewBox="0 0 280 120"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none">
                <defs>
                  <linearGradient
                    id="authChartFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1">
                    <stop offset="0%" stopColor="#f37338" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#f37338" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="authChartLine"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0">
                    <stop offset="0%" stopColor="#f37338" />
                    <stop offset="100%" stopColor="#ffb88a" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M0,90 C40,80 60,60 90,55 C120,50 140,70 170,50 C200,32 220,28 280,12 L280,120 L0,120 Z"
                  fill="url(#authChartFill)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    delay: 0.6,
                    duration: 1.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
                <motion.path
                  d="M0,90 C40,80 60,60 90,55 C120,50 140,70 170,50 C200,32 220,28 280,12"
                  fill="none"
                  stroke="url(#authChartLine)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    delay: 0.6,
                    duration: 1.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </svg>
              {/* pulsing endpoint */}
              <motion.span
                aria-hidden
                className="absolute top-[9%] right-0 block w-2.5 h-2.5 rounded-full bg-signal-orange"
                animate={{ scale: [1, 1.8, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-white/30 mt-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>

            {/* stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
              <div>
                <p className="text-[22px] font-semibold text-white tracking-mc-tight leading-none">
                  2.4k
                </p>
                <p className="text-[11px] text-white/40 mt-2">Visitors</p>
              </div>
              <div>
                <p className="text-[22px] font-semibold text-signal-orange tracking-mc-tight leading-none">
                  89%
                </p>
                <p className="text-[11px] text-white/40 mt-2">SEO score</p>
              </div>
              <div>
                <p className="text-[22px] font-semibold text-white tracking-mc-tight leading-none">
                  142
                </p>
                <p className="text-[11px] text-white/40 mt-2">Keywords</p>
              </div>
            </div>
          </motion.div>

          {/* tagline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-center mt-14">
            <h2 className="text-[28px] font-medium text-white tracking-mc-tight leading-tight mb-3 text-balance">
              Structural SEO,{" "}
              <span className="text-signal-orange">autopilot mode</span>
            </h2>
            <p className="text-white/50 text-[13px] leading-relaxed max-w-xs mx-auto">
              Deploy content architecture that ranks. Track performance,
              optimise structure, and grow organically.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
