import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ssnecrkcthndqzvrgtpx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzbmVjcmtjdGhuZHF6dnJndHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNzA5MzksImV4cCI6MjA4NDc0NjkzOX0.y5DBft_5IA2-lRe3AHqVrR-J0McSmkTEdVN1aU89rho'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkColumns() {
  console.log('🔍 Profiles tablosundaki GERÇEK kolonlar:\n')
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(1)
  
  if (error) {
    console.error('❌ Hata:', error.message)
  } else if (data && data.length > 0) {
    const columns = Object.keys(data[0])
    console.log('📋 Kolonlar:')
    columns.forEach(col => console.log(`  - ${col}`))
    console.log(`\n✅ Toplam ${columns.length} kolon`)
  } else {
    console.log('⚠️ Tabloda veri yok, test verisi ekleyelim')
  }
}

checkColumns()
