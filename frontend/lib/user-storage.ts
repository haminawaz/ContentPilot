export interface StoredUser {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  company: string;
  bio: string;
}

export type SubscriptionPlan = "free" | "pro" | "agency";

export interface StoredCredits {
  total: number;
  used: number;
  plan: string;
  purchasedAt?: string;
  expiresAt?: string;
}

const CREDITS_KEY = "user_credits";

export function getCredits(): StoredCredits {
  const defaultCredits: StoredCredits = {
    total: 2,
    used: 0,
    plan: "Free",
    purchasedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
  };

  if (typeof window === "undefined") return defaultCredits;
  const raw = localStorage.getItem(CREDITS_KEY);
  if (!raw) {
    saveCredits(defaultCredits);
    return defaultCredits;
  }
  try {
    return JSON.parse(raw) as StoredCredits;
  } catch {
    return defaultCredits;
  }
}

export function saveCredits(credits: StoredCredits): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CREDITS_KEY, JSON.stringify(credits));
}

export function setPlan(plan: string): void {
  const current = getCredits();
  const now = new Date();
  const purchasedAt = now.toISOString();
  const creditLimit = plan.toLowerCase() === "free" ? 2 : 10;

  const expiresAt = new Date(
    now.getTime() +
      (plan.toLowerCase() === "free" ? 365 : 30) * 24 * 60 * 60 * 1000,
  ).toISOString();

  saveCredits({
    total: creditLimit,
    used: 0,
    plan,
    purchasedAt,
    expiresAt,
  });
}

export function decrementCredit(amount: number = 1): void {
  const current = getCredits();
  saveCredits({ ...current, used: current.used + amount });
}

const USER_KEY = "user_profile";

export function saveUser(user: StoredUser): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

export function clearUser(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(CREDITS_KEY);
}
