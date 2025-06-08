"use client";
import { LucideIcon } from "lucide-react";
interface ButtonProps {
  icon?: LucideIcon;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
}
export function Button({
  icon: Icon,
  label,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-white text-black cursor-pointer"
      type={type}
    >
      {Icon && <Icon size={18} />}
      {label && <span>{label}</span>}
    </button>
  );
}
