"use client";

import Navbar from "../Navbar";
import Hero from "./Hero";
import Features from "./Features";
import SolutionGrid from "./SolutionGrid";
import HowItWorks from "./HowItWorks";
import Footer from "../Footer";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-canvas-cream font-sans selection:bg-signal-orange selection:text-white">
      <Navbar />

      <main className="relative">
        <Hero />
        <Features />
        <SolutionGrid />
        <HowItWorks />

        <section className="pb-[60px] px-6 text-center" id="contact">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl mx-auto bg-white rounded-mc-consent md:rounded-mc-stadium p-8 sm:p-12 md:p-24 shadow-mc-heavy border border-ink-black/5 relative overflow-hidden">
            <div className="absolute top-[-50%] left-[-20%] w-full h-[200%] border border-light-signal-orange/10 rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="eyebrow justify-center mb-10">
                <span className="eyebrow-dot" />
                GET STARTED
              </div>

              <h2 className="text-[28px] sm:text-[44px] md:text-[80px] mb-8 sm:mb-12 tracking-mc-tight leading-[1.1] font-medium text-ink-black">
                The Future of Content <br /> Is Structural.
              </h2>

              <p className="text-slate-gray text-[18px] md:text-[22px] mb-16 max-w-2xl mx-auto leading-relaxed border-t border-ink-black/5 pt-12">
                Join high-performing SEO teams using ContentPilot to scale with
                integrity and surgical precision.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/auth/signup"
                  className="bg-ink-black text-canvas-cream px-10 py-5 rounded-mc-button font-medium text-[16px] tracking-mc-tight hover:opacity-90 transition-all active:scale-95 shadow-lg">
                  Initiate launch
                </Link>
                <button className="bg-white border-1.5 border-ink-black text-ink-black px-10 py-5 rounded-mc-button font-medium text-[16px] tracking-mc-tight hover:bg-ink-black hover:text-white transition-all active:scale-95">
                  Talk to a content pilot
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
