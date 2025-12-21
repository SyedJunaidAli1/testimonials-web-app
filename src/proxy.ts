import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const authPaths = ["/login", "/signup", "/forgot-password", "/reset-password"];
const protectedPaths = ["/dashboard", "/product"];

export default function middleware(request: NextRequest) {
  const session = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  // 🚫 Not logged in → trying to access protected routes
  if (!session && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Logged in → trying to access auth pages
  if (session && authPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
