"use client";

import { motion } from "framer-motion";
import {
  MousePointer2,
  Zap,
  Layout,
  Globe,
  ArrowUpRight,
} from "lucide-react";

const solutions = [
  {
    title: "SEO Specialists",
    description:
      "Deep-dive SERP analysis for data-backed generation. Identify high-value keywords and content gaps with surgical precision.",
    icon: Zap,
    accentBg: "bg-signal-orange",
    accentText: "text-white",
    meta: "SERP · Gap Analysis",
  },
  {
    title: "Content Teams",
    description:
      "Scale high-quality production without sacrificing your brand's unique editorial voice. Collaborative tools for high-volume pipelines.",
    icon: Layout,
    accentBg: "bg-ink-black",
    accentText: "text-canvas-cream",
    meta: "Editorial · Workflow",
  },
  {
    title: "E-commerce",
    description:
      "Automated, SEO-optimized product descriptions that actually drive traffic and convert visitors into loyal customers.",
    icon: Globe,
    accentBg: "bg-link-blue",
    accentText: "text-white",
    meta: "PDP · Conversion",
  },
  {
    title: "Agencies",
    description:
      "White-label reports and multi-client management built for the most demanding SEO and content marketing agency workflows.",
    icon: MousePointer2,
    accentBg: "bg-charcoal",
    accentText: "text-canvas-cream",
    meta: "Multi-client · Reports",
  },
];

export default function SolutionGrid() {
  return (
    <section
      className="relative py-[80px] md:py-[120px] bg-canvas-cream overflow-hidden"
      id="solutions">
      {/* Ambient glowing orbs */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(243,115,56,0.18) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[5%] right-[-5%] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(56,96,190,0.14) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-7xl w-full mx-auto px-6 md:px-[100px] relative z-10">
        <div className="text-center mb-20 md:mb-28">
          <div className="eyebrow justify-center mb-8">
            <span className="eyebrow-dot" />
            Bespoke Solutions
          </div>
          <h2 className="text-[32px] sm:text-[48px] md:text-[60px] mb-8 font-medium leading-[1.05] tracking-mc-tight text-ink-black max-w-3xl mx-auto text-balance">
            Built for every{" "}
            <span className="italic font-normal text-signal-orange">scale</span>{" "}
            of ambition.
          </h2>
          <p className="text-slate-gray text-[17px] md:text-[19px] max-w-2xl mx-auto leading-relaxed">
            From independent creators to global SEO agencies, ContentPilot
            provides the structural integrity your content deserves.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          style={{ perspective: "2000px" }}>
          {solutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 80, rotateX: -15, rotateY: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 6, rotateY: 0 }}
                whileHover={{
                  y: -24,
                  rotateX: 0,
                  rotateY: 0,
                  scale: 1.02,
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                }}
                viewport={{ once: true }}
                transition={{
                  delay: idx * 0.1,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                className="group relative bg-white p-8 md:p-10 rounded-mc-consent border border-ink-black/5 shadow-[0_20px_50px_-20px_rgba(20,20,19,0.15)] hover:shadow-[0_40px_80px_-20px_rgba(20,20,19,0.25)] transition-shadow duration-500 cursor-default">
                {/* Accent bar */}
                <motion.div
                  className={`absolute top-0 left-8 right-8 h-[3px] ${item.accentBg} rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                />

                {/* Icon with 3D lift */}
                <div
                  style={{ transform: "translateZ(30px)" }}
                  className="relative">
                  <div
                    className={`w-16 h-16 rounded-mc-button ${item.accentBg} ${item.accentText} flex items-center justify-center mb-8 shadow-[0_12px_30px_-10px_rgba(20,20,19,0.3)] group-hover:shadow-[0_20px_40px_-10px_rgba(207,69,0,0.4)] transition-shadow duration-500`}>
                    <Icon size={28} />
                  </div>
                </div>

                <h3
                  style={{ transform: "translateZ(20px)" }}
                  className="text-[22px] mb-4 font-medium tracking-mc-tight text-ink-black">
                  {item.title}
                </h3>
                <p
                  style={{ transform: "translateZ(15px)" }}
                  className="text-slate-gray text-[15px] leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Meta + CTA */}
                <div
                  style={{ transform: "translateZ(10px)" }}
                  className="flex items-center justify-between pt-5 border-t border-ink-black/5">
                  <span className="text-[11px] uppercase tracking-[0.1em] text-slate-gray font-medium">
                    {item.meta}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-canvas-cream flex items-center justify-center group-hover:bg-ink-black group-hover:text-canvas-cream transition-colors duration-300">
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                {/* Faded watermark icon */}
                <div className="absolute top-4 right-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                  <Icon size={110} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
