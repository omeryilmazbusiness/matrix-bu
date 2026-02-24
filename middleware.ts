import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// JWT secret (same as in auth.service.ts)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
);

// Protected admin routes (pages)
const PROTECTED_ROUTES = ['/admin/dashboard', '/admin/profiles', '/admin/weekly-persons', '/admin/settings'];

// Protected API routes
const PROTECTED_API_ROUTES = ['/api/admin/profiles', '/api/admin/weekly-persons'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is a protected API route
  const isProtectedApiRoute = PROTECTED_API_ROUTES.some(route => pathname.startsWith(route));
  
  if (isProtectedApiRoute) {
    const token = request.cookies.get('admin_token')?.value;

    // No token - return 401
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please login' },
        { status: 401 }
      );
    }

    // Verify token
    try {
      await jwtVerify(token, JWT_SECRET);
      // Token valid - continue
      return NextResponse.next();
    } catch (error) {
      // Token invalid - return 401
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
  }

  // Check if this is a protected admin route (pages)
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    const token = request.cookies.get('admin_token')?.value;

    // No token - redirect to login
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify token
    try {
      await jwtVerify(token, JWT_SECRET);
      // Token valid - continue
      return NextResponse.next();
    } catch (error) {
      // Token invalid - redirect to login
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      loginUrl.searchParams.set('error', 'session_expired');
      
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('admin_token'); // Clear invalid token
      return response;
    }
  }

  // If already logged in and trying to access login page, redirect to dashboard
  if (pathname === '/admin/login') {
    const token = request.cookies.get('admin_token')?.value;
    
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        // Valid token - redirect to dashboard
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } catch (error) {
        // Invalid token - continue to login page
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/admin/:path*', // All admin routes
    '/api/admin/:path*', // All admin API routes
  ],
};
