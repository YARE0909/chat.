'use client';

import React from "react";

interface VideoTileProps { stream?: MediaStream; muted?: boolean; isLocal?: boolean; }
export function VideoTile({ stream, muted = false, isLocal = false }: VideoTileProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  React.useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream;
  }, [stream]);
  return (
    <div className="relative w-full h-0 pb-[75%] rounded-2xl overflow-hidden bg-[#111]">
      <video
        ref={videoRef}
        autoPlay
        muted={muted}
        className="absolute inset-0 object-cover w-full h-full"
      />
      {isLocal && <div className="absolute top-2 right-2 bg-white/20 rounded-full p-1">You</div>}
    </div>
  );
}