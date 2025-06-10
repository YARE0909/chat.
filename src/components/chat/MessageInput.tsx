"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  Mic,
  StopCircle,
  Image as ImageIcon,
  FileText,
  Smile,
  X,
  Trash2,
} from "lucide-react";
import { Button } from "../common/Button";

export interface MessageInputProps {
  onSend: (msg: string, files?: File[], voiceBlob?: Blob) => void;
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [msg, setMsg] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [recording, setRecording] = useState(false);
  const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null);
  const [recordTime, setRecordTime] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simulate recording timer
  useEffect(() => {
    if (recording) {
      recordIntervalRef.current = setInterval(() => {
        setRecordTime((t) => t + 1);
      }, 1000);
    } else {
      if (recordIntervalRef.current) {
        clearInterval(recordIntervalRef.current);
      }
    }

    return () => {
      if (recordIntervalRef.current) {
        clearInterval(recordIntervalRef.current);
      }
    };
  }, [recording]);

  const startRecording = () => {
    setRecording(true);
    setRecordTime(0);
    // TODO: Use MediaRecorder API
  };

  const stopRecording = () => {
    setRecording(false);
    setVoiceBlob(new Blob()); // Replace with actual blob
    // TODO: Stop MediaRecorder and set blob
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      setFiles((prev) => [...prev, ...Array.from(fileList)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAllFiles = () => {
    setFiles([]);
  };

  const handleSend = () => {
    if (msg.trim() || files.length || voiceBlob) {
      onSend(msg.trim(), files, voiceBlob || undefined);
      setMsg("");
      setFiles([]);
      setVoiceBlob(null);
      setRecordTime(0);
    }
  };

  const formatSeconds = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="w-full h-16 bg-white/10 backdrop-blur-md relative flex items-center border-l border-l-zinc-700">
      {/* Attachments Preview */}
      {files.length > 0 && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {files.map((f, i) => (
              <div
                key={i}
                className="flex items-center space-x-1 bg-white/10 text-white px-3 py-2 rounded-full text-xs relative"
              >
                {/\.(jpe?g|png|gif)$/i.test(f.name) ? (
                  <ImageIcon size={16} />
                ) : (
                  <FileText size={16} />
                )}
                <span className="truncate max-w-[100px]">{f.name}</span>
                <button
                  onClick={() => removeFile(i)}
                  className="ml-1 text-red-500 hover:text-red-700"
                  aria-label="Remove file"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={clearAllFiles}
            className="text-red-500 hover:text-red-700"
            aria-label="Clear all files"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      {/* Voice Recording Indicator */}
      {recording && (
        <div className="absolute -top-8 left-2 bg-red-600/40 text-white text-xs px-2 py-1 rounded-md flex items-center space-x-1">
          <StopCircle size={14} />{" "}
          <span>Recording... {formatSeconds(recordTime)}</span>
        </div>
      )}

      <div className="w-full h-full flex items-center px-4 space-x-2">
        {/* Emoji picker placeholder */}
        <div>
          <Button icon={Smile} />
        </div>

        {/* File upload */}
        <div>
          <Button
            icon={Paperclip}
            onClick={() => fileInputRef.current?.click()}
          />
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
        </div>

        {/* Voice record / stop */}
        {!recording ? (
          <div>
            <Button icon={Mic} onClick={startRecording} />
          </div>
        ) : (
          <div>
            <Button icon={StopCircle} onClick={stopRecording} />
          </div>
        )}

        {/* Message Input */}
        <input
          className="flex-1 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 focus:outline-none placeholder:text-zinc-500 text-sm"
          placeholder="Type a message"
          value={msg}
          maxLength={1000}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        {/* Send button */}
        <div>
          <Button icon={Send} onClick={handleSend} />
        </div>
      </div>
    </div>
  );
}
