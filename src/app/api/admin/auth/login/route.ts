import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/features/admin/services/auth.service';
import { AdminRepository } from '@/features/admin/repositories/admin.repository';
import type { AdminLoginCredentials } from '@/features/admin/types';

// Dependency Injection - Service'leri initialize et
const adminRepository = new AdminRepository();
const authService = new AuthService(adminRepository);

export async function POST(request: NextRequest) {
  try {
    const body: AdminLoginCredentials = await request.json();

    // Validate input
    if (!body.email || !body.password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Login
    const session = await authService.login(body);

    // Set cookie
    const response = NextResponse.json(
      { 
        success: true, 
        data: {
          user: session.user,
          expiresAt: session.expiresAt
        }
      },
      { status: 200 }
    );

    // HttpOnly cookie for security
    response.cookies.set('admin_token', session.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('❌ Login error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      },
      { status: 401 }
    );
  }
}
