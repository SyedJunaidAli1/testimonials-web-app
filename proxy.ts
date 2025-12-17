// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getSessionCookie } from "better-auth/cookies";

// const authPaths = ["/login", "/signup", "/forgot-password", "/reset-password"];

// const publicPaths = [
//   "/terms",
//   "/about",
//   "/privacy",
//   "/contact",
//   "/embed",
//   "/testimonial",
// ];

// const protectedPaths = ["/dashboard", "/product"];

// export default function proxy(request: NextRequest) {
//   console.log("Proxying request");
//   const sessionCookie = getSessionCookie(request);
//   const { pathname } = request.nextUrl;

//   // Logged-in user trying to access auth pages
//   if (sessionCookie && authPaths.some((path) => pathname.startsWith(path))) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }
//   // Accessible for everyone
//   if (publicPaths.some((path) => pathname.startsWith(path))) {
//     return NextResponse.next();
//   }

//   // Not logged-in user trying to access protected pages
//   if (
//     !sessionCookie &&
//     protectedPaths.some((path) => pathname.startsWith(path))
//   ) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     "/(api|trpc)(.*)",
//   ],
// };


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy() {
  console.log("Proxying request");
  return NextResponse.next()
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}