import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "auth_token";
const ADMIN_AUTH_COOKIE = "admin_token";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isAdminArea = pathname.startsWith("/admin");
  if (isAdminArea) {
    const adminToken = request.cookies.get(ADMIN_AUTH_COOKIE)?.value;
    const isAdminAuthed = Boolean(adminToken);
    const isAdminLogin = pathname === "/admin/login";

    if (!isAdminAuthed && !isAdminLogin) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.search = "";
      const redirect = pathname + (search || "");
      if (redirect && redirect !== "/admin/login") {
        loginUrl.searchParams.set("redirect", redirect);
      }
      return NextResponse.redirect(loginUrl);
    }

    if (isAdminAuthed && isAdminLogin) {
      const adminUrl = request.nextUrl.clone();
      adminUrl.pathname = "/admin";
      adminUrl.search = "";
      return NextResponse.redirect(adminUrl);
    }

    return NextResponse.next();
  }

  // --- User app ---
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
  matcher: ["/dashboard/:path*", "/auth/:path*", "/admin/:path*"],
};
