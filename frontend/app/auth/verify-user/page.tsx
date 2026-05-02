"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { InputOTP } from "@/components/ui/InputOTP";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/api";
import {
  verifyUserSchema,
  type VerifyUserFormData,
} from "@/lib/validations/auth";

export default function VerifyUserPage() {
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
        router.push("/auth/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [email, router, showToast]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifyUserFormData>({
    resolver: zodResolver(verifyUserSchema),
    defaultValues: { otp: "" },
  });

  useEffect(() => {
    if (otpFromUrl) {
      setValue("otp", otpFromUrl);
    }
  }, [otpFromUrl, setValue]);

  const onSubmit = async (data: VerifyUserFormData) => {
    if (!email) return;

    setIsLoading(true);
    try {
      await api.auth.verifyUser<{ message: string }>({
        email,
        otp: data.otp,
      });
      showToast("User verified successfully!", "success");
      setIsSuccess(true);

      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Unable to verify email.",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    if (!email) return;

    setIsLoading(true);
    try {
      await api.auth.resendOTP<{ message: string }>({ email });
      showToast("OTP resent successfully!", "success");
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Unable to resend OTP.",
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
          eyebrow="VERIFICATION"
          title="Verify your email"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-[14px] text-slate-gray leading-relaxed max-w-[300px] mx-auto">
              Check your email{" "}
              <span className="text-ink-black font-semibold">{email}</span> and
              get the OTP to enter here.
            </p>
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

          <Button
            type="submit"
            className="w-full mt-4 cursor-pointer h-[50px] text-[15px] font-bold tracking-mc-wide"
            isLoading={isLoading}>
            Verify Account
          </Button>

          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => resendOtp()}
              className="text-[13px] text-slate-gray hover:text-signal-orange transition-colors group">
              Didn't receive the code?{" "}
              <span className="cursor-pointer font-semibold underline underline-offset-2 group-hover:text-signal-orange transition-colors">
                Resend OTP
              </span>
            </button>
          </div>
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
            Verification complete
          </h2>
          <p className="text-slate-gray mb-10 max-w-[300px] mx-auto text-[15px] leading-relaxed">
            Your flight is ready for takeoff. Redirecting you to sign in...
          </p>
          <div className="w-8 h-8 border-2 border-signal-orange border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      )}

      <ToastContainer />
    </>
  );
}
