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

async function checkAuth(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) throw new Error('Not authenticated');
  
  const user = await authService.validateSession(token);
  if (!user) throw new Error('Invalid session');
  
  return user;
}

// GET /api/admin/profiles/[id] - Get single profile
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await checkAuth(request);
    const profile = await profileService.getProfileById(params.id);

    return NextResponse.json(
      { success: true, data: profile },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch profile' },
      { status: 404 }
    );
  }
}

// PUT /api/admin/profiles/[id] - Update profile
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await checkAuth(request);
    const body = await request.json();
    const updatedProfile = await profileService.updateProfile(params.id, body);

    return NextResponse.json(
      { success: true, data: updatedProfile, message: 'Profile updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to update profile' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/profiles/[id] - Delete profile
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await checkAuth(request);
    await profileService.deleteProfile(params.id);

    return NextResponse.json(
      { success: true, message: 'Profile deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to delete profile' },
      { status: 500 }
    );
  }
}
