"use client";
import { useState } from "react";
import {
  Github,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Chrome,
  User,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "@/actions/authentication/login";
import { register as userRegister } from "@/actions/authentication/register";
import toast from "react-hot-toast";
import { useSocket } from "@/context/SocketContext";
import { useUser } from "@/context/UserContext";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [action, setAction] = useState<"Login" | "Register">("Login");

  const { connectSocket } = useSocket();
  const { updateUser } = useUser();

  const router = useRouter();

  type LoginFormData = {
    username: string;
    password: string;
  };

  type RegisterFormData = {
    name: string;
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData & RegisterFormData>();

  const handleOAuthLogin = (provider: "google" | "github") => {
    console.log(`Logging in with ${provider}`);
  };

  const onSubmitLogin: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);
      const res = await login(formData);

      if (res.status === "success") {
        toast.success(res.message);
        connectSocket();
        router.push(res.data.role === "ADMIN" ? "/admin" : "/chat");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const onSubmitRegister: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      // Call your registration API here (create one in /actions/authentication/register.ts)
      console.log("Registering:", data);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("password", data.password);
      formData.append("email", data.email);

      const res = await userRegister(formData);
      if (res.status === "success") {
        toast.success("Registered Successfully");
        setAction("Login");
        reset();
      } else {
        toast.error(res.message || "Something Went Wrong");
      }
    } catch (err) {
      toast.error("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950/30 backdrop-blur-lg px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg text-white rounded-xl p-8 shadow-2xl space-y-6">
        <div className="text-center">
          <h1 className="font-extrabold text-6xl">chat.</h1>
          <h2 className="text-2xl font-bold mt-2">
            {action === "Login" ? "Welcome back" : "Create an account"}
          </h2>
        </div>

        <div className="w-full flex items-center justify-center gap-2">
          {["Login", "Register"].map((act) => (
            <div
              key={act}
              className={`w-full flex justify-center items-center rounded-xl cursor-pointer ${
                action === act ? "bg-white text-black" : "bg-white/10"
              } backdrop-blur-lg px-6 py-1`}
              onClick={() => {
                setAction(act as typeof action);
                reset(); // Clear form fields on switch
              }}
            >
              <h1>{act}</h1>
            </div>
          ))}
        </div>

        {action === "Login" ? (
          <form className="space-y-4" onSubmit={handleSubmit(onSubmitLogin)}>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 z-10"
                size={18}
              />
              <input
                type="email"
                required
                className="w-full pl-10 pr-10 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 focus:outline-none placeholder:text-zinc-500"
                autoComplete="username"
                {...register("username", { required: "Email is required" })}
                placeholder="you@example.com"
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="relative flex items-center">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 z-10"
                size={18}
              />
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
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button icon={LogIn} label="Login" type="submit" />
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit(onSubmitRegister)}>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 z-10"
                size={18}
              />
              <input
                type="text"
                required
                className="w-full pl-10 pr-10 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 focus:outline-none placeholder:text-zinc-500"
                {...register("name", { required: "Name is required" })}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 z-10"
                size={18}
              />
              <input
                type="email"
                required
                className="w-full pl-10 pr-10 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 focus:outline-none placeholder:text-zinc-500"
                {...register("email", { required: "Email is required" })}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative flex items-center">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 z-10"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full pl-10 pr-10 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 focus:outline-none placeholder:text-zinc-500"
                {...register("password", { required: "Password is required" })}
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 border-l border-l-zinc-700 pl-2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button icon={LogIn} label="Register" type="submit" />
          </form>
        )}

        <div className="w-full flex justify-center items-center">
          <span className="text-xs text-zinc-500">or continue with</span>
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
