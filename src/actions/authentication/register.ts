"use server";

import ActionResponse from "@/types/ActionResponse";
import { apiHandler } from "@/utils/api/client";
import { endpoints } from "@/utils/api/endpoints";

export async function register(formData: FormData): Promise<ActionResponse> {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !password || !email) {
    throw new Error("Email and password are required.");
  }

  try {
    const res = await apiHandler(endpoints.registerUser, {
      name: name as string,
      password: password as string,
      email: email as string,
    });

    if (res.status === 200) {
      return {
        status: "success",
        message: res.message || "User Registered",
        data: {},
      };
    }
    return {
      status: "failure",
      message: res.errorMessage ?? "Error Registering User",
    };
  } catch (error) {
    console.log("Error Registering User", error);
    return { status: "failure", message: "Error Registering User" };
  }
}
