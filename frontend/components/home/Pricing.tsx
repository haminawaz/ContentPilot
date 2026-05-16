"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlanCard } from "../dashboard/SubscriptionPlans";
import { api } from "@/lib/api";

interface Plan {
  id: number;
  plan_name: string;
  price: number;
  interval: string;
  description: string;
  features: any;
  currency: string;
  credit_limit: number;
}

interface SubscriptionDetailsResponse {
  message: string;
  response: {
    current_subscription: any;
    available_plans: Plan[];
  };
  error: null;
}

export default function Pricing() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data =
          await api.subscription.getPublicPlans<SubscriptionDetailsResponse>();
        setPlans(data.response.available_plans);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  return (
    <section
      className="py-24 md:py-32 px-6 bg-canvas-cream overflow-hidden"
      id="pricing"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow justify-center mb-6"
          >
            <span className="eyebrow-dot" />
            PRICING PLANS
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[40px] md:text-[64px] font-medium tracking-mc-tight text-ink-black leading-[1.1] mb-6"
          >
            Choose your <span className="italic font-normal">altitude.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-gray text-[18px] md:text-[20px] max-w-2xl mx-auto leading-relaxed"
          >
            Flexible plans for creators, startups, and agencies. Scale your
            organic reach with precision-engineered content.
          </motion.p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-signal-orange border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <PlanCard
                key={plan.id}
                plan={{
                  id: plan.id,
                  name: plan.plan_name,
                  credits: plan.credit_limit,
                  price: `$${plan.price}`,
                  description: plan.description,
                  features: Array.isArray(plan.features) ? plan.features : [],
                  highlight: plan.plan_name.toLowerCase() === "pro",
                }}
                index={i}
                isLanding={true}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
