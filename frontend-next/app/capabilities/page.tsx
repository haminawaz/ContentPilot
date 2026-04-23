"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Brain, FileText, TrendingUp, ArrowRight } from "lucide-react";

export default function CapabilitiesPage() {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-signal-orange" />,
      title: "1. Intent Discovery",
      description:
        "Input your target keyword. Our system instantly identifies what users are actively searching for.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-signal-orange" />,
      title: "2. SERP Analysis",
      description:
        "We scan the top 5 Google search results, analyzing their structure, semantic keywords, and content density.",
    },
    {
      icon: <Brain className="w-8 h-8 text-signal-orange" />,
      title: "3. Structural Insights",
      description:
        "Our AI extracts the most critical ranking factors, identifying gaps and opportunities in the current SERP landscape.",
    },
    {
      icon: <FileText className="w-8 h-8 text-signal-orange" />,
      title: "4. Content Generation",
      description:
        "We generate a highly optimized, cohesive blog post that incorporates these insights to outrank competitors.",
    },
  ];

  return (
    <div className="min-h-screen bg-canvas-cream font-sans selection:bg-signal-orange selection:text-white">
      <Navbar />

      <main className="relative overflow-hidden pt-[160px] md:pt-[220px] pb-[100px] md:pb-[160px]">
        <div className="absolute right-[-5vw] top-[28vh] w-[42vw] h-[42vw] border-2 border-light-signal-orange/15 rounded-full pointer-events-none" />
        <div className="absolute right-[-3vw] top-[33vh] w-[37vw] h-[37vw] border-2 border-light-signal-orange/15 rounded-full pointer-events-none" />
        <div className="absolute right-[-1vw] top-[38vh] w-[32vw] h-[32vw] border-2 border-light-signal-orange/15 rounded-full pointer-events-none" />
        <div className="absolute right-[1vw] top-[43vh] w-[27vw] h-[27vw] border-2 border-light-signal-orange/15 rounded-full pointer-events-none" />

        <div className="px-6 md:px-[100px] max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[950px] mb-24">
            <div className="eyebrow mb-8">
              <span className="eyebrow-dot" />
              OUR CAPABILITIES
            </div>

            <h1 className="text-[48px] sm:text-[64px] md:text-[80px] mb-8 tracking-mc-tight leading-none font-medium text-ink-black max-w-[850px]">
              How We Engineer Rankings.
            </h1>

            <p className="text-slate-gray text-[18px] md:text-[24px] max-w-2xl leading-relaxed font-normal opacity-90">
              ContentPilot bridges the gap between raw data and compelling
              narrative. We don't just write; we engineer content based on what
              search engines already reward.
            </p>
          </motion.div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.1,
                }}
                className="bg-white p-6 sm:p-10 md:p-14 rounded-mc-consent md:rounded-mc-stadium shadow-mc-soft border border-ink-black/5 hover:shadow-mc-heavy transition-shadow duration-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-canvas-cream rounded-bl-[100px] -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-110" />

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-canvas-cream rounded-full flex items-center justify-center mb-8 shadow-sm">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-medium tracking-mc-tight text-ink-black mb-4">
                    {step.title}
                  </h3>
                  <p className="text-slate-gray text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 md:mt-32 bg-ink-black rounded-mc-consent md:rounded-mc-stadium p-8 sm:p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-signal-orange opacity-10 blur-3xl rounded-full translate-y-1/2" />

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-mc-tight text-white mb-8">
                Ready to scale your organic reach?
              </h2>
              <a
                href="/auth/signup"
                className="inline-flex items-center gap-3 bg-white text-ink-black px-8 py-4 rounded-mc-button font-medium text-[16px] tracking-mc-tight hover:bg-canvas-cream transition-all active:scale-95">
                Start your first flight
                <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
