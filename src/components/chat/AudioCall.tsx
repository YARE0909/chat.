"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  PhoneOff,
} from "lucide-react";
import { Button } from "../common/Button";
import { useUser } from "@/context/UserContext";
import UserIcon from "./UserIcon";

export default function AudioCall() {
  const [callTime, setCallTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);

  const callRef = useRef<HTMLDivElement>(null);

  const { endAudioCall, activeDm } = useUser();

  useEffect(() => {
    const interval = setInterval(() => setCallTime((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  return (
    <div
      ref={callRef}
      className="z-50 w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-4 flex flex-col items-center space-y-4"
    >
      {/* Avatar and Info */}
      <div className="w-full flex items-center justify-start gap-2">
        <UserIcon userName={activeDm!.userName} />

        <div className="flex flex-col">
          <p className="font-semibold text-white">{activeDm!.userName}</p>
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
