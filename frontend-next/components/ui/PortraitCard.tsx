"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface PortraitCardProps {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  index: number;
}

export default function PortraitCard({
  image,
  eyebrow,
  title,
  description,
  index,
}: PortraitCardProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`flex flex-col ${index % 2 === 0 ? "mt-0" : "mt-24"} items-center text-center`}>
      <div className="relative mb-10 group">
        <div className="portrait-circle shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <button className="satellite-cta shadow-xl group-hover:scale-110 group-hover:bg-(--ink-black) group-hover:text-white transition-all duration-300">
          <ArrowRight size={24} />
        </button>
      </div>

      <div className="max-w-[300px]">
        <div className="eyebrow mb-3 justify-center">
          <span className="eyebrow-dot" />
          {eyebrow}
        </div>
        <h3 className="text-[24px] mb-4 font-medium tracking-mc-tight">
          {title}
        </h3>
        <p className="text-slate-gray text-[16px] leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
