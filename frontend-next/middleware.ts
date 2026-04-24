import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "auth_token";

/**
 * Route guard:
 * - /dashboard/**: requires auth_token cookie. Missing → /auth/login
 * - /auth/**: must be signed-out. Has auth_token → /dashboard
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const isAuthed = Boolean(token);

  const isDashboard = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname.startsWith("/auth");

  if (isDashboard && !isAuthed) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/auth/login";
    const redirect = pathname + (search || "");
    if (redirect && redirect !== "/auth/login") {
      loginUrl.searchParams.set("redirect", redirect);
    }
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isAuthed) {
    const dashUrl = request.nextUrl.clone();
    dashUrl.pathname = "/dashboard";
    dashUrl.search = "";
    return NextResponse.redirect(dashUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
