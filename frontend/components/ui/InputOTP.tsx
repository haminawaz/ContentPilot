"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface InputOTPProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  length?: number;
  disabled?: boolean;
}

export const InputOTP = ({
  value = "",
  onChange,
  error,
  length = 6,
  disabled = false,
}: InputOTPProps) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sync internal state with prop value (e.g. when autofilled from URL)
  useEffect(() => {
    if (value && value.length === length) {
      const newOtp = value.split("").slice(0, length);
      setOtp(newOtp);
    }
  }, [value, length]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return; // Only digits

    const newOtp = [...otp];
    // Only take the last character entered
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");
    onChange(combinedOtp);

    // Move to next input if value is entered
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move to previous input and clear it
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        onChange(newOtp.join(""));
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        onChange(newOtp.join(""));
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData
      .split("")
      .concat(Array(length).fill(""))
      .slice(0, length);
    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Focus last input or first empty
    const lastIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[lastIndex]?.focus();
  };

  return (
    <div className="w-full">
      <div className="flex justify-center items-center gap-2 md:gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            disabled={disabled}
            className={cn(
              "w-12 h-14 md:w-14 md:h-16 text-center text-xl font-bold bg-canvas-cream/50 border border-ink-black/10 rounded-xl focus:outline-none focus:border-signal-orange focus:ring-1 focus:ring-signal-orange transition-all",
              digit && "border-signal-orange/50 bg-white",
              error && "border-red-400 focus:border-red-500 focus:ring-red-500",
              disabled && "opacity-50 cursor-not-allowed",
            )}
          />
        ))}
      </div>
      {error && (
        <p className="text-[12px] text-red-500 mt-3 text-center font-medium">
          {error}
        </p>
      )}
    </div>
  );
};
