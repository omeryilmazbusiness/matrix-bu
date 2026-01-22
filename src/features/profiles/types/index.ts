import { ProfileStatus } from '@/shared/lib/constants';

// Topic types
export type ProfileTopic = 'din-felsefe' | 'bilim' | 'tarih' | 'gundem';

// Base Profile interface
export interface Profile {
  id: string;
  slug: string;
  title: string;
  name: string;
  image_url: string;
  topic: ProfileTopic; // Her profil bir konuya ait
  youtube_nick?: string;
  twitter_nick?: string;
  instagram_nick?: string;
  tiktok_nick?: string;
  youtube_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
  description: string;
  status: ProfileStatus;
  view_count: number;
  created_at: string;
  updated_at: string;
}

// Create/Update Profile DTO
export interface ProfileFormData {
  slug: string;
  title: string;
  name: string;
  image_url: string;
  topic: ProfileTopic;
  youtube_nick?: string;
  twitter_nick?: string;
  instagram_nick?: string;
  tiktok_nick?: string;
  youtube_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
  description: string;
  status: ProfileStatus;
}
