import {
  Endpoint,
  getUsersListResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  RegisterRequest,
  RegisterResponse,
} from "./types";

export const endpoints = {
  loginUser: {
    method: "POST",
    path: () => "/api/auth/login",
    type: "OPEN",
  } as Endpoint<LoginRequest, LoginResponse>,
  registerUser: {
    method: "POST",
    path: () => "/api/auth/register",
    type: "OPEN",
  } as Endpoint<RegisterRequest, RegisterResponse>,
  logoutUser: {
    method: "POST",
    path: () => "/api/auth/logout",
    type: "CLOSE",
  } as Endpoint<LogoutRequest, null>,

  getUsersList: {
    method: "GET",
    path: () => "/api/users/usersList",
    type: "CLOSE",
  } as Endpoint<null, getUsersListResponse[]>,
};
