"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/api";
import { signupSchema, type SignupFormData } from "@/lib/validations/auth";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showToast, ToastContainer } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      agreed: false,
    },
  });

  const agreed = watch("agreed");

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      const result = await api.auth.signup<{ message: string }>({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });

      showToast(
        result.message ||
          "Account created successfully. Please sign in to continue.",
        "success",
      );

      router.push(`/auth/verify-user?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Unable to create account.",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form
        eyebrow="JOIN STRUCTA"
        title="Begin your flight"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4">
        <Input
          label="Full Name"
          placeholder="Commander Pilot"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="hello@structa.ai"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1234567890"
          error={errors.phone?.message}
          {...register("phone")}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer mb-1 group">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) =>
                setValue("agreed", e.target.checked, {
                  shouldValidate: true,
                })
              }
              className="mt-0.5 w-4 h-4 rounded border-ink-black/20 accent-signal-orange cursor-pointer"
            />
            <span className="text-[12px] text-slate-gray leading-relaxed">
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-signal-orange font-medium hover:underline underline-offset-2">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-signal-orange font-medium hover:underline underline-offset-2">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.agreed && (
            <p className="text-[12px] text-red-500 ml-7 font-medium">
              {errors.agreed.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full mt-4"
            isLoading={isLoading}
            disabled={!agreed}>
            Create Pilot Account
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-ink-black/5 text-center">
          <p className="text-slate-gray text-[13px]">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-signal-orange font-semibold hover:underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </Form>

      <ToastContainer />
    </>
  );
}
