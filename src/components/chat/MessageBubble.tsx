import React from "react";
import { Check, CheckCheck, FileText, ImageIcon, Mic } from "lucide-react";

interface Message {
  type: "text" | "image" | "file" | "voice";
  content: string;
  isMine?: boolean;
  timestamp?: string;
  status?: "sent" | "delivered" | "read";
}

export function MessageBubble({
  type,
  content,
  isMine = false,
  timestamp = "12:00 PM",
  status = "read",
}: Message) {
  const statusIcon = () => {
    if (!isMine) return null;
    switch (status) {
      case "sent":
        return <Check className="w-4 h-4" />;
      case "delivered":
        return <CheckCheck className="w-4 h-4" />;
      case "read":
        return <CheckCheck className="w-4 h-4 text-green-400 animate-pulse" />;
    }
  };

  return (
    <div className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-xs p-2 my-1 rounded-2xl flex flex-col space-y-1 ${
          isMine
            ? "bg-indigo-600 self-end text-white shadow-neo"
            : "bg-white/10 self-start text-gray-100 shadow-neo"
        }`}
      >
        {type === "text" && <p className="text-sm break-words">{content}</p>}

        {type === "image" && (
          <img
            src={content}
            alt="Sent Image"
            className="rounded-lg max-h-60 object-cover"
          />
        )}

        {type === "file" && (
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

        {type === "voice" && (
          <audio controls className="w-full rounded-md bg-transparent">
            <source src={content} />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>

      <div
        className={`flex items-center justify-end text-[10px] opacity-75 space-x-1 ${
          !isMine && "pl-1"
        }`}
      >
        <span className="font-bold text-gray-400">{timestamp}</span>
        {statusIcon()}
      </div>
    </div>
  );
}
