import type { ContentResponse } from "@/types/content-response";
import {
  LoginPayload,
  ForgotPasswordPayload,
  GenerateArticlePayload,
  ResetPasswordPayload,
  SignupPayload,
} from "@/types/content-request";

const DEFAULT_API_URL = "http://localhost:3001/api/v1";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;

export async function apiRequest<T>(
  endpoint: string,
  method: RequestInit["method"] = "GET",
  body?: unknown,
  token?: string,
): Promise<T> {
  const headers: HeadersInit = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.details ||
        data?.message ||
        `Request failed with ${response.status}`,
    );
  }

  return data as T;
}

export function getApiUrl(path = "") {
  return `${API_URL}${path}`;
}

function splitFullName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" ") || parts[0] || "",
  };
}

export const api = {
  auth: {
    login: <TResponse>(payload: LoginPayload) =>
      apiRequest<TResponse>("/auth/login", "POST", payload),
    signup: <TResponse>(payload: SignupPayload) => {
      const { firstName, lastName } = splitFullName(payload.name);

      return apiRequest<TResponse>("/auth/register", "POST", {
        first_name: firstName,
        last_name: lastName,
        email: payload.email,
        phone: payload.phone,
        password: payload.password,
        confirm_password: payload.password,
        terms: true,
      });
    },
    forgotPassword: <TResponse>(payload: ForgotPasswordPayload) =>
      apiRequest<TResponse>("/auth/forgot-password", "POST", payload),
    resetPassword: <TResponse>(payload: ResetPasswordPayload) =>
      apiRequest<TResponse>(
        `/auth/reset-password?email=${encodeURIComponent(payload.email)}&otp=${encodeURIComponent(payload.otp)}`,
        "POST",
        {
          password: payload.password,
          confirm_password: payload.confirmPassword,
        },
      ),
    me: <TResponse>(token?: string) =>
      apiRequest<TResponse>("/auth/me", "GET", undefined, token),
  },
  dashboard: {
    overview: <TResponse>(token?: string) =>
      apiRequest<TResponse>("/dashboard/overview", "GET", undefined, token),
    profile: <TResponse>(token?: string) =>
      apiRequest<TResponse>("/dashboard/profile", "GET", undefined, token),
  },
  content: {
    generateArticle: (payload: GenerateArticlePayload) =>
      apiRequest<ContentResponse>("/user/ai-search", "POST", {
        topic: payload.topic,
        language: payload.language,
        word_count: payload.wordCount,
      }),
  },
};

export function generateContent(
  topic: string,
  language: string,
  wordCount: number,
) {
  return api.content.generateArticle({ topic, language, wordCount });
}
