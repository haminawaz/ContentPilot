import React from "react";
import { cn } from "@/lib/utils";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  eyebrow?: string;
}

export const Form = ({
  title,
  eyebrow,
  children,
  className,
  ...props
}: FormProps) => {
  return (
    <div className="w-full">
      {(title || eyebrow) && (
        <div className="text-center mb-6">
          {eyebrow && (
            <div className="eyebrow justify-center mb-3">
              <span className="eyebrow-dot" />
              {eyebrow}
            </div>
          )}
          {title && (
            <h1 className="text-[28px] md:text-[32px] font-medium text-ink-black tracking-mc-tight leading-tight">
              {title}
            </h1>
          )}
        </div>
      )}
      <form className={cn("space-y-5", className)} {...props}>
        {children}
      </form>
    </div>
  );
};
