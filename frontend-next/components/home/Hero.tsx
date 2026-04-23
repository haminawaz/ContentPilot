"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative px-6 md:px-[100px] pt-[160px] md:pt-[220px] pb-[100px] md:pb-[160px] min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden bg-canvas-cream">
      <div className="absolute right-[-5vw] top-[28vh] w-[42vw] h-[42vw] border-2 border-light-signal-orange/15 rounded-full pointer-events-none" />
      <div className="absolute right-[-3vw] top-[33vh] w-[37vw] h-[37vw] border-2 border-light-signal-orange/15 rounded-full pointer-events-none" />
      <div className="absolute right-[-1vw] top-[38vh] w-[32vw] h-[32vw] border-2 border-light-signal-orange/15 rounded-full pointer-events-none" />
      <div className="absolute right-[1vw] top-[43vh] w-[27vw] h-[27vw] border-2 border-light-signal-orange/15 rounded-full pointer-events-none" />

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

          <h1 className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[96px] mb-8 md:mb-12 tracking-mc-tight leading-none font-medium text-ink-black max-w-[850px]">
            The Structural Integrity of SEO.
          </h1>

          <p className="text-slate-gray text-[18px] md:text-[24px] mb-12 md:mb-16 max-w-2xl leading-relaxed font-normal opacity-90">
            ContentPilot is an AI-powered engine designed to help you scale your
            organic reach with surgical precision and structural integrity.
            Built for those who demand performance, not just volume.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <Link
              href="/auth/signup"
              className="bg-ink-black text-canvas-cream px-10 py-5 rounded-mc-button font-medium text-[16px] tracking-mc-tight hover:opacity-90 transition-all active:scale-95 shadow-lg text-center">
              Start your first flight
            </Link>
            <Link
              href="/capabilities"
              className="bg-white border-1.5 border-ink-black text-ink-black px-10 py-5 rounded-mc-button font-medium text-[16px] tracking-mc-tight hover:bg-ink-black hover:text-white transition-all active:scale-95 text-center">
              Explore capabilities
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
