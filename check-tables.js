import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ssnecrkcthndqzvrgtpx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzbmVjcmtjdGhuZHF6dnJndHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNzA5MzksImV4cCI6MjA4NDc0NjkzOX0.y5DBft_5IA2-lRe3AHqVrR-J0McSmkTEdVN1aU89rho'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkTables() {
  console.log('🔍 Checking database tables...\n')
  
  // Check admin_users table
  console.log('📋 Checking admin_users table:')
  const { data: adminUsers, error: adminError } = await supabase
    .from('admin_users')
    .select('*')
  
  if (adminError) {
    console.log('❌ admin_users table error:', adminError.message)
  } else {
    console.log('✅ admin_users table exists')
    console.log('   Records:', adminUsers?.length || 0)
    if (adminUsers && adminUsers.length > 0) {
      console.log('   Users:', JSON.stringify(adminUsers, null, 2))
    }
  }
  
  console.log('\n📋 Checking profiles table:')
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*')
    .limit(5)
  
  if (profilesError) {
    console.log('❌ profiles table error:', profilesError.message)
  } else {
    console.log('✅ profiles table exists')
    console.log('   Records:', profiles?.length || 0)
  }
  
  console.log('\n📋 Checking weekly_persons table:')
  const { data: weeklyPersons, error: weeklyError } = await supabase
    .from('weekly_persons')
    .select('*')
    .limit(5)
  
  if (weeklyError) {
    console.log('❌ weekly_persons table error:', weeklyError.message)
  } else {
    console.log('✅ weekly_persons table exists')
    console.log('   Records:', weeklyPersons?.length || 0)
  }
  
  console.log('\n📋 Checking suggestions table:')
  const { data: suggestions, error: suggestionsError } = await supabase
    .from('suggestions')
    .select('*')
    .limit(5)
  
  if (suggestionsError) {
    console.log('❌ suggestions table error:', suggestionsError.message)
  } else {
    console.log('✅ suggestions table exists')
    console.log('   Records:', suggestions?.length || 0)
  }
  
  console.log('\n📋 Checking contact_submissions table:')
  const { data: contacts, error: contactsError } = await supabase
    .from('contact_submissions')
    .select('*')
    .limit(5)
  
  if (contactsError) {
    console.log('❌ contact_submissions table error:', contactsError.message)
  } else {
    console.log('✅ contact_submissions table exists')
    console.log('   Records:', contacts?.length || 0)
  }
}

checkTables()
