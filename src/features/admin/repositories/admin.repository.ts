import { createClient } from '@/shared/lib/supabase/server';
import type { IAdminRepository, AdminUser } from '../types';

/**
 * AdminRepository - Supabase ile admin kullanıcı verilerine erişim
 * Single Responsibility: Sadece admin veritabanı işlemleri
 */
export class AdminRepository implements IAdminRepository {
  async findByEmail(email: string): Promise<AdminUser | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) return null;
    return data as AdminUser;
  }

  async create(data: Omit<AdminUser, 'id' | 'created_at' | 'updated_at'>): Promise<AdminUser> {
    const supabase = await createClient();
    const { data: newAdmin, error } = await supabase
      .from('admin_users')
      .insert([data])
      .select()
      .single();

    if (error) throw new Error(`Failed to create admin: ${error.message}`);
    return newAdmin as AdminUser;
  }

  async update(id: string, data: Partial<AdminUser>): Promise<AdminUser> {
    const supabase = await createClient();
    const { data: updatedAdmin, error } = await supabase
      .from('admin_users')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update admin: ${error.message}`);
    return updatedAdmin as AdminUser;
  }
}
