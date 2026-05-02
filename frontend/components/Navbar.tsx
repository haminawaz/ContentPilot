"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <div
      className={`fixed left-0 w-full flex justify-center z-50 pointer-events-none transition-all duration-500 ease-out ${
        scrolled ? "top-0 p-4 md:p-8" : "top-0 p-0"
      }`}>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full flex items-center justify-between pointer-events-auto relative transition-all duration-500 ease-out ${
          scrolled
            ? "bg-white/95 backdrop-blur-md rounded-mc-pill px-6 md:px-10 py-2 border border-ink-black/5 shadow-mc-soft"
            : "bg-transparent rounded-none px-6 md:px-12 py-3 md:py-4 border border-transparent shadow-none"
        }`}>
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="Structa Logo"
            width={350}
            height={350}
            className={`w-auto object-contain transition-all duration-500 ${
              scrolled ? "h-16 md:h-20" : "h-16 md:h-20"
            }`}
            priority
          />
        </Link>

        <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {["Features", "Solutions", "Process", "Contact"].map((link) => (
            <Link
              key={link}
              href={
                pathname === "/"
                  ? `#${link.toLowerCase()}`
                  : `/#${link.toLowerCase()}`
              }
              className="text-[14px] font-medium text-ink-black hover:opacity-60 transition-opacity tracking-mc-tight">
              {link}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="hidden sm:block text-[14px] font-medium text-ink-black hover:opacity-60 transition-opacity tracking-mc-tight px-4">
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="bg-ink-black text-white px-6 md:px-8 py-2 md:py-3 rounded-mc-pill font-medium text-[13px] md:text-[15px] tracking-mc-tight hover:opacity-90 transition-all active:scale-95 whitespace-nowrap">
            Get Started
          </Link>
        </div>
      </motion.nav>
    </div>
  );
}
