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
    <section id="process" className="relative overflow-hidden">
      <div className="w-7xl mx-auto py-[60px] px-6 md:px-[100px] relative">
        <div className="text-center mb-20 md:mb-32">
          <div className="eyebrow justify-center mb-8">
            <span className="eyebrow-dot" />
            The Methodology
          </div>
          <h2 className="text-[48px] md:text-[64px] mb-8 font-medium leading-none tracking-mc-tight">
            Trajectory of a Masterpiece.
          </h2>
          <p className="text-slate-gray text-[18px] md:text-[20px] max-w-2xl mx-auto leading-relaxed opacity-80">
            A precise, step-by-step workflow designed to integrate with your
            existing systems.
          </p>
        </div>

        <div className="space-y-[50px]">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`flex flex-col md:flex-row items-center gap-24 ${
                step.side === "right" ? "md:flex-row-reverse" : ""
              }`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative shrink-0">
                <div className="w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full overflow-hidden border border-ink-black/5 shadow-mc-heavy">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-mc-heavy border border-ink-black/5 z-20">
                  <step.icon size={32} className="text-signal-orange" />
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute bottom-[-120px] left-1/2 w-[2px] h-[100px] bg-linear-to-b from-light-signal-orange/30 to-transparent" />
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: step.side === "left" ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-md">
                <div className="text-[14px] font-bold text-signal-orange mb-4">
                  0{idx + 1} // PHASE
                </div>
                <h3 className="text-[32px] mb-6 font-medium tracking-mc-tight">
                  {step.title}
                </h3>
                <p className="text-slate-gray text-[18px] leading-relaxed opacity-90">
                  {step.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
