"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { CheckCircle2, ArrowRight, Check } from "lucide-react";
import { type SubscriptionPlan } from "@/lib/user-storage";

export const PLANS: {
  id: SubscriptionPlan;
  name: string;
  credits: number;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
}[] = [
  {
    id: "free",
    name: "Free",
    credits: 2,
    price: "$0",
    description: "Perfect for trying out ContentPilot and exploring features.",
    features: [
      "2 AI article credits",
      "Basic SEO analysis",
      "Article history",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    credits: 10,
    price: "$19",
    description: "For creators who publish consistently and need precision.",
    features: [
      "10 AI article credits",
      "Advanced SEO insights",
      "Priority generation",
      "Priority support",
    ],
    highlight: true,
  },
  {
    id: "agency",
    name: "Agency",
    credits: 10,
    price: "$49",
    description: "Scale content for teams and clients with full power.",
    features: [
      "10 AI article credits",
      "Team workspace",
      "Custom integrations",
      "Dedicated account manager",
    ],
  },
];

export function PlanCard({
  plan,
  isActive,
  isLoading,
  onSelect,
  index,
  isLanding = false,
}: {
  plan: (typeof PLANS)[0];
  isActive?: boolean;
  isLoading?: boolean;
  onSelect?: (id: SubscriptionPlan) => void;
  index: number;
  isLanding?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 12,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 12,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const handleAction = () => {
    if (isLanding) {
      window.location.href = "/auth/signup";
      return;
    }
    onSelect?.(plan.id);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{ perspective: 1200 }}
      className="group relative h-full"
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={`relative flex flex-col h-full rounded-mc-consent border p-8 transition-shadow duration-500 overflow-hidden ${
          plan.highlight
            ? "bg-ink-black text-canvas-cream border-ink-black shadow-mc-heavy"
            : "bg-white border-ink-black/8 shadow-mc-soft group-hover:shadow-mc-heavy"
        } ${isActive ? "ring-2 ring-signal-orange ring-offset-2" : ""}`}
      >
        <div
          aria-hidden
          className={`absolute -top-16 -right-16 w-40 h-40 rounded-full transition-transform duration-700 group-hover:scale-125 ${
            plan.highlight ? "bg-white/5" : "bg-canvas-cream"
          }`}
        />

        {plan.highlight && (
          <div
            aria-hidden
            className="absolute top-6 right-6 w-3 h-3 rounded-full bg-signal-orange animate-pulse"
          />
        )}

        <div
          className="relative z-10 flex flex-col h-full"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span
              className={`text-[11px] font-bold tracking-mc-wide uppercase text-signal-orange`}
            >
              {plan.highlight ? "Most Popular" : "Plan"}
            </span>
            <span
              className={`flex-1 h-px ${
                plan.highlight ? "bg-white/10" : "bg-ink-black/10"
              }`}
            />
          </div>

          <div className="mb-6">
            <h3 className="text-[28px] font-semibold tracking-mc-tight mb-2">
              {plan.name}
            </h3>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-[40px] font-bold tracking-mc-tight leading-none">
                {plan.price}
              </span>
              <span className={`text-[14px] mb-1 opacity-60`}>/month</span>
            </div>
            <p className="text-[15px] leading-relaxed opacity-80 mb-6">
              {plan.description}
            </p>
          </div>

          <ul className="flex-1 flex flex-col gap-3 mb-8">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[14px]">
                <CheckCircle2
                  className={`w-5 h-5 shrink-0 ${
                    plan.highlight ? "text-signal-orange" : "text-emerald-500"
                  }`}
                />
                <span className="opacity-90">{f}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={handleAction}
            disabled={(!isLanding && isActive) || isLoading}
            className={`w-full py-4 rounded-mc-button text-[14px] font-semibold transition-all flex items-center justify-center gap-2 group/btn ${
              !isLanding && isActive
                ? plan.highlight
                  ? "bg-white/20 text-canvas-cream cursor-default"
                  : "bg-ink-black/5 text-ink-black cursor-default"
                : plan.highlight
                  ? "bg-signal-orange hover:bg-light-signal-orange text-white"
                  : "bg-ink-black hover:bg-charcoal text-canvas-cream"
            }`}
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : !isLanding && isActive ? (
              <>
                <Check className="w-5 h-5" /> Current Plan
              </>
            ) : (
              <>
                {isLanding ? "Get Started" : `Upgrade to ${plan.name}`}
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
