"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export const Toast = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-signal-orange" />,
    info: <Info className="w-5 h-5 text-link-blue" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={cn(
        "fixed bottom-8 right-8 z-100 flex items-center gap-3 px-6 py-4 bg-white rounded-mc-button shadow-mc-heavy border border-ink-black/5 min-w-[320px]",
      )}
    >
      <div className="shrink-0">{icons[type]}</div>
      <p className="grow text-[14px] font-medium text-ink-black tracking-mc-tight">
        {message}
      </p>
      <button
        onClick={onClose}
        className="shrink-0 p-1 hover:bg-ink-black/5 rounded-full transition-colors"
      >
        <X className="w-4 h-4 text-slate-gray" />
      </button>
    </motion.div>
  );
};

export const useToast = () => {
  const [toasts, setToasts] = useState<
    { id: number; message: string; type: ToastType }[]
  >([]);

  const showToast = (message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const ToastContainer = () => (
    <AnimatePresence>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </AnimatePresence>
  );

  return { showToast, ToastContainer };
};
