"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/api";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { setAuthCookie } from "@/lib/auth-client";
import { saveUser } from "@/lib/user-storage";

interface LoginResponse {
  message: string;
  response: {
    token: string;
    data: {
      email: string;
      first_name: string;
      last_name: string;
    };
  };
}

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast, ToastContainer } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await api.auth.login<LoginResponse>(data);
      setAuthCookie(result.response?.token);

      if (result.response?.data) {
        const { email, first_name, last_name } = result.response.data;
        saveUser({ email, first_name, last_name, phone: "", company: "", bio: "" });
      }

      const redirect = searchParams.get("redirect");
      const target =
        redirect && redirect.startsWith("/") ? redirect : "/dashboard";

      router.push(target);
      router.refresh();
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Unable to sign in.",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
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

      <ToastContainer />
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}