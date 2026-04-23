"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true);
    console.log("Login data:", data);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <>
      <Form
        eyebrow="AUTHENTICATION"
        title="Welcome back"
        onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email Address"
          type="email"
          placeholder="pilot@contentpilot.ai"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          rightElement={
            <Link
              href="/auth/forgot-password"
              className="text-[12px] text-signal-orange hover:underline font-medium underline-offset-2">
              Forgot?
            </Link>
          }
          {...register("password")}
        />

        <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
          Sign in to Dashboard
        </Button>
      </Form>

      <div className="mt-8 pt-6 border-t border-ink-black/5 text-center">
        <p className="text-slate-gray text-[14px]">
          New to ContentPilot?{" "}
          <Link
            href="/auth/signup"
            className="text-signal-orange font-semibold hover:underline underline-offset-4">
            Create account
          </Link>
        </p>
      </div>
    </>
  );
}
