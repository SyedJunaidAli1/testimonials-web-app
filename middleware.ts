// import { NextRequest, NextResponse } from "next/server";


// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Redirect /about → /
//   if (pathname === "/about") {
//     return NextResponse.redirect(new URL("/", request.url));
//   }
//   if (pathname === "/dashboard") {
//     return NextResponse.redirect(new URL("/", request.url));
//   }


//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/about", "/dashboard"],
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

const authPaths = ["/login", "/signup", "/forgot-password", "/reset-password"];
const protectedPaths = ["/dashboard", "/product"];

export default async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({headers: request.headers});
  console.log(session);
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
