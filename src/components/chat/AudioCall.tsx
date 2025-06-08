"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  PhoneOff,
  ChevronUp,
} from "lucide-react";
import { Button } from "../Button";
import { useUser } from "@/context/UserContext";

export default function AudioCall() {
  const [callTime, setCallTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [visible, setVisible] = useState(true);

  const callRef = useRef<HTMLDivElement>(null);

  const { endAudioCall } = useUser();

  useEffect(() => {
    const interval = setInterval(() => setCallTime((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  if (!visible) {
    return (
      <button
        className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl transition"
        onClick={() => setVisible(true)}
      >
        <ChevronUp size={20} />
      </button>
    );
  }

  return (
    <div
      ref={callRef}
      className="z-50 w-full bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col items-center space-y-4"
    >
      {/* Avatar and Info */}
      <div className="w-full flex items-center justify-start gap-2">
        <img
          src="https://avatar.iran.liara.run/public"
          alt="Caller"
          className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
        />
        <div className="flex flex-col">
          <p className="font-semibold text-white">Alex Johnson</p>
          <p className="text-xs text-gray-400 font-bold">
            {formatTime(callTime)}
          </p>
        </div>
      </div>

      {/* Call Controls */}
      <div className="w-full flex items-center justify-center gap-2">
        <CallControlButton
          onClick={() => setMuted(!muted)}
          Icon={muted ? MicOff : Mic}
        />
        <CallControlButton onClick={endAudioCall} Icon={PhoneOff} color="red" />
        <CallControlButton
          onClick={() => setSpeakerOn(!speakerOn)}
          Icon={speakerOn ? Volume2 : VolumeX}
        />
      </div>
    </div>
  );
}

// Reusable control button
function CallControlButton({
  onClick,
  Icon,
  color = "white",
}: {
  onClick: () => void;
  Icon: any;
  color?: "white" | "blue" | "red" | "green" | "yellow" | "gray";
}) {
  return <Button onClick={onClick} icon={Icon} color={color} />;
}
