// app/not-found.tsx  (or pages/404.tsx)
"use client";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center bg-transparent relative overflow-hidden">
      <div className="relative z-10 bg-black/30 backdrop-blur-md border border-white/20 rounded-3xl p-10 max-w-md text-center shadow-xl transition-all">
        <AlertCircle className="mx-auto mb-4 w-16 h-16 text-red-500 animate-pulse" />
        <h1 className="text-5xl font-bold text-white mb-2">404</h1>
        <p className="text-gray-300 mb-6">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/chat">
          <Button label="Go Home" />
        </Link>
      </div>
    </div>
  );
}
