"use client";
import { Home, Users, Settings } from "lucide-react";

export function Sidebar() {
  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-6">
      {[{ icon: Home }, { icon: Users }, { icon: Settings }].map(
        ({ icon: Icon }, i) => (
          <button
            key={i}
            className="p-3 rounded-full bg-white cursor-pointer"
          >
            <Icon size={18} />
          </button>
        )
      )}
    </nav>
  );
}
