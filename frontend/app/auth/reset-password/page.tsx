"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { InputOTP } from "@/components/ui/InputOTP";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/api";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/lib/validations/auth";

export default function ResetPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showToast, ToastContainer } = useToast();
  const email = searchParams.get("email");
  const otpFromUrl = searchParams.get("otp") || searchParams.get("opt");

  useEffect(() => {
    if (!email) {
      showToast("Email not found", "error");
      const timer = setTimeout(() => {
        router.push("/auth/forgot-password");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [email, router, showToast]);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { otp: "", password: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (otpFromUrl) {
      setValue("otp", otpFromUrl);
    }
  }, [otpFromUrl, setValue]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!email) return;

    setIsLoading(true);
    try {
      await api.auth.resetPassword<{ message: string }>({
        email,
        otp: data.otp,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      setIsSuccess(true);
      showToast("Password reset successfully!", "success");
      
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Unable to reset password.",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) {
    return (
      <>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-2 border-signal-orange border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-slate-gray animate-pulse">
            Email not found. Redirecting...
          </p>
        </div>
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      {!isSuccess ? (
        <Form
          eyebrow="SECURITY"
          title="Reset password"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6">
          <div className="text-center space-y-1">
            <p className="text-[14px] text-slate-gray">
              Enter the 6-digit code sent to
            </p>
            <p className="text-ink-black font-semibold">{email}</p>
          </div>

          <div className="pt-2">
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <InputOTP
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.otp?.message}
                  disabled={isLoading}
                />
              )}
            />
          </div>

          <div className="space-y-4">
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
            />

            <Input
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-2 cursor-pointer h-[50px] text-[15px] font-bold tracking-mc-wide"
            isLoading={isLoading}>
            Update Password
          </Button>
        </Form>
      ) : (
        <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-signal-orange/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-signal-orange">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2 className="text-[28px] font-medium text-ink-black mb-4 tracking-mc-tight">
            Password Reset
          </h2>
          <p className="text-slate-gray mb-10 max-w-[300px] mx-auto text-[15px] leading-relaxed">
            Your security has been updated successfully. Redirecting to sign in...
          </p>
          <div className="w-8 h-8 border-2 border-signal-orange border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      )}

      <ToastContainer />
    </>
  );
}
