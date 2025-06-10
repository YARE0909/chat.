"use client";
import React, { useEffect } from "react";
import ChatWindow from "@/components/chat/ChatWindow";
import { getSocket, initSocket } from "@/lib/socket";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const connectSocket = async () => {
      try {
        console.log("CONNECTING TO SOCKET");
        const res = await fetch("/api/auth/token");
        if (!res.ok) throw new Error("Not authenticated");

        const { token } = await res.json();
        const socket = initSocket(token);

        console.log({ socket });

        socket.on("connect", () => {
          console.log("Socket connected:", socket.id);
        });

        socket.on("message", (msg) => {
          toast(msg); // or update state with message
        });
      } catch (err) {
        console.error("Failed to connect socket:", err);
      }
    };

    connectSocket();

    return () => {
      const socket = getSocket();
      socket?.disconnect();
    };
  }, []);

  return (
    <div className="flex h-screen">
      <ChatWindow />
    </div>
  );
}
