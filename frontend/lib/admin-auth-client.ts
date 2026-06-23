export const ADMIN_AUTH_COOKIE = "admin_token";
const ONE_DAY = 60 * 60 * 24;

export function setAdminAuthCookie(token: string) {
  if (typeof document === "undefined") return;
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${ADMIN_AUTH_COOKIE}=${encodeURIComponent(
    token,
  )}; path=/; max-age=${ONE_DAY}; SameSite=Lax${secure}`;
}

export function getAdminTokenFromCookie() {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${ADMIN_AUTH_COOKIE}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export function clearAdminAuthCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${ADMIN_AUTH_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}
