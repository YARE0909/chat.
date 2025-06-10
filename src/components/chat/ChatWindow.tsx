import { useEffect, useState } from "react";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { ChatHeader } from "./ChatHeader";
import { ChatSidebar } from "./ChatSidebar";
import VideoCall from "./VideoCall";
import { useUser } from "@/context/UserContext";
import { MessageSquareQuote, PlusCircle } from "lucide-react";
import { Button } from "../common/Button";
import { getSocket } from "@/lib/socket";
import toast from "react-hot-toast";

const userMessages = [
  {
    userId: 0,
    messages: [
      {
        type: "text",
        content: "Hey there! 👋",
        isMine: false,
        timestamp: "09:01 AM",
        status: "read",
      },
      {
        type: "text",
        content: "Hi! Just got back from my trip.",
        isMine: true,
        timestamp: "09:02 AM",
        status: "read",
      },
      {
        type: "image",
        content:
          "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=400",
        isMine: false,
        timestamp: "09:05 AM",
        status: "read",
      },
      {
        type: "file",
        content: "https://example.com/itinerary.pdf",
        isMine: true,
        timestamp: "09:06 AM",
        status: "delivered",
      },
      {
        type: "voice",
        content: "/audio/sample.mp3",
        isMine: false,
        timestamp: "09:07 AM",
        status: "read",
      },
    ],
  },
  {
    userId: 1,
    messages: [
      {
        type: "text",
        content: "Can you review the report?",
        isMine: false,
        timestamp: "10:12 AM",
        status: "delivered",
      },
      {
        type: "file",
        content: "https://example.com/quarterly-report.xlsx",
        isMine: false,
        timestamp: "10:13 AM",
        status: "delivered",
      },
      {
        type: "text",
        content: "Sure, I'll take a look now.",
        isMine: true,
        timestamp: "10:15 AM",
        status: "sent",
      },
      {
        type: "voice",
        content: "/audio/sample.mp3",

        isMine: true,
        timestamp: "10:17 AM",
        status: "sent",
      },
    ],
  },
  {
    userId: 2,
    messages: [
      {
        type: "text",
        content: "😂 Did you see that meme I sent?",
        isMine: true,
        timestamp: "11:45 AM",
        status: "read",
      },
      {
        type: "image",
        content:
          "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400",
        isMine: true,
        timestamp: "11:46 AM",
        status: "read",
      },
      {
        type: "text",
        content: "Haha yes, that's hilarious!",
        isMine: false,
        timestamp: "11:47 AM",
        status: "read",
      },
    ],
  },
  {
    userId: 3,
    messages: [
      {
        type: "text",
        content: "Project kickoff is tomorrow at 3 PM.",
        isMine: false,
        timestamp: "01:05 PM",
        status: "delivered",
      },
      {
        type: "text",
        content: "Got it, I'll join the chat conference.",
        isMine: true,
        timestamp: "01:06 PM",
        status: "sent",
      },
      {
        type: "file",
        content: "https://example.com/kickoff-agenda.docx",
        isMine: false,
        timestamp: "01:07 PM",
        status: "delivered",
      },
    ],
  },
  {
    userId: 4,
    messages: [
      {
        type: "text",
        content: "Lunch plans?",
        isMine: false,
        timestamp: "12:00 PM",
        status: "read",
      },
      {
        type: "text",
        content: "Salad or sushi?",
        isMine: false,
        timestamp: "12:00 PM",
        status: "read",
      },
      {
        type: "text",
        content: "Let's do sushi 🍣",
        isMine: true,
        timestamp: "12:01 PM",
        status: "read",
      },
      {
        type: "voice",
        content: "/audio/sample.mp3",
        isMine: true,
        timestamp: "12:02 PM",
        status: "read",
      },
    ],
  },
];

export default function ChatWindow() {
  const [messages, setMessages] =
    useState<{ type: string; content: string; isMine: boolean }[]>();

  const socket = getSocket();

  const { inVideoCall, activeDm } = useUser();

  useEffect(() => {
    console.log({ activeDm });
    if (activeDm) {
      setMessages(userMessages[activeDm.userId].messages);
    }
  }, [activeDm]);

  const handleSend = (msg: string, files?: File[], voiceBlob?: Blob) => {
    if (voiceBlob) {
      const voiceURL = URL.createObjectURL(voiceBlob);
      setMessages((prev) => [
        ...prev!,
        { type: "voice", content: voiceURL, isMine: true },
      ]);
    } else if (files?.length) {
      files.forEach((file) => {
        const fileURL = URL.createObjectURL(file);
        const type = file.type.startsWith("image") ? "image" : "file";
        setMessages((prev) => [
          ...prev!,
          { type, content: fileURL, isMine: true },
        ]);
      });
    } else if (msg.trim()) {
      socket?.emit("message", msg.trim());
      setMessages((prev) => [
        ...prev!,
        { type: "text", content: msg.trim(), isMine: true },
      ]);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-fit flex">
        <ChatSidebar />
      </div>
      {activeDm ? (
        <div className="w-full h-screen flex-1 flex flex-col">
          <ChatHeader name={activeDm.userName} status="online" />
          <div className="flex-1 overflow-y-auto p-6 flex flex-col bg-zinc-950">
            {messages?.map((m, i) => (
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
      ) : (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-zinc-950/30 backdrop-blur-md">
          {/* Glass card */}
          <div className="flex flex-col items-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-neo space-y-4">
            <MessageSquareQuote className="w-16 h-16 text-white/70 animate-pulse" />
            <h2 className="text-2xl font-semibold text-white">
              No Conversation Open
            </h2>
            <p className="text-center text-sm text-gray-300 max-w-xs">
              Select a chat from the sidebar or start a new conversation to get
              messaging!
            </p>
            <Button icon={PlusCircle} label="New Message" />
          </div>
        </div>
      )}
      {inVideoCall && <VideoCall />}
    </div>
  );
}
