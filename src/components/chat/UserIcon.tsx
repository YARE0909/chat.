"use client";
import React from "react";

const GRADIENTS = [
  { from: "from-teal-400/20", to: "to-purple-500/50" },
  { from: "from-pink-500/20", to: "to-yellow-400/50" },
  { from: "from-green-400/20", to: "to-blue-500/50" },
  { from: "from-indigo-500/20", to: "to-pink-400/50" },
  { from: "from-red-400/20", to: "to-orange-500/50" },
];

// Simple hash: sum char codes, mod length
function gradientFor(name: string) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }
  return GRADIENTS[sum % GRADIENTS.length];
}

export default function UserIcon({ userName }: { userName: string }) {
  // derive initials
  const parts = userName.trim().split(" ");
  const initials =
    parts.length > 1
      ? `${parts[0][0]}${parts[1][0]}`
      : parts[0].slice(0, 2);

  // deterministically pick a gradient
  const { from, to } = gradientFor(userName);

  return (
    <div
      className={`
        flex items-center justify-center w-12 h-12
        bg-gradient-to-tr ${from} ${to}
        rounded-full ring-2 ring-white/20 shadow-lg
      `}
    >
      <span className="text-white font-semibold text-lg tracking-wide">
        {initials.toUpperCase()}
      </span>
    </div>
  );
}
