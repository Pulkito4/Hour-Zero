import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session"); // Retrieve the session cookie

  console.log("Request Path:", request.nextUrl.pathname);
  console.log("Session Exists:", !!session);

  if (session) {
    // If session exists and user is on /google, redirect to /dashboard
    console.log("Session exists. Checking for /google redirection...");
    if (request.nextUrl.pathname.startsWith("/google")) {
      console.log("Redirecting to /dashboard...");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    // If session does not exist and user is trying to access /dashboard, redirect to /google
    console.log("No session. Checking for /dashboard redirection...");
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      console.log("Redirecting to /google...");
      return NextResponse.redirect(new URL("/google", request.url));
    }
  }

  // Allow all other requests to proceed
  console.log("No conditions matched. Proceeding with request.");
  return NextResponse.next();
}

export const config = {
  matcher: ["/google", "/dashboard/:path*"],
};
