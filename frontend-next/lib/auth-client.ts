// Client-side helpers for the dummy cookie-based auth used by the middleware.
// The real backend will replace this later — for now we only need a cookie
// named `auth_token` to exist so the middleware treats the user as signed in.

export const AUTH_COOKIE = "auth_token";
const ONE_WEEK = 60 * 60 * 24 * 7;

export function setAuthCookie(token = "dummy-pilot-token") {
  if (typeof document === "undefined") return;
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${AUTH_COOKIE}=${encodeURIComponent(
    token,
  )}; path=/; max-age=${ONE_WEEK}; SameSite=Lax${secure}`;
}

export function clearAuthCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}
