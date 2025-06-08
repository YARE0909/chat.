"use client";
import React from "react";
import {
  Github,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  LogIn,
  User,
  Chrome,
  GithubIcon,
} from "lucide-react";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/chat");
  };

  const handleOAuthLogin = (provider: "google" | "github") => {
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e0e0e] px-4">
      <div className="w-full max-w-md bg-[#1a1a1a] text-white rounded-xl p-8 shadow-2xl space-y-6">
        <div className="text-center">
          <h1 className="font-extrabold text-6xl">chat.</h1>
          <h2 className="text-2xl font-bold mt-2">Welcome back</h2>
          <p className="text-sm text-zinc-400">Login to continue</p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-zinc-400" size={18} />
            <input
              type="email"
              required
              className="w-full pl-10 pr-4 py-2 rounded-md bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-zinc-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full pl-10 pr-10 py-2 rounded-md bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-zinc-400 border-l border-l-zinc-700 pl-2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button
            icon={LogIn}
            label="Login"
            onClick={() => handleOAuthLogin("google")}
            type="submit"
          />
        </form>

        <div className="relative">
          <hr className="border-zinc-700" />
          <span className="absolute inset-x-0 top-[-0.6rem] mx-auto w-max px-2 text-xs bg-[#1a1a1a] text-zinc-500">
            or continue with
          </span>
        </div>

        <div className="flex space-x-3">
          <Button
            icon={Chrome}
            label="Google"
            onClick={() => handleOAuthLogin("google")}
          />
          <Button
            icon={Github}
            label="Github"
            onClick={() => handleOAuthLogin("github")}
          />
        </div>
      </div>
    </div>
  );
}
