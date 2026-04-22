"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative px-6 md:px-[100px] pt-[160px] md:pt-[220px] pb-[100px] md:pb-[160px] min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden bg-canvas-cream">
      <div className="absolute right-[-20vw] top-[5vh] w-[90vw] h-[90vw] border border-light-signal-orange/10 rounded-full pointer-events-none hidden sm:block" />
      <div className="absolute right-[-15vw] top-[10vh] w-[70vw] h-[70vw] border border-light-signal-orange/10 rounded-full pointer-events-none hidden sm:block" />
      <div className="absolute right-[-10vw] top-[20vh] w-[60vw] h-[60vw] border border-light-signal-orange/15 rounded-full pointer-events-none" />
      <div className="absolute right-[-5vw] top-[30vh] w-[40vw] h-[40vw] border border-light-signal-orange/15 rounded-full pointer-events-none" />
      <div className="absolute right-0 top-[40vh] w-[30vw] h-[30vw] border border-light-signal-orange/15 rounded-full pointer-events-none" />
      <div className="absolute right-0 top-[40vh] w-[30vw] h-[30vw] border border-light-signal-orange/15 rounded-full pointer-events-none" />

      <div className="w-full mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[950px]">
          <div className="eyebrow mb-8 md:mb-12">
            <span className="eyebrow-dot" />
            INTELLIGENT CONTENT NAVIGATION
          </div>

          <h1 className="text-[48px] sm:text-[64px] md:text-[96px] mb-8 md:mb-12 tracking-mc-tight leading-none font-medium text-ink-black max-w-[850px]">
            The Structural Integrity of SEO.
          </h1>

          <p className="text-slate-gray text-[18px] md:text-[24px] mb-12 md:mb-16 max-w-2xl leading-relaxed font-normal opacity-90">
            ContentPilot is an AI-powered engine designed to help you scale your
            organic reach with surgical precision and structural integrity.
            Built for those who demand performance, not just volume.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <button className="bg-ink-black text-canvas-cream px-10 py-5 rounded-mc-button font-medium text-[16px] tracking-mc-tight hover:opacity-90 transition-all active:scale-95 shadow-lg">
              Start your first flight
            </button>
            <button className="bg-white border-1.5 border-ink-black text-ink-black px-10 py-5 rounded-mc-button font-medium text-[16px] tracking-mc-tight hover:bg-ink-black hover:text-white transition-all active:scale-95">
              Explore capabilities
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
