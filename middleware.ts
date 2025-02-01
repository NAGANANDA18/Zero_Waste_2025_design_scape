import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if user is authenticated
  const isAuthenticated = request.cookies.has("auth_token") // Replace with your auth check

  // Protected routes
  const protectedPaths = ["/dashboard", "/profile", "/donate", "/locations", "/branches", "/contact"]

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  // If trying to access protected route without auth, redirect to login
  if (!isAuthenticated && isProtectedPath) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // If authenticated and trying to access login/register, redirect to dashboard
  if (isAuthenticated && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/profile/:path*",
    "/donate/:path*",
    "/locations/:path*",
    "/branches/:path*",
    "/contact/:path*",
  ],
}

