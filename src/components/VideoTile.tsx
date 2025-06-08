"use client";

import { useEffect, useRef } from "react";

interface VideoTileProps {
  stream?: MediaStream;
  muted?: boolean;
  isLocal?: boolean;
}

export function VideoTile({
  stream,
  muted = false,
  isLocal = false,
}: VideoTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <div className="w-full h-fit rounded-2xl aspect-video bg-[#111]">
      <video
        ref={videoRef}
        autoPlay
        muted={muted}
        className="object-cover w-full h-full"
      />
      {isLocal && (
        <div className="absolute top-2 right-2 bg-white/20 rounded-full p-1">
          You
        </div>
      )}
    </div>
  );
}
