import { useState } from "react";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { ChatHeader } from "./ChatHeader";
import { useUser } from "@/context/UserContext";
import VideoCall from "./VideoCall";

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { type: "text", content: "Hello!", isMine: false },
    { type: "text", content: "Hey, how are you?", isMine: true },
    {
      type: "image",
      content:
        "https://images.unsplash.com/photo-1618486613525-c694bf152b2c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isMine: false,
    },
    {
      type: "file",
      content: "https://example.com/file.pdf",
      isMine: true,
    },
    {
      type: "voice",
      content: "/voice/clip1.mp3", // assume it's in public/voice
      isMine: false,
    },
  ]);



  const handleSend = (msg: string, files?: File[], voiceBlob?: Blob) => {
    if (voiceBlob) {
      const voiceURL = URL.createObjectURL(voiceBlob);
      setMessages((prev) => [
        ...prev,
        { type: "voice", content: voiceURL, isMine: true },
      ]);
    } else if (files?.length) {
      files.forEach((file) => {
        const fileURL = URL.createObjectURL(file);
        const type = file.type.startsWith("image") ? "image" : "file";
        setMessages((prev) => [
          ...prev,
          { type, content: fileURL, isMine: true },
        ]);
      });
    } else if (msg.trim()) {
      setMessages((prev) => [
        ...prev,
        { type: "text", content: msg.trim(), isMine: true },
      ]);
    }
  };
  return (
    <div className="flex-1 flex flex-col bg-black/30 backdrop-blur-md">
      <ChatHeader
        name="Alex Johnson"
        status="online"
        avatarUrl="https://avatar.iran.liara.run/public"
      />

      <div className="flex-1 overflow-y-auto p-6 flex flex-col">
        {messages.map((m, i) => (
          <MessageBubble
            key={i}
            type={m.type as any}
            content={m.content}
            isMine={m.isMine}
            timestamp="12:34 PM"
            status="read"
          />
        ))}
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
}
