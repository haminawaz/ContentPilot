"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Package,
  Users as UsersIcon,
  X,
  Check,
} from "lucide-react";
import { adminApi } from "@/lib/admin-api";
import type { AdminPlan, AdminPlanInput } from "@/types/admin";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Spinner, ConfirmModal } from "@/components/admin/ui";

const EMPTY: AdminPlanInput = {
  plan_name: "",
  price: 0,
  interval: "month",
  description: "",
  features: [],
  currency: "USD",
  credit_limit: 0,
  active: true,
  stripe_price_id: "",
};

function PlanFormModal({
  open,
  plan,
  onClose,
  onSaved,
}: {
  open: boolean;
  plan: AdminPlan | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { showToast, ToastContainer } = useToast();
  const [form, setForm] = useState<AdminPlanInput>(EMPTY);
  const [featuresText, setFeaturesText] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      if (plan) {
        setForm({
          plan_name: plan.plan_name,
          price: plan.price,
          interval: plan.interval,
          description: plan.description,
          features: plan.features ?? [],
          currency: plan.currency,
          credit_limit: plan.credit_limit,
          active: plan.active,
          stripe_price_id: plan.stripe_price_id,
        });
        setFeaturesText((plan.features ?? []).join("\n"));
      } else {
        setForm(EMPTY);
        setFeaturesText("");
      }
    }
  }, [open, plan]);

  const set = <K extends keyof AdminPlanInput>(k: K, v: AdminPlanInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: AdminPlanInput = {
      ...form,
      currency: form.currency.toUpperCase(),
      features: featuresText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    if (!payload.plan_name || !payload.description) {
      showToast("Plan name and description are required.", "error");
      return;
    }
    setSaving(true);
    try {
      if (plan) {
        await adminApi.plans.update(plan.id, payload);
        showToast("Plan updated.", "success");
      } else {
        await adminApi.plans.create(payload);
        showToast("Plan created.", "success");
      }
      onSaved();
      onClose();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            className="absolute inset-0 bg-ink-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={saving ? undefined : onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 360, damping: 38 }}
            className="relative w-full max-w-lg bg-canvas-cream h-full overflow-y-auto shadow-mc-heavy"
          >
            <div className="sticky top-0 bg-canvas-cream/90 backdrop-blur-xl border-b border-ink-black/5 px-6 py-4 flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-ink-black">
                {plan ? "Edit Plan" : "New Plan"}
              </h3>
              <button
                onClick={onClose}
                className="grid place-items-center w-8 h-8 rounded-lg text-slate-gray hover:text-ink-black hover:bg-ink-black/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={submit} className="px-6 py-6 space-y-4">
              <Input
                label="Plan Name"
                value={form.plan_name}
                onChange={(e) => set("plan_name", e.target.value)}
                placeholder="Pro"
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Price"
                  type="number"
                  value={String(form.price)}
                  onChange={(e) => set("price", Number(e.target.value))}
                  placeholder="19"
                />
                <Input
                  label="Credit Limit"
                  type="number"
                  value={String(form.credit_limit)}
                  onChange={(e) => set("credit_limit", Number(e.target.value))}
                  placeholder="10"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="w-full space-y-1.5">
                  <label className="block text-[12px] font-bold text-ink-black tracking-mc-wide ml-1">
                    Interval
                  </label>
                  <select
                    value={form.interval}
                    onChange={(e) => set("interval", e.target.value)}
                    className="w-full bg-canvas-cream/50 border border-ink-black/10 rounded-mc-button px-4 py-2.5 text-[14px] text-ink-black focus:outline-none focus:border-ink-black transition-colors"
                  >
                    <option value="month">month</option>
                    <option value="year">year</option>
                  </select>
                </div>
                <Input
                  label="Currency"
                  value={form.currency}
                  onChange={(e) => set("currency", e.target.value)}
                  placeholder="USD"
                  maxLength={3}
                />
              </div>

              <div className="w-full space-y-1.5">
                <label className="block text-[12px] font-bold text-ink-black tracking-mc-wide ml-1">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  rows={3}
                  placeholder="Short plan description…"
                  className="w-full bg-canvas-cream/50 border border-ink-black/10 rounded-mc-button px-4 py-2.5 text-[14px] text-ink-black placeholder:text-dust-taupe focus:outline-none focus:border-ink-black transition-colors resize-none"
                />
              </div>

              <div className="w-full space-y-1.5">
                <label className="block text-[12px] font-bold text-ink-black tracking-mc-wide ml-1">
                  Features (one per line)
                </label>
                <textarea
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  rows={4}
                  placeholder={"10 AI article credits\nFull SEO metadata\nPriority support"}
                  className="w-full bg-canvas-cream/50 border border-ink-black/10 rounded-mc-button px-4 py-2.5 text-[14px] text-ink-black placeholder:text-dust-taupe focus:outline-none focus:border-ink-black transition-colors resize-none"
                />
              </div>

              <Input
                label="Stripe Price ID (optional)"
                value={form.stripe_price_id ?? ""}
                onChange={(e) => set("stripe_price_id", e.target.value)}
                placeholder="price_..."
              />

              <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => set("active", e.target.checked)}
                  className="w-4 h-4 accent-signal-orange"
                />
                <span className="text-[13px] text-ink-black font-medium">
                  Active (visible to users)
                </span>
              </label>

              <div className="flex items-center justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" isLoading={saving}>
                  <Check className="w-4 h-4" />
                  {plan ? "Save changes" : "Create plan"}
                </Button>
              </div>
            </form>
            <ToastContainer />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function AdminPlansPage() {
  const { showToast, ToastContainer } = useToast();
  const [plans, setPlans] = useState<AdminPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<AdminPlan | null>(null);
  const [toDelete, setToDelete] = useState<AdminPlan | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.plans.list();
      setPlans(res.response.data);
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Failed to load plans", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setEditOpen(true);
  };
  const openEdit = (p: AdminPlan) => {
    setEditing(p);
    setEditOpen(true);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await adminApi.plans.remove(toDelete.id);
      showToast("Plan deleted.", "success");
      setToDelete(null);
      load();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Delete failed", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-[18px] font-semibold text-ink-black tracking-mc-tight">
            Plans
          </h2>
          <p className="text-[13px] text-slate-gray">
            Create and manage subscription pricing plans.
          </p>
        </div>
        <Button size="sm" onClick={openCreate}>
          <Plus className="w-4 h-4" />
          New Plan
        </Button>
      </div>

      {loading ? (
        <div className="grid place-items-center py-24">
          <Spinner className="w-6 h-6 text-slate-gray" />
        </div>
      ) : plans.length === 0 ? (
        <div className="rounded-2xl border border-ink-black/8 bg-lifted-cream py-16 text-center">
          <p className="text-[14px] text-slate-gray mb-4">No plans yet.</p>
          <Button size="sm" onClick={openCreate}>
            <Plus className="w-4 h-4" /> Create your first plan
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-ink-black/8 bg-lifted-cream p-5 flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="grid place-items-center w-9 h-9 rounded-lg bg-ink-black/5 text-ink-black">
                    <Package className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-ink-black">
                      {p.plan_name}
                    </p>
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                        p.active
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-ink-black/5 text-slate-gray"
                      }`}
                    >
                      {p.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEdit(p)}
                    title="Edit"
                    className="grid place-items-center w-8 h-8 rounded-lg text-slate-gray hover:text-ink-black hover:bg-ink-black/5 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setToDelete(p)}
                    title="Delete"
                    className="grid place-items-center w-8 h-8 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-[24px] font-semibold text-ink-black tracking-mc-tight">
                  ${p.price}
                </span>
                <span className="text-[12px] text-slate-gray">
                  /{p.interval} &middot; {p.currency}
                </span>
              </div>

              <p className="text-[12px] text-slate-gray mb-3 line-clamp-2">
                {p.description}
              </p>

              <div className="flex items-center gap-3 text-[12px] text-slate-gray mt-auto pt-3 border-t border-ink-black/5">
                <span>{p.credit_limit} credits</span>
                <span className="flex items-center gap-1">
                  <UsersIcon className="w-3.5 h-3.5" />
                  {p.subscriberCount ?? 0} subs
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <PlanFormModal
        open={editOpen}
        plan={editing}
        onClose={() => setEditOpen(false)}
        onSaved={load}
      />

      <ConfirmModal
        open={!!toDelete}
        title="Delete plan"
        message={
          (toDelete?.subscriberCount ?? 0) > 0
            ? `"${toDelete?.plan_name}" has ${toDelete?.subscriberCount} subscriber(s). Deleting may be blocked — deactivate it instead.`
            : `Permanently delete the "${toDelete?.plan_name}" plan? This cannot be undone.`
        }
        confirmLabel="Delete"
        danger
        loading={deleting}
        onConfirm={confirmDelete}
        onClose={() => setToDelete(null)}
      />

      <ToastContainer />
    </div>
  );
}
