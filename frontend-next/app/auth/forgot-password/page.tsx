"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/api";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/validations/auth";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const { showToast, ToastContainer } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      await api.auth.forgotPassword<{ message: string }>(data);
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : "Unable to send reset instructions.",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Link
        href="/auth/login"
        className="inline-flex items-center gap-2 text-slate-gray hover:text-ink-black transition-colors mb-6 group">
        <ArrowLeft
          size={14}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-[13px] font-medium tracking-mc-tight">
          Back to login
        </span>
      </Link>

      {!isSubmitted ? (
        <Form
          eyebrow="RECOVERY"
          title="Reset request"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="pilot@contentpilot.ai"
            error={errors.email?.message}
            {...register("email")}
          />

          <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
            Send Recovery Link
          </Button>
        </Form>
      ) : (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-canvas-cream rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 border-2 border-signal-orange rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-signal-orange rounded-full" />
            </div>
          </div>
          <h2 className="text-[24px] font-medium text-ink-black mb-3 tracking-mc-tight">
            Check your inbox
          </h2>
          <p className="text-slate-gray mb-8 max-w-70 mx-auto text-[14px]">
            We&apos;ve sent recovery instructions to{" "}
            <span className="text-ink-black font-medium">{submittedEmail}</span>
          </p>
          <p className="text-slate-gray text-[14px]">
            Didn&apos;t receive it?{" "}
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-signal-orange cursor-pointer font-semibold hover:underline underline-offset-4">
              Try again
            </button>
          </p>
        </div>
      )}

      <ToastContainer />
    </>
  );
}
