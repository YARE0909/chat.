"use server";

import ActionResponse from "@/types/ActionResponse";
import { apiHandler } from "@/utils/api/client";
import { endpoints } from "@/utils/api/endpoints";
import { getUsersListResponse } from "@/utils/api/types";

export async function fetchUsersListAction(): Promise<
  ActionResponse<getUsersListResponse[]>
> {
  try {
    const res = await apiHandler(endpoints.getUsersList);

    if (res.status === 200) {
      const { data } = res;
      return {
        status: "success",
        message: res.message || "User List Fetched",
        data,
      };
    }
    return {
      status: "failure",
      message: res.errorMessage ?? "Error Fetching User List",
    };
  } catch (error) {
    console.log("Error Authenticating User", error);
    return { status: "failure", message: "Error Fetching User List" };
  }
}
