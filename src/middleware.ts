import { NextRequest, NextResponse } from "next/server";

export function middleware (request: NextRequest){
    if(request.nextUrl.pathname!="/google")
   return NextResponse.redirect(new URL("/google", request.url))
}

export const config={
    matcher:'/dashboard/:path*',
}