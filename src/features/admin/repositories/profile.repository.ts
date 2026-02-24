import { createClient } from '@/shared/lib/supabase/server';
import type { IProfileRepository } from '../types';

/**
 * ProfileRepository - Supabase ile profile/channel verilerine erişim
 * Single Responsibility: Sadece profile veritabanı işlemleri
 */
export class ProfileRepository implements IProfileRepository {
  async findAll(filters?: any): Promise<any[]> {
    const supabase = await createClient();
    let query = supabase.from('profiles').select('*');

    // Apply filters if provided
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch profiles: ${error.message}`);
    return data || [];
  }

  async findById(id: string): Promise<any | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  }

  async create(data: any): Promise<any> {
    const supabase = await createClient();
    const { data: newProfile, error } = await supabase
      .from('profiles')
      .insert([data])
      .select()
      .single();

    if (error) throw new Error(`Failed to create profile: ${error.message}`);
    return newProfile;
  }

  async update(id: string, data: any): Promise<any> {
    const supabase = await createClient();
    const { data: updatedProfile, error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update profile: ${error.message}`);
    return updatedProfile;
  }

  async delete(id: string): Promise<boolean> {
    const supabase = await createClient();
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete profile: ${error.message}`);
    return true;
  }
}
