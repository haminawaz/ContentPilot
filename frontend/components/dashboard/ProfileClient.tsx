"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  // Globe2,
  // CreditCard,
  // KeyRound,
  Save,
  Check,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

// const PLAN_USAGE = [
//   { label: "Articles this month", value: 28, max: 50 },
//   { label: "Keywords researched", value: 1284, max: 2000 },
//   { label: "Internal links mapped", value: 412, max: 1000 },
// ];

export function ProfileClient() {
  const [fullName, setFullName] = useState("Alex Morgan");
  const [email, setEmail] = useState("alex@contentpilot.ai");
  const [company, setCompany] = useState("ContentPilot");
  const [phone, setPhone] = useState("+1234567890");
  const [bio, setBio] = useState(
    "Head of SEO. I build content systems that compound.",
  );
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSave}
          className="lg:col-span-3 bg-lifted-cream border border-ink-black/5 rounded-2xl shadow-mc-soft p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[18px] font-semibold text-ink-black tracking-mc-tight">
                Account details
              </h2>
              <p className="text-[13px] text-slate-gray mt-1">
                Update how your identity appears across ContentPilot.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
            <Input
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              label="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="mt-5">
            <label className="block text-[12px] font-bold text-ink-black tracking-mc-wide mb-1.5 ml-1">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full bg-canvas-cream/50 border border-ink-black/10 rounded-mc-button px-4 py-3 text-[14px] text-ink-black placeholder:text-dust-taupe focus:outline-none focus:border-ink-black transition-colors resize-none"
            />
          </div>

          <div className="mt-8 flex items-center justify-end gap-3">
            <Button type="button" variant="ghost" size="md">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
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
        {/* <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-6">
          <div className="bg-ink-black text-canvas-cream rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-signal-orange/30 blur-3xl" />
            <div className="relative">
              <p className="eyebrow text-canvas-cream/70 mb-3">
                <span className="eyebrow-dot" />
                Current plan
              </p>
              <p className="text-[22px] font-semibold tracking-mc-tight">
                Pro · Monthly
              </p>
              <p className="text-[12px] text-canvas-cream/70 mt-1">
                Renews March 21, 2026
              </p>

              <div className="mt-5 flex flex-col gap-3">
                {PLAN_USAGE.map((u) => {
                  const pct = Math.round((u.value / u.max) * 100);
                  return (
                    <div key={u.label}>
                      <div className="flex items-center justify-between text-[11px] text-canvas-cream/70 mb-1.5">
                        <span>{u.label}</span>
                        <span className="font-mono text-canvas-cream">
                          {u.value.toLocaleString()} /{" "}
                          {u.max.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-canvas-cream/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-signal-orange rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="mt-6 w-full inline-flex items-center justify-center gap-2 text-[13px] font-semibold bg-canvas-cream text-ink-black rounded-mc-button py-2.5 hover:bg-white transition-colors">
                <CreditCard className="w-4 h-4" />
                Manage billing
              </button>
            </div>
          </div>

          <div className="bg-lifted-cream border border-ink-black/5 rounded-2xl p-6">
            <h3 className="text-[14px] font-semibold text-ink-black tracking-mc-tight mb-4">
              Quick actions
            </h3>
            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-3 text-[13px] text-ink-black px-3 py-2.5 rounded-xl hover:bg-canvas-cream transition-colors">
                <KeyRound className="w-4 h-4 text-slate-gray" />
                Change password
              </button>
              <button className="flex items-center gap-3 text-[13px] text-ink-black px-3 py-2.5 rounded-xl hover:bg-canvas-cream transition-colors">
                <Globe2 className="w-4 h-4 text-slate-gray" />
                Language &amp; region
              </button>
              <button className="flex items-center gap-3 text-[13px] text-ink-black px-3 py-2.5 rounded-xl hover:bg-canvas-cream transition-colors">
                <Shield className="w-4 h-4 text-slate-gray" />
                Two-factor authentication
              </button>
            </div>
          </div>
        </motion.aside> */}
      </div>
    </div>
  );
}
