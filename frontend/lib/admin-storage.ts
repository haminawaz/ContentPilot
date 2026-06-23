const ADMIN_KEY = "admin_profile";

export interface StoredAdmin {
  email: string;
}

export function saveAdmin(admin: StoredAdmin): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
}

export function getAdmin(): StoredAdmin | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ADMIN_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredAdmin;
  } catch {
    return null;
  }
}

export function clearAdmin(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_KEY);
}
