"use server";

import ActionResponse from "@/types/ActionResponse";
import { cookies } from "next/headers";

export async function logout(): Promise<ActionResponse> {
  try {
    // Read the token from the incoming request’s cookies
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    if (!token) {
      return { status: "failure", message: "No token found" };
    }

    (await cookieStore).delete("token");
    return { status: "success", message: "User Logged Out" };
  } catch (error) {
    console.error("Error Logging Out", error);
    return { status: "failure", message: "Error Logging Out User" };
  }
}
