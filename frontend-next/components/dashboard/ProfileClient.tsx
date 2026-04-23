"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Mail,
  Building2,
  Globe2,
  Shield,
  Bell,
  CreditCard,
  KeyRound,
  Save,
  Check,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const PLAN_USAGE = [
  { label: "Articles this month", value: 28, max: 50 },
  { label: "Keywords researched", value: 1284, max: 2000 },
  { label: "Internal links mapped", value: 412, max: 1000 },
];

const PREFERENCES = [
  {
    id: "weekly-digest",
    icon: Bell,
    title: "Weekly digest",
    desc: "Get a Monday summary of rank changes and new keyword ideas.",
    defaultOn: true,
  },
  {
    id: "draft-alerts",
    icon: Shield,
    title: "Draft review alerts",
    desc: "Email me when an article finishes generating and is ready to review.",
    defaultOn: true,
  },
  {
    id: "marketing",
    icon: Mail,
    title: "Product updates",
    desc: "Occasional emails about new ContentPilot features and workflows.",
    defaultOn: false,
  },
];

export function ProfileClient() {
  const [fullName, setFullName] = useState("Alex Morgan");
  const [email, setEmail] = useState("alex@contentpilot.ai");
  const [company, setCompany] = useState("ContentPilot");
  const [website, setWebsite] = useState("https://contentpilot.ai");
  const [bio, setBio] = useState(
    "Head of SEO. I build content systems that compound.",
  );
  const [saved, setSaved] = useState(false);
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(PREFERENCES.map((p) => [p.id, p.defaultOn])),
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      {/* Header card */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-lifted-cream border border-ink-black/5 shadow-mc-soft">
        <div className="h-32 bg-ink-black relative">
          <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-signal-orange/30 blur-3xl" />
          <div className="absolute -bottom-10 left-1/3 w-60 h-60 rounded-full bg-link-blue/20 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
        </div>

        <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-14 flex flex-col md:flex-row gap-6 md:items-end">
          <div className="relative">
            <div className="w-28 h-28 rounded-3xl bg-canvas-cream border-4 border-lifted-cream overflow-hidden grid place-items-center shadow-mc-soft">
              <span className="text-[32px] font-semibold text-ink-black tracking-mc-tight">
                AM
              </span>
            </div>
            <button
              aria-label="Change avatar"
              className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-ink-black text-canvas-cream grid place-items-center hover:bg-charcoal transition-colors shadow-mc-soft">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-[24px] font-semibold text-ink-black tracking-mc-tight">
                {fullName}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-mc-wide px-2 py-1 rounded-full bg-signal-orange/10 text-signal-orange">
                Pro
              </span>
            </div>
            <p className="text-[14px] text-slate-gray flex items-center gap-2 flex-wrap">
              <Mail className="w-3.5 h-3.5" /> {email}
              <span className="w-1 h-1 rounded-full bg-slate-gray/50" />
              <Building2 className="w-3.5 h-3.5" /> {company}
            </p>
          </div>

          <div className="hidden md:block">
            <Button variant="outline" size="sm">
              View public profile
            </Button>
          </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account form */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSave}
          className="lg:col-span-2 bg-lifted-cream border border-ink-black/5 rounded-2xl shadow-mc-soft p-6 md:p-8">
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
            />
            <Input
              label="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <Input
              label="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
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

        {/* Plan & usage */}
        <motion.aside
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
        </motion.aside>
      </div>

      {/* Preferences */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-lifted-cream border border-ink-black/5 rounded-2xl shadow-mc-soft p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-[18px] font-semibold text-ink-black tracking-mc-tight">
            Notifications
          </h2>
          <p className="text-[13px] text-slate-gray mt-1">
            Decide what we should ping you about.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-ink-black/5">
          {PREFERENCES.map((p) => {
            const Icon = p.icon;
            const on = prefs[p.id];
            return (
              <div
                key={p.id}
                className="flex items-center justify-between gap-6 py-4 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-canvas-cream border border-ink-black/5 grid place-items-center shrink-0">
                    <Icon className="w-4 h-4 text-ink-black" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-ink-black">
                      {p.title}
                    </p>
                    <p className="text-[12px] text-slate-gray mt-0.5">
                      {p.desc}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setPrefs((prev) => ({ ...prev, [p.id]: !prev[p.id] }))
                  }
                  aria-pressed={on}
                  className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
                    on ? "bg-signal-orange" : "bg-ink-black/15"
                  }`}>
                  <motion.span
                    animate={{ x: on ? 22 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-0.5 left-0 w-5 h-5 rounded-full bg-white shadow-md"
                  />
                </button>
              </div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}
