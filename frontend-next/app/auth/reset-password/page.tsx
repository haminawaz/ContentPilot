"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
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
  const { showToast, ToastContainer } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    const email = searchParams.get("email");
    const otp = searchParams.get("otp");

    if (!email || !otp) {
      showToast("Reset link is invalid or incomplete.", "error");
      setIsLoading(false);
      return;
    }

    try {
      await api.auth.resetPassword<{ message: string }>({
        email,
        otp,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      setIsSuccess(true);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Unable to reset password.",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isSuccess ? (
        <Form
          eyebrow="SECURITY"
          title="New credentials"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4">
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

          <Button
            type="submit"
            className="w-full mt-2 cursor-pointer"
            isLoading={isLoading}>
            Update Password
          </Button>
        </Form>
      ) : (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-canvas-cream rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              width="32"
              height="32"
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
          <h2 className="text-[24px] font-medium text-ink-black mb-3 tracking-mc-tight">
            Security updated
          </h2>
          <p className="text-slate-gray mb-8 max-w-70 mx-auto text-[14px]">
            Your password has been successfully reset. You can now use your new
            credentials.
          </p>
          <Button href="/auth/login" className="w-full">
            Return to Sign In
          </Button>
        </div>
      )}

      <ToastContainer />
    </>
  );
}
