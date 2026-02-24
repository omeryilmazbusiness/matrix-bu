import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/features/admin/services/auth.service';
import { AdminRepository } from '@/features/admin/repositories/admin.repository';

const adminRepository = new AdminRepository();
const authService = new AuthService(adminRepository);

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Validate token
    const user = await authService.validateSession(token);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: true, data: { user } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Session validation failed' },
      { status: 401 }
    );
  }
}
