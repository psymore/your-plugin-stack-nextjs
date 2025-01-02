// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const protectedRoutes = ["/dashboard", "/stack"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token");

  const isProtectedRoute = protectedRoutes.some(route =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token) {
    try {
      const decodedToken = jwt.verify(
        token.value,
        process.env.JWT_SECRET_KEY as string
      );
      const { userId } = decodedToken as jwt.JwtPayload & { userId: string };

      // Add userId to the headers for protected routes
      req.headers.set("user-id", userId);
    } catch (error) {
      console.error("Invalid token:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/stack/:path*"],
};
