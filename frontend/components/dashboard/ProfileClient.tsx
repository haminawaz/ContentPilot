"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  Check,
  User,
  CreditCard,
  Zap,
  Calendar,
  Clock,
  Sparkles,
  X,
  AlertTriangle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/api";
import { getUser, saveUser } from "@/lib/user-storage";
import {
  updateProfileSchema,
  type UpdateProfileFormData,
} from "@/lib/validations/auth";
import { getCredits, setPlan, type SubscriptionPlan } from "@/lib/user-storage";
import { PLANS, PlanCard } from "./SubscriptionPlans";

interface UpdateProfileResponse {
  message: string;
  response: {
    data: {
      first_name: string;
      last_name: string;
      phone: string;
      company: string;
      bio: string;
    };
  };
  error: null;
}

function CancelModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-mc-consent shadow-mc-heavy p-8 overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-6 text-signal-orange">
              <div className="w-10 h-10 rounded-full bg-signal-orange/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-[20px] font-bold tracking-mc-tight text-ink-black">
                Cancel Subscription?
              </h3>
            </div>

            <p className="text-[15px] text-slate-gray leading-relaxed mb-8">
              Are you sure you want to cancel your active plan? You will revert
              to the Free tier, and your premium features will be disabled at
              the end of the current billing cycle.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-mc-button text-[14px] font-semibold bg-canvas-cream text-ink-black hover:bg-dust-taupe transition-colors"
              >
                No, keep it
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className="flex-1 py-3 rounded-mc-button text-[14px] font-semibold bg-signal-orange text-white hover:bg-light-signal-orange transition-all disabled:opacity-50"
              >
                {isLoading ? "Cancelling..." : "Yes, cancel plan"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function PersonalTab() {
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast, ToastContainer } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { fullName: "", phone: "", company: "", bio: "" },
  });

  useEffect(() => {
    const user = getUser();
    if (user) {
      setValue("fullName", `${user.first_name} ${user.last_name}`.trim());
      setEmail(user.email);
      setValue("phone", user.phone ?? "");
      setValue("company", user.company ?? "");
      setValue("bio", user.bio ?? "");
    }
  }, [setValue]);

  const onSubmit = async (data: UpdateProfileFormData) => {
    setIsLoading(true);
    try {
      const parts = data.fullName.trim().split(/\s+/).filter(Boolean);
      const first_name = parts[0] || "";
      const last_name = parts.slice(1).join(" ") || parts[0] || "";

      await api.auth.updateProfile<UpdateProfileResponse>({
        first_name,
        last_name,
        phone: data.phone,
        company: data.company ?? "",
        bio: data.bio ?? "",
      });

      saveUser({
        email,
        first_name,
        last_name,
        phone: data.phone,
        company: data.company ?? "",
        bio: data.bio ?? "",
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    } catch (error) {
      console.log(error);
      showToast(
        error instanceof Error ? error.message : "Failed to update profile.",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border border-ink-black/5 rounded-mc-consent shadow-mc-soft p-6 md:p-10"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-signal-orange/10 grid place-items-center">
            <User className="w-6 h-6 text-signal-orange" />
          </div>
          <div>
            <h2 className="text-[20px] font-semibold text-ink-black tracking-mc-tight">
              Personal Information
            </h2>
            <p className="text-[14px] text-slate-gray mt-0.5">
              Update your identity across ContentPilot.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full name"
            {...register("fullName")}
            error={errors.fullName?.message}
          />
          <Input label="Email" type="email" value={email} disabled />
          <Input
            label="Phone Number"
            {...register("phone")}
            error={errors.phone?.message}
          />
          <Input
            label="Company"
            {...register("company")}
            error={errors.company?.message}
          />
        </div>

        <div className="mt-6">
          <label className="block text-[12px] font-bold text-ink-black tracking-mc-wide mb-1.5 ml-1">
            Bio
          </label>
          <textarea
            {...register("bio")}
            rows={3}
            className={`w-full bg-canvas-cream/50 border rounded-mc-button px-4 py-3 text-[14px] text-ink-black placeholder:text-dust-taupe focus:outline-none transition-colors resize-none ${
              errors.bio
                ? "border-signal-orange focus:border-signal-orange"
                : "border-ink-black/10 focus:border-ink-black"
            }`}
          />
          {errors.bio && (
            <p className="mt-1 text-[13px] text-signal-orange ml-1">
              {errors.bio.message}
            </p>
          )}
        </div>

        <div className="mt-10 flex items-center justify-end gap-3 border-t border-ink-black/5 pt-8">
          <Button type="button" variant="ghost" size="md">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoading}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" /> Saved
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save changes
              </>
            )}
          </Button>
        </div>
      </motion.form>
      <ToastContainer />
    </>
  );
}

