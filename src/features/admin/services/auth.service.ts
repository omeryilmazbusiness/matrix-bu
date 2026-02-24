import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import type { 
  IAuthService, 
  IAdminRepository, 
  AdminLoginCredentials, 
  AdminSession,
  AdminUser 
} from '../types';

/**
 * AuthService - Authentication business logic
 * Single Responsibility: Sadece authentication işlemleri
 * Dependency Inversion: IAdminRepository interface'ine bağımlı
 */
export class AuthService implements IAuthService {
  private readonly JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
  );
  private readonly TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

  constructor(private adminRepository: IAdminRepository) {}

  async login(credentials: AdminLoginCredentials): Promise<AdminSession> {
    console.log('🔐 Login attempt for:', credentials.email);
    
    // Find admin user
    const admin = await this.adminRepository.findByEmail(credentials.email);
    
    console.log('👤 Admin found:', admin ? 'YES' : 'NO');
    
    if (!admin) {
      console.log('❌ Admin not found in database');
      throw new Error('Invalid credentials');
    }

    console.log('✅ Admin exists:', {
      email: admin.email,
      name: admin.name,
      role: admin.role,
      is_active: admin.is_active
    });

    // Check if admin is active
    if (!admin.is_active) {
      console.log('❌ Admin account is not active');
      throw new Error('Account is not active');
    }

    // Verify password (for now, simple comparison - in production use bcrypt)
    // TODO: Implement bcrypt comparison when admin table has password_hash field
    const isValidPassword = credentials.password === 'admin123'; // Temporary
    
    console.log('🔑 Password check:', isValidPassword ? 'VALID' : 'INVALID');
    console.log('🔑 Received password length:', credentials.password.length);
    
    if (!isValidPassword) {
      console.log('❌ Invalid password');
      throw new Error('Invalid credentials');
    }

    console.log('✅ Login successful, generating token...');

    // Generate JWT token
    const accessToken = await this.generateToken(admin);
    const expiresAt = Date.now() + this.TOKEN_EXPIRY;

    console.log('✅ Token generated successfully');

    return {
      user: admin,
      accessToken,
      expiresAt,
    };
  }

  async validateSession(token: string): Promise<AdminUser | null> {
    try {
      console.log('🔍 Validating session token...');
      const { payload } = await jwtVerify(token, this.JWT_SECRET);
      
      // Check if token is expired
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        console.log('❌ Token expired');
        return null;
      }

      // Get fresh user data
      const admin = await this.adminRepository.findByEmail(payload.email as string);
      
      if (!admin) {
        console.log('❌ Admin not found for token');
        return null;
      }

      if (!admin.is_active) {
        console.log('❌ Admin account is not active');
        return null;
      }

      console.log('✅ Session validated for:', admin.email);
      return admin;
    } catch (error) {
      console.log('❌ Token validation error:', error);
      return null;
    }
  }

  async logout(token: string): Promise<boolean> {
    // In a production app, you would invalidate the token in a blacklist
    // For now, we'll just return true (client-side logout)
    return true;
  }

  private async generateToken(admin: AdminUser): Promise<string> {
    const token = await new SignJWT({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(this.JWT_SECRET);

    return token;
  }
}
