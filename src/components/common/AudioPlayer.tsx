// components/chat/VoicePlayer.tsx
"use client";
import { Pause, Play } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./Button";

export function VoicePlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setDuration(audioRef.current?.duration!);
  }, [audioRef.current]);

  const togglePlay = async () => {
    const audio = audioRef.current!;
    if (audio.paused) {
      try {
        await audio.play();
      } catch (e) {
        console.log("ERROR", { e });
      }
    } else {
      audio.pause();
    }
  };

  const onTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    setProgress(e.currentTarget.currentTime);
  };

  const onPlay = () => setPlaying(true);
  const onPause = () => setPlaying(false);

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = Number(e.target.value);
    setProgress(t);
    if (audioRef.current) audioRef.current.currentTime = t;
  };

  const fmt = (t: number) => {
    const m = Math.floor(t / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex items-center space-x-2 w-full bg-transparent rounded-xl">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={onTimeUpdate}
        onPlay={onPlay}
        onPause={onPause}
      />

      <Button onClick={togglePlay} icon={playing ? Pause : Play} />

      <span className="text-xs font-bold text-zinc-200 text-center whitespace-nowrap">
        {fmt(progress)}
      </span>

      <input
        type="range"
        min={0}
        max={duration || 0}
        step="0.01"
        value={progress}
        onChange={onSeek}
        onInput={onSeek}
        className="flex-1 w-32"
      />
      <span className="text-xs font-bold text-zinc-200 text-center whitespace-nowrap">
        {fmt(duration)}
      </span>
    </div>
  );
}
