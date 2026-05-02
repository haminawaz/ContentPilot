"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search,
  Brain,
  FileText,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Target,
  Layers,
} from "lucide-react";
import { useRef } from "react";
import type { LucideIcon } from "lucide-react";

type Step = {
  icon: LucideIcon;
  title: string;
  copy: string;
  stat: string;
  statLabel: string;
  tag: string;
};

const steps: Step[] = [
  {
    icon: Search,
    title: "Brief Your Flight",
    copy: "Submit a topic or keyword, target language, and desired word count. Structa uses your exact inputs to decode the search demand it will write for.",
    stat: "3 inputs",
    statLabel: "topic · language · length",
    tag: "Phase 01",
  },
  {
    icon: TrendingUp,
    title: "SERP Analysis",
    copy: "We scan the top Google search results in real time, mapping their structure, semantic keywords, and content density before any draft is produced.",
    stat: "Top 5",
    statLabel: "results analysed",
    tag: "Phase 02",
  },
  {
    icon: Brain,
    title: "Structural Insights",
    copy: "Our AI extracts the ranking factors that actually matter — headings, entities, depth, and content gaps — and turns them into a structural blueprint.",
    stat: "18+",
    statLabel: "signals extracted",
    tag: "Phase 03",
  },
  {
    icon: FileText,
    title: "Complete Content Package",
    copy: "You get a long-form Markdown article plus SEO title and meta description, target keywords, internal & external link ideas, and an intent-driven FAQ.",
    stat: "4 tabs",
    statLabel: "article · seo · links · faq",
    tag: "Phase 04",
  },
];

const pillars = [
  {
    icon: Target,
    title: "Precision first",
    copy: "Every brief is scoped to the exact topic, language, and length you choose — never generic filler.",
  },
  {
    icon: Layers,
    title: "Structurally aware",
    copy: "Headings, entities, keywords and depth are modeled from the pages that already rank for your query.",
  },
  {
    icon: Sparkles,
    title: "A full content package",
    copy: "From a single keyword to an article, SEO metadata, linking ideas, and an FAQ — in a single run.",
  },
];

