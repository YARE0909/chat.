import { useEffect, useState } from "react";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { ChatHeader } from "./ChatHeader";
import { ChatSidebar } from "./ChatSidebar";
import VideoCall from "./VideoCall";
import { useUser } from "@/context/UserContext";
import { MessageSquareQuote, PlusCircle } from "lucide-react";
import { Button } from "../common/Button";
import { useSocket } from "@/context/SocketContext";

export default function ChatWindow() {
  const [messages, setMessages] = useState<any[]>();

  const { socket } = useSocket();

  const { inVideoCall, activeDm, user } = useUser();

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
      console.log({
        chatId: activeDm?.chatId,
        authorId: user?.id,
        content: msg.trim,
      });
      socket?.emit("message", {
        chatId: activeDm?.chatId,
        authorId: user?.id,
        content: msg.trim(),
      });
    }
  };

  socket?.on("message-received", (msg: any) => {
    if (activeDm?.chatId) {
      socket?.emit("load-chat", activeDm?.chatId);
    }
  });

  socket?.on("chat-info", (msg: any) => {
    console.log("CHAT LOADED", msg.data.messages);
    setMessages(msg.data.messages);
  });

  useEffect(() => {
    socket?.emit("load-chat", activeDm?.chatId);
  }, [activeDm]);

  return (
    <div className="flex w-full h-screen">
      <div className="w-fit flex">
        <ChatSidebar />
      </div>
      {activeDm ? (
        <div className="w-full h-screen flex-1 flex flex-col">
          <ChatHeader name={activeDm.title} status="online" />
          <div className="flex-1 overflow-y-auto p-6 flex flex-col bg-zinc-950">
            {messages?.map((m, i) => (
              <MessageBubble
                key={i}
                type={m.type as any}
                content={m.content}
                isMine={m.authorId === user?.id}
                timestamp={m.createdOn}
                status="SENT"
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
