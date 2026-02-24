import { createClient } from '@/shared/lib/supabase/client';
import { Profile } from '@/features/profiles/types';

/** Supabase PostgrestError veya standart Error'dan okunabilir mesaj çıkarır */
function parseError(err: unknown): string {
  if (!err) return 'Bilinmeyen hata';
  if (err instanceof Error) return err.message;
  if (typeof err === 'object') {
    const e = err as Record<string, unknown>;
    if (typeof e.message === 'string' && e.message) return e.message;
    if (typeof e.details === 'string' && e.details) return e.details;
    if (typeof e.hint === 'string' && e.hint) return e.hint;
    if (typeof e.code === 'string' && e.code) return `Hata kodu: ${e.code}`;
    const str = JSON.stringify(err);
    if (str !== '{}') return str;
  }
  return String(err);
}

export class ChannelsService {
  private supabase = createClient();

  /**
   * Fetch all published/active/verified channels from database
   */
  async getPublishedChannels(): Promise<Profile[]> {
    try {
      const { data, error } = await this.supabase
        .from('profiles')
        .select('*')
        .in('status', ['published', 'active', 'verified'])
        .order('created_at', { ascending: false }); // display_order kolonu yok

      if (error) {
        console.error('Error fetching channels:', parseError(error));
        return [];
      }

      return this.mapToProfiles(data || []);
    } catch (err) {
      console.error('Error fetching channels:', parseError(err));
      return [];
    }
  }

  /**
   * Fetch a single channel by slug or ID
   */
  async getChannelBySlugOrId(slugOrId: string): Promise<Profile | null> {
    try {
      // Önce slug ile dene
      let { data, error } = await this.supabase
        .from('profiles')
        .select('*')
        .eq('slug', slugOrId)
        .in('status', ['published', 'active', 'verified'])
        .single();

      // Bulunamazsa ID ile dene
      if (error || !data) {
        const result = await this.supabase
          .from('profiles')
          .select('*')
          .eq('id', slugOrId)
          .in('status', ['published', 'active', 'verified'])
          .single();

        data = result.data;
        error = result.error;
      }

      if (error) {
        console.error('Error fetching channel:', parseError(error));
        return null;
      }

      return data ? this.mapToProfile(data) : null;
    } catch (err) {
      console.error('Error fetching channel:', parseError(err));
      return null;
    }
  }

  /**
   * Map database row to Profile type
   */
  private mapToProfile(row: any): Profile {
    return {
      id: row.id,
      name: row.channel_title || 'Bilinmeyen Kanal',
      slug: row.slug,
      title: row.channel_title || '',
      description: row.channel_description || '',
      image_url: row.thumbnail_high || row.thumbnail_medium || row.thumbnail_default || '',
      youtube_url: row.youtube_channel_url || '',
      subscriber_count: row.subscriber_count || 0,
      video_count: row.video_count || 0,
      view_count: row.view_count || 0,
      topic: this.mapTopic(row.topic),
      status: this.mapStatus(row.is_featured),
      social_links: this.parseSocialLinks(row),
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  /**
   * Map multiple database rows to Profile array
   */
  private mapToProfiles(rows: any[]): Profile[] {
    return rows.map(row => this.mapToProfile(row));
  }

  /**
   * Map database topic to ProfileTopic
   */
  private mapTopic(topic: string | null): 'din-felsefe' | 'bilim' | 'tarih' | 'gundem' {
    if (!topic) return 'gundem';
    
    const topicMap: Record<string, 'din-felsefe' | 'bilim' | 'tarih' | 'gundem'> = {
      'Din ve Tarih': 'din-felsefe',
      'Din': 'din-felsefe',
      'Felsefe': 'din-felsefe',
      'Bilim': 'bilim',
      'Tarih': 'tarih',
      'Gündem': 'gundem',
    };

    return topicMap[topic] || 'gundem';
  }

  /**
   * Map database is_featured to ProfileStatus
   */
  private mapStatus(isFeatured: boolean | null): 'featured' | 'verified' | 'standard' {
    if (isFeatured) return 'featured';
    return 'verified';
  }

  /**
   * Parse social links from database columns
   */
  private parseSocialLinks(row: any) {
    const links: { platform: string; url: string }[] = [];

    if (row.youtube_channel_url) {
      links.push({ platform: 'youtube', url: row.youtube_channel_url });
    }
    if (row.twitter_url) {
      links.push({ platform: 'twitter', url: row.twitter_url });
    }
    if (row.instagram_url) {
      links.push({ platform: 'instagram', url: row.instagram_url });
    }
    if (row.website_url) {
      links.push({ platform: 'website', url: row.website_url });
    }

    return links;
  }
}

// Export singleton instance
export const channelsService = new ChannelsService();
