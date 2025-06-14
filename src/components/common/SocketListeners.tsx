// components/SocketListeners.tsx
"use client";
import { useEffect } from "react";
import { useSocket } from "@/context/SocketContext";
import toast from "react-hot-toast";
import { useUser } from "@/context/UserContext";

export function SocketListeners() {
  const { socket } = useSocket();
  const { updateUser } = useUser();

  useEffect(() => {
    if (!socket) return;

    console.log("Socket connected:", socket.id);

    socket.on("general-error", (data) => {
      toast.error(data.message);
      console.log("general-error:", data);
    });

    updateUser();

    return () => {
      socket.off("general-error");
    };
  }, [socket]);

  return null; // no UI
}
