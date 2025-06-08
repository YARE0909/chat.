"use client";
import React from "react";
import {
  Video,
  Phone,
  MoreVertical,
  Circle,
  ChevronLeft,
  PhoneOff,
  VideoOff,
} from "lucide-react";
import { Button } from "../Button";
import { useUser } from "@/context/UserContext";

interface ChatHeaderProps {
  name: string;
  status?: "online" | "offline" | "busy";
  avatarUrl?: string;
}

export function ChatHeader({
  name,
  status = "online",
  avatarUrl = "/default-avatar.png",
}: ChatHeaderProps) {
  const {
    startAudioCall,
    inAudioCall,
    endAudioCall,
    inVideoCall,
    startVideoCall,
    endVideoCall,
  } = useUser();

  const statusColor =
    status === "online"
      ? "text-green-500"
      : status === "busy"
      ? "text-yellow-400"
      : "text-gray-500";

  return (
    <div className="w-full h-16 flex items-center justify-between px-4 py-3 bg-white/10 backdrop-blur-md shadow-sm border-b border-b-zinc-700">
      {/* Left: Back button + avatar + name + status */}
      <div className="flex items-center space-x-3">
        <button className="md:hidden p-1 text-zinc-400 hover:text-white">
          <ChevronLeft size={20} />
        </button>
        <img
          src={avatarUrl}
          alt={name}
          className="w-10 h-10 rounded-full object-cover border border-zinc-700"
        />
        <div className="flex flex-col text-sm">
          <span className="font-semibold text-white">{name}</span>
          <span className="flex items-center text-xs text-zinc-400">
            <Circle size={8} className={`mr-1 ${statusColor}`} />
            {status}
          </span>
        </div>
      </div>

      {/* Right: Call + Video + More */}
      <div className="flex items-center space-x-2 text-zinc-300">
        <div>
          {inAudioCall ? (
            <Button icon={PhoneOff} onClick={endAudioCall} color="red" />
          ) : (
            <Button icon={Phone} onClick={startAudioCall} />
          )}
        </div>
        <div>
          {inVideoCall ? (
            <Button icon={VideoOff} onClick={endVideoCall} color="red" />
          ) : (
            <Button icon={Video} onClick={startVideoCall} />
          )}
        </div>
        <div>
          <Button icon={MoreVertical} />
        </div>
      </div>
    </div>
  );
}
