import type { IProfileRepository, IProfileService, CreateProfileRequest } from '../types';

/**
 * ProfileService - Profile/Channel business logic
 * Single Responsibility: Sadece profile işlemleri
 * Open/Closed: Yeni özellikler eklenebilir, mevcut kod değişmez
 */
export class ProfileService implements IProfileService {
  constructor(private profileRepository: IProfileRepository) {}

  async getAllProfiles(filters?: any): Promise<any[]> {
    return await this.profileRepository.findAll(filters);
  }

  async getProfileById(id: string): Promise<any> {
    const profile = await this.profileRepository.findById(id);
    if (!profile) {
      throw new Error('Profile not found');
    }
    return profile;
  }

  async createProfile(data: CreateProfileRequest): Promise<any> {
    // Business logic: Validate slug uniqueness
    const existingProfiles = await this.profileRepository.findAll({ slug: data.slug });
    if (existingProfiles.length > 0) {
      throw new Error('Slug already exists');
    }

    // Map form data to database schema
    // SADECE VERİTABANINDA OLAN KOLONLARI KULLAN!
    const profileData = {
      // YouTube Data (veritabanında MUTLAKA olan kolonlar)
      youtube_channel_id: `manual_${Date.now()}`, // Zorunlu alan - unique olmalı
      channel_title: data.title,
      channel_description: data.description,
      slug: data.slug,
      topic: data.topic,
      status: data.status,
      
      // Opsiyonel alanlar (varsa ekle, yoksa sorun olmaz)
      ...(data.name && { name: data.name }),
      ...(data.title && { title: data.title }),
      ...(data.image_url && { image_url: data.image_url }),
      ...(data.image_url && { thumbnail_high: data.image_url }),
      ...(data.youtube_url && { youtube_url: data.youtube_url }),
      ...(data.youtube_url && { youtube_channel_url: data.youtube_url }),
      ...(data.twitter_url && { twitter_url: data.twitter_url }),
      ...(data.instagram_url && { instagram_url: data.instagram_url }),
      
      // Default values
      subscriber_count: 0,
      video_count: 0,
      view_count: 0,
      is_featured: false,
      display_order: 0,
      published_at: new Date().toISOString(),
    };

    return await this.profileRepository.create(profileData);
  }

  async updateProfile(id: string, data: Partial<CreateProfileRequest>): Promise<any> {
    // Verify profile exists
    await this.getProfileById(id);

    const updateData = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    return await this.profileRepository.update(id, updateData);
  }

  async deleteProfile(id: string): Promise<boolean> {
    // Verify profile exists
    await this.getProfileById(id);
    return await this.profileRepository.delete(id);
  }
}
