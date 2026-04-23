"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, rightElement, className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <div className="flex justify-between items-center mb-1 ml-1">
            <label className="block text-[12px] font-bold text-ink-black tracking-mc-wide capitalize">
              {label}
            </label>
            {rightElement}
          </div>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            className={cn(
              "w-full bg-canvas-cream/50 border border-ink-black/10 rounded-mc-button px-4 py-2.5 text-[14px] text-ink-black placeholder:text-dust-taupe focus:outline-none focus:border-ink-black transition-colors",
              isPassword && "pr-11",
              error && "border-red-400 focus:border-red-500",
              className,
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-dust-taupe hover:text-ink-black transition-colors cursor-pointer"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && (
          <p className="text-[12px] text-red-500 mt-1 ml-1 font-medium">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
