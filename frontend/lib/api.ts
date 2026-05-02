import type { ContentResponse } from "@/types/content-response";
import type { PaginatedArticles, ArticleDetail } from "@/types/article";
import {
  LoginPayload,
  EmailPayload,
  GenerateArticlePayload,
  ResetPasswordPayload,
  SignupPayload,
  VerifyUserPayload,
} from "@/types/content-request";
import { getTokenFromCookie } from "./auth-client";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest<T>(
  endpoint: string,
  method: RequestInit["method"] = "GET",
  body?: unknown,
  requireAuth: boolean = false,
): Promise<T> {
  const headers: HeadersInit = {};

  if (requireAuth) {
    const token = getTokenFromCookie();
    if (!token) {
      throw new Error("Unauthorized");
    }
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
      apiRequest<TResponse>("/user/auth/login", "POST", payload),
    signup: <TResponse>(payload: SignupPayload) => {
      const { firstName, lastName } = splitFullName(payload.name);

      return apiRequest<TResponse>("/user/auth/register", "POST", {
        first_name: firstName,
        last_name: lastName,
        email: payload.email,
        phone: payload.phone,
        password: payload.password,
        confirm_password: payload.password,
        terms: true,
      });
    },
    verifyUser: <TResponse>(payload: VerifyUserPayload) =>
      apiRequest<TResponse>(
        `/user/auth/verify-user?email=${encodeURIComponent(payload.email)}&otp=${encodeURIComponent(payload.otp)}`,
      ),
    resendOTP: <TResponse>(payload: EmailPayload) =>
      apiRequest<TResponse>("/user/auth/resend-otp", "POST", payload),
    forgotPassword: <TResponse>(payload: EmailPayload) =>
      apiRequest<TResponse>("/user/auth/forgot-password", "POST", payload),
    resetPassword: <TResponse>(payload: ResetPasswordPayload) =>
      apiRequest<TResponse>(
        `/user/auth/reset-password?email=${encodeURIComponent(payload.email)}&otp=${encodeURIComponent(payload.otp)}`,
        "POST",
        {
          password: payload.password,
          confirm_password: payload.confirmPassword,
        },
      ),
    me: <TResponse>() =>
      apiRequest<TResponse>("/user/auth/me", "GET", undefined, true),
    updateProfile: <TResponse>(payload: {
      first_name: string;
      last_name: string;
      phone: string;
    }) =>
      apiRequest<TResponse>("/user/auth/profile", "PUT", payload, true),
  },
  dashboard: {
    overview: <TResponse>() =>
      apiRequest<TResponse>("/user/dashboard/overview", "GET", undefined, true),
    profile: <TResponse>() =>
      apiRequest<TResponse>("/user/dashboard/profile", "GET", undefined, true),
  },
  content: {
    generateArticle: (payload: GenerateArticlePayload) =>
      apiRequest<ContentResponse>(
        "/user/ai-search",
        "POST",
        {
          topic: payload.topic,
          language: payload.language,
          word_count: payload.wordCount,
        },
        true,
      ),
    getArticles: (page = 1, pageSize = 10) =>
      apiRequest<{
        message: string;
        response: PaginatedArticles;
        error: null;
      }>(`/user/ai-search?page=${page}&pageSize=${pageSize}`, "GET", undefined, true),
    getArticle: (id: number) =>
      apiRequest<{
        message: string;
        response: ArticleDetail;
        error: null;
      }>(`/user/ai-search/${id}`, "GET", undefined, true),
  },
};

export function generateContent(
  topic: string,
  language: string,
  wordCount: number,
) {
  return api.content.generateArticle({ topic, language, wordCount });
}
