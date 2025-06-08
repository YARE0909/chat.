"use client";
import { Search, UserPlus, Settings } from "lucide-react";
import React from "react";
import { Button } from "../Button";
import AudioCall from "./AudioCall";
import { useUser } from "@/context/UserContext";

export function ChatSidebar() {
  const contacts = ["Alice", "Bob", "Charlie", "Dana"];
  const activeContact = "Bob";

  const { inAudioCall } = useUser();

  return (
    <aside className="w-72 bg-white/10 backdrop-blur-md text-white flex flex-col gap-4 border-r border-zinc-700">
      {/* Header */}
      <div className="w-full h-16 p-4 flex items-center justify-between border-b border-zinc-700">
        <h2 className="text-4xl font-bold tracking-wide">chat.</h2>
      </div>
      <div className="flex items-center gap-2 text-zinc-400 px-4">
        {[Search, UserPlus, Settings].map((Icon, i) => (
          <Button key={i} icon={Icon} />
          // <button
          //   key={i}
          //   className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition shadow-neo-sm"
          // >
          //   <Icon size={16} />
          // </button>
        ))}
      </div>
      {/* Contact List */}
      <ul className="flex-1 overflow-y-auto flex flex-col gap-1">
        {contacts.map((name, idx) => {
          const isActive = name === activeContact;
          return (
            <li
              key={name}
              className={`flex items-center gap-3 px-4 py-1 cursor-pointer rounded-lg mx-2 my-1 transition-all
                ${isActive ? "bg-white/10" : "hover:bg-white/5"}
              `}
            >
              {/* Avatar */}
              <img
                src={`https://avatar.iran.liara.run/public/${idx}`}
                alt={name}
                className="w-10 h-10 rounded-full object-cover ring-1 ring-zinc-700 shadow-neo-sm"
              />

              {/* Name + Status */}
              <div className="flex-1">
                <p className="font-medium leading-none">{name}</p>
                <p className="text-xs text-zinc-400 mt-1">Online</p>
              </div>

              {/* Unread badge */}
              <div className="w-2 h-2 bg-green-500 rounded-full shadow" />
            </li>
          );
        })}
      </ul>
      {inAudioCall && (
        <div className="p-2">
          <AudioCall />
        </div>
      )}
    </aside>
  );
}
