"use client";
import { useState } from "react";
import { VideoTile } from "@/components/VideoTile";
import { ControlButton } from "@/components/ControlButton";
import { Button } from "@/components/Button";
import { PhoneOff } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  return (
    <main className="w-full h-screen flex flex-col gap-4 p-4">
      <Sidebar />
      <div className="w-full h-full flex items-center justify-center relative z-50">
        <div className="w-full max-w-11/12 h-full">
          <VideoTile />
        </div>
        {/* <div className="fixed inset-0 top-4 bg-blue-500 left-4 w-full max-w-96 h-fit">
          <VideoTile />
        </div> */}
      </div>
      <div className="w-full h-1/12 flex justify-center items-center gap-4">
        <div>
          <ControlButton
            type="mic"
            active={micOn}
            onToggle={() => setMicOn(!micOn)}
          />
        </div>
        <div>
          <ControlButton
            type="video"
            active={videoOn}
            onToggle={() => setVideoOn(!videoOn)}
          />
        </div>
        <div>
          <Button label="End Call" icon={PhoneOff} />
        </div>
      </div>
    </main>
  );
}
