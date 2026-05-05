"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Check } from "lucide-react";
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

export function ProfileClient() {
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
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
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

          <div className="mt-5">
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

          <div className="mt-8 flex items-center justify-end gap-3">
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
      </div>

      <ToastContainer />
    </div>
  );
}
