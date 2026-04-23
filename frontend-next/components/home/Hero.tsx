"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Sparkles, TrendingUp, Activity } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  const headline = ["The", "Structural", "Integrity", "of", "SEO."];

  return (
    <section
      ref={ref}
      className="relative px-6 md:px-[100px] pt-[160px] md:pt-[200px] pb-[80px] md:pb-[140px] min-h-[90vh] flex items-center overflow-hidden bg-canvas-cream">
      {/* Animated dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #14141322 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)",
        }}
      />

      {/* Signal-orange halo glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute right-[-10vw] top-[10vh] w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(243,115,56,0.18) 0%, rgba(243,115,56,0.08) 35%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      {/* Orbital rings */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute right-[-15vw] top-[8vh] w-[55vw] h-[55vw] pointer-events-none">
        <div className="absolute inset-0 border border-ink-black/10 rounded-full" />
        <div className="absolute inset-[6%] border border-light-signal-orange/20 rounded-full" />
        <div className="absolute inset-[14%] border border-ink-black/8 rounded-full" />
        <div className="absolute inset-[22%] border-2 border-dashed border-light-signal-orange/15 rounded-full" />
        {/* Orbital dots */}
        <div className="absolute top-[6%] left-1/2 -translate-x-1/2 w-3 h-3 bg-signal-orange rounded-full shadow-[0_0_20px_rgba(207,69,0,0.6)]" />
        <div className="absolute bottom-[14%] right-[18%] w-2 h-2 bg-ink-black rounded-full" />
      </motion.div>

      <div className="w-full mx-auto relative z-10 grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
        {/* LEFT — Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[700px]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="eyebrow mb-8 md:mb-10">
            <span className="eyebrow-dot" />
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}>
              INTELLIGENT CONTENT NAVIGATION
            </motion.span>
          </motion.div>

          <h1 className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[88px] mb-8 md:mb-10 tracking-mc-tight leading-[0.95] font-medium text-ink-black">
            {headline.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-[0.22em]"
                style={{ transformOrigin: "bottom" }}>
                {word === "Structural" ? (
                  <span className="relative inline-block">
                    <span className="relative z-10 italic font-normal">
                      {word}
                    </span>
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                      style={{ transformOrigin: "left" }}
                      className="absolute bottom-[6%] left-0 right-0 h-[6px] md:h-[10px] bg-signal-orange/80 -z-0 rounded-full"
                    />
                  </span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-slate-gray text-[17px] md:text-[20px] mb-10 md:mb-12 max-w-xl leading-relaxed font-normal">
            An AI-powered engine designed to help you scale organic reach with
            surgical precision and structural integrity. Built for those who
            demand performance, not just volume.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-5">
            <Link
              href="/auth/signup"
              className="group relative bg-ink-black text-canvas-cream px-9 py-5 rounded-mc-button font-medium text-[16px] tracking-mc-tight overflow-hidden transition-all active:scale-95 shadow-[0_18px_40px_-12px_rgba(20,20,19,0.55)] hover:shadow-[0_24px_60px_-12px_rgba(207,69,0,0.45)]">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start your first flight
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-signal-orange to-light-signal-orange translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
            <Link
              href="/capabilities"
              className="bg-white/70 backdrop-blur border border-ink-black/15 text-ink-black px-9 py-5 rounded-mc-button font-medium text-[16px] tracking-mc-tight hover:bg-ink-black hover:text-white hover:border-ink-black transition-all active:scale-95 text-center">
              Explore capabilities
            </Link>
          </motion.div>

          {/* Stats ticker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-14 md:mt-20 flex flex-wrap gap-x-10 gap-y-6 pt-8 border-t border-ink-black/10 max-w-xl">
            {[
              { value: "284%", label: "avg. organic lift" },
              { value: "3.2s", label: "to draft publishable copy" },
              { value: "98/100", label: "structural SEO score" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-[22px] md:text-[26px] font-medium text-ink-black tracking-mc-tight leading-none">
                  {s.value}
                </span>
                <span className="text-[12px] md:text-[13px] text-slate-gray uppercase tracking-[0.08em] mt-2">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — 3D floating dashboard mockup */}
        <div
          className="relative hidden lg:block h-[620px]"
          style={{ perspective: "1800px" }}>
          <motion.div
            initial={{ opacity: 0, y: 60, rotateY: -20 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              rotateX,
              rotateY,
              x: translateX,
              y: translateY,
              transformStyle: "preserve-3d",
            }}
            className="absolute inset-0">
            {/* Main dashboard card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transform: "translateZ(40px)" }}
              className="absolute top-[8%] right-[5%] w-[420px] bg-white rounded-mc-consent border border-ink-black/5 shadow-[0_40px_80px_-20px_rgba(20,20,19,0.25)] overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-ink-black/5 bg-canvas-cream/60">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-ink-black/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-ink-black/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-signal-orange" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-gray font-mono tracking-wider">
                  <Activity size={12} className="text-signal-orange" />
                  pilot.live
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="text-[11px] text-slate-gray uppercase tracking-wider mb-1">
                      Organic Trajectory
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[34px] font-medium tracking-mc-tight leading-none text-ink-black">
                        284%
                      </span>
                      <span className="text-[13px] text-signal-orange font-medium flex items-center gap-1">
                        <TrendingUp size={12} /> +48
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {["1W", "1M", "3M"].map((t, i) => (
                      <span
                        key={t}
                        className={`text-[11px] px-2.5 py-1 rounded-full ${
                          i === 1
                            ? "bg-ink-black text-canvas-cream"
                            : "text-slate-gray"
                        }`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Chart */}
                <div className="relative h-[130px] mb-5">
                  <svg
                    viewBox="0 0 300 130"
                    className="w-full h-full"
                    preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#cf4500" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#cf4500" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Gridlines */}
                    {[0, 1, 2, 3].map((i) => (
                      <line
                        key={i}
                        x1="0"
                        x2="300"
                        y1={i * 32 + 6}
                        y2={i * 32 + 6}
                        stroke="#14141310"
                        strokeDasharray="2 4"
                      />
                    ))}
                    <motion.path
                      d="M0,95 L30,88 L60,92 L90,75 L120,70 L150,55 L180,60 L210,42 L240,38 L270,25 L300,18 L300,130 L0,130 Z"
                      fill="url(#chartFill)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1.2 }}
                    />
                    <motion.path
                      d="M0,95 L30,88 L60,92 L90,75 L120,70 L150,55 L180,60 L210,42 L240,38 L270,25 L300,18"
                      fill="none"
                      stroke="#cf4500"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 1 }}
                    />
                    <motion.circle
                      cx="300"
                      cy="18"
                      r="5"
                      fill="#cf4500"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.4, 1] }}
                      transition={{ duration: 0.6, delay: 3 }}
                    />
                    <motion.circle
                      cx="300"
                      cy="18"
                      r="10"
                      fill="#cf4500"
                      opacity="0.3"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 3 }}
                    />
                  </svg>
                </div>

                {/* Keyword rows */}
                <div className="space-y-2.5">
                  {[
                    { kw: "structural content seo", score: 94, pos: "+12" },
                    { kw: "ai serp analysis", score: 88, pos: "+7" },
                    { kw: "content trajectory", score: 82, pos: "+4" },
                  ].map((row, i) => (
                    <motion.div
                      key={row.kw}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.4 + i * 0.15 }}
                      className="flex items-center justify-between text-[12px]">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-signal-orange shrink-0" />
                        <span className="text-ink-black font-medium truncate">
                          {row.kw}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="w-20 h-1.5 bg-canvas-cream rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${row.score}%` }}
                            transition={{ duration: 1, delay: 1.6 + i * 0.15 }}
                            className="h-full bg-ink-black rounded-full"
                          />
                        </div>
                        <span className="text-signal-orange font-medium w-8 text-right">
                          {row.pos}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating KPI card — top-left */}
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              style={{ transform: "translateZ(80px)" }}
              className="absolute top-[0%] left-[0%] w-[220px] bg-ink-black text-canvas-cream rounded-mc-button p-5 shadow-[0_30px_60px_-15px_rgba(20,20,19,0.45)]">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-full bg-signal-orange flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-canvas-cream/60">
                  Live
                </span>
              </div>
              <div className="text-[11px] uppercase tracking-wider text-canvas-cream/60 mb-1">
                Drafts generated
              </div>
              <div className="text-[28px] font-medium tracking-mc-tight leading-none">
                12,847
              </div>
              <div className="flex items-center gap-1 mt-2 text-[12px] text-light-signal-orange">
                <TrendingUp size={12} /> +6.2% today
              </div>
            </motion.div>

            {/* Floating pill — bottom-right */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              style={{ transform: "translateZ(120px)" }}
              className="absolute bottom-[6%] right-[-2%] bg-white rounded-mc-pill pl-2 pr-5 py-2 flex items-center gap-3 shadow-[0_24px_50px_-15px_rgba(20,20,19,0.3)] border border-ink-black/5">
              <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-canvas-cream">
                <span className="absolute inset-0 rounded-full bg-signal-orange/30 animate-ping" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-signal-orange" />
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-gray leading-none mb-1">
                  Indexing
                </span>
                <span className="text-[13px] font-medium text-ink-black leading-none">
                  42 pages · Live
                </span>
              </div>
            </motion.div>

            {/* Floating tag — left-bottom */}
            <motion.div
              animate={{ y: [0, 8, 0], rotate: [-2, 2, -2] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transform: "translateZ(100px)" }}
              className="absolute bottom-[14%] left-[4%] bg-canvas-cream rounded-mc-button px-4 py-3 border border-ink-black/10 shadow-[0_20px_40px_-15px_rgba(20,20,19,0.2)]">
              <div className="text-[10px] uppercase tracking-wider text-slate-gray mb-1">
                E-E-A-T Score
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[22px] font-medium text-ink-black tracking-mc-tight leading-none">
                  A+
                </span>
                <span className="text-[11px] text-signal-orange font-medium">
                  98/100
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Marquee/scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-gray">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-[1px] h-8 bg-gradient-to-b from-ink-black/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
