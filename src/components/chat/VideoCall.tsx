// components/chat/VideoCall.tsx
"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Maximize2,
  Minimize2,
  ScreenShare,
} from "lucide-react";
import { Button } from "../common/Button";
import { useUser } from "@/context/UserContext";

export default function VideoCall() {
  const [callTime, setCallTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const { endVideoCall } = useUser();

  // Timer
  useEffect(() => {
    const interval = setInterval(() => setCallTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync fullscreen state if user presses ESC or uses browser controls
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(document.fullscreenElement === wrapperRef.current);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  const toggleFullscreen = async () => {
    if (!wrapperRef.current) return;
    if (!isFullscreen) {
      await wrapperRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
    // state will update via fullscreenchange listener
  };

  const shareScreen = async () => {};

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
      aria-modal="true"
    >
      <div
        ref={wrapperRef}
        className="relative w-full max-w-3/4 aspect-video bg-black/20 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Video Streams */}
        <div className="w-full h-full grid grid-cols-[1fr] grid-rows-[1fr]">
          {/* remote video */}
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
            <video
              src="https://videos.pexels.com/video-files/32295085/13772636_2560_1440_60fps.mp4"
              autoPlay
              muted
              loop
              className="aspect-video object-cover"
            />
          </div>
          {/* local PiP */}
          <div
            className={`absolute bottom-4 right-4 w-full ${
              isFullscreen ? "max-w-96" : "max-w-72"
            } aspect-video rounded-2xl overflow-hidden border border-white/10`}
          >
            <video
              src="https://videos.pexels.com/video-files/32321648/13786760_2560_1440_60fps.mp4"
              autoPlay
              muted
              loop
              className="aspect-video object-cover"
            />
          </div>
        </div>

        {/* Top bar: name + timer + fullscreen */}
        <div className="absolute bottom-4 left-0 flex items-center justify-between px-4">
          <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md rounded-2xl px-4 py-1">
            <img
              src="https://avatar.iran.liara.run/public"
              alt="Caller"
              className="w-10 h-10 rounded-full border-2 border-white/20"
            />
            <div className="text-white">
              <p className="font-semibold truncate max-w-[120px]">
                Alex Jones Johnson
              </p>
              <p className="text-xs opacity-75 font-bold text-gray-300">
                {formatTime(callTime)}
              </p>
            </div>
            <CallControlButton
              onClick={() => setMuted((m) => !m)}
              Icon={muted ? MicOff : Mic}
            />
            <CallControlButton
              onClick={() => setCameraOn((c) => !c)}
              Icon={cameraOn ? Video : VideoOff}
            />
            <CallControlButton onClick={shareScreen} Icon={ScreenShare} />
            <CallControlButton
              onClick={toggleFullscreen}
              Icon={isFullscreen ? Minimize2 : Maximize2}
            />
            <CallControlButton
              onClick={endVideoCall}
              Icon={PhoneOff}
              color="red"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Reuse your Button with color prop
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