function StepCard({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 12,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 12,
  });

  const Icon = step.icon;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
      style={{ perspective: 1200 }}
      className="group relative"
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative bg-white rounded-mc-consent md:rounded-mc-stadium border border-ink-black/5 shadow-mc-soft overflow-hidden p-8 md:p-12 transition-shadow duration-500 group-hover:shadow-mc-heavy"
      >
        <div
          aria-hidden
          className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-canvas-cream transition-transform duration-700 group-hover:scale-125"
        />
        <div
          aria-hidden
          className="absolute top-6 right-6 w-3 h-3 rounded-full bg-signal-orange animate-pulse"
        />

        <span
          aria-hidden
          className="absolute bottom-4 right-6 md:bottom-6 md:right-10 text-[90px] md:text-[140px] font-medium leading-none tracking-mc-tight text-ink-black/4 select-none"
        >
          0{index + 1}
        </span>

        <div
          className="relative z-10 flex flex-col h-full"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[11px] font-bold tracking-mc-wide text-signal-orange uppercase">
              {step.tag}
            </span>
            <span className="flex-1 h-px bg-ink-black/10" />
          </div>

          <div className="relative mb-8 w-16 h-16">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-signal-orange/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="relative w-16 h-16 bg-canvas-cream rounded-full flex items-center justify-center shadow-sm border border-ink-black/5">
              <Icon className="w-7 h-7 text-signal-orange" strokeWidth={1.75} />
            </div>
          </div>

          <h3 className="text-[26px] md:text-[32px] font-medium tracking-mc-tight text-ink-black mb-4 leading-tight">
            {step.title}
          </h3>
          <p className="text-slate-gray text-[15px] md:text-[17px] leading-relaxed mb-10 max-w-lg">
            {step.copy}
          </p>

          <div className="mt-auto flex items-end justify-between pt-6 border-t border-ink-black/5">
            <div>
              <p className="text-[32px] md:text-[40px] font-medium tracking-mc-tight text-ink-black leading-none">
                {step.stat}
              </p>
              <p className="text-[12px] tracking-mc-wide uppercase text-slate-gray mt-2">
                {step.statLabel}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CapabilitiesPage() {
  return (
    <div className="min-h-screen bg-canvas-cream font-sans selection:bg-signal-orange selection:text-white">
      <Navbar />

      <main className="relative overflow-hidden pt-35 md:pt-50 pb-20 md:pb-30">
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{
            opacity: { duration: 1.2 },
            rotate: { duration: 80, ease: "linear", repeat: Infinity },
          }}
          className="absolute right-[-18vw] top-[8vh] w-[55vw] h-[55vw] border border-light-signal-orange/25 rounded-full pointer-events-none"
        />
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: -360 }}
          transition={{
            opacity: { duration: 1.2, delay: 0.2 },
            rotate: { duration: 120, ease: "linear", repeat: Infinity },
          }}
          className="absolute right-[-12vw] top-[16vh] w-[42vw] h-[42vw] border border-light-signal-orange/20 rounded-full pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute right-0 top-[32vh] w-[28vw] h-[28vw] border border-light-signal-orange/15 rounded-full pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute right-[-5vw] top-[20vh] w-[40vw] h-[40vw] bg-signal-orange/8 rounded-full blur-[120px] pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(15,15,15,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 70%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, transparent 70%)",
          }}
        />

        <div className="px-6 md:px-25 max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow mb-8"
          >
            <span className="eyebrow-dot" />
            OUR CAPABILITIES
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
              hidden: {},
            }}
            className="text-[48px] sm:text-[64px] md:text-[84px] lg:text-[96px] mb-10 tracking-mc-tight leading-[0.95] font-medium text-ink-black max-w-237.5"
          >
            {["How", "We", "Engineer", "Rankings."].map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { y: "110%", opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="inline-block mr-[0.25em] relative"
              >
                {word === "Rankings." ? (
                  <>
                    Rankings
                    <span className="text-signal-orange">.</span>
                    <motion.span
                      aria-hidden
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        delay: 0.9,
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{ originX: 0 }}
                      className="absolute left-0 -bottom-2 h-1.25 w-full bg-signal-orange rounded-full"
                    />
                  </>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-gray text-[18px] md:text-[22px] max-w-2xl leading-relaxed font-normal opacity-90 mb-16"
          >
            Structa is an AI-assisted SEO content platform. We analyze
            real search results first, then produce a complete content package
            — article, SEO data, linking ideas, and FAQ — shaped by structural
            SEO signals.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.12 } },
              hidden: {},
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-24 md:mb-32"
          >
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className="flex items-start gap-4 bg-white/60 backdrop-blur-sm border border-ink-black/5 rounded-mc-consent p-5 hover:bg-white transition-colors duration-500"
                >
                  <div className="shrink-0 w-10 h-10 rounded-full bg-canvas-cream flex items-center justify-center border border-ink-black/5">
                    <Icon
                      className="w-5 h-5 text-signal-orange"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div>
                    <p className="text-ink-black font-medium tracking-mc-tight text-[15px] mb-1">
                      {p.title}
                    </p>
                    <p className="text-slate-gray text-[13px] leading-relaxed">
                      {p.copy}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </main>

      <section className="relative px-6 md:px-25 max-w-7xl mx-auto pb-25 md:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-20"
        >
          <div>
            <div className="eyebrow mb-6">
              <span className="eyebrow-dot" />
              THE FLIGHT PATH
            </div>
            <h2 className="text-[36px] md:text-[56px] font-medium tracking-mc-tight text-ink-black leading-[1.05] max-w-2xl text-balance">
              Four phases, one complete content package.
            </h2>
          </div>
          <p className="text-slate-gray text-[15px] md:text-[17px] leading-relaxed max-w-md">
            Every flight runs through the same four-phase flight deck. Each
            phase passes its output forward, so you land with an article, SEO
            metadata, linking ideas, and an FAQ all in one place.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <StepCard step={step} index={i} key={step.title} />
          ))}
        </div>
      </section>
      <section className="px-6 md:px-25 max-w-7xl mx-auto pb-20 md:pb-35">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden bg-ink-black rounded-mc-consent md:rounded-mc-stadium p-10 sm:p-16 md:p-24 text-center"
        >
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity }}
            className="absolute top-[-30%] right-[-20%] w-[70%] h-[180%] border border-white/5 rounded-full pointer-events-none"
          />
          <motion.div
            aria-hidden
            animate={{ rotate: -360 }}
            transition={{ duration: 90, ease: "linear", repeat: Infinity }}
            className="absolute bottom-[-40%] left-[-20%] w-[70%] h-[180%] border border-signal-orange/15 rounded-full pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-signal-orange/20 blur-[120px] rounded-full translate-y-1/2 scale-50 pointer-events-none"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-mc-wide uppercase text-white/60 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-orange animate-pulse" />
              Cleared for takeoff
            </div>
            <h2 className="text-[30px] sm:text-[40px] md:text-[56px] font-medium tracking-mc-tight text-white leading-[1.05] text-balance mb-8">
              Ready to scale your organic reach?
            </h2>
            <a
              href="/auth/signup"
              className="group inline-flex items-center gap-3 bg-white text-ink-black px-8 py-4 rounded-mc-button font-medium text-[15px] tracking-mc-tight hover:bg-canvas-cream transition-all active:scale-95"
            >
              Start your first flight
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
