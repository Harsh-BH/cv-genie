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
  '/register',
  '/api/auth/login',
  '/api/auth/register'
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

  // If no token exists and the path is protected, redirect to login
  if (!token && isProtectedPath) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // If there's a token and the path is a login/register page, redirect to dashboard
  if (token && isPublicPath && (path === '/login' || path === '/register')) {
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
    
    response.cookies.delete('auth_token');
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
