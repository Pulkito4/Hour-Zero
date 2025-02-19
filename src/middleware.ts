import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_TIME = 15000; // 15 seconds
const requestTimestamps = new Map<string, number>(); // Store request timestamps (consider Redis for production)

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const path = request.nextUrl.pathname;
  const origin = request.headers.get("origin");
  const ip = request.headers.get("x-forwarded-for") || "unknown";


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
    if (origin?.includes("localhost")) {
      console.log("Blocked form submission from localhost");
      return NextResponse.json({ error: "Localhost submissions are not allowed" }, { status: 403 });
    }

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

export const config = {
  matcher: ["/google", "/dashboard/:path*", "/api/send-email"],
};
