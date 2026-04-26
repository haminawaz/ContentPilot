"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
      router.push(
        `/auth/reset-password?email=${encodeURIComponent(data.email)}`,
      );
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

      <ToastContainer />
    </>
  );
}
