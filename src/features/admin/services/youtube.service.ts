/**
 * YouTube Service - YouTube Data API v3 ile etkileşim
 * Single Responsibility: YouTube API işlemleri
 */

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeChannelData {
  // Basic Info
  channelId: string;
  title: string;
  description: string;
  customUrl?: string;
  
  // Statistics
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
  
  // Thumbnails
  thumbnailDefault?: string;
  thumbnailMedium?: string;
  thumbnailHigh?: string;
  
  // Additional Info
  publishedAt: string;
  country?: string;
  keywords?: string;
  bannerUrl?: string;
}

export interface YouTubeSearchResult {
  channelId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  customUrl?: string;
}

export class YouTubeService {
  /**
   * YouTube'da kanal ara
   */
  async searchChannels(query: string): Promise<YouTubeSearchResult[]> {
    if (!YOUTUBE_API_KEY) {
      throw new Error('YouTube API Key bulunamadı');
    }

    console.log('🔍 YouTube arama:', query);

    const searchResponse = await fetch(
      `${YOUTUBE_API_URL}/search?part=snippet&type=channel&q=${encodeURIComponent(query)}&maxResults=10&key=${YOUTUBE_API_KEY}`,
      {
        headers: {
          'Accept': 'application/json',
          'Referer': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
        },
      }
    );

    if (!searchResponse.ok) {
      const errorData = await searchResponse.json().catch(() => null);
      console.error('❌ YouTube Search API hatası:', errorData);
      throw new Error(errorData?.error?.message || 'YouTube arama hatası');
    }

    const searchData = await searchResponse.json();
    
    return searchData.items?.map((item: any) => ({
      channelId: item.snippet.channelId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.default?.url || '',
      customUrl: item.snippet.customUrl,
    })) || [];
  }

  /**
   * Kanal ID'sine göre detaylı kanal bilgisi al
   */
  async getChannelDetails(channelId: string): Promise<YouTubeChannelData> {
    if (!YOUTUBE_API_KEY) {
      throw new Error('YouTube API Key bulunamadı');
    }

    console.log('📺 Kanal detayları alınıyor:', channelId);

    const response = await fetch(
      `${YOUTUBE_API_URL}/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${YOUTUBE_API_KEY}`,
      {
        headers: {
          'Accept': 'application/json',
          'Referer': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('❌ YouTube Channel API hatası:', errorData);
      throw new Error(errorData?.error?.message || 'Kanal detayları alınamadı');
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      throw new Error('Kanal bulunamadı');
    }

    const channel = data.items[0];
    const snippet = channel.snippet;
    const statistics = channel.statistics;
    const branding = channel.brandingSettings;

    console.log('✅ Kanal detayları alındı:', snippet.title);

    return {
      channelId: channel.id,
      title: snippet.title,
      description: snippet.description,
      customUrl: snippet.customUrl,
      
      subscriberCount: statistics.subscriberCount || '0',
      videoCount: statistics.videoCount || '0',
      viewCount: statistics.viewCount || '0',
      
      thumbnailDefault: snippet.thumbnails.default?.url,
      thumbnailMedium: snippet.thumbnails.medium?.url,
      thumbnailHigh: snippet.thumbnails.high?.url,
      
      publishedAt: snippet.publishedAt,
      country: snippet.country,
      keywords: branding?.channel?.keywords,
      bannerUrl: branding?.image?.bannerExternalUrl,
    };
  }

  /**
   * Birden fazla kanalın detaylarını al
   */
  async getMultipleChannelDetails(channelIds: string[]): Promise<YouTubeChannelData[]> {
    if (!YOUTUBE_API_KEY) {
      throw new Error('YouTube API Key bulunamadı');
    }

    const ids = channelIds.join(',');
    console.log('📺 Birden fazla kanal detayı alınıyor:', channelIds.length);

    const response = await fetch(
      `${YOUTUBE_API_URL}/channels?part=snippet,statistics,brandingSettings&id=${ids}&key=${YOUTUBE_API_KEY}`,
      {
        headers: {
          'Accept': 'application/json',
          'Referer': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error?.message || 'Kanal detayları alınamadı');
    }

    const data = await response.json();

    return data.items?.map((channel: any) => {
      const snippet = channel.snippet;
      const statistics = channel.statistics;
      const branding = channel.brandingSettings;

      return {
        channelId: channel.id,
        title: snippet.title,
        description: snippet.description,
        customUrl: snippet.customUrl,
        
        subscriberCount: statistics.subscriberCount || '0',
        videoCount: statistics.videoCount || '0',
        viewCount: statistics.viewCount || '0',
        
        thumbnailDefault: snippet.thumbnails.default?.url,
        thumbnailMedium: snippet.thumbnails.medium?.url,
        thumbnailHigh: snippet.thumbnails.high?.url,
        
        publishedAt: snippet.publishedAt,
        country: snippet.country,
        keywords: branding?.channel?.keywords,
        bannerUrl: branding?.image?.bannerExternalUrl,
      };
    }) || [];
  }
}
