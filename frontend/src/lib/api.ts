const BASE = "/api";

export const getToken = () => localStorage.getItem("speshway_admin_token");
export const setToken = (t: string) => localStorage.setItem("speshway_admin_token", t);
export const clearToken = () => localStorage.removeItem("speshway_admin_token");

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data as T;
}

export interface AdminUser {
  email: string;
  name: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  admin: AdminUser;
}

export const api = {
  login: (email: string, password: string) =>
    request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  verify: (token: string) =>
    request<{ valid: boolean; admin?: AdminUser }>("/auth/verify", {
      method: "POST",
      body: JSON.stringify({ token }),
    }),

  getStats: () => request<Record<string, unknown>>("/dashboard/stats"),
  getActivity: () => request<unknown[]>("/dashboard/activity"),
  getProjects: () => request<unknown[]>("/dashboard/projects"),
};
