import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading,
      className,
      children,
      href,
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary:
        "bg-ink-black text-canvas-cream hover:opacity-90 shadow-lg active:scale-[0.98]",
      secondary:
        "bg-signal-orange text-white hover:opacity-90 active:scale-[0.98]",
      outline:
        "bg-white border-1.5 border-ink-black text-ink-black hover:bg-ink-black hover:text-white active:scale-[0.98]",
      ghost:
        "bg-transparent text-ink-black hover:bg-ink-black/5 active:scale-[0.98]",
    };

    const sizes = {
      sm: "px-6 py-2 text-[13px]",
      md: "px-8 py-3 text-[14px]",
      lg: "px-10 py-4 text-[15px]",
    };

    const commonClasses = cn(
      "rounded-mc-button cursor-pointer font-medium tracking-mc-tight transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none",
      variants[variant],
      sizes[size],
    );

    const content = (
      <>
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4 text-current"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={cn(className, commonClasses)}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(className, commonClasses)}
        disabled={isLoading}
        {...props}>
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";
