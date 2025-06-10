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
import { Button } from "../common/Button";
import { useUser } from "@/context/UserContext";
import UserIcon from "./UserIcon";

interface ChatHeaderProps {
  name: string;
  status?: "online" | "offline" | "busy";
}

export function ChatHeader({
  name,
  status = "online",
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
      ? "bg-green-500"
      : status === "busy"
      ? "bg-yellow-400"
      : "bg-gray-500";

  return (
    <div className="w-full h-16 flex items-center justify-between px-4 bg-white/10 backdrop-blur-md shadow-sm border-l border-l-zinc-700">
      {/* Left: Back button + avatar + name + status */}
      <div className="flex items-center space-x-3">
        <button className="md:hidden p-1 text-zinc-400 hover:text-white">
          <ChevronLeft size={20} />
        </button>
        <UserIcon userName={name} />

        <div className="flex flex-col text-sm">
          <span className="font-semibold text-white">{name}</span>
          <div className="flex items-center text-xs text-zinc-400 gap-2">
            <div className={`w-2 h-2 ${statusColor} rounded-full shadow`} />

            {status}
          </div>
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
