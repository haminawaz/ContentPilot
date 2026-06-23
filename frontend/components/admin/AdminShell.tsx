"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  Package,
  LogOut,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { clearAdminAuthCookie } from "@/lib/admin-auth-client";
import { clearAdmin, getAdmin } from "@/lib/admin-storage";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/contents", label: "Contents", icon: FileText },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: CreditCard },
  { href: "/admin/plans", label: "Plans", icon: Package },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
      <p className="px-3 pb-2 text-[10px] uppercase tracking-mc-wide font-semibold text-white/40">
        Management
      </p>
      {NAV.map((item) => {
        const Icon = item.icon;
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors",
              active
                ? "bg-white/10 text-white"
                : "text-white/60 hover:text-white hover:bg-white/5",
            )}
          >
            <Icon className="w-4.5 h-4.5" />
            {item.label}
            {active && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-signal-orange" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const admin = getAdmin();
    if (admin) setEmail(admin.email);
  }, []);

  const handleLogout = () => {
    onNavigate?.();
    clearAdminAuthCookie();
    clearAdmin();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <>
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-signal-orange/15 border border-signal-orange/30 grid place-items-center">
          <ShieldCheck className="w-5 h-5 text-signal-orange" />
        </div>
        <div className="leading-tight">
          <p className="text-[15px] font-bold text-white tracking-mc-tight">
            Structa
          </p>
          <p className="text-[11px] text-white/40">Admin Console</p>
        </div>
      </div>

      <NavLinks onNavigate={onNavigate} />

      <div className="px-3 py-4 border-t border-white/10">
        {email && (
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <span className="w-8 h-8 rounded-full bg-white/10 text-white text-[12px] font-semibold grid place-items-center uppercase">
              {email[0]}
            </span>
            <span className="text-[12px] text-white/60 truncate">{email}</span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const current =
    NAV.find((n) => (n.exact ? pathname === n.href : pathname.startsWith(n.href)))
      ?.label || "Dashboard";

  return (
    <div className="min-h-screen bg-canvas-cream flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-ink-black h-screen sticky top-0">
        <SidebarBody />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <div className="lg:hidden fixed inset-0 z-50">
            <motion.div
              className="absolute inset-0 bg-ink-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="absolute inset-y-0 left-0 flex flex-col w-64 max-w-[85vw] bg-ink-black shadow-mc-heavy"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              role="dialog"
              aria-modal="true"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="absolute top-5 right-4 z-10 grid place-items-center w-8 h-8 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
              <SidebarBody onNavigate={() => setOpen(false)} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 bg-canvas-cream/80 backdrop-blur-xl border-b border-ink-black/5">
          <div className="flex items-center gap-3 px-5 lg:px-8 h-16">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden grid place-items-center w-9 h-9 -ml-1 rounded-xl text-ink-black hover:bg-ink-black/5 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-[15px] font-semibold text-ink-black tracking-mc-tight">
              {current}
            </h1>
            <span className="ml-auto text-[11px] font-medium text-slate-gray bg-ink-black/5 px-2.5 py-1 rounded-full">
              Admin
            </span>
          </div>
        </header>

        <main className="flex-1 px-5 lg:px-8 py-6">{children}</main>
      </div>
    </div>
  );
}
