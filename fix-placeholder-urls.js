const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ssnecrkcthndqzvrgtpx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzbmVjcmtjdGhuZHF6dnJndHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNzA5MzksImV4cCI6MjA4NDc0NjkzOX0.y5DBft_5IA2-lRe3AHqVrR-J0McSmkTEdVN1aU89rho';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixPlaceholderUrls() {
  console.log('🔧 Veritabanındaki placeholder URL\'leri güncelleniyor...\n');
  
  // Update test channel with placeholder image
  const { data: testUpdate, error: testError } = await supabase
    .from('profiles')
    .update({
      thumbnail_high: '/placeholder-channel.svg',
      thumbnail_medium: '/placeholder-channel.svg',
      thumbnail_default: '/placeholder-channel.svg'
    })
    .eq('channel_title', 'Hakikat Bu - Test Kanalı')
    .select();

  if (testError) {
    console.error('❌ Test kanalı güncellenemedi:', testError);
  } else {
    console.log('✅ Test kanalı güncellendi:', testUpdate);
  }

  // Update Serhendi Vakfı to published
  const { data: serhendUpdate, error: serhendError } = await supabase
    .from('profiles')
    .update({ status: 'published' })
    .eq('channel_title', 'Serhendî Vakfı')
    .select();

  if (serhendError) {
    console.error('❌ Serhendi Vakfı güncellenemedi:', serhendError);
  } else {
    console.log('✅ Serhendi Vakfı yayına alındı:', serhendUpdate);
  }

  console.log('\n🎉 Güncelleme tamamlandı!\n');

  // Show all channels after update
  const { data: allChannels, error: channelsError } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (channelsError) {
    console.error('❌ Kanallar listelenemedi:', channelsError);
  } else {
    console.log('📋 Güncel kanal listesi:\n');
    allChannels.forEach((channel, index) => {
      console.log(`${index + 1}. ${channel.channel_title}`);
      console.log(`   - Slug: ${channel.slug}`);
      console.log(`   - Status: ${channel.status}`);
      console.log(`   - Thumbnail: ${channel.thumbnail_high || 'YOK'}`);
      console.log('');
    });
  }
}

fixPlaceholderUrls();
