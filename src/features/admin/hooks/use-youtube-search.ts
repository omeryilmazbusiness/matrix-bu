import { useState } from 'react';

interface YouTubeChannel {
  channelId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  customUrl?: string;
}

interface YouTubeChannelDetails {
  channelId: string;
  title: string;
  description: string;
  customUrl?: string;
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
  thumbnailDefault?: string;
  thumbnailMedium?: string;
  thumbnailHigh?: string;
  publishedAt: string;
  country?: string;
  keywords?: string;
  bannerUrl?: string;
}

export function useYouTubeSearch() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<YouTubeChannel[]>([]);
  const [error, setError] = useState<string | null>(null);

  /**
   * YouTube'da kanal ara
   */
  const searchChannels = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      console.log('🔍 YouTube kanal arama:', query);
      
      const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Arama başarısız');
      }

      console.log('✅ Arama sonuçları:', data.data?.channels?.length || 0);
      setSearchResults(data.data?.channels || []);
    } catch (err) {
      console.error('❌ YouTube arama hatası:', err);
      setError(err instanceof Error ? err.message : 'Arama sırasında hata oluştu');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  /**
   * Kanal detaylarını getir
   */
  const getChannelDetails = async (channelId: string): Promise<YouTubeChannelDetails | null> => {
    try {
      console.log('📺 Kanal detayları çekiliyor:', channelId);
      
      const response = await fetch(`/api/youtube/channel?id=${channelId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Kanal detayları alınamadı');
      }

      console.log('✅ Kanal detayları alındı:', data.data.title);
      return data.data;
    } catch (err) {
      console.error('❌ Kanal detay hatası:', err);
      setError(err instanceof Error ? err.message : 'Kanal detayları alınamadı');
      return null;
    }
  };

  const clearResults = () => {
    setSearchResults([]);
    setError(null);
  };

  return {
    searchChannels,
    getChannelDetails,
    clearResults,
    isSearching,
    searchResults,
    error,
  };
}
