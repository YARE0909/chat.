"use client";
import { UserProvider } from "@/context/UserContext";
import "./globals.css";
import { Lexend } from "next/font/google";
import { Toaster } from "react-hot-toast";

const lexend = Lexend({ variable: "--font-lexend", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${lexend.variable} antialiased font-main relative h-screen w-full bg-zinc-950 overflow-hidden text-white`}
      >
        <UserProvider>
          {/* animated background blobs */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute w-[100%] h-[80%] bg-gradient-to-br from-purple-700/50 via-pink-600/50 to-indigo-500/50 opacity-20 rounded-full filter blur-3xl transition-transform duration-100 top-0 left-0 animate-[pulse_10s_ease-in-out_infinite]" />
            <div className="absolute w-[50%] h-[50%] bg-gradient-to-tr from-blue-600/50 via-teal-500/50 to-green-400/50 opacity-20 rounded-full filter blur-3xl transition-transform duration-100 bottom-0 right-0 animate-[pulse_10s_ease-in-out_infinite]" />
          </div>

          {/* content layer */}
          <div className="relative z-10 h-full">{children}</div>
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
