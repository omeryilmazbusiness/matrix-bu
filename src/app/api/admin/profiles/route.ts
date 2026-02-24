import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/features/admin/services/auth.service';
import { AdminRepository } from '@/features/admin/repositories/admin.repository';
import { ProfileService } from '@/features/admin/services/profile.service';
import { ProfileRepository } from '@/features/admin/repositories/profile.repository';

// Dependency Injection
const adminRepository = new AdminRepository();
const authService = new AuthService(adminRepository);
const profileRepository = new ProfileRepository();
const profileService = new ProfileService(profileRepository);

// Middleware: Check if user is authenticated
async function checkAuth(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) {
    throw new Error('Not authenticated');
  }

  const user = await authService.validateSession(token);
  if (!user) {
    throw new Error('Invalid session');
  }

  return user;
}

// GET /api/admin/profiles - List all profiles
export async function GET(request: NextRequest) {
  try {
    await checkAuth(request);

    const { searchParams } = new URL(request.url);
    const filters: any = {};

    // Apply filters from query params
    const topic = searchParams.get('topic');
    const status = searchParams.get('status');

    if (topic && topic !== 'all') filters.topic = topic;
    if (status && status !== 'all') filters.status = status;

    const profiles = await profileService.getAllProfiles(filters);

    return NextResponse.json(
      { success: true, data: profiles },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch profiles' 
      },
      { status: error instanceof Error && error.message.includes('authenticated') ? 401 : 500 }
    );
  }
}

// POST /api/admin/profiles - Create new profile
export async function POST(request: NextRequest) {
  try {
    await checkAuth(request);

    const body = await request.json();
    const newProfile = await profileService.createProfile(body);

    return NextResponse.json(
      { success: true, data: newProfile, message: 'Profile created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create profile' 
      },
      { status: error instanceof Error && error.message.includes('authenticated') ? 401 : 500 }
    );
  }
}
