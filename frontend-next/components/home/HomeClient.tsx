"use client";

import Navbar from "../Navbar";
import Hero from "./Hero";
import Features from "./Features";
import SolutionGrid from "./SolutionGrid";
import HowItWorks from "./HowItWorks";
import Footer from "../Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-canvas-cream font-sans selection:bg-signal-orange selection:text-white">
      <Navbar />

      <main className="relative">
        <Hero />
        <Features />
        <SolutionGrid />
        <HowItWorks />

        <section className="pb-[80px] px-6 text-center" id="contact">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl mx-auto bg-ink-black text-canvas-cream rounded-mc-consent md:rounded-mc-stadium p-8 sm:p-12 md:p-24 shadow-[0_40px_100px_-30px_rgba(20,20,19,0.5)] relative overflow-hidden">
            {/* Orbital rings */}
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square rounded-full border border-canvas-cream/10 pointer-events-none">
              <span className="absolute top-[8%] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-signal-orange shadow-[0_0_20px_rgba(207,69,0,0.8)]" />
            </motion.div>
            <motion.div
              aria-hidden
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square rounded-full border border-canvas-cream/8 pointer-events-none">
              <span className="absolute bottom-[6%] right-[12%] w-2 h-2 rounded-full bg-light-signal-orange" />
            </motion.div>
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] aspect-square rounded-full border-2 border-dashed border-signal-orange/20 pointer-events-none"
            />

            {/* Signal-orange glow */}
            <div
              aria-hidden
              className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(243,115,56,0.25) 0%, transparent 55%)",
                filter: "blur(20px)",
              }}
            />

            <div className="relative z-10">
              <div className="eyebrow justify-center mb-10 text-canvas-cream">
                <span className="eyebrow-dot" />
                <span className="text-canvas-cream">GET STARTED</span>
              </div>

              <h2 className="text-[28px] sm:text-[44px] md:text-[76px] mb-8 sm:mb-10 tracking-mc-tight leading-[1.05] font-medium text-canvas-cream text-balance">
                The Future of Content <br />
                Is{" "}
                <span className="italic font-normal text-light-signal-orange">
                  Structural.
                </span>
              </h2>

              <p className="text-canvas-cream/70 text-[17px] md:text-[20px] mb-14 max-w-2xl mx-auto leading-relaxed pt-8 border-t border-canvas-cream/10">
                Join high-performing SEO teams using ContentPilot to scale with
                integrity and surgical precision.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link
                  href="/auth/signup"
                  className="group relative bg-signal-orange text-white px-10 py-5 rounded-mc-button font-medium text-[16px] tracking-mc-tight overflow-hidden active:scale-95 transition-transform shadow-[0_20px_50px_-15px_rgba(207,69,0,0.6)]">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Initiate launch
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </span>
                  <span className="absolute inset-0 bg-light-signal-orange translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </Link>
                <button className="bg-transparent border border-canvas-cream/30 text-canvas-cream px-10 py-5 rounded-mc-button font-medium text-[16px] tracking-mc-tight hover:bg-canvas-cream hover:text-ink-black transition-all active:scale-95">
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
