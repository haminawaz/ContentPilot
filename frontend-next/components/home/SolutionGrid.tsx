"use client";

import { motion } from "framer-motion";
import { MousePointer2, Zap, Layout, Globe } from "lucide-react";

const solutions = [
  {
    title: "SEO Specialists",
    description:
      "Deep-dive SERP analysis for data-backed generation. Identify high-value keywords and content gaps with surgical precision.",
    icon: Zap,
    color: "bg-signal-orange text-white",
  },
  {
    title: "Content Teams",
    description:
      "Scale high-quality production without sacrificing your brand's unique editorial voice. Collaborative tools for high-volume pipelines.",
    icon: Layout,
    color: "bg-ink-black text-canvas-cream",
  },
  {
    title: "E-commerce",
    description:
      "Automated, SEO-optimized product descriptions that actually drive traffic and convert visitors into loyal customers.",
    icon: Globe,
    color: "bg-link-blue text-white",
  },
  {
    title: "Agencies",
    description:
      "White-label reports and multi-client management built for the most demanding SEO and content marketing agency workflows.",
    icon: MousePointer2,
    color: "bg-slate-gray text-white",
  },
];

export default function SolutionGrid() {
  return (
    <section
      className="py-[80px] bg-canvas-cream overflow-hidden"
      id="solutions">
      <div className="max-w-7xl w-full mx-auto px-6 md:px-[100px]">
        <div className="text-center mb-20 md:mb-32">
          <div className="eyebrow justify-center mb-8">
            <span className="eyebrow-dot" />
            Bespoke Solutions
          </div>
          <h2 className="text-[32px] sm:text-[48px] md:text-[64px] mb-8 font-medium leading-none tracking-mc-tight">
            Built for Every Scale of Ambition.
          </h2>
          <p className="text-slate-gray text-[18px] md:text-[20px] max-w-2xl mx-auto leading-relaxed opacity-80">
            From independent creators to global SEO agencies, ContentPilot
            provides the structural integrity your content deserves.
          </p>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 md:perspective-[2000px] md:transform-gpu md:rotate-x-15 md:rotate-z-2">
            {solutions.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, z: -100, rotateY: -10 }}
                whileInView={{ opacity: 1, z: 0, rotateY: 0 }}
                whileHover={{
                  y: -20,
                  rotateX: -5,
                  boxShadow: "0 40px 80px rgba(0,0,0,0.1)",
                }}
                viewport={{ once: true }}
                transition={{
                  delay: idx * 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-white p-10 rounded-mc-stadium border border-ink-black/5 shadow-mc-heavy relative group cursor-default transition-all">
                <div
                  className={`w-16 h-16 rounded-mc-button ${item.color} flex items-center justify-center mb-10 shadow-lg`}>
                  <item.icon size={32} />
                </div>
                <h3 className="text-[24px] mb-6 font-medium tracking-mc-tight">
                  {item.title}
                </h3>
                <p className="text-slate-gray text-[16px] leading-relaxed mb-8 opacity-90">
                  {item.description}
                </p>
                <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <item.icon size={120} />
                </div>
              </motion.div>
            ))}
          </div>
      </div>
    </section>
  );
}
