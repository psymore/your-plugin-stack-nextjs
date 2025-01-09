import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/stack"];
const publicRoutes = ["/content"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token");

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route =>
    req.nextUrl.pathname.startsWith(route)
  );

  // Check if the user is authenticated (i.e., the token exists)
  const isAuthenticated = !!token;

  // Redirect to login page if user is not authenticated for protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Set an `isAuthenticated` cookie for client-side rendering
  const res = NextResponse.next();
  res.cookies.set("isAuthenticated", String(isAuthenticated), {
    httpOnly: false, // Allow client-side access
    sameSite: "strict",
    path: "/",
  });

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/stack/:path*", "/content/:path*"],
};
