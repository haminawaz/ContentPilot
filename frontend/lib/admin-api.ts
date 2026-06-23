import { getAdminTokenFromCookie } from "./admin-auth-client";
import type {
  ApiEnvelope,
  Paginated,
  AdminLoginResponse,
  AdminUserRow,
  AdminUserDetail,
  AdminContentRow,
  AdminContentDetail,
  AdminSubscriptionRow,
  AdminPlan,
  AdminPlanInput,
  AdminStats,
} from "@/types/admin";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function adminRequest<T>(
  endpoint: string,
  method: RequestInit["method"] = "GET",
  body?: unknown,
  requireAuth: boolean = true,
): Promise<T> {
  const headers: HeadersInit = {};

  if (requireAuth) {
    const token = getAdminTokenFromCookie();
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
    throw new Error(data?.message || `Request failed with ${response.status}`);
  }

  return data as T;
}

function qs(params: Record<string, string | number | undefined>) {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") sp.set(k, String(v));
  });
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export const adminApi = {
  login: (email: string, password: string) =>
    adminRequest<ApiEnvelope<AdminLoginResponse>>(
      "/admin/auth/login",
      "POST",
      { email, password },
      false,
    ),

  dashboard: {
    stats: () =>
      adminRequest<ApiEnvelope<{ data: AdminStats }>>("/admin/dashboard/stats"),
  },

  users: {
    list: (page = 1, pageSize = 10, search = "") =>
      adminRequest<ApiEnvelope<{ data: Paginated<AdminUserRow> }>>(
        `/admin/users${qs({ page, pageSize, search })}`,
      ),
    detail: (id: number) =>
      adminRequest<ApiEnvelope<{ data: AdminUserDetail }>>(
        `/admin/users/${id}`,
      ),
    updateStatus: (id: number, status: "active" | "blocked") =>
      adminRequest<ApiEnvelope<null>>(`/admin/users/${id}/status`, "PATCH", {
        status,
      }),
    remove: (id: number) =>
      adminRequest<ApiEnvelope<null>>(`/admin/users/${id}`, "DELETE"),
  },

  contents: {
    list: (page = 1, pageSize = 10, search = "") =>
      adminRequest<ApiEnvelope<{ data: Paginated<AdminContentRow> }>>(
        `/admin/contents${qs({ page, pageSize, search })}`,
      ),
    detail: (id: number) =>
      adminRequest<ApiEnvelope<{ data: AdminContentDetail }>>(
        `/admin/contents/${id}`,
      ),
    remove: (id: number) =>
      adminRequest<ApiEnvelope<null>>(`/admin/contents/${id}`, "DELETE"),
  },

  subscriptions: {
    list: (page = 1, pageSize = 10, search = "") =>
      adminRequest<ApiEnvelope<{ data: Paginated<AdminSubscriptionRow> }>>(
        `/admin/subscriptions${qs({ page, pageSize, search })}`,
      ),
  },

  plans: {
    list: () =>
      adminRequest<ApiEnvelope<{ data: AdminPlan[] }>>("/admin/plans"),
    detail: (id: number) =>
      adminRequest<ApiEnvelope<{ data: AdminPlan }>>(`/admin/plans/${id}`),
    create: (payload: AdminPlanInput) =>
      adminRequest<ApiEnvelope<{ data: AdminPlan }>>(
        "/admin/plans",
        "POST",
        payload,
      ),
    update: (id: number, payload: Partial<AdminPlanInput>) =>
      adminRequest<ApiEnvelope<{ data: AdminPlan }>>(
        `/admin/plans/${id}`,
        "PUT",
        payload,
      ),
    remove: (id: number) =>
      adminRequest<ApiEnvelope<null>>(`/admin/plans/${id}`, "DELETE"),
  },
};