// ─── Subscription tab ─────────────────────────────────────────────────────────
function SubscriptionTab() {
  const [credits, setCredits] = useState<any>(null);
  const [selecting, setSelecting] = useState<SubscriptionPlan | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    setCredits(getCredits());
  }, []);

  const handleSelect = async (plan: SubscriptionPlan) => {
    if (plan === credits?.plan) return;
    setSelecting(plan);
    await new Promise((r) => setTimeout(r, 800));
    setPlan(plan);
    setCredits(getCredits());
    setSelecting(null);
    showToast(
      `Welcome to the ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan!`,
      "success",
    );
  };

  const handleCancel = async () => {
    setIsCancelling(true);
    await new Promise((r) => setTimeout(r, 1200)); // Simulate API
    setPlan("free");
    setCredits(getCredits());
    setIsCancelling(false);
    setIsCancelModalOpen(false);
    showToast("Subscription cancelled. Reverted to Free tier.", "info");
  };

  const formatDate = (iso?: string) => {
    if (!iso) return "N/A";
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isPaid = credits?.plan && credits.plan !== "free";

  return (
    <>
      <div className="flex flex-col gap-8">
        {/* Horizontal Current Plan Status (Above Cards) */}
        {isPaid && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white border border-ink-black/5 rounded-mc-consent p-6 md:p-8 shadow-mc-soft relative overflow-hidden"
          >
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-canvas-cream/50 to-transparent pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-signal-orange/10 flex items-center justify-center shrink-0">
                  <Zap className="w-7 h-7 text-signal-orange" />
                </div>
                <div>
                  <p className="text-[12px] font-bold tracking-mc-wide uppercase text-slate-gray mb-1">
                    Active Plan
                  </p>
                  <p className="text-[24px] font-bold text-ink-black capitalize">
                    {credits?.plan}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8 md:gap-12">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-ink-black/40" />
                  <div>
                    <p className="text-[11px] font-bold tracking-mc-wide uppercase text-slate-gray mb-0.5">
                      Purchased
                    </p>
                    <p className="text-[14px] font-semibold text-ink-black whitespace-nowrap">
                      {formatDate(credits?.purchasedAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-emerald-500/60" />
                  <div>
                    <p className="text-[11px] font-bold tracking-mc-wide uppercase text-slate-gray mb-0.5">
                      Renews On
                    </p>
                    <p className="text-[14px] font-semibold text-ink-black whitespace-nowrap">
                      {formatDate(credits?.expiresAt)}
                    </p>
                  </div>
                </div>

                <div className="min-w-[180px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold tracking-mc-wide uppercase text-slate-gray">
                      Credit Usage
                    </span>
                    <span className="text-[13px] font-bold text-ink-black">
                      {credits?.used}/{credits?.total}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-canvas-cream overflow-hidden">
                    <motion.div
                      className="h-full bg-signal-orange"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(credits?.used / credits?.total) * 100}%`,
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden xl:block px-6 py-3 bg-ink-black rounded-2xl text-white">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-signal-orange" />
                    <span className="text-[13px] font-semibold whitespace-nowrap">
                      Pro Power Active
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCancelModalOpen(true)}
                  className="p-3 rounded-full bg-canvas-cream border border-ink-black/5 text-slate-gray hover:text-signal-orange hover:bg-signal-orange/5 transition-all group"
                  title="Cancel subscription"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={i}
              isActive={plan.id === credits?.plan}
              isLoading={selecting === plan.id}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      <CancelModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleCancel}
        isLoading={isCancelling}
      />

      <ToastContainer />
    </>
  );
}

// ─── Root component ───────────────────────────────────────────────────────────
type Tab = "personal" | "subscription";

export function ProfileClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("personal");

  useEffect(() => {
    const t = searchParams.get("tab");
    if (t === "subscription" || t === "personal") setActiveTab(t);
  }, [searchParams]);

  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
    router.replace(`/dashboard/profile?tab=${tab}`, { scroll: false });
  };

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "personal", label: "Personal Information", icon: User },
    { id: "subscription", label: "Subscription & Plans", icon: CreditCard },
  ];

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="eyebrow mb-4">
            <span className="eyebrow-dot" />
            ACCOUNT SETTINGS
          </div>
          <h1 className="text-[36px] md:text-[48px] font-medium tracking-mc-tight text-ink-black leading-[1.1]">
            Manage your profile
            <br />
            and subscription.
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-white border border-ink-black/5 rounded-2xl p-1 shadow-mc-soft h-fit">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = t.id === activeTab;
            return (
              <button
                key={t.id}
                onClick={() => switchTab(t.id)}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-medium transition-all ${
                  isActive
                    ? "text-ink-black"
                    : "text-slate-gray hover:text-ink-black"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="profile-tab-active"
                    className="absolute inset-0 bg-canvas-cream border border-ink-black/5 rounded-xl shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeTab === "personal" ? <PersonalTab /> : <SubscriptionTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
