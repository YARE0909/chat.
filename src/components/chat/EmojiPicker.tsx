"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "../common/Button";
import { Icon, IconNode, Smile, SmileIcon } from "lucide-react";
import EMOJI_CATEGORIES, { EmojiCategory } from "@/constants/emojiRepository";

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

export default function EmojiPicker({ onSelect }: EmojiPickerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<EmojiCategory>(
    Object.keys(EMOJI_CATEGORIES)[0] as EmojiCategory
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <Button icon={Smile} onClick={() => setOpen(!open)} />

      {open && (
        <div className="absolute bottom-14 -left-2 z-50 w-96 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-2">
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-2">
            {Object.keys(EMOJI_CATEGORIES).map((category) => (
              <button
                key={category}
                className={`px-2 py-1 text-xs rounded-md whitespace-nowrap cursor-pointer ${
                  selectedCategory === category
                    ? "bg-white/20 text-white"
                    : "text-zinc-400 hover:bg-white/10"
                }`}
                onClick={() => setSelectedCategory(category as EmojiCategory)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Emojis Grid */}
          <div className="grid grid-cols-6 gap-2 max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700">
            {EMOJI_CATEGORIES[selectedCategory].map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  onSelect(emoji);
                }}
                className="text-2xl p-1 rounded-md hover:bg-white/10 transition cursor-pointer"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
