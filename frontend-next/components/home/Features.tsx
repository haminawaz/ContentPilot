"use client";

import { Sparkles, BarChart3, Settings, FileCode } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Content Creation",
    description:
      "Leverages cutting-edge OpenAI models to generate high-quality, SEO-optimized articles that mimic human writing styles.",
  },
  {
    icon: BarChart3,
    title: "SERP & Competitor Analysis",
    description:
      "Integrates directly with SerpAPI to analyze competitive search results and identify content gaps before generation.",
  },
  {
    icon: Settings,
    title: "Fully Customizable Output",
    description:
      "Fine-tune every aspect of your content, from specific topics and target languages to precise word counts and formatting.",
  },
  {
    icon: FileCode,
    title: "Native Markdown Support",
    description:
      "Every piece of content is generated in clean markdown format, ready to be dropped into your CMS or static site generator.",
  },
];

export default function Features() {
  return (
    <motion.div
      id="features"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-7xl w-full mx-auto bg-white rounded-mc-consent md:rounded-mc-stadium p-6 sm:p-12 md:p-24 shadow-mc-heavy border border-ink-black/5 relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20 md:mb-32">
        <div className="max-w-2xl">
          <div className="eyebrow mb-8">
            <span className="eyebrow-dot" />
            Atomic Capabilities
          </div>
          <h2 className="text-[32px] sm:text-[48px] md:text-[64px] leading-none font-medium tracking-mc-tight">
            Everything you need to pilot your content at scale.
          </h2>
        </div>
        <p className="text-slate-gray text-[18px] md:text-[20px] max-w-sm mb-4 leading-relaxed opacity-80">
          A comprehensive suite of tools designed for creators who demand
          performance and precision.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.1,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group">
            <div className="w-16 h-16 rounded-mc-button bg-canvas-cream flex items-center justify-center mb-10 border border-ink-black/5 group-hover:bg-ink-black group-hover:text-canvas-cream transition-all duration-500">
              <feature.icon size={28} />
            </div>
            <h3 className="text-[22px] mb-6 font-medium tracking-mc-tight">
              {feature.title}
            </h3>
            <p className="text-slate-gray text-[16px] leading-relaxed opacity-90">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
