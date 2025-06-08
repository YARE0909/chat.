'use client';
import { LucideIcon } from 'lucide-react';
interface ButtonProps {
  icon?: LucideIcon;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}
export function Button({ icon: Icon, label, onClick, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white"
    >
      {Icon && <Icon size={18} />}
      <span>{label}</span>
    </button>
  );
}
