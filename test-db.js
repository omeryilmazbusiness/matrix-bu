const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://ssnecrkcthndqzvrgtpx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzbmVjcmtjdGhuZHF6dnJndHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNzA5MzksImV4cCI6MjA4NDc0NjkzOX0.y5DBft_5IA2-lRe3AHqVrR-J0McSmkTEdVN1aU89rho'
);

async function checkDatabase() {
  console.log('🔍 Veritabanı kontrol ediliyor...\n');
  
  // 1. admin_users tablosunu kontrol et
  const { data: adminUsers, error: adminError } = await supabase
    .from('admin_users')
    .select('*');
  
  if (adminError) {
    console.log('❌ admin_users tablosu bulunamadı veya hata oluştu:');
    console.log('   Error:', adminError.message);
    console.log('\n⚠️  SQL dosyasını Supabase Dashboard\'da çalıştırmanız gerekiyor!');
    console.log('   Link: https://supabase.com/dashboard/project/ssnecrkcthndqzvrgtpx/sql/new');
    return;
  }
  
  console.log('✅ admin_users tablosu mevcut');
  console.log('📊 Toplam admin kullanıcı sayısı:', adminUsers.length);
  
  if (adminUsers.length > 0) {
    console.log('\n👥 Admin kullanıcılar:');
    adminUsers.forEach((admin, index) => {
      console.log(`   ${index + 1}. ${admin.email} - ${admin.name} (${admin.role})`);
    });
  } else {
    console.log('\n⚠️  Hiç admin kullanıcı yok! SQL dosyasını çalıştırın.');
  }
  
  // 2. profiles tablosunu kontrol et
  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .limit(5);
  
  if (!profileError) {
    console.log('\n✅ profiles tablosu mevcut');
    console.log('📊 İlk 5 profil:', profiles.length);
  } else {
    console.log('\n⚠️  profiles tablosu bulunamadı');
  }
  
  console.log('\n---');
  console.log('Test tamamlandı!');
}

checkDatabase().catch(console.error);
