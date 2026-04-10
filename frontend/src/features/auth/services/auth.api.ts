import { apiRequest } from "../../../core/api/apiClient";
import type { AuthUser } from "../types/auth.types";

export async function registerApi(payload: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  return apiRequest<{ message: string }>("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export async function loginApi(payload: { email: string; password: string }) {
  return apiRequest<{ message: string; token: string; data: AuthUser }>(
    "/auth/login",
    {
      method: "POST",
      body: payload,
    },
  );
}

export async function meApi(token: string): Promise<{
  message?: string;
  data: AuthUser;
}> {
  const data = await apiRequest<{ message?: string; data?: AuthUser }>(
    "/auth/me",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!data.data) {
    throw data;
  }

  return {
    message: data.message,
    data: data.data,
  };
}

export async function forgotPasswordApi(payload: { email: string }) {
  return apiRequest<{ message: string }>("/auth/forgot-password", {
    method: "POST",
    body: payload,
  });
}

export async function resetPasswordApi(payload: {
  token: string;
  newPassword: string;
}) {
  return apiRequest<{ message: string }>("/auth/reset-password", {
    method: "POST",
    body: payload,
  });
}
