import { useState, useEffect } from 'react';
import { createClient } from '@/shared/lib/supabase/client';

export interface Profile {
  id: string;
  slug: string;
  name: string;
  title: string;
  channel_title?: string;
  description?: string;
  channel_description?: string;
  image_url?: string;
  thumbnail_high?: string;
  thumbnail_medium?: string;
  thumbnail_default?: string;
  topic: string;
  status: string;
  youtube_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  subscriber_count?: number;
  video_count?: number;
  view_count?: number;
  is_featured?: boolean;
  created_at: string;
  updated_at: string;
}

/** Supabase PostgrestError veya standart Error'dan okunabilir mesaj çıkarır */
function parseError(err: unknown): string {
  if (!err) return 'Bilinmeyen hata';
  if (err instanceof Error) return err.message;
  if (typeof err === 'object') {
    const e = err as Record<string, unknown>;
    // Supabase PostgrestError yapısı
    if (typeof e.message === 'string' && e.message) return e.message;
    if (typeof e.details === 'string' && e.details) return e.details;
    if (typeof e.hint === 'string' && e.hint) return e.hint;
    if (typeof e.code === 'string' && e.code) return `Hata kodu: ${e.code}`;
    // fetch failed gibi nested error
    const str = JSON.stringify(err);
    if (str !== '{}') return str;
  }
  return String(err);
}

export function usePublicProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const supabase = createClient();

      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .in('status', ['published', 'active', 'verified'])
        .order('created_at', { ascending: false });

      if (fetchError) {
        const message = parseError(fetchError);
        console.error('Profiller yüklenirken hata:', message, fetchError);
        throw new Error(message);
      }

      setProfiles(data || []);
    } catch (err) {
      const message = parseError(err);
      console.error('Profiller yüklenirken hata:', message);
      setError(message);
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  return { profiles, loading, error, refetch: fetchProfiles };
}
