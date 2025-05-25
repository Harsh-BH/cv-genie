import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Array of paths that require authentication
const protectedPaths = [
  '/dashboard',
  '/profile',
  '/upload',
  '/preview',
  '/settings'
];

// Array of paths that are public (no auth required)
const publicPaths = [
  '/',
  '/login',
  '/signup',
  '/api/auth/login',
  '/api/auth/signup'
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if the path is a protected route
  const isProtectedPath = protectedPaths.some(route => 
    path === route || path.startsWith(`${route}/`)
  );
  
  const isPublicPath = publicPaths.some(route => 
    path === route || path.startsWith(`${route}/`)
  );

  // Skip middleware for API routes except those we want to protect
  if (path.startsWith('/api/') && !path.startsWith('/api/protected/')) {
    return NextResponse.next();
  }

  // If it's not a protected path, continue
  if (!isProtectedPath && !path.startsWith('/api/protected/')) {
    return NextResponse.next();
  }

  // Get the token from the cookies
  const token = request.cookies.get('auth_token')?.value;
  // Get non-httpOnly cookie flag as a fallback
  const isLoggedInFlag = request.cookies.get('isLoggedIn')?.value === 'true';

  // For debugging on Vercel - add custom header to check cookies
  const response = NextResponse.next();
  response.headers.set('x-middleware-cache', 'no-cache');
  
  // If we have the isLoggedIn flag cookie and we're on Vercel, trust it
  // This prevents unnecessary redirections when auth_token might not be immediately detected
  if (process.env.VERCEL && isLoggedInFlag && isProtectedPath) {
    return response;
  }

  // If no token exists and the path is protected, redirect to login
  if (!token && isProtectedPath) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // If there's a token and the path is a login/register page, redirect to dashboard
  if (token && isPublicPath && (path === '/login' || path === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  try {
    // Verify the token using your JWT_SECRET
    if (token) {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || "fallback-secret-not-for-production"
      );
      
      await jwtVerify(token, secret);
    }
    
    return NextResponse.next();
  } catch (error) {
    // If token verification fails, clear the invalid cookie and redirect to login
    const response = NextResponse.redirect(
      new URL('/login', request.url)
    );
    
    // Remove the auth cookies to clean up the invalid session
    response.cookies.delete('auth_token');
    response.cookies.delete('isLoggedIn');
    
    return response;
  }
}

// Configure paths the middleware should run on
export const config = {
  // Apply to all routes except static files and API routes we don't want to protect
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes that don't need protection
     * 2. Static files: /_next/, /images/, /favicon.ico, etc.
     */
    '/((?!_next|images|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|webp|js|css)).*)',
  ],
};