"use client";
import React from "react";
import { Github, Mail, Lock, Eye, EyeOff, LogIn, Chrome } from "lucide-react";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "@/actions/authentication/login";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const handleOAuthLogin = (provider: "google" | "github") => {
    console.log(`Logging in with ${provider}`);
  };

  type FormData = {
    username: string;
    password: string;
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // TODO: Remove Later
      // router.push("/chat");

      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);
      const res = await login(formData);
      if (res.status === "success") {
        if (res.data.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/chat");
        }
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950/30 backdrop-blur-lg px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg text-white rounded-xl p-8 shadow-2xl space-y-6">
        <div className="text-center">
          <h1 className="font-extrabold text-6xl">chat.</h1>
          <h2 className="text-2xl font-bold mt-2">Welcome back</h2>
          <p className="text-sm text-zinc-400">Login to continue</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 z-10" size={18} />
            <input
              type="email"
              required
              className="w-full pl-10 pr-10 flex-1 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 focus:outline-none placeholder:text-zinc-500"
              autoComplete="username"
              {...register("username", { required: "Username is required" })}
              placeholder="you@example.com"
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="relative flex items-center">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 z-10" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full pl-10 pr-10 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 focus:outline-none placeholder:text-zinc-500"
              autoComplete="current-password"
              {...register("password", { required: "Password is required" })}
              placeholder="********"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 border-l border-l-zinc-700 pl-2"
            >
              {showPassword ? (
                <EyeOff className="cursor-pointer" size={18} />
              ) : (
                <Eye className="cursor-pointer" size={18} />
              )}
            </button>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            icon={LogIn}
            label="Login"
            onClick={() => handleOAuthLogin("google")}
            type="submit"
          />
        </form>

        <div className="w-full flex justify-center items-center">
          <span className="text-xs text-zinc-500">
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
