"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full flex justify-center z-50 p-4 md:p-8 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1400px] bg-white/95 backdrop-blur-md rounded-mc-pill px-6 md:px-10 py-3 md:py-4 border border-ink-black/5 shadow-mc-soft flex items-center justify-between pointer-events-auto">
        <div className="hidden lg:flex items-center gap-10">
          {["Features", "Solutions", "Process", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[14px] font-medium text-ink-black hover:opacity-60 transition-opacity tracking-mc-tight">
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-ink-black text-white px-6 md:px-8 py-2 md:py-3 rounded-mc-pill font-medium text-[13px] md:text-[15px] tracking-mc-tight hover:opacity-90 transition-all active:scale-95 whitespace-nowrap">
            Get Started
          </button>
        </div>
      </motion.nav>
    </div>
  );
}
