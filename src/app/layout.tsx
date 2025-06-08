"use client";
import { UserProvider } from "@/context/UserContext";
import "./globals.css";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";

const lexend = Lexend({ variable: "--font-lexend", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${lexend.variable} antialiased font-main relative min-h-screen bg-black overflow-hidden text-white`}
      >
        <UserProvider>
          {/* animated background blobs */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div
              className="absolute w-[100%] h-[80%] bg-gradient-to-br from-purple-700 via-pink-600 to-indigo-500 opacity-20 rounded-full filter blur-3xl animate-blob-spin transition-transform duration-100"
              style={{
                top: "-10%",
                left: "-50%",
              }}
            />
            <div
              className="absolute w-[50%] h-[50%] bg-gradient-to-tr from-blue-600 via-teal-500 to-green-400 opacity-20 rounded-full filter blur-3xl animate-blob-spin animation-delay-2000 transition-transform duration-100"
              style={{
                bottom: "-20%",
                right: "-10%",
              }}
            />
          </div>

          {/* content layer */}
          <div className="relative z-10 h-full">{children}</div>
        </UserProvider>
      </body>
    </html>
  );
}
