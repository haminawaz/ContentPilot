"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    title: "Market Analysis",
    description:
      "Our system performs a deep scan of SERPs and competitor clusters to identify the exact search intent and performance gaps.",
    icon: Search,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    side: "left",
  },
  {
    title: "Structural Pilot",
    description:
      "Content is generated using advanced OpenAI models, fine-tuned to maintain your brand's unique trajectory and SEO integrity.",
    icon: PenTool,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    side: "right",
  },
  {
    title: "Final Launch",
    description:
      "Refine your masterpiece, export in native markdown, and deploy your content to steer your organic growth.",
    icon: Rocket,
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
    side: "left",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="process"
      className="relative overflow-hidden py-[60px] md:py-[100px] bg-canvas-cream">
      <div className="max-w-7xl w-full mx-auto px-6 md:px-[100px] relative">
        <div className="text-center mb-20 md:mb-32">
          <div className="eyebrow justify-center mb-8">
            <span className="eyebrow-dot" />
            The Methodology
          </div>
          <h2 className="text-[32px] sm:text-[48px] md:text-[60px] mb-8 font-medium leading-[1.05] tracking-mc-tight text-ink-black">
            Trajectory of a{" "}
            <span className="italic font-normal text-signal-orange">
              masterpiece.
            </span>
          </h2>
          <p className="text-slate-gray text-[17px] md:text-[19px] max-w-2xl mx-auto leading-relaxed">
            A precise, step-by-step workflow designed to integrate with your
            existing systems.
          </p>
        </div>

        <div className="space-y-24 md:space-y-40 relative">
          {/* Vertical dashed path */}
          <div
            aria-hidden
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, #cf450055 0, #cf450055 8px, transparent 8px, transparent 16px)",
              backgroundSize: "1px 16px",
            }}
          />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isRight = step.side === "right";
            return (
              <div
                key={idx}
                className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 relative ${
                  isRight ? "md:flex-row-reverse" : ""
                }`}>
                {/* 3D circular image with rotating ring */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, rotateY: -30 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1200px",
                  }}
                  className="relative shrink-0 group">
                  {/* Outer rotating dashed ring */}
                  <motion.div
                    aria-hidden
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-[-20px] rounded-full border-2 border-dashed border-light-signal-orange/25 pointer-events-none"
                  />
                  {/* Middle slow ring */}
                  <motion.div
                    aria-hidden
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 60,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-[-8px] rounded-full border border-ink-black/10 pointer-events-none">
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-signal-orange shadow-[0_0_10px_rgba(207,69,0,0.6)]" />
                  </motion.div>

                  {/* Image disc */}
                  <div className="w-[260px] h-[260px] md:w-[340px] md:h-[340px] rounded-full overflow-hidden border border-ink-black/5 shadow-[0_40px_80px_-20px_rgba(20,20,19,0.3)] relative bg-white">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-black/30 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Floating icon badge */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-3 right-3 md:bottom-6 md:right-6 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(20,20,19,0.3)] border border-ink-black/5 z-20">
                    <span className="absolute inset-0 rounded-full bg-signal-orange/15 animate-ping" />
                    <Icon
                      size={28}
                      className="relative text-signal-orange"
                    />
                  </motion.div>

                  {/* Phase number */}
                  <div className="absolute -top-2 -left-2 md:-top-4 md:-left-4 bg-ink-black text-canvas-cream w-14 h-14 rounded-full flex items-center justify-center text-[15px] font-medium tracking-mc-tight shadow-[0_16px_32px_-10px_rgba(20,20,19,0.4)] z-20">
                    0{idx + 1}
                  </div>
                </motion.div>

                {/* Copy */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: isRight ? -40 : 40,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  className="max-w-md relative z-10">
                  <div className="text-[12px] font-mono font-bold text-signal-orange mb-4 tracking-[0.2em] uppercase">
                    Phase 0{idx + 1} // {step.title.split(" ")[0]}
                  </div>
                  <h3 className="text-[30px] md:text-[36px] mb-6 font-medium tracking-mc-tight leading-[1.1] text-ink-black">
                    {step.title}
                  </h3>
                  <p className="text-slate-gray text-[17px] leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
