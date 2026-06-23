"use client";

import { ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function StatCard({
  label,
  value,
  hint,
  icon,
  accent = "default",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
  accent?: "default" | "orange" | "emerald" | "red";
}) {
  const accents = {
    default: "bg-ink-black/5 text-ink-black",
    orange: "bg-signal-orange/10 text-signal-orange",
    emerald: "bg-emerald-500/10 text-emerald-600",
    red: "bg-red-500/10 text-red-600",
  };
  return (
    <div className="rounded-2xl border border-ink-black/8 bg-lifted-cream p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[12px] font-medium text-slate-gray">{label}</p>
        {icon && (
          <span className={cn("grid place-items-center w-8 h-8 rounded-lg", accents[accent])}>
            {icon}
          </span>
        )}
      </div>
      <p className="text-[26px] font-semibold text-ink-black tracking-mc-tight leading-none">
        {value}
      </p>
      {hint && <p className="text-[12px] text-slate-gray mt-2">{hint}</p>}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  const styles =
    s === "active"
      ? "bg-emerald-500/10 text-emerald-600"
      : s === "blocked" || s === "canceled" || s === "cancelled" || s === "deleted"
        ? "bg-red-500/10 text-red-600"
        : s === "inactive" || s === "past_due"
          ? "bg-amber-400/15 text-amber-600"
          : "bg-ink-black/5 text-slate-gray";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize",
        styles,
      )}
    >
      {status}
    </span>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-gray" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-lifted-cream border border-ink-black/10 rounded-xl pl-9 pr-9 py-2 text-[13px] text-ink-black placeholder:text-slate-gray focus:outline-none focus:border-ink-black transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-gray hover:text-ink-black"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export function Pagination({
  page,
  totalPages,
  total,
  onPage,
}: {
  page: number;
  totalPages: number;
  total: number;
  onPage: (p: number) => void;
}) {
  if (total === 0) return null;
  return (
    <div className="flex items-center justify-between gap-4 px-1 pt-4">
      <p className="text-[12px] text-slate-gray">
        Page <span className="font-semibold text-ink-black">{page}</span> of{" "}
        {Math.max(totalPages, 1)} &middot; {total} total
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPage(page - 1)}
          disabled={page <= 1}
          className="grid place-items-center w-9 h-9 rounded-lg border border-ink-black/10 bg-lifted-cream text-ink-black hover:bg-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPage(page + 1)}
          disabled={page >= totalPages}
          className="grid place-items-center w-9 h-9 rounded-lg border border-ink-black/10 bg-lifted-cream text-ink-black hover:bg-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 6, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="divide-y divide-ink-black/5">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4 px-4 py-3.5">
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={c}
              className="h-3.5 rounded bg-ink-black/8 animate-pulse"
              style={{ width: c === 0 ? "30%" : `${15 + ((r + c) % 3) * 8}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-16 text-center">
      <p className="text-[14px] text-slate-gray">{message}</p>
    </div>
  );
}

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn("animate-spin", className)} />;
}

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  loading = false,
  danger = false,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  loading?: boolean;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-60 grid place-items-center p-4">
          <motion.div
            className="absolute inset-0 bg-ink-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={loading ? undefined : onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            className="relative w-full max-w-sm bg-white rounded-2xl border border-ink-black/5 shadow-mc-heavy p-6"
          >
            <h3 className="text-[16px] font-semibold text-ink-black tracking-mc-tight">
              {title}
            </h3>
            <p className="text-[13px] text-slate-gray mt-2 leading-relaxed">
              {message}
            </p>
            <div className="flex items-center justify-end gap-2 mt-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant={danger ? "secondary" : "primary"}
                size="sm"
                onClick={onConfirm}
                isLoading={loading}
              >
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function useDebounced<T>(value: T, delay = 350): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
