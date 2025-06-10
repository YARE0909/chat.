"use client";
import React from "react";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import VideoCall from "@/components/chat/VideoCall";
import { useUser } from "@/context/UserContext";

export default function Home() {
 

  return (
    <div className="flex h-screen">
      <ChatWindow />
    </div>
  );
}
