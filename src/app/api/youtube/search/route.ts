import { NextRequest, NextResponse } from 'next/server';
import { YouTubeService } from '@/features/admin/services/youtube.service';

const youtubeService = new YouTubeService();

/**
 * GET /api/youtube/search?q=QUERY
 * YouTube'da kanal ara
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { success: false, error: 'Arama terimi gerekli' },
      { status: 400 }
    );
  }

  try {
    console.log('🔍 YouTube arama başlatıldı:', query);
    
    const channels = await youtubeService.searchChannels(query);
    
    console.log('✅ Arama sonuçları alındı:', channels.length, 'kanal');
    
    return NextResponse.json({
      success: true,
      data: { channels }
    });
  } catch (error) {
    console.error('❌ YouTube arama hatası:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Kanallar aranırken bir hata oluştu'
      },
      { status: 500 }
    );
  }
}