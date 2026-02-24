-- PROFILES (KANALLAR) TABLE
-- YouTube API'den gelecek tüm kanal bilgilerini saklar

CREATE TABLE IF NOT EXISTS public.profiles (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- YouTube Data (API'den gelen bilgiler)
    youtube_channel_id VARCHAR(255) UNIQUE NOT NULL, -- YouTube kanal ID (UCxxxx)
    youtube_channel_url VARCHAR(500), -- YouTube kanal URL'i
    channel_title VARCHAR(255) NOT NULL, -- Kanal adı
    channel_description TEXT, -- Kanal açıklaması
    custom_url VARCHAR(255), -- Özel URL (@username)
    
    -- Channel Statistics (YouTube API'den)
    subscriber_count BIGINT DEFAULT 0, -- Abone sayısı
    video_count INTEGER DEFAULT 0, -- Video sayısı
    view_count BIGINT DEFAULT 0, -- Toplam görüntülenme
    
    -- Channel Branding
    thumbnail_default VARCHAR(500), -- Küçük profil resmi
    thumbnail_medium VARCHAR(500), -- Orta profil resmi
    thumbnail_high VARCHAR(500), -- Büyük profil resmi
    banner_url VARCHAR(500), -- Kanal banner resmi
    
    -- Additional Info
    published_at TIMESTAMP WITH TIME ZONE, -- Kanalın oluşturulma tarihi
    country VARCHAR(10), -- Ülke kodu (TR, US, vb.)
    keywords TEXT, -- Kanal anahtar kelimeleri
    
    -- Our Custom Fields (Bizim ekleyeceğimiz bilgiler)
    slug VARCHAR(255) UNIQUE NOT NULL, -- URL slug (hakikat-bu)
    topic VARCHAR(100), -- Konu kategorisi (Din, Tarih, vb.)
    is_featured BOOLEAN DEFAULT false, -- Öne çıkan kanal mı?
    display_order INTEGER DEFAULT 0, -- Sıralama
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    
    -- AI & Analysis (Gelecekte eklenebilir)
    ai_summary TEXT, -- AI tarafından oluşturulan özet
    ai_category VARCHAR(100), -- AI tarafından belirlenen kategori
    quality_score INTEGER CHECK (quality_score >= 0 AND quality_score <= 100), -- Kalite skoru (0-100)
    
    -- Social Media (Diğer sosyal medya linkleri)
    twitter_url VARCHAR(500),
    instagram_url VARCHAR(500),
    website_url VARCHAR(500),
    
    -- Metadata
    last_synced_at TIMESTAMP WITH TIME ZONE, -- YouTube'dan son senkronizasyon
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID, -- Admin kullanıcısı referansı
    updated_by UUID
);

-- RLS Politikalarını etkinleştir
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Eski policy'leri sil
DROP POLICY IF EXISTS "Public read access" ON public.profiles;
DROP POLICY IF EXISTS "Admin full access" ON public.profiles;

-- Public read access (Herkes yayınlanan kanalları görebilir)
CREATE POLICY "Public read access"
    ON public.profiles
    FOR SELECT
    USING (status = 'published' OR true); -- Şimdilik tüm kayıtlar görülebilir

-- Admin full access (Admin tüm işlemleri yapabilir)
CREATE POLICY "Admin full access"
    ON public.profiles
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Updated_at trigger
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes (Performans için)
CREATE INDEX IF NOT EXISTS idx_profiles_youtube_channel_id ON public.profiles(youtube_channel_id);
CREATE INDEX IF NOT EXISTS idx_profiles_slug ON public.profiles(slug);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_topic ON public.profiles(topic);
CREATE INDEX IF NOT EXISTS idx_profiles_is_featured ON public.profiles(is_featured);
CREATE INDEX IF NOT EXISTS idx_profiles_display_order ON public.profiles(display_order);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON public.profiles(created_at DESC);

-- Örnek kanal ekle (Test için)
INSERT INTO public.profiles (
    youtube_channel_id,
    youtube_channel_url,
    channel_title,
    channel_description,
    custom_url,
    subscriber_count,
    video_count,
    view_count,
    thumbnail_high,
    slug,
    topic,
    status,
    is_featured
) VALUES (
    'UC_test_channel_id',
    'https://www.youtube.com/@HakikatBu',
    'Hakikat Bu - Test Kanalı',
    'Din, tarih ve kültür üzerine içerikler',
    '@HakikatBu',
    50000,
    120,
    2500000,
    'https://via.placeholder.com/800x800',
    'hakikat-bu-test',
    'Din ve Tarih',
    'published',
    true
) ON CONFLICT (youtube_channel_id) DO NOTHING;

-- Başarı mesajı
SELECT 
    'Profiles table created successfully!' as message,
    COUNT(*) as total_profiles 
FROM public.profiles;

-- Tabloyu göster
SELECT * FROM public.profiles;
