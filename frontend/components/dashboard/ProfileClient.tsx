"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Check } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/api";
import { getUser, saveUser } from "@/lib/user-storage";

interface UpdateProfileResponse {
  message: string;
  response: {
    data: {
      first_name: string;
      last_name: string;
      phone: string;
    };
  };
  error: null;
}

export function ProfileClient() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [bio, setBio] = useState("");
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    const user = getUser();
    if (user) {
      setFullName(`${user.first_name} ${user.last_name}`.trim());
      setEmail(user.email);
      setPhone(user.phone ?? "");
      setCompany(user.company ?? "");
      setBio(user.bio ?? "");
    }
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const parts = fullName.trim().split(/\s+/).filter(Boolean);
      const first_name = parts[0] || "";
      const last_name = parts.slice(1).join(" ") || parts[0] || "";

      await api.auth.updateProfile<UpdateProfileResponse>({
        first_name,
        last_name,
        phone,
      });

      saveUser({ email, first_name, last_name, phone, company, bio });

      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Failed to update profile.",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
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
                Update how your identity appears across Structa.
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
            <Button type="submit" variant="primary" size="md" isLoading={isLoading}>
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
      </div>

      <ToastContainer />
    </div>
  );
}
