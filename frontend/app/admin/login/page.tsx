"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { adminApi } from "@/lib/admin-api";
import { setAdminAuthCookie } from "@/lib/admin-auth-client";
import { saveAdmin } from "@/lib/admin-storage";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast, ToastContainer } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("Email and password are required.", "error");
      return;
    }
    setIsLoading(true);
    try {
      const result = await adminApi.login(email, password);
      setAdminAuthCookie(result.response.token);
      saveAdmin({ email: result.response.data.email });

      const redirect = searchParams.get("redirect");
      const target =
        redirect && redirect.startsWith("/admin") ? redirect : "/admin";
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
    <div className="min-h-screen bg-ink-black flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-160 bg-signal-orange/10 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-signal-orange/15 border border-signal-orange/30 grid place-items-center mb-4">
            <ShieldCheck className="w-7 h-7 text-signal-orange" />
          </div>
          <h1 className="text-[24px] font-semibold text-white tracking-mc-tight">
            Admin Console
          </h1>
          <p className="text-white/50 text-[13px] mt-1">
            Structa control center &middot; restricted access
          </p>
        </div>

        <div className="bg-white/4 backdrop-blur-xl border border-white/10 rounded-mc-consent p-8 shadow-2xl">
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-[12px] font-bold text-white/80 tracking-mc-wide ml-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@structa.ai"
                autoComplete="username"
                className="w-full bg-white/5 border border-white/10 rounded-mc-button px-4 py-2.5 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-signal-orange transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[12px] font-bold text-white/80 tracking-mc-wide ml-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full bg-white/5 border border-white/10 rounded-mc-button px-4 py-2.5 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-signal-orange transition-colors"
              />
            </div>

            <Button
              type="submit"
              variant="secondary"
              className="w-full mt-2"
              isLoading={isLoading}
            >
              <Lock className="w-4 h-4" />
              Sign in to Console
            </Button>
          </form>
        </div>

        <p className="text-center mt-8 text-[11px] tracking-mc-wide uppercase text-white/40">
          Secured by Structa &middot; Admin v1.0
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink-black" />}>
      <AdminLoginForm />
    </Suspense>
  );
}
