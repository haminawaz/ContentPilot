"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex font-sans selection:bg-signal-orange selection:text-white">
      <div className="w-full lg:w-1/2 bg-white flex flex-col min-h-screen">
        <div className="px-8 pt-8 md:px-12 md:pt-10">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="ContentPilot Logo"
              width={350}
              height={350}
              className="h-16 md:h-20 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-8 py-12 md:px-16 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[380px]">
            {children}
          </motion.div>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-ink-black relative overflow-hidden flex-col items-center justify-center p-16">
        <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] border border-white/5 rounded-full" />
        <div className="absolute bottom-[-10%] left-[-15%] w-[400px] h-[400px] border border-white/5 rounded-full" />
        <div className="absolute top-[30%] left-[10%] w-[200px] h-[200px] border border-signal-orange/10 rounded-full" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-signal-orange/5 rounded-full blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center max-w-md">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-mc-stadium p-8 mb-10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-white/80 text-sm font-medium tracking-mc-wide uppercase">
                Analytics
              </span>
              <div className="flex gap-2">
                <span className="text-[11px] px-3 py-1 rounded-mc-pill bg-white/10 text-white/60">
                  Weekly
                </span>
                <span className="text-[11px] px-3 py-1 rounded-mc-pill bg-signal-orange text-white">
                  Monthly
                </span>
              </div>
            </div>

            <div className="flex items-end gap-3 h-28 mb-4">
              {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-md transition-all duration-500"
                    style={{
                      height: `${h}%`,
                      background:
                        i === 5
                          ? "linear-gradient(to top, #cf4500, #f37338)"
                          : "rgba(255,255,255,0.08)",
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between text-[11px] text-white/30">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
              <div>
                <p className="text-2xl font-semibold text-white tracking-mc-tight">
                  2.4k
                </p>
                <p className="text-[11px] text-white/40 mt-1">Visitors</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-signal-orange tracking-mc-tight">
                  89%
                </p>
                <p className="text-[11px] text-white/40 mt-1">SEO Score</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white tracking-mc-tight">
                  142
                </p>
                <p className="text-[11px] text-white/40 mt-1">Keywords</p>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <h2 className="text-[28px] font-medium text-white tracking-mc-tight leading-tight mb-3">
            Structural SEO,{" "}
            <span className="text-signal-orange">autopilot mode</span>
          </h2>
          <p className="text-white/40 text-[14px] leading-relaxed max-w-xs mx-auto">
            Deploy content architecture that ranks. Track performance, optimize
            structure, and grow organically.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
