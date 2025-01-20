import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get session cookie
  const session = request.cookies.get('session')
  
  // Debug log to server console
  console.log('Middleware executing for path:', request.nextUrl.pathname)
  console.log('Cookie present:', !!session)
  console.log('Session value:', session?.value)

  // Always check for dashboard access
  if (request.nextUrl.pathname.includes('dashboard')) {
    if (!session?.value) {
      console.log('Unauthorized dashboard access attempt')
      // Redirect to sign in
      return NextResponse.redirect(new URL('/google', request.url))
    }
  }

  return NextResponse.next()
}

// Simplified matcher pattern
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
}