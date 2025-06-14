"use client";
import React from "react";
import { LucideIcon } from "lucide-react";

interface InputProps {
  label?: string;
  type?: "text" | "email" | "password" | "number";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  required?: boolean;
  name?: string;
  icon?: LucideIcon;
}

export function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  disabled = false,
  error,
  helperText,
  required = false,
  name,
  icon: Icon,
}: InputProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-white">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative w-full">
        {Icon && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/70 z-40">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          className={`
            w-full pl-${
              Icon ? "10" : "4"
            } pr-4 py-2 rounded-full bg-white/10 text-white placeholder-white/50 backdrop-blur-lg
            focus:outline-none focus:ring-2 focus:ring-white/30 transition
            ${error ? "border border-red-500" : "border border-transparent"}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        />
      </div>
      {helperText && !error && (
        <p className="text-xs text-white/60">{helperText}</p>
      )}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
