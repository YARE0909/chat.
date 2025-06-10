"use client";
import { LucideIcon } from "lucide-react";

type ButtonColor =
  | "white"
  | "blue"
  | "indigo"
  | "red"
  | "green"
  | "yellow"
  | "gray";

interface ButtonProps {
  icon?: LucideIcon;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
  color?: ButtonColor;
}

const COLOR_MAP: Record<
  ButtonColor,
  { bg: string; text: string; hover?: string }
> = {
  white: { bg: "bg-white/10", text: "text-white", hover: "hover:bg-white hover:text-black" },
  blue: { bg: "bg-blue-600", text: "text-white", hover: "hover:bg-blue-700" },
  indigo: {
    bg: "bg-indigo-600",
    text: "text-white",
    hover: "hover:bg-indigo-700",
  },
  red: { bg: "bg-red-600", text: "text-white", hover: "hover:bg-red-700" },
  green: {
    bg: "bg-green-600",
    text: "text-white",
    hover: "hover:bg-green-700",
  },
  yellow: {
    bg: "bg-yellow-400",
    text: "text-black",
    hover: "hover:bg-yellow-500",
  },
  gray: { bg: "bg-zinc-800", text: "text-white", hover: "hover:bg-zinc-700" },
};

export function Button({
  icon: Icon,
  label,
  onClick,
  disabled = false,
  type = "button",
  color = "white",
}: ButtonProps) {
  const { bg, text, hover } = COLOR_MAP[color];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl cursor-pointer
        ${bg} ${text} ${hover} transition disabled:opacity-50 disabled:cursor-not-allowed duration-300
      `}
    >
      {Icon && <Icon size={18} />}
      {label && <span>{label}</span>}
    </button>
  );
}
