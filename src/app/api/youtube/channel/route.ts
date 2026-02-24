import { NextRequest, NextResponse } from 'next/server';
import { YouTubeService } from '@/features/admin/services/youtube.service';

const youtubeService = new YouTubeService();

/**
 * GET /api/youtube/channel?id=CHANNEL_ID
 * YouTube kanalının detaylı bilgilerini çeker
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const channelId = searchParams.get('id');

  if (!channelId) {
    return NextResponse.json(
      { success: false, error: 'Channel ID gerekli' },
      { status: 400 }
    );
  }

  try {
    console.log('📺 Kanal detayları isteniyor:', channelId);
    
    const channelData = await youtubeService.getChannelDetails(channelId);
    
    console.log('✅ Kanal detayları başarıyla alındı:', channelData.title);
    
    return NextResponse.json({
      success: true,
      data: channelData
    });
  } catch (error) {
    console.error('❌ Kanal detayları alınırken hata:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Kanal detayları alınamadı'
      },
      { status: 500 }
    );
  }
}
