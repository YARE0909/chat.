"use client";
import { createPortal } from "react-dom";
import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { X } from "lucide-react";

export default function Modal({
  title,
  children,
  close,
}: {
  title: string;
  children: React.ReactNode;
  close: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const modalContent = (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="p-4 rounded-xl bg-white/10 backdrop-blur-lg w-full max-w-md mx-4 relative">
        <div className="w-full flex items-start justify-between">
          <div>
            <h1 className="text-white text-2xl font-bold mb-4">{title}</h1>
          </div>
          <div>
            <Button icon={X} onClick={close} />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );

  return mounted ? createPortal(modalContent, document.body) : null;
}
