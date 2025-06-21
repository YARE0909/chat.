export interface ApiResponse<T> {
  status: number;
  error?: boolean;
  message?: string;
  errorMessage?: string;
  data?: T;
}

export type Endpoint<Request, Response> = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: (params: Request) => string;
  type: "OPEN" | "CLOSE";
};

//   Define request and response types for api endpoints below

// User Login
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {}

export interface LogoutRequest {
  Username: string;
}

export interface GetQuestionListRequest {
  testid: number;
}

export interface getUsersListResponse {
  id: number;
  email: string;
  name: string;
}
