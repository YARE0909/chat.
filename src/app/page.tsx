'use client';
import React from 'react';
import { Button } from '@/components/Button';
import { ControlButton } from '@/components/ControlButton';
import { VideoTile } from '@/components/VideoTile';
import { Sidebar } from '@/components/Sidebar';

export default function Home() {
  const [micOn, setMicOn] = React.useState(true);
  const [videoOn, setVideoOn] = React.useState(true);

  return (
    <main className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6">
        <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
          <VideoTile isLocal stream={/* local media stream */ undefined} muted />
          <VideoTile stream={/* remote media stream */ undefined} />
        </div>
        <div className="flex items-center gap-4 mt-4">
          <ControlButton type="mic" active={micOn} onToggle={() => setMicOn((v) => !v)} />
          <ControlButton type="video" active={videoOn} onToggle={() => setVideoOn((v) => !v)} />
          <Button label="End Call" onClick={() => {/* hang up */}} />
        </div>
      </div>
    </main>
  );
}
