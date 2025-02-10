// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   // Get session cookie
//   const session = request.cookies.get('session')

//   // Debug log to server console
//   console.log('Middleware executing for path:', request.nextUrl.pathname)
//   console.log('Cookie present:', !!session)
//   console.log('Session value:', session?.value)

//   // Always check for dashboard access
//   if (request.nextUrl.pathname.includes('dashboard')) {
//     if (!session?.value) {
//       console.log('Unauthorized dashboard access attempt')
//       // Redirect to sign in
//       return NextResponse.redirect(new URL('/google', request.url))
//     }
//   }

//   return NextResponse.next()
// }

// // Simplified matcher pattern
// export const config = {
//   matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
// }

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RATE_LIMIT_TIME = 15000; // 15 seconds
const requestTimestamps = new Map<string, number>(); // Store request timestamps (consider Redis for production)

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const path = request.nextUrl.pathname;
  const origin = request.headers.get("origin");
  const ip = request.headers.get("x-forwarded-for") || "unknown";

  console.log("Middleware executing for path:", path);
  console.log("Cookie present:", !!session);
  console.log("Session value:", session?.value);

  // **1. Restrict Access to Dashboard**
  if (path.includes("dashboard")) {
    if (!session?.value) {
      console.log("Unauthorized dashboard access attempt");
      return NextResponse.redirect(new URL("/google", request.url));
    }
  }

  // **2. Protect Contact Form Submission**
  if (path.startsWith("/api/send-email")) {
    console.log("Form submission detected from:", origin);

    // **Block localhost submissions**
    // if (origin?.includes("localhost")) {
    //   console.log("Blocked form submission from localhost");
    //   return NextResponse.json({ error: "Localhost submissions are not allowed" }, { status: 403 });
    // }

    // **Rate Limiting to Prevent Spam**
    const lastRequestTime = requestTimestamps.get(ip);
    const now = Date.now();

    if (lastRequestTime && now - lastRequestTime < RATE_LIMIT_TIME) {
      console.log("Rate limit exceeded for:", ip);
      return NextResponse.json({ error: "Too many requests. Please wait." }, { status: 429 });
    }

    // Store timestamp of request
    requestTimestamps.set(ip, now);
  }

  return NextResponse.next();
}

// **Apply Middleware to Specific Routes**
export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
