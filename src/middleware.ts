// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define the protected route(s)
const protectedRoutes = ["/dashboard"];

export function middleware(req: NextRequest) {
  // Get the 'auth-token' from cookies (this is the HttpOnly cookie set by your backend)
  const token = req.cookies.get("auth-token");

  // Check if the requested route is one of the protected routes
  const isProtectedRoute = protectedRoutes.some(route =>
    req.nextUrl.pathname.startsWith(route)
  );

  // If it's a protected route and the token is missing, redirect to login page
  if (isProtectedRoute && !token) {
    // Redirect to the login page
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", req.nextUrl.pathname); // Optional: add redirect param
    return NextResponse.redirect(loginUrl);
  }

  // If token exists or it's not a protected route, continue to the requested page
  return NextResponse.next();
}

// Apply this middleware to the /dashboard route and its subpaths
export const config = {
  matcher: ["/dashboard/:path*"], // This will match /dashboard and all sub-routes
};
