"use client";
import React from "react";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";

export default function Home() {
  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
}
