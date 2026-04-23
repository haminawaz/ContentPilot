"use client";

import { Sparkles, BarChart3, Settings, FileCode } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Content Creation",
    description:
      "Leverages cutting-edge OpenAI models to generate high-quality, SEO-optimized articles that mimic human writing styles.",
    accent: "bg-signal-orange",
    number: "01",
  },
  {
    icon: BarChart3,
    title: "SERP & Competitor Analysis",
    description:
      "Integrates directly with SerpAPI to analyze competitive search results and identify content gaps before generation.",
    accent: "bg-ink-black",
    number: "02",
  },
  {
    icon: Settings,
    title: "Fully Customizable Output",
    description:
      "Fine-tune every aspect of your content, from specific topics and target languages to precise word counts and formatting.",
    accent: "bg-link-blue",
    number: "03",
  },
  {
    icon: FileCode,
    title: "Native Markdown Support",
    description:
      "Every piece of content is generated in clean markdown format, ready to be dropped into your CMS or static site generator.",
    accent: "bg-light-signal-orange",
    number: "04",
  },
];

function TiltCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 120,
    damping: 14,
  });
  const rY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), {
    stiffness: 120,
    damping: 14,
  });

  const hoverX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const hoverY = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);
  const glow = useTransform(
    [hoverX, hoverY] as never,
    ([x, y]: string[]) =>
      `radial-gradient(circle 180px at ${x} ${y}, rgba(243,115,56,0.14), transparent 70%)`,
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        rotateX: rX,
        rotateY: rY,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      className="relative group rounded-mc-consent bg-canvas-cream/50 border border-ink-black/5 p-8 md:p-10 overflow-hidden hover:border-ink-black/10 transition-colors">
      {/* Mouse-following glow */}
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: glow }}
      />

      {/* Number watermark */}
      <span
        className="absolute top-6 right-6 text-[13px] font-mono text-ink-black/20 tracking-widest"
        style={{ transform: "translateZ(30px)" }}>
        {feature.number}
      </span>

      <div style={{ transform: "translateZ(40px)" }}>
        <div className="relative w-16 h-16 rounded-mc-button flex items-center justify-center mb-10 overflow-hidden">
          <div
            className={`absolute inset-0 ${feature.accent} opacity-10 group-hover:opacity-100 transition-opacity duration-500`}
          />
          <div className="absolute inset-0 bg-white group-hover:bg-transparent transition-colors duration-500 border border-ink-black/5 rounded-mc-button" />
          <Icon
            size={28}
            className="relative z-10 text-ink-black group-hover:text-white transition-colors duration-500"
          />
          {/* Halo ring */}
          <motion.span
            aria-hidden
            className={`absolute inset-0 rounded-mc-button border-2 ${feature.accent.replace(
              "bg-",
              "border-",
            )}/40 opacity-0 group-hover:opacity-100`}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        <h3 className="text-[22px] mb-5 font-medium tracking-mc-tight text-ink-black">
          {feature.title}
        </h3>
        <p className="text-slate-gray text-[15px] leading-relaxed">
          {feature.description}
        </p>

        <div className="mt-8 flex items-center gap-2 text-[12px] text-signal-orange font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
          Learn more
          <span className="w-6 h-px bg-signal-orange" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="features" className="px-6 pt-[40px] pb-[40px]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl w-full mx-auto bg-white rounded-mc-consent md:rounded-mc-stadium p-6 sm:p-12 md:p-20 shadow-mc-heavy border border-ink-black/5 relative overflow-hidden">
        {/* Decorative background */}
        <div
          aria-hidden
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(243,115,56,0.08) 0%, transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(56,96,190,0.06) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-16 md:mb-24">
            <div className="max-w-2xl">
              <div className="eyebrow mb-8">
                <span className="eyebrow-dot" />
                Atomic Capabilities
              </div>
              <h2 className="text-[32px] sm:text-[48px] md:text-[60px] leading-[1.05] font-medium tracking-mc-tight text-ink-black">
                Everything you need to{" "}
                <span className="italic font-normal text-signal-orange">
                  pilot
                </span>{" "}
                your content at scale.
              </h2>
            </div>
            <p className="text-slate-gray text-[17px] md:text-[19px] max-w-sm mb-4 leading-relaxed">
              A comprehensive suite of tools designed for creators who demand
              performance and precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <TiltCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
