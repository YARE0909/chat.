"use client";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

interface ControlProps {
  type: "mic" | "video";
  active: boolean;
  onToggle: () => void;
}

export function ControlButton({ type, active, onToggle }: ControlProps) {
  const Icon =
    type === "mic" ? (active ? Mic : MicOff) : active ? Video : VideoOff;
  return (
    <button
      onClick={onToggle}
      className="p-3 rounded-full bg-white text-black transition cursor-pointer"
    >
      <Icon size={20} />
    </button>
  );
}
