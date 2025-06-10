"use client";
import { Search, UserPlus, Settings } from "lucide-react";
import React from "react";
import { Button } from "../common/Button";
import AudioCall from "./AudioCall";
import { useUser } from "@/context/UserContext";
import UserIcon from "./UserIcon";

export function ChatSidebar() {
  const { inAudioCall, dmList, activeDm, updateCurrentDm } = useUser();

  return (
    <aside className="w-72 bg-white/10 backdrop-blur-md text-white flex flex-col gap-4 border-r border-zinc-700">
      {/* Header */}
      <div className="w-full h-16 p-4 flex items-center justify-between">
        <h2 className="text-4xl font-bold tracking-wide">chat.</h2>
      </div>
      <div className="flex items-center gap-2 px-2">
        {[Search, UserPlus, Settings].map((Icon, i) => (
          <Button key={i} icon={Icon} />
        ))}
      </div>
      {/* Contact List */}
      <ul className="flex-1 overflow-y-auto flex flex-col gap-2 px-2">
        {dmList.map((name) => {
          const isActive = name?.userId === activeDm?.userId;
          return (
            <li
              key={name.userId}
              className={`flex items-center gap-3 px-4 py-1 cursor-pointer rounded-lg transition-all backdrop-blur-md
                ${isActive ? "bg-white/10" : "hover:bg-white/10"}
              `}
              onClick={() => updateCurrentDm(name)}
            >
              {/* Avatar */}
              <UserIcon userName={name.userName} />

              {/* Name + Status */}
              <div className="flex-1">
                <p className="font-medium leading-none">{name.userName}</p>
                <p className="text-xs font-bold text-zinc-400 mt-1">Online</p>
              </div>

              {/* Unread badge */}
              <div className="w-2 h-2 bg-indigo-500 rounded-full shadow" />
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
