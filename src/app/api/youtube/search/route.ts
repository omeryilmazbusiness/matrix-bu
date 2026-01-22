import { NextRequest, NextResponse } from 'next/server';

// YouTube Data API v3
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { error: 'Arama terimi gerekli' },
      { status: 400 }
    );
  }

  if (!YOUTUBE_API_KEY) {
    console.error('❌ YouTube API Key bulunamadı');
    return NextResponse.json(
      { error: 'YouTube API anahtarı yapılandırılmamış' },
      { status: 500 }
    );
  }

  try {
    console.log('🔍 YouTube arama başlatıldı:', query);
    
    // Search for channels
    const searchResponse = await fetch(
      `${YOUTUBE_API_URL}/search?part=snippet&type=channel&q=${encodeURIComponent(query)}&maxResults=10&key=${YOUTUBE_API_KEY}`
    );

    if (!searchResponse.ok) {
      const errorData = await searchResponse.json().catch(() => null);
      console.error('❌ YouTube Search API hatası:', {
        status: searchResponse.status,
        statusText: searchResponse.statusText,
        error: errorData
      });
      
      // Return detailed error message
      if (searchResponse.status === 403) {
        return NextResponse.json(
          { error: 'YouTube API kotası aşıldı veya API key geçersiz' },
          { status: 403 }
        );
      }
      
      return NextResponse.json(
        { error: errorData?.error?.message || 'YouTube API hatası' },
        { status: searchResponse.status }
      );
    }

    const searchData = await searchResponse.json();
    console.log('✅ Arama sonuçları alındı:', searchData.items?.length || 0, 'kanal');
    
    if (!searchData.items || searchData.items.length === 0) {
      return NextResponse.json({ channels: [] });
    }

    // Get channel IDs
    const channelIds = searchData.items.map((item: any) => item.snippet.channelId).join(',');

    // Get detailed channel information
    const channelsResponse = await fetch(
      `${YOUTUBE_API_URL}/channels?part=snippet,statistics&id=${channelIds}&key=${YOUTUBE_API_KEY}`
    );

    if (!channelsResponse.ok) {
      const errorData = await channelsResponse.json().catch(() => null);
      console.error('❌ YouTube Channels API hatası:', {
        status: channelsResponse.status,
        statusText: channelsResponse.statusText,
        error: errorData
      });
      
      return NextResponse.json(
        { error: errorData?.error?.message || 'Kanal detayları alınamadı' },
        { status: channelsResponse.status }
      );
    }

    const channelsData = await channelsResponse.json();
    console.log('✅ Kanal detayları alındı:', channelsData.items?.length || 0, 'kanal');

    // Format channel data
    const channels = channelsData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.default.url,
      subscriberCount: item.statistics.subscriberCount || '0',
      videoCount: item.statistics.videoCount || '0',
      customUrl: item.snippet.customUrl,
    }));

    return NextResponse.json({ channels });
  } catch (error) {
    console.error('💥 YouTube search critical error:', error);
    return NextResponse.json(
      { 
        error: 'Kanallar aranırken bir hata oluştu',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    );
  }
}