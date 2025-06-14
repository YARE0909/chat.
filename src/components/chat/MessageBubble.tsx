import React, { useEffect, useState } from "react";
import { Check, CheckCheck, FileText } from "lucide-react";
import { VoicePlayer } from "../common/AudioPlayer";

interface Message {
  type: "TEXT" | "IMAGE" | "FILE" | "VOICE" | "VIDEO";
  content: string;
  isMine?: boolean;
  timestamp: string;
  status?: "SENT" | "DELIVERED" | "READ";
}

export function MessageBubble({
  type = "TEXT",
  content,
  isMine = false,
  timestamp,
  status = "read",
}: Message) {
  const [sentAt, setSentAt] = useState<string>("");

  useEffect(() => {
    const date = new Date(timestamp).toLocaleDateString();
    const time = new Date(timestamp).toLocaleTimeString();
    setSentAt(`${date} ${time}`);
  }, []);

  const statusIcon = () => {
    if (!isMine) return null;
    switch (status) {
      case "SENT":
        return <Check className="w-4 h-4" />;
      case "DELIVERED":
        return <CheckCheck className="w-4 h-4" />;
      case "READ":
        return <CheckCheck className="w-4 h-4 text-green-400 animate-pulse" />;
    }
  };

  return (
    <div className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-xs p-2 my-1 rounded-xl flex flex-col space-y-1 ${
          isMine
            ? "bg-gradient-to-bl from-purple-500/70 to-indigo-500/70 backdrop-blur-lg self-end text-white"
            : "bg-white/10 backdrop-blur-lg self-start text-gray-100"
        }`}
      >
        {type === "TEXT" && (
          <p className="text-sm break-words font-medium">{content}</p>
        )}

        {type === "IMAGE" && (
          <img
            src={content}
            alt="Sent Image"
            className="rounded-lg max-h-60 object-cover"
          />
        )}

        {type === "FILE" && (
          <a
            href={content}
            target="_blank"
            className="flex items-center space-x-2 text-sm underline"
            rel="noreferrer"
          >
            <FileText size={16} />
            <span>{content.split("/").pop()}</span>
          </a>
        )}

        {type === "VOICE" && (
          // <audio controls className="w-full rounded-md bg-transparent">
          //   <source src={content} />
          //   Your browser does not support the audio element.
          // </audio>
          <VoicePlayer src={content} />
        )}
      </div>

      <div
        className={`flex items-center justify-end text-[10px] opacity-75 space-x-1 ${
          !isMine && "pl-1"
        }`}
      >
        <span className="font-bold text-gray-400">{sentAt}</span>
        {statusIcon()}
      </div>
    </div>
  );
}
