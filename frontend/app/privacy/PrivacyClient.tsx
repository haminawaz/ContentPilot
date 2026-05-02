"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Shield,
  Database,
  Cog,
  Lock,
  Globe,
  UserCheck,
  Mail,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Section = {
  icon: LucideIcon;
  tag: string;
  title: string;
  body: React.ReactNode;
};

const sections: Section[] = [
  {
    icon: Shield,
    tag: "Section 01",
    title: "Introduction",
    body: (
      <p>
        At Structa, we take your privacy seriously. This Privacy Policy
        explains how we collect, use, disclose, and safeguard your information
        when you visit our website and use our AI-assisted SEO content
        platform.
      </p>
    ),
  },
  {
    icon: Database,
    tag: "Section 02",
    title: "Information We Collect",
    body: (
      <>
        <p className="mb-4">
          We may collect information about you in a variety of ways:
        </p>
        <ul className="space-y-3">
          <li>
            <strong className="text-ink-black">Personal Data:</strong>{" "}
            personally identifiable information such as your name and email
            address that you voluntarily give to us when registering for a
            Structa account or contacting support.
          </li>
          <li>
            <strong className="text-ink-black">Usage Data:</strong> information
            our servers automatically collect when you access the platform,
            such as your IP address, browser type, operating system, access
            times, and the pages you view.
          </li>
          <li>
            <strong className="text-ink-black">Input Data:</strong> the topic,
            keyword, target language, and target word count you submit, along
            with the generated article, SEO metadata, link ideas, and FAQ
            produced by the platform. We store this data to provide our
            service and improve quality.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Cog,
    tag: "Section 03",
    title: "How We Use Your Information",
    body: (
      <ul className="space-y-3">
        <li>To create and manage your Structa account.</li>
        <li>
          To operate the core service: analyzing the top search results for
          your submitted keyword and generating a long-form Markdown article,
          SEO title and meta description, target keyword suggestions, internal
          and external link ideas, and an intent-driven FAQ.
        </li>
        <li>
          To improve our AI models, SERP analysis pipeline, and content
          generation quality.
        </li>
        <li>
          To send you administrative information, account updates, and
          security notices.
        </li>
        <li>To respond to customer service requests and support needs.</li>
      </ul>
    ),
  },
  {
    icon: Lock,
    tag: "Section 04",
    title: "Data Security",
    body: (
      <p>
        We use administrative, technical, and physical security measures to
        help protect your personal information. While we have taken reasonable
        steps to secure the data you provide, no security measures are perfect
        or impenetrable, and no method of data transmission can be guaranteed
        against any interception or other type of misuse.
      </p>
    ),
  },
  {
    icon: Globe,
    tag: "Section 05",
    title: "Third-Party Services",
    body: (
      <p>
        Our platform interacts with third-party services such as search
        engines and AI providers in order to analyze SERPs and generate your
        content. We do not share your personally identifiable information with
        these services during the keyword analysis or generation process — we
        only pass the keyword, language, and length parameters needed to
        perform the task.
      </p>
    ),
  },
  {
    icon: UserCheck,
    tag: "Section 06",
    title: "Your Rights",
    body: (
      <p>
        Depending on your location, you may have rights under privacy laws
        (such as GDPR or CCPA) to access, correct, export, or delete your
        personal data. To exercise any of these rights, contact us using the
        email below and we will respond within a reasonable timeframe.
      </p>
    ),
  },
  {
    icon: Mail,
    tag: "Section 07",
    title: "Contact Us",
    body: (
      <p>
        If you have questions or comments about this Privacy Policy, please
        contact us at{" "}
        <a
          href="mailto:privacy@structa.ai"
          className="text-link-blue hover:underline underline-offset-4"
        >
          privacy@structa.ai
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyClient() {
  return (
    <div className="min-h-screen bg-canvas-cream font-sans text-ink-black selection:bg-signal-orange selection:text-white">
      <Navbar />

      <main className="relative overflow-hidden pt-35 md:pt-50 pb-20 md:pb-30">
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{
            opacity: { duration: 1.2 },
            rotate: { duration: 90, ease: "linear", repeat: Infinity },
          }}
          className="absolute right-[-20vw] top-[6vh] w-[55vw] h-[55vw] border border-light-signal-orange/25 rounded-full pointer-events-none"
        />
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: -360 }}
          transition={{
            opacity: { duration: 1.2, delay: 0.2 },
            rotate: { duration: 140, ease: "linear", repeat: Infinity },
          }}
          className="absolute right-[-14vw] top-[14vh] w-[42vw] h-[42vw] border border-light-signal-orange/20 rounded-full pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute right-[-5vw] top-[20vh] w-[40vw] h-[40vw] bg-signal-orange/8 rounded-full blur-[120px] pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(15,15,15,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 70%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, transparent 70%)",
          }}
        />

        <div className="px-6 md:px-25 max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 text-slate-gray hover:text-signal-orange transition-colors text-[14px] font-medium group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>Back to Sign Up</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow mb-8"
          >
            <span className="eyebrow-dot" />
            PRIVACY POLICY
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[44px] sm:text-[64px] md:text-[84px] mb-8 tracking-mc-tight leading-[0.95] font-medium text-ink-black"
          >
            Your data,
            <br />
            <span className="italic font-normal">
              handled with{" "}
              <span className="relative inline-block">
                <span className="relative z-10">care</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  style={{ transformOrigin: "left" }}
                  className="absolute bottom-[6%] left-0 right-0 h-1.5 md:h-2.5 bg-signal-orange/80 z-0 rounded-full"
                />
              </span>
              .
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-slate-gray text-[17px] md:text-[20px] max-w-2xl leading-relaxed mb-8"
          >
            How Structa collects, uses, and protects the information you
            share when you generate SEO content with us.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-white/70 backdrop-blur-sm border border-ink-black/5 rounded-mc-pill text-[12px] tracking-mc-wide uppercase text-slate-gray"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-signal-orange" />
            Last updated: April 2026
          </motion.div>
        </div>
      </main>

      <section className="relative px-6 md:px-25 max-w-5xl mx-auto pb-25 md:pb-40">
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: idx * 0.05,
                }}
                className="group relative bg-white rounded-mc-consent border border-ink-black/5 shadow-mc-soft hover:shadow-mc-heavy transition-shadow duration-500 p-8 md:p-12 overflow-hidden"
              >
                <div
                  aria-hidden
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-canvas-cream transition-transform duration-700 group-hover:scale-125 pointer-events-none"
                />
                <span
                  aria-hidden
                  className="absolute bottom-4 right-6 md:bottom-6 md:right-10 text-[90px] md:text-[120px] font-medium leading-none tracking-mc-tight text-ink-black/4 select-none"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-10">
                  <div className="shrink-0">
                    <div className="relative w-14 h-14 md:w-16 md:h-16">
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-signal-orange/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                      <div className="relative w-full h-full bg-canvas-cream rounded-full flex items-center justify-center border border-ink-black/5 shadow-sm">
                        <Icon
                          className="w-6 h-6 md:w-7 md:h-7 text-signal-orange"
                          strokeWidth={1.75}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-[11px] font-bold tracking-mc-wide text-signal-orange uppercase">
                        {section.tag}
                      </span>
                      <span className="flex-1 h-px bg-ink-black/10" />
                    </div>

                    <h2 className="text-[24px] md:text-[30px] font-medium tracking-mc-tight text-ink-black leading-tight mb-5">
                      {section.title}
                    </h2>

                    <div className="text-slate-gray text-[15px] md:text-[17px] leading-relaxed">
                      {section.body}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 md:mt-16 pt-8 border-t border-ink-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-slate-gray text-[14px]">
            Have a question we didn&apos;t cover? We&apos;re happy to help.
          </p>
          <Link
            href="/terms"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-ink-black hover:text-signal-orange transition-colors"
          >
            Read our Terms
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
