import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/shared/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { channelId, channelName, channelUrl, subscriberCount, thumbnailUrl, description } = body;

    // Validate required fields
    if (!channelId || !channelName) {
      return NextResponse.json(
        { error: 'Kanal bilgileri eksik' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if user is authenticated (optional - you can remove this if anonymous suggestions are allowed)
    const { data: { user } } = await supabase.auth.getUser();

    // Insert suggestion into database
    const { data, error } = await supabase
      .from('channel_suggestions')
      .insert({
        channel_id: channelId,
        channel_name: channelName,
        channel_url: channelUrl,
        subscriber_count: subscriberCount,
        thumbnail_url: thumbnailUrl,
        description: description,
        user_id: user?.id || null, // null if anonymous
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Suggestion insert error:', error);
      
      // Check if it's a duplicate suggestion
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Bu kanal daha önce önerilmiş' },
          { status: 409 }
        );
      }

      throw error;
    }

    return NextResponse.json({ 
      success: true, 
      suggestion: data,
      message: 'Öneriniz başarıyla kaydedildi'
    });

  } catch (error) {
    console.error('Suggestion creation error:', error);
    return NextResponse.json(
      { error: 'Öneri kaydedilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}