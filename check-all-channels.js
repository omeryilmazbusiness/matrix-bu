const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ssnecrkcthndqzvrgtpx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzbmVjcmtjdGhuZHF6dnJndHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNzA5MzksImV4cCI6MjA4NDc0NjkzOX0.y5DBft_5IA2-lRe3AHqVrR-J0McSmkTEdVN1aU89rho';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAllChannels() {
  console.log('🔍 Veritabanındaki tüm kanallar kontrol ediliyor...\n');
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Hata:', error);
    return;
  }

  if (!data || data.length === 0) {
    console.log('⚠️  Veritabanında hiç kanal bulunamadı!');
    return;
  }

  console.log(`✅ Toplam ${data.length} kanal bulundu:\n`);
  
  data.forEach((channel, index) => {
    console.log(`${index + 1}. ${channel.channel_title}`);
    console.log(`   - YouTube ID: ${channel.youtube_channel_id}`);
    console.log(`   - Slug: ${channel.slug}`);
    console.log(`   - Status: ${channel.status}`);
    console.log(`   - Subscriber Count: ${channel.subscriber_count?.toLocaleString() || '0'}`);
    console.log(`   - Thumbnail: ${channel.thumbnail_high || 'YOK'}`);
    console.log(`   - Created At: ${channel.created_at}`);
    console.log('');
  });
}

checkAllChannels();
